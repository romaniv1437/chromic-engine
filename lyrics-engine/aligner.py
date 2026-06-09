#!/usr/bin/env python3
"""
aligner.py — Guided Forced Alignment + Strict Text Mapping

When anchor text is found:
  - Whisper provides TIMINGS only
  - Official text provides WORDS (spelling is law)
  - Word-by-word mapping: Whisper timing[i] → Anchor word[i]

When no anchor:
  - Blind transcription (Whisper decides everything)

Usage:
  python aligner.py <audio_path> [--artist "X"] [--title "Y"] [--model medium]
"""

import sys
import json
import argparse
import re
import os
import ctypes
import copy
from dotenv import load_dotenv

# Load .env from lyrics-engine directory
load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env'))

# ── Windows ctranslate2 DLL crash prevention ──────────────────────────────────
# ctranslate2.__init__ calls ctypes.CDLL() to load CUDA/cuDNN DLLs at import
# time. On Windows without CUDA installed this causes STATUS_DLL_NOT_FOUND
# (exit code 0xC0000135) which kills the process before Python can catch it.
# We monkey-patch ctypes.CDLL to silently skip missing CUDA libs.
if sys.platform == "win32":
    os.environ["CUDA_VISIBLE_DEVICES"] = ""
    os.environ["CT2_CUDA_ALLOW_FP16"] = "0"
    _original_CDLL = ctypes.CDLL

    class _SafeCDLL(ctypes.CDLL):
        """Drop-in CDLL that silently skips DLLs that fail to load (missing CUDA deps)."""
        def __init__(self, name, *args, **kwargs):
            try:
                super().__init__(name, *args, **kwargs)
            except OSError:
                # DLL couldn't load (missing dependency like cuDNN/cuBLAS) — create inert stub
                self._name = name
                self._handle = 0

    ctypes.CDLL = _SafeCDLL


# ─── Sanitizer ────────────────────────────────────────────────────────────────

JUNK_PATTERNS = [
    r'\(?\s*slowed\s*[\+&]\s*reverb\s*\)?',
    r'\(?\s*sped\s+up\s*\)?',
    r'\(?\s*8D\s*(audio|version)?\s*\)?',
    r'\(?\s*official\s*(audio|video|music\s*video|lyric\s*video|visualizer)\s*\)?',
    r'\(?\s*lyrics?\s*(video)?\s*\)?',
    r'\(?\s*explicit\s*\)?',
    r'\(?\s*clean\s*(version)?\s*\)?',
    r'\(?\s*audio\s*\)?',
    r'\(?\s*HD\s*\)?',
    r'\[?\s*prod\.?\s*[^\]]*\]?',
    r'\[feat\.?\s*[^\]]*\]',
    r'\(feat\.?\s*[^)]*\)',
    r'\[slowed[^\]]*\]',
    r'\[chopped[^\]]*\]',
    r'\(\s*(?:FLAC|WAV|MP3|AAC|OGG|ALAC|AIFF|DSD)\s*[^)]*\)',
    r'\d+[_/]\d+\.?\d*\s*kHz',
]

def sanitize_name(text):
    if not text:
        return text
    result = text
    for pattern in JUNK_PATTERNS:
        result = re.sub(pattern, '', result, flags=re.IGNORECASE)
    result = re.sub(r'\s+', ' ', result).strip()
    result = re.sub(r'[\s\-_.]+$', '', result).strip()
    if not result:
        return text.strip()
    return result


# ─── Censorship Detection ─────────────────────────────────────────────────────

CENSORSHIP_PATTERN = re.compile(r'\*{2,}|_{2,}|\${2,}|#\w*#')
# Matches "F-", "f-", "S-", "sh-t", "b-tch" etc. — single letter + dash (word boundary)
DASH_CENSOR_PATTERN = re.compile(r'^[A-Za-z]{1,2}-$|^[A-Za-z]{1,2}-[a-z]{1,3}$')

# Known explicit replacements for common dash-censored words
DASH_CENSOR_MAP = {
    'f-': 'fuck', 'F-': 'Fuck',
    'f-ck': 'fuck', 'F-ck': 'Fuck',
    'sh-t': 'shit', 'Sh-t': 'Shit',
    's-': 'shit', 'S-': 'Shit',
    'b-tch': 'bitch', 'B-tch': 'Bitch',
    'b-': 'bitch', 'B-': 'Bitch',
    'a-': 'ass', 'A-': 'Ass',
    'd-mn': 'damn', 'D-mn': 'Damn',
    'd-ck': 'dick', 'D-ck': 'Dick',
    'h-ll': 'hell', 'H-ll': 'Hell',
    'n-': 'nigga', 'N-': 'Nigga',
}

def is_censored(text):
    if CENSORSHIP_PATTERN.search(text):
        return True
    # Also check for dash-censored words
    words = text.split()
    return any(DASH_CENSOR_PATTERN.match(w.strip('.,!?;:')) for w in words)


def decensor_with_whisper(anchor_lines, whisper_segments):
    """Replace censored words in anchor with Whisper-heard words."""
    whisper_words = []
    for seg in whisper_segments:
        if seg.words:
            for w in seg.words:
                if w.word.strip():
                    whisper_words.append(w.word.strip().lower())

    anchor_words_flat = []
    for line in anchor_lines:
        anchor_words_flat.extend(line.split())

    total_anchor = len(anchor_words_flat)
    total_whisper = len(whisper_words)
    if total_whisper == 0:
        return anchor_lines

    decensored_count = 0
    result_lines = []
    word_idx = 0

    for line in anchor_lines:
        words = line.split()
        new_words = []
        for w in words:
            # Strip trailing punctuation for matching but preserve it
            stripped = w.rstrip('.,!?;:')
            trailing = w[len(stripped):]

            if CENSORSHIP_PATTERN.search(w):
                wi = int(word_idx * total_whisper / total_anchor) if total_anchor > 0 else 0
                wi = min(wi, total_whisper - 1)
                whisper_word = whisper_words[wi]
                if w and w[0].isupper() and whisper_word:
                    whisper_word = whisper_word[0].upper() + whisper_word[1:]
                new_words.append(whisper_word)
                decensored_count += 1
            elif stripped in DASH_CENSOR_MAP:
                replacement = DASH_CENSOR_MAP[stripped]
                new_words.append(replacement + trailing)
                decensored_count += 1
            elif DASH_CENSOR_PATTERN.match(stripped):
                # Unknown dash-censored word — try Whisper
                wi = int(word_idx * total_whisper / total_anchor) if total_anchor > 0 else 0
                wi = min(wi, total_whisper - 1)
                whisper_word = whisper_words[wi]
                if w and w[0].isupper() and whisper_word:
                    whisper_word = whisper_word[0].upper() + whisper_word[1:]
                new_words.append(whisper_word + trailing)
                decensored_count += 1
            else:
                new_words.append(w)
            word_idx += 1
        result_lines.append(' '.join(new_words))

    if decensored_count > 0:
        print(f"[aligner] 🔓 De-censored {decensored_count} words using Whisper audio", file=sys.stderr)
    return result_lines


def _decensor_with_genius(local_lines, genius_text):
    """Replace censored words in local lyrics with explicit words from Genius.
    Uses line-level fuzzy matching to find corresponding Genius line, then word-level replacement."""
    from rapidfuzz import fuzz

    genius_lines = [l.strip() for l in genius_text.strip().split('\n') if l.strip()]

    def norm(s):
        return re.sub(r'[^\w]', '', s.lower(), flags=re.UNICODE).replace('_', '') if s else ""

    decensored_count = 0
    result = []
    for local_line in local_lines:
        if not is_censored(local_line):
            result.append(local_line)
            continue

        # Find best matching Genius line
        local_norm = norm(local_line)
        best_genius = None
        best_score = 0
        for gl in genius_lines:
            score = fuzz.ratio(local_norm, norm(gl))
            if score > best_score:
                best_score = score
                best_genius = gl

        if best_genius and best_score >= 60:
            # Replace censored words with Genius equivalents
            local_words = local_line.split()
            genius_words = best_genius.split()
            new_words = []
            for i, lw in enumerate(local_words):
                stripped = lw.rstrip('.,!?;:')
                trailing = lw[len(stripped):]
                if CENSORSHIP_PATTERN.search(lw) or DASH_CENSOR_PATTERN.match(stripped):
                    # Find matching word from Genius (by position ratio)
                    gi = int(i * len(genius_words) / max(len(local_words), 1))
                    gi = min(gi, len(genius_words) - 1)
                    # Try exact position and neighbors
                    replacement = None
                    for offset in [0, -1, 1, -2, 2]:
                        check_gi = gi + offset
                        if 0 <= check_gi < len(genius_words):
                            gw = genius_words[check_gi].rstrip('.,!?;:')
                            # Verify it's the same word (first letter match or skeleton match)
                            if norm(stripped)[:1] == norm(gw)[:1] or fuzz.ratio(norm(stripped.replace('*', '')), norm(gw)) >= 50:
                                replacement = gw + trailing
                                break
                    if replacement:
                        new_words.append(replacement)
                        decensored_count += 1
                    elif stripped in DASH_CENSOR_MAP:
                        new_words.append(DASH_CENSOR_MAP[stripped] + trailing)
                        decensored_count += 1
                    else:
                        new_words.append(lw)
                else:
                    new_words.append(lw)
            result.append(' '.join(new_words))
        else:
            result.append(local_line)

    if decensored_count > 0:
        print(f"[aligner] 🔓 De-censored {decensored_count} words using Genius explicit text", file=sys.stderr)
    return result


# ─── Chorus Detection (for better initial_prompt) ─────────────────────────────

def extract_chorus(anchor_text):
    """Find the most repeated section (chorus) for use as initial_prompt."""
    lines = [l.strip() for l in anchor_text.strip().split('\n') if l.strip()]
    if len(lines) < 4:
        return anchor_text[:500]

    window_size = 4
    line_groups = {}
    for i in range(len(lines) - window_size + 1):
        key = '\n'.join(lines[i:i+window_size]).lower()
        line_groups.setdefault(key, []).append(i)

    best_group = None
    best_count = 0
    for key, positions in line_groups.items():
        if len(positions) > best_count:
            best_count = len(positions)
            best_group = key

    if best_group and best_count >= 2:
        return best_group[:500]

    from collections import Counter
    line_counts = Counter(l.lower() for l in lines)
    repeated = [l for l, c in line_counts.most_common(5) if c >= 2]
    if repeated:
        chorus_lines = [l for l in lines if l.lower() in repeated][:8]
        return '\n'.join(chorus_lines)[:500]

    return anchor_text[:500]


# ─── Multi-Source Anchor ──────────────────────────────────────────────────────

def get_anchor_text(artist, title):
    """
    Fetch plain text lyrics. Priority:
      1. Genius (explicit, uncensored, full text)
      2. syncedlyrics (strip LRC timestamps → plain text)

    Validation: reject anchors with < 10 lines or < 100 chars.
    """
    if not artist and not title:
        return None

    clean_artist = sanitize_name(artist)
    clean_title = sanitize_name(title)

    print(f"[aligner] 🔍 Searching lyrics for artist=\"{clean_artist}\" title=\"{clean_title}\"", file=sys.stderr)

    # Extract featuring artist from title
    feat_match = re.search(r'[\[\(]feat\.?\s*([^\]\)]+)[\]\)]', title or '', re.IGNORECASE)
    feat_artist = feat_match.group(1).strip() if feat_match else ""

    def _try_genius(artist_q, title_q):
        """Try Genius via lyricsgenius — best for explicit/full lyrics."""
        try:
            import lyricsgenius
            token = os.environ.get("GENIUS_ACCESS_TOKEN", "")
            if not token:
                print(f"[aligner] ⚠️ No GENIUS_ACCESS_TOKEN in .env, skipping Genius", file=sys.stderr)
                return None
            genius = lyricsgenius.Genius(
                token, verbose=False, remove_section_headers=True,
                skip_non_songs=True, excluded_terms=["(Remix)", "(Live)"]
            )
            song = genius.search_song(title_q, artist_q)
            if not song or not song.lyrics:
                return None
            # Reject translations
            if song.artist and re.search(r'translat|перевод', song.artist, re.IGNORECASE):
                print(f"[aligner] ⚠️ Genius returned translation ({song.artist}), skipping", file=sys.stderr)
                return None
            text = song.lyrics
            # Clean Genius formatting
            text = re.sub(r'^\d+\s*Contributor[s]?.*?Lyrics\s*\n?', '', text, count=1, flags=re.IGNORECASE | re.DOTALL)
            text = re.sub(r'^.*Lyrics\s*\n', '', text, count=1)
            text = re.sub(r'\d*Embed\s*$', '', text, flags=re.MULTILINE)
            text = re.sub(r'You might also like', '', text)
            # Remove section markers [Verse 1], [Chorus], [Intro: Pouya], etc.
            text = re.sub(r'\[.*?\]', '', text)
            text = re.sub(r'^"[^"]*"\s+is\s+about\s+.*$', '', text, flags=re.MULTILINE | re.IGNORECASE)
            text = re.sub(r'.*Read More\s*$', '', text, flags=re.MULTILINE)
            lines_raw = text.strip().split('\n')
            lines_filtered = []
            for i, l in enumerate(lines_raw):
                stripped = l.strip()
                if len(stripped) > 200:
                    continue
                if re.search(r'\bRead More\b', stripped, re.IGNORECASE):
                    continue
                if re.match(r'^"[^"]*"\s+(is|was|are|exemplifies|represents|explores|describes|deals|captures|portrays|illustrates|showcases|demonstrates|reflects|chronicles|details|features|follows|tells|shows)\s+', stripped, re.IGNORECASE):
                    continue
                # Skip Genius song descriptions (prose sentences at the top, typically >80 chars with commas)
                if i < 3 and len(stripped) > 80 and ',' in stripped and not lines_filtered:
                    continue
                # Skip lines with em-dash prose (e.g., "circles—Melanie sings about...")
                if '—' in stripped and len(stripped) > 60 and re.search(r'—[A-Z][a-z]+\s+(sings?|raps?|talks?|says?|describes?|explores?)', stripped):
                    continue
                # Skip lines that look like descriptions: "After..., X decides to..."
                if re.search(r'\b(decides?\s+to|is\s+about|deals?\s+with|explores?|describes?|told\s+\w+\s+that)\b', stripped, re.IGNORECASE) and len(stripped) > 60:
                    continue
                # Skip Genius annotations: lines mentioning artist + interview/media sources
                if re.search(r'\b(told|said|explained|stated|revealed|mentioned)\b.*\b(that|how|why)\b', stripped, re.IGNORECASE) and len(stripped) > 50:
                    continue
                # Skip lines that reference the song title in quotes as a subject ("Song" is...)
                if re.search(r'"[^"]+"\s+(is|was|are|has|represents|exemplifies|explores|describes|captures|portrays|illustrates)', stripped, re.IGNORECASE):
                    continue
                lines_filtered.append(stripped)
            lines = [l for l in lines_filtered if l]
            if len(lines) < 5:
                return None
            return lines
        except ImportError:
            print(f"[aligner] ⚠️ lyricsgenius not installed, skipping Genius", file=sys.stderr)
            return None
        except Exception as e:
            print(f"[aligner] Genius error: {e}", file=sys.stderr)
            return None

    def _try_syncedlyrics(term):
        """Search via syncedlyrics — strip LRC timestamps to get plain text."""
        try:
            import syncedlyrics
            result = syncedlyrics.search(term)
            if not result:
                return None
            lines = []
            for line in result.strip().split('\n'):
                cleaned = re.sub(r'\[\d{1,2}:\d{2}\.\d{2,3}\]\s*', '', line).strip()
                if cleaned and not re.match(r'^\[.*\]$', cleaned):
                    lines.append(cleaned)
            # Validation: reject short/incomplete results
            if len(lines) < 10:
                print(f"[aligner] ⚠️ Bad anchor for \"{term}\": only {len(lines)} lines (need ≥10), skipping", file=sys.stderr)
                return None
            total_chars = sum(len(l) for l in lines)
            if total_chars < 100:
                print(f"[aligner] ⚠️ Bad anchor for \"{term}\": only {total_chars} chars, skipping", file=sys.stderr)
                return None
            return lines
        except Exception as e:
            print(f"[aligner] syncedlyrics error: {e}", file=sys.stderr)
            return None

    # ── Priority 1: Genius (explicit, uncensored) ──
    if clean_artist and clean_title:
        print(f"[aligner] 🔍 Trying Genius first (explicit)...", file=sys.stderr)
        genius_lines = _try_genius(clean_artist, clean_title)
        if not genius_lines and feat_artist:
            genius_lines = _try_genius(clean_artist, f"{clean_title} {feat_artist}")
        if genius_lines and not is_censored('\n'.join(genius_lines)):
            print(f"[aligner] ✅ Genius anchor (explicit, {len(genius_lines)} lines)", file=sys.stderr)
            return '\n'.join(genius_lines)

    # ── Priority 2: LRCLIB (free, fast, good quality) ──
    if clean_artist and clean_title:
        try:
            import urllib.request, urllib.parse
            params = urllib.parse.urlencode({
                'artist_name': clean_artist,
                'track_name': clean_title,
            })
            url = f"https://lrclib.net/api/get?{params}"
            req = urllib.request.Request(url, headers={'User-Agent': 'Chromic/1.0'})
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                if data.get('plainLyrics'):
                    lines = [l.strip() for l in data['plainLyrics'].split('\n') if l.strip()]
                    if len(lines) >= 5:
                        plain = '\n'.join(lines)
                        if is_censored(plain):
                            print(f"[aligner] ⚠️ LRCLIB anchor is CENSORED — will de-censor with Whisper", file=sys.stderr)
                        else:
                            print(f"[aligner] ✅ LRCLIB anchor ({len(lines)} lines)", file=sys.stderr)
                        return plain
                elif data.get('syncedLyrics'):
                    # Strip LRC timestamps to get plain text
                    lines = []
                    for line in data['syncedLyrics'].strip().split('\n'):
                        cleaned = re.sub(r'\[\d{1,2}:\d{2}\.\d{2,3}\]\s*', '', line).strip()
                        if cleaned:
                            lines.append(cleaned)
                    if len(lines) >= 5:
                        print(f"[aligner] ✅ LRCLIB synced→plain anchor ({len(lines)} lines)", file=sys.stderr)
                        return '\n'.join(lines)
        except Exception as e:
            print(f"[aligner] LRCLIB error: {e}", file=sys.stderr)

    # ── Priority 3: syncedlyrics (strip LRC → plain text) ──
    search_attempts = []
    if clean_artist and clean_title:
        search_attempts.append(f"{clean_artist} - {clean_title}")
    if clean_title:
        search_attempts.append(clean_title)
    # Collab support: try with & artist
    if artist and ('&' in artist or ',' in artist) and clean_title:
        search_attempts.append(f"{artist} - {clean_title}")

    for term in search_attempts:
        lines = _try_syncedlyrics(term)
        if lines:
            plain = '\n'.join(lines)
            censored = is_censored(plain)
            if censored:
                print(f"[aligner] ⚠️ Anchor is CENSORED ({len(lines)} lines) — will de-censor with Whisper", file=sys.stderr)
            else:
                print(f"[aligner] ✅ Anchor text found ({len(lines)} lines, {sum(len(l) for l in lines)} chars) for \"{term}\"", file=sys.stderr)
            return plain

    print(f"[aligner] ⚠️ No anchor text found (tried Genius + {len(search_attempts)} syncedlyrics queries)", file=sys.stderr)
    return None


def _parse_lrc_content(lrc_content):
    """Parse LRC formatted text into list of (start_seconds, text) tuples."""
    lrc_lines = []
    for line in lrc_content.strip().split('\n'):
        m = re.match(r'\[(\d{1,2}):(\d{2})\.(\d{2,3})\]\s*(.*)', line)
        if m:
            minutes = int(m.group(1))
            seconds = int(m.group(2))
            frac = m.group(3)
            frac = int(frac) / (100.0 if len(frac) == 2 else 1000.0)
            time_sec = minutes * 60 + seconds + frac
            text = m.group(4).strip()
            lrc_lines.append((time_sec, text))
    return lrc_lines


def _read_embedded_lyrics(audio_path):
    """Read embedded LYRICS/UNSYNCEDLYRICS tag from audio file metadata via ffprobe."""
    try:
        import subprocess as _sp
        r = _sp.run(
            ['ffprobe', '-v', 'quiet', '-print_format', 'json', '-show_format', audio_path],
            capture_output=True, text=True, timeout=10
        )
        if r.returncode != 0:
            return None
        data = json.loads(r.stdout)
        tags = data.get('format', {}).get('tags', {})
        # Try LYRICS tag (may contain synced LRC)
        lyrics_text = tags.get('LYRICS', '') or tags.get('lyrics', '') or tags.get('UNSYNCEDLYRICS', '') or tags.get('unsyncedlyrics', '')
        if not lyrics_text:
            return None
        # Check if it contains LRC timestamps
        if re.search(r'\[\d{1,2}:\d{2}\.\d{2,3}\]', lyrics_text):
            lrc_lines = _parse_lrc_content(lyrics_text)
            if len(lrc_lines) >= 5:
                return lrc_lines
        return None
    except Exception as e:
        print(f"[aligner] ⚠️ Failed to read embedded lyrics: {e}", file=sys.stderr)
        return None


def get_lrc_timings(artist, title, audio_path=None):
    """
    Fetch LRC (synced lyrics) and return line-level timestamps.
    Priority: local .lrc sidecar > embedded LYRICS tag > LRCLIB > syncedlyrics.
    Returns list of (start_seconds, text) tuples, or None if unavailable.
    """
    # Priority 1: Local .lrc sidecar file next to audio
    if audio_path:
        lrc_path = re.sub(r'\.[^.]+$', '.lrc', audio_path)
        if os.path.exists(lrc_path):
            try:
                lrc_content = open(lrc_path, 'r', encoding='utf-8').read()
                lrc_lines = _parse_lrc_content(lrc_content)
                if len(lrc_lines) >= 5:
                    print(f"[aligner] ✅ LOCAL .lrc sidecar ({len(lrc_lines)} lines): {lrc_path}", file=sys.stderr)
                    return lrc_lines
            except Exception as e:
                print(f"[aligner] ⚠️ Failed to read local .lrc: {e}", file=sys.stderr)

    # Priority 1.5: Embedded LYRICS tag in audio file metadata
    if audio_path:
        embedded = _read_embedded_lyrics(audio_path)
        if embedded:
            print(f"[aligner] ✅ EMBEDDED synced lyrics from metadata ({len(embedded)} lines)", file=sys.stderr)
            return embedded

    # Priority 2: LRCLIB synced lyrics
    clean_artist = sanitize_name(artist)
    clean_title = sanitize_name(title)
    if clean_artist and clean_title:
        try:
            import urllib.request, urllib.parse
            params = urllib.parse.urlencode({
                'artist_name': clean_artist,
                'track_name': clean_title,
            })
            url = f"https://lrclib.net/api/get?{params}"
            req = urllib.request.Request(url, headers={'User-Agent': 'Chromic/1.0'})
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                if data.get('syncedLyrics'):
                    lrc_lines = []
                    for line in data['syncedLyrics'].strip().split('\n'):
                        m = re.match(r'\[(\d{1,2}):(\d{2})\.(\d{2,3})\]\s*(.*)', line)
                        if m:
                            minutes = int(m.group(1))
                            seconds = int(m.group(2))
                            frac = m.group(3)
                            frac = int(frac) / (100.0 if len(frac) == 2 else 1000.0)
                            time_sec = minutes * 60 + seconds + frac
                            text = m.group(4).strip()
                            lrc_lines.append((time_sec, text))
                    if len(lrc_lines) >= 10:
                        print(f"[aligner] ✅ LRCLIB synced timings ({len(lrc_lines)} lines)", file=sys.stderr)
                        return lrc_lines
        except Exception as e:
            print(f"[aligner] LRCLIB timings error: {e}", file=sys.stderr)

    # Priority 3: Online syncedlyrics

    search_attempts = []
    if clean_artist and clean_title:
        search_attempts.append(f"{clean_artist} - {clean_title}")
    if clean_title:
        search_attempts.append(clean_title)

    for term in search_attempts:
        try:
            import syncedlyrics
            result = syncedlyrics.search(term)
            if not result:
                continue

            lrc_lines = []
            for line in result.strip().split('\n'):
                # Parse [mm:ss.xx] timestamp
                m = re.match(r'\[(\d{1,2}):(\d{2})\.(\d{2,3})\]\s*(.*)', line)
                if m:
                    minutes = int(m.group(1))
                    seconds = int(m.group(2))
                    frac = m.group(3)
                    if len(frac) == 2:
                        frac = int(frac) / 100.0
                    else:
                        frac = int(frac) / 1000.0
                    time_sec = minutes * 60 + seconds + frac
                    text = m.group(4).strip()
                    lrc_lines.append((time_sec, text))

            if len(lrc_lines) >= 10:
                print(f"[aligner] ✅ LRC timings found ({len(lrc_lines)} lines) for \"{term}\"", file=sys.stderr)
                return lrc_lines
        except Exception as e:
            print(f"[aligner] LRC fetch error: {e}", file=sys.stderr)

    return None


# ─── Whisper Transcription ────────────────────────────────────────────────────

def _run_transformers_whisper_with_adapter(audio_path, model_name, adapter_repo, anchor_text=None, language=None):
    """Run Whisper via transformers + PEFT LoRA adapter. Slower than faster-whisper but supports fine-tuned models."""
    import torch
    from transformers import WhisperProcessor, WhisperForConditionalGeneration, pipeline
    from peft import PeftModel

    base_model = os.environ.get("HF_BASE_MODEL", f"openai/whisper-{model_name}")
    hf_token = os.environ.get("HF_TOKEN", None)

    # Device selection — decide BEFORE loading to set dtype correctly
    if torch.cuda.is_available():
        try:
            torch.cuda.get_device_name(0)
            device = "cuda"
        except Exception:
            device = "cpu"
    elif hasattr(torch.backends, 'mps') and torch.backends.mps.is_available():
        device = "mps"
    else:
        device = "cpu"

    # Use float16 on GPU to halve memory (~3GB instead of ~6GB for large models)
    use_half = device in ("cuda", "mps")
    dtype = torch.float16 if use_half else torch.float32

    # Check available memory
    try:
        import resource
        import subprocess as _sp
        if sys.platform == 'darwin':
            _pf = int(_sp.check_output(['sysctl', '-n', 'vm.page_free_count'], text=True).strip())
            _ps = int(_sp.check_output(['sysctl', '-n', 'hw.pagesize'], text=True).strip())
            avail_gb = (_pf * _ps) / (1024 ** 3)
        else:
            avail_gb = os.sysconf('SC_AVPHYS_PAGES') * os.sysconf('SC_PAGE_SIZE') / (1024 ** 3)
    except Exception:
        avail_gb = 8.0
    print(f"[aligner] Available RAM ~{avail_gb:.1f} GB | dtype={dtype} | device={device}", file=sys.stderr)

    if avail_gb < 4.0 and "large" in base_model:
        print(f"[aligner] ⚠️ Low memory! Large model may cause freeze. Consider whisper-medium.", file=sys.stderr)

    print(f"[aligner] Loading base model '{base_model}' ({dtype})...", file=sys.stderr)
    processor = WhisperProcessor.from_pretrained(base_model, token=hf_token)
    model = WhisperForConditionalGeneration.from_pretrained(
        base_model, token=hf_token, torch_dtype=dtype, low_cpu_mem_usage=True
    )

    print(f"[aligner] Loading LoRA adapter from '{adapter_repo}'...", file=sys.stderr)
    model = PeftModel.from_pretrained(model, adapter_repo, token=hf_token)
    model = model.merge_and_unload()

    model = model.to(device)
    print(f"[aligner] Model + adapter loaded on {device} ({dtype})", file=sys.stderr)

    # Free staging memory
    import gc
    gc.collect()
    if device == "mps":
        torch.mps.empty_cache()

    # Use transformers pipeline for word-level timestamps
    pipe = pipeline(
        "automatic-speech-recognition",
        model=model,
        tokenizer=processor.tokenizer,
        feature_extractor=processor.feature_extractor,
        device=device,
        torch_dtype=dtype,
        return_timestamps="word",
    )

    generate_kwargs = {}
    if language:
        generate_kwargs["language"] = language
    if anchor_text:
        prompt_ids = processor.get_prompt_ids(anchor_text[:200], return_tensors="pt")
        # Ensure prompt_ids are on the same device as the model
        if hasattr(prompt_ids, 'to'):
            prompt_ids = prompt_ids.to(device)
        generate_kwargs["prompt_ids"] = prompt_ids

    print(f"[aligner] Transcribing with LoRA adapter (this may take 1-3 minutes)...", file=sys.stderr)
    # Emit heartbeat so the watchdog doesn't kill us during long inference
    import threading
    _heartbeat_stop = threading.Event()
    def _heartbeat():
        while not _heartbeat_stop.is_set():
            print("STATUS:ADAPTER_TRANSCRIBING", flush=True)
            _heartbeat_stop.wait(10)
    _hb_thread = threading.Thread(target=_heartbeat, daemon=True)
    _hb_thread.start()
    try:
        result = pipe(audio_path, generate_kwargs=generate_kwargs, return_timestamps="word", chunk_length_s=30, batch_size=1)
    finally:
        _heartbeat_stop.set()
        # Immediately free GPU memory after inference
        del pipe
        del model
        import gc
        gc.collect()
        if device == "mps":
            torch.mps.empty_cache()
        elif device == "cuda":
            torch.cuda.empty_cache()

    # Convert pipeline output to segment-like objects
    segments = []
    current_words = []
    for chunk in result.get("chunks", []):
        word_text = chunk.get("text", "").strip()
        ts = chunk.get("timestamp", (0, 0))
        if not word_text or not ts:
            continue
        start, end = ts
        if end is None:
            end = start + 0.5
        current_words.append(_WordObj(word_text, start, end))
        # Split into segments at sentence boundaries (period, question mark, etc.)
        if word_text.endswith(('.', '?', '!', '…')) and len(current_words) >= 3:
            segments.append(_SegObj(list(current_words), 0))
            current_words = []

    if current_words:
        segments.append(_SegObj(list(current_words), 0))

    total_words = sum(len(s.words) for s in segments)
    print(f"[aligner] ✅ Adapter inference: {len(segments)} segments, {total_words} words", file=sys.stderr)
    return segments


def run_whisper(audio_path, model_name, anchor_text=None, language=None, engine=None):
    """Run whisper with word timestamps. Auto mode prefers MLX, then faster-whisper."""
    print("STATUS:CHECKING_MODELS", flush=True)

    try:
        result = _run_whisper_inner(audio_path, model_name, anchor_text, language, engine)
        print("STATUS:READY", flush=True)
        return result
    except Exception as e:
        print(f"ERROR:AI_ENGINE_FAILED:{e}", flush=True)
        raise


def _run_whisper_inner(audio_path, model_name, anchor_text=None, language=None, engine=None):
    """Inner whisper dispatcher — separated for STATUS protocol wrapping."""

    # Explicit engine override from caller/config.
    if engine == "whisperx":
        print(f"[aligner] 🚀 ENSEMBLE MODE: Whisper {model_name} + Wav2Vec2 Alignment", file=sys.stderr)
        return _run_whisperx(audio_path, model_name, language)

    if engine == "mlx":
        print(f"[aligner] ⚙️ Engine forced: mlx", file=sys.stderr)
        try:
            return _run_mlx_whisper(audio_path, model_name, anchor_text, language)
        except Exception as e:
            print(f"[aligner] ⚠️ mlx-whisper failed ({e}), falling back to openai-whisper", file=sys.stderr)
            return _run_openai_whisper(audio_path, model_name, anchor_text, language)

    if engine == "faster":
        print(f"[aligner] ⚙️ Engine forced: faster-whisper", file=sys.stderr)
        try:
            return _run_faster_whisper(audio_path, model_name, anchor_text, language)
        except Exception as e:
            print(f"[aligner] ⚠️ faster-whisper failed ({e}), falling back to openai-whisper", file=sys.stderr)
            return _run_openai_whisper(audio_path, model_name, anchor_text, language)

    if engine == "openai":
        print(f"[aligner] ⚙️ Engine forced: openai-whisper", file=sys.stderr)
        return _run_openai_whisper(audio_path, model_name, anchor_text, language)

    # Auto mode: Try MLX backend first on Apple-friendly model sizes.
    if model_name in ("large-v3-turbo", "medium", "small", "base", "tiny"):
        try:
            import mlx_whisper  # noqa: F401
            print(f"[aligner] Using mlx-whisper (Apple Silicon native)", file=sys.stderr)
            return _run_mlx_whisper(audio_path, model_name, anchor_text, language)
        except ImportError:
            print(f"[aligner] ⚠️ mlx-whisper not installed, falling back to faster-whisper", file=sys.stderr)
        except Exception as e:
            print(f"[aligner] ⚠️ mlx-whisper failed ({e}), falling back to faster-whisper", file=sys.stderr)

    try:
        return _run_faster_whisper(audio_path, model_name, anchor_text, language)
    except Exception as e:
        print(f"[aligner] ⚠️ faster-whisper failed ({e}), falling back to openai-whisper", file=sys.stderr)
        return _run_openai_whisper(audio_path, model_name, anchor_text, language)


def _run_whisperx(audio_path, model_name, language=None):
    """WhisperX ensemble: Whisper transcription + Wav2Vec2 forced alignment."""
    import whisperx
    import torch

    # Fix for PyTorch 2.8+ safe globals — force weights_only=False
    try:
        _original_torch_load = torch.load
        def _patched_torch_load(*args, **kwargs):
            kwargs['weights_only'] = False
            return _original_torch_load(*args, **kwargs)
        torch.load = _patched_torch_load
    except Exception:
        pass

    device = "cpu"
    compute_type = "int8"

    # Suppress whisperx stdout output that corrupts our JSON
    import contextlib, io
    _devnull = open(os.devnull, 'w')

    print(f"[aligner] Loading Whisper model '{model_name}'...", file=sys.stderr)
    with contextlib.redirect_stdout(_devnull):
        model = whisperx.load_model(model_name, device, compute_type=compute_type)
        audio = whisperx.load_audio(audio_path)

    # Step 1: Transcribe
    with contextlib.redirect_stdout(_devnull):
        result = model.transcribe(audio, batch_size=16)
    detected_lang = result.get("language", language or "en")
    print(f"[aligner] Detected language: {detected_lang}", file=sys.stderr)

    # Step 2: Forced alignment with Wav2Vec2
    print(f"[aligner] Running Wav2Vec2 phoneme alignment...", file=sys.stderr)
    with contextlib.redirect_stdout(_devnull):
        model_a, metadata = whisperx.load_align_model(language_code=detected_lang, device=device)
        aligned = whisperx.align(result["segments"], model_a, metadata, audio, device, return_char_alignments=False)

    # Convert to internal format
    segments = []
    for seg in aligned["segments"]:
        words = []
        for w in seg.get("words", []):
            if "start" in w and "end" in w and w.get("word", "").strip():
                words.append(_WordObj(w["word"].strip(), w["start"], w["end"]))
        if words:
            segments.append(_SegObj(words, seg.get("no_speech_prob", 0)))

    total_words = sum(len(s.words) for s in segments)
    print(f"[aligner] ✅ Ensemble finished: {len(segments)} segments, {total_words} high-precision words", file=sys.stderr)
    return segments


def _ensure_ffmpeg_in_path():
    """Bootstrap ffmpeg from imageio-ffmpeg if not already on PATH."""
    import shutil
    if shutil.which("ffmpeg"):
        return
    try:
        import imageio_ffmpeg
        ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
        ffmpeg_dir = os.path.dirname(ffmpeg_exe)
        os.environ["PATH"] = ffmpeg_dir + os.pathsep + os.environ.get("PATH", "")
        print(f"[aligner] ffmpeg bootstrapped via imageio-ffmpeg: {ffmpeg_exe}", file=sys.stderr)
    except Exception as e:
        print(f"[aligner] ⚠️ imageio-ffmpeg bootstrap failed: {e}", file=sys.stderr)


def _check_model_cached(model_name, engine="faster"):
    """Check whether a whisper model is already downloaded/cached locally."""
    import pathlib
    home = pathlib.Path.home()

    if engine == "mlx":
        # MLX models are cached by huggingface_hub
        mlx_models = {
            "tiny": "mlx-community/whisper-tiny-mlx",
            "base": "mlx-community/whisper-base-mlx",
            "small": "mlx-community/whisper-small-mlx",
            "medium": "mlx-community/whisper-medium-mlx",
            "large": "mlx-community/whisper-large-v3-mlx",
            "large-v3": "mlx-community/whisper-large-v3-mlx",
            "large-v3-turbo": "mlx-community/whisper-large-v3-turbo",
        }
        repo = mlx_models.get(model_name, f"mlx-community/whisper-{model_name}-mlx")
        # HuggingFace cache dirs
        hf_cache = home / ".cache" / "huggingface" / "hub"
        repo_dir_name = "models--" + repo.replace("/", "--")
        if (hf_cache / repo_dir_name).exists():
            return True
        # Also check XDG_CACHE_HOME
        xdg = os.environ.get("HF_HOME") or os.environ.get("XDG_CACHE_HOME", "")
        if xdg:
            alt = pathlib.Path(xdg) / "huggingface" / "hub" / repo_dir_name
            if alt.exists():
                return True
        return False

    if engine == "faster":
        # faster-whisper uses ctranslate2 model cache
        cache_dir = home / ".cache" / "huggingface" / "hub"
        repo_dir_name = "models--Systran--faster-whisper-" + model_name
        if (cache_dir / repo_dir_name).exists():
            return True
        # Also check legacy ctranslate2 cache
        ct2_cache = home / ".cache" / "faster_whisper"
        if (ct2_cache / model_name).exists():
            return True
        return False

    if engine == "openai":
        # openai-whisper caches in ~/.cache/whisper/
        oai_model = model_name
        if model_name == "large-v3-turbo":
            oai_model = "turbo"
        cache_dir = home / ".cache" / "whisper"
        if cache_dir.exists():
            for f in cache_dir.iterdir():
                if oai_model in f.name:
                    return True
        return False

    return False


def _run_mlx_whisper(audio_path, model_name, anchor_text=None, language=None):
    """MLX backend — fastest on Apple Silicon. Uses GPU unified memory natively."""
    _ensure_ffmpeg_in_path()
    import mlx_whisper

    # Map model names to HuggingFace MLX repos
    mlx_models = {
        "tiny": "mlx-community/whisper-tiny-mlx",
        "base": "mlx-community/whisper-base-mlx",
        "small": "mlx-community/whisper-small-mlx",
        "medium": "mlx-community/whisper-medium-mlx",
        "large": "mlx-community/whisper-large-v3-mlx",
        "large-v3": "mlx-community/whisper-large-v3-mlx",
        "large-v3-turbo": "mlx-community/whisper-large-v3-turbo",
    }
    repo = mlx_models.get(model_name, f"mlx-community/whisper-{model_name}-mlx")
    print(f"[aligner] Loading MLX model '{repo}'...", file=sys.stderr)
    if not _check_model_cached(model_name, engine="mlx"):
        print("PROGRESS:DOWNLOADING_MODEL", flush=True)
        print(f"[aligner] MLX model '{repo}' not in cache — downloading...", file=sys.stderr)

    kwargs = {
        "word_timestamps": True,
        "condition_on_previous_text": False,
        "no_speech_threshold": 0.4,
        "compression_ratio_threshold": 2.4,
    }
    if language:
        kwargs["language"] = language
        print(f"[aligner] Forced language: {language}", file=sys.stderr)
    if anchor_text:
        kwargs["initial_prompt"] = anchor_text[:200]
        print(f"[aligner] Guided mode (prompt: first 200 chars)", file=sys.stderr)
    else:
        print(f"[aligner] Blind mode (no anchor text)", file=sys.stderr)

    print("STATUS:MODEL_LOADED", flush=True)
    result = mlx_whisper.transcribe(audio_path, path_or_hf_repo=repo, **kwargs)
    print(f"[aligner] Detected language: {result.get('language', '?')}", file=sys.stderr)

    # Convert mlx_whisper output to segment-like objects for compatibility
    segments = []
    for seg in result.get("segments", []):
        words = []
        for w in seg.get("words", []):
            words.append(_WordObj(w["word"], w["start"], w["end"]))
        segments.append(_SegObj(words, seg.get("no_speech_prob", 0)))

    total_words = sum(len(s.words) for s in segments)
    print(f"[aligner] MLX Whisper returned {len(segments)} segments, {total_words} words", file=sys.stderr)
    return segments


class _WordObj:
    def __init__(self, word, start, end):
        self.word = word
        self.start = start
        self.end = end

class _SegObj:
    def __init__(self, words, no_speech_prob=0):
        self.words = words
        self.no_speech_prob = no_speech_prob

    @property
    def text(self):
        return " ".join(w.word if hasattr(w, 'word') else w.get("word", "") for w in (self.words or []))

    @property
    def start(self):
        if self.words:
            w = self.words[0]
            return w.start if hasattr(w, 'start') else w.get("start", 0)
        return 0

    @property
    def end(self):
        if self.words:
            w = self.words[-1]
            return w.end if hasattr(w, 'end') else w.get("end", 0)
        return 0


def _run_faster_whisper(audio_path, model_name, anchor_text=None, language=None):
    """Faster-whisper backend (CTranslate2, CPU only — CUDA disabled to prevent cuDNN DLL crashes)."""
    # NOTE: CUDA DLL crash prevention is handled at module level (ctypes.CDLL monkey-patch).
    from faster_whisper import WhisperModel

    print(f"[aligner] Using faster-whisper (CTranslate2)", file=sys.stderr)
    base_kwargs = {
        "word_timestamps": True,
        "vad_filter": False,
        "condition_on_previous_text": True,
    }

    if not anchor_text:
        base_kwargs["vad_filter"] = True
        base_kwargs["no_speech_threshold"] = 0.6
        base_kwargs["log_prob_threshold"] = -1.0

    if anchor_text:
        prompt = extract_chorus(anchor_text)
        base_kwargs["initial_prompt"] = prompt
        print(f"[aligner] Guided mode (prompt: {len(prompt)} chars, chorus-based)", file=sys.stderr)
    else:
        print(f"[aligner] Blind mode (no anchor text)", file=sys.stderr)

    # Always use CPU + int8 for faster-whisper to avoid unrecoverable cuDNN DLL crashes on Windows.
    # Exit code 0xC0000135 (STATUS_DLL_NOT_FOUND) kills the process before Python can catch it.
    # CUDA acceleration requires manual cuDNN setup which most users won't have.
    print(f"[aligner] Using CPU (int8) for faster-whisper", file=sys.stderr)

    # Retry path for stability:
    # 1) int8 + requested language
    # 2) int8 + forced english (skips fragile detect_language path)
    attempts = [
        {"compute_type": "int8", "language": language},
        {"compute_type": "int8", "language": language or "en"},
    ]

    last_error = None
    for idx, attempt in enumerate(attempts, start=1):
        kwargs = dict(base_kwargs)
        attempt_lang = attempt["language"]
        if attempt_lang:
            kwargs["language"] = attempt_lang

        try:
            print(
                f"[aligner] Loading model '{model_name}' (compute_type={attempt['compute_type']}, attempt={idx}/{len(attempts)})...",
                file=sys.stderr,
            )
            if attempt_lang:
                print(f"[aligner] Forced language: {attempt_lang}", file=sys.stderr)

            # Signal download progress to frontend
            if not _check_model_cached(model_name, engine="faster"):
                print("STATUS:DOWNLOADING_MODELS_START", flush=True)
                print("PROGRESS:DOWNLOADING_MODEL", flush=True)
                print(f"[aligner] Model '{model_name}' not in cache — downloading (~500MB-1.5GB)...", file=sys.stderr)

            model = WhisperModel(model_name, device="cpu", compute_type=attempt["compute_type"])
            print("STATUS:MODEL_LOADED", flush=True)
            print("PROGRESS:MODEL_READY", flush=True)
            segments, info = model.transcribe(audio_path, **kwargs)
            print(f"[aligner] Detected language: {info.language} ({info.language_probability:.2f})", file=sys.stderr)

            result = list(segments)
            total_words = sum(len(s.words) for s in result if s.words)
            print(f"[aligner] Whisper returned {len(result)} segments, {total_words} words", file=sys.stderr)
            return result
        except Exception as exc:
            last_error = exc
            print(
                f"[aligner] ⚠️ faster-whisper attempt {idx} failed: {exc.__class__.__name__}: {exc}",
                file=sys.stderr,
            )

    raise RuntimeError(f"faster-whisper failed after {len(attempts)} attempts: {last_error}")


def _run_openai_whisper(audio_path, model_name, anchor_text=None, language=None):
    """OpenAI Whisper fallback (pure PyTorch, no CTranslate2 dependency)."""
    _ensure_ffmpeg_in_path()
    import shutil

    if not shutil.which("ffmpeg"):
        print("[aligner] ❌ ffmpeg not found in PATH. openai-whisper requires ffmpeg.", file=sys.stderr)
        print("[aligner] 💡 Install ffmpeg: https://ffmpeg.org/download.html", file=sys.stderr)
        print("[aligner] 💡 Windows: winget install ffmpeg  OR  choco install ffmpeg", file=sys.stderr)
        raise RuntimeError("ffmpeg not found — required by openai-whisper")

    import whisper
    import torch

    print(f"[aligner] Using openai-whisper (PyTorch)", file=sys.stderr)

    # Report device
    device = "cpu"
    if torch.cuda.is_available():
        try:
            # Verify CUDA actually works by attempting a trivial operation
            torch.zeros(1, device="cuda:0")
            gpu_name = torch.cuda.get_device_name(0)
            print(f"[aligner] 🖥️ GPU detected: {gpu_name} — using CUDA acceleration", file=sys.stderr)
            device = "cuda"
        except Exception as e:
            print(f"[aligner] ⚠️ CUDA reported available but failed: {e} — falling back to CPU", file=sys.stderr)
            # Completely disable CUDA to prevent whisper from trying to use it
            os.environ["CUDA_VISIBLE_DEVICES"] = ""
            device = "cpu"
    if device == "cpu":
        print(f"[aligner] ⚠️ No CUDA GPU — running on CPU (will be slower)", file=sys.stderr)

    # Map model names — openai-whisper uses "turbo" not "large-v3-turbo"
    oai_model = model_name
    if model_name == "large-v3-turbo":
        oai_model = "turbo"

    print(f"[aligner] Loading model '{oai_model}'... (first run downloads ~140MB for 'base')", file=sys.stderr)
    if not _check_model_cached(model_name, engine="openai"):
        print("STATUS:DOWNLOADING_MODELS_START", flush=True)
        print("PROGRESS:DOWNLOADING_MODEL", flush=True)
        print(f"[aligner] Model '{oai_model}' not in cache — downloading...", file=sys.stderr)
    model = whisper.load_model(oai_model, device=device)
    print("STATUS:MODEL_LOADED", flush=True)
    print("PROGRESS:MODEL_READY", flush=True)

    decode_opts = {}
    if language:
        decode_opts["language"] = language
    if anchor_text:
        prompt = extract_chorus(anchor_text)
        decode_opts["initial_prompt"] = prompt
        print(f"[aligner] Guided mode (prompt: {len(prompt)} chars)", file=sys.stderr)

    print(f"[aligner] Transcribing...", file=sys.stderr)
    try:
        result = model.transcribe(audio_path, word_timestamps=True, **decode_opts)
    except Exception as e:
        # On Windows, word_timestamps can fail with certain torch versions
        print(f"[aligner] ⚠️ Transcription with word_timestamps failed: {e}", file=sys.stderr)
        print(f"[aligner] Retrying without word_timestamps...", file=sys.stderr)
        result = model.transcribe(audio_path, word_timestamps=False, **decode_opts)
        # Return segments without word-level timing
        segments = []
        for seg in result.get("segments", []):
            text = seg.get("text", "").strip()
            if text:
                words = [_WordObj(text, seg["start"], seg["end"])]
                segments.append(_SegObj(words, seg.get("no_speech_prob", 0)))
        total_words = sum(len(s.words) for s in segments)
        print(f"[aligner] ✅ Whisper returned {len(segments)} segments (line-level only, no word timestamps)", file=sys.stderr)
        return segments

    segments = []
    for seg in result.get("segments", []):
        words = []
        for w in seg.get("words", []):
            words.append(_WordObj(w["word"].strip(), w["start"], w["end"]))
        if words:
            segments.append(_SegObj(words, seg.get("no_speech_prob", 0)))

    total_words = sum(len(s.words) for s in segments)
    print(f"[aligner] ✅ Whisper returned {len(segments)} segments, {total_words} words", file=sys.stderr)
    return segments


# ─── Overlap Sanitizer ────────────────────────────────────────────────────────

def sanitize_overlaps(lines):
    """Fix overlapping line/word timestamps. LRC line times are authoritative."""
    for i in range(1, len(lines)):
        prev = lines[i - 1]
        curr = lines[i]
        if prev.get("type") == "vocal_cue" or curr.get("type") == "vocal_cue":
            continue
        prev_words = prev.get("words", [])
        prev_end = prev_words[-1]["end"] if prev_words else prev.get("time", 0)
        curr_start = curr.get("time", 0)
        if curr_start < prev_end:
            # Instead of shifting current line forward, trim previous line's last word
            # This preserves LRC timing (ground truth) for the current line
            if prev_words:
                prev_words[-1]["end"] = round(curr_start - 0.01, 3)
                # If trimming made it negative duration, just set minimal
                if prev_words[-1]["end"] <= prev_words[-1]["start"]:
                    prev_words[-1]["end"] = round(prev_words[-1]["start"] + 0.1, 3)
                # Remove stretch flag if we trimmed significantly
                if prev_words[-1].get("stretch") and (prev_words[-1]["end"] - prev_words[-1]["start"]) < 0.5:
                    prev_words[-1].pop("stretch", None)

    for line in lines:
        if line.get("type") == "vocal_cue" or not line.get("words"):
            continue
        for j in range(1, len(line["words"])):
            prev_w = line["words"][j - 1]
            curr_w = line["words"][j]
            if curr_w["start"] < prev_w["end"]:
                curr_w["start"] = round(prev_w["end"] + 0.001, 3)
                if curr_w["end"] < curr_w["start"]:
                    curr_w["end"] = round(curr_w["start"] + 0.05, 3)
    return lines


# ─── CJK-aware word splitting / joining ────────────────────────────────────────

_CJK_RE = re.compile(
    r'([\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF00-\uFFEF\u2E80-\u2FFF]+)'
)

def _split_words_cjk(text):
    """Split text into words; for CJK runs, split into individual characters/small clusters.
    For Latin/Cyrillic text, split by whitespace as normal.
    Mixed lines (e.g. Japanese + English) are handled by splitting CJK portions into chars
    and keeping whitespace-separated Latin tokens intact.
    """
    text = text.strip()
    if not text:
        return []
    # Check if text contains any CJK characters
    if not _CJK_RE.search(text):
        return text.split()
    # Split into CJK and non-CJK segments
    tokens = []
    parts = _CJK_RE.split(text)
    for part in parts:
        if not part:
            continue
        if _CJK_RE.match(part):
            # Split CJK into individual characters (each char = 1 word for timing)
            # But keep punctuation attached to preceding char
            chars = list(part)
            i = 0
            while i < len(chars):
                ch = chars[i]
                # Attach following punctuation (、。！？) to current char
                cluster = ch
                while i + 1 < len(chars) and chars[i + 1] in '、。！？…・ー〜':
                    i += 1
                    cluster += chars[i]
                tokens.append(cluster)
                i += 1
        else:
            # Non-CJK: split by whitespace
            for w in part.split():
                if w:
                    tokens.append(w)
    return tokens


_CJK_CHAR_RE = re.compile(r'^[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF00-\uFFEF\u2E80-\u2FFF]')

def _join_words_cjk(words):
    """Join word tokens into display text, omitting spaces between consecutive CJK tokens."""
    if not words:
        return ''
    parts = []
    for i, w in enumerate(words):
        token = w["word"] if isinstance(w, dict) else w
        if i > 0:
            prev = words[i - 1]
            prev_token = prev["word"] if isinstance(prev, dict) else prev
            # Insert space only if neither the previous token ends with CJK nor current starts with CJK
            prev_is_cjk = bool(_CJK_CHAR_RE.search(prev_token[-1])) if prev_token else False
            cur_is_cjk = bool(_CJK_CHAR_RE.search(token[0])) if token else False
            if not (prev_is_cjk or cur_is_cjk):
                parts.append(' ')
        parts.append(token)
    return ''.join(parts)


# ─── Strict Text Mapping (Forced Alignment) ───────────────────────────────────

def map_anchor_to_timings(anchor_text, segments, audio_duration=None, lrc_timings=None):
    """
    STRICT forced alignment using rapidfuzz.
    Anchor = WORDS (law), Whisper = TIMINGS only.
    Unmatched words get character-length-proportional interpolation.
    """
    from rapidfuzz import fuzz

    whisper_words_raw = []
    for seg in segments:
        if hasattr(seg, 'no_speech_prob') and seg.no_speech_prob > 0.95:
            continue
        if seg.words:
            for w in seg.words:
                if w.word.strip():
                    whisper_words_raw.append({"start": w.start, "end": w.end, "text": w.word.strip()})

    # Merge hyphenated fragments: ['Ah', '-ah', '-ah,'] → ['Ah-ah-ah,']
    whisper_words = []
    for ww in whisper_words_raw:
        txt = ww["text"]
        # Split tokens that have glued words (e.g. '-buhAh' → '-buh', 'Ah')
        # Detect: lowercase followed by uppercase = word boundary
        parts = re.split(r'(?<=[a-z,])(?=[A-Z])', txt)
        if len(parts) > 1:
            # Distribute time evenly across parts
            duration = ww["end"] - ww["start"]
            part_dur = duration / len(parts)
            for pi, part in enumerate(parts):
                sub = {"start": ww["start"] + pi * part_dur, "end": ww["start"] + (pi + 1) * part_dur, "text": part}
                if sub["text"].startswith('-') and whisper_words:
                    whisper_words[-1]["text"] += sub["text"]
                    whisper_words[-1]["end"] = sub["end"]
                else:
                    whisper_words.append(sub)
        elif txt.startswith('-') and whisper_words:
            whisper_words[-1]["text"] += txt
            whisper_words[-1]["end"] = ww["end"]
        else:
            whisper_words.append(dict(ww))

    anchor_lines = [line.strip() for line in anchor_text.strip().split('\n') if line.strip()]
    anchor_words_flat = []
    word_to_line = []
    # Track which original anchor word each split CJK char belongs to
    # word_to_group[i] = (line_idx, group_idx_within_line) for merging back
    word_to_group = []
    for li, line in enumerate(anchor_lines):
        # Get original words (before CJK char splitting) to know grouping
        original_words = line.split() if not _CJK_RE.search(line) else None
        split_words = _split_words_cjk(line)
        if original_words is None:
            # CJK line: map each split char back to its original word
            original_words = line.split()  # whitespace-split gives Genius groupings
            # For each original word, split it and track group membership
            group_idx = 0
            for orig_word in original_words:
                orig_chars = _split_words_cjk(orig_word)
                for _ in orig_chars:
                    word_to_group.append((li, group_idx))
                group_idx += 1
            for w in split_words:
                anchor_words_flat.append(w)
                word_to_line.append(li)
        else:
            group_idx = 0
            for w in split_words:
                anchor_words_flat.append(w)
                word_to_line.append(li)
                word_to_group.append((li, group_idx))
                group_idx += 1

    total_anchor = len(anchor_words_flat)
    total_whisper = len(whisper_words)

    print(f"[aligner] Mapping {total_anchor} anchor words → {total_whisper} Whisper timings (rapidfuzz)", file=sys.stderr)

    # Debug: show first words from each side
    if total_whisper > 0 and total_anchor > 0:
        sample_w = [whisper_words[i]["text"] for i in range(min(10, total_whisper))]
        sample_a = anchor_words_flat[:10]
        print(f"[aligner] 🔍 Whisper sample: {sample_w}", file=sys.stderr)
        print(f"[aligner] 🔍 Anchor sample: {sample_a}", file=sys.stderr)

    if total_whisper == 0:
        print(f"[aligner] ❌ No whisper words to map!", file=sys.stderr)
        return []

    def norm(s):
        """Normalize: lowercase, strip ALL non-alphanumeric (supports Cyrillic/CJK/etc)."""
        if not s:
            return ""
        return re.sub(r'[^\w]', '', s.lower(), flags=re.UNICODE).replace('_', '')

    def consonant_skeleton(s):
        """Strip vowels for phonetic comparison: 'buh'→'bh', 'ba'→'b'. Supports Cyrillic."""
        if not s:
            return ""
        s_lower = s.lower()
        # Strip non-alpha (supports Unicode)
        s_alpha = re.sub(r'[^\w]', '', s_lower, flags=re.UNICODE).replace('_', '')
        # Remove Latin vowels
        s_alpha = re.sub(r'[aeiouy]', '', s_alpha)
        # Remove Cyrillic vowels
        s_alpha = re.sub(r'[аеёиоуыэюя]', '', s_alpha)
        return s_alpha

    def is_vocalization(word):
        """Detect non-verbal words like 'Ah-ah-ah,' or 'buh-buh-buh-buh'."""
        clean = re.sub(r'[^\w-]', '', word.lower())
        if clean.count('-') >= 2:
            parts = clean.split('-')
            if all(len(p) <= 4 for p in parts):
                return True
        return False

    def match_score(anchor_n, whisper_n, anchor_raw):
        """Calculate match score with multiple strategies."""
        if not anchor_n or not whisper_n:
            return 0
        # Exact
        if anchor_n == whisper_n:
            return 100
        # Consonant skeleton: if skeletons are identical → treat as match
        a_skel = consonant_skeleton(anchor_n)
        w_skel = consonant_skeleton(whisper_n)
        if a_skel and w_skel and a_skel == w_skel:
            return 95  # skeleton match = trust it (buh==ba, ah==oh, etc.)
        # Fuzzy ratio
        score = fuzz.ratio(anchor_n, whisper_n)
        # For very short words (1-3 chars), trust first letter match
        if len(anchor_n) <= 3 and len(whisper_n) <= 3:
            if anchor_n[0] == whisper_n[0]:
                score = max(score, 75)
        # Consonant skeleton fuzz for longer words
        if a_skel and w_skel:
            skel_score = fuzz.ratio(a_skel, w_skel)
            score = max(score, skel_score)
        return score

    def match_concat_score(anchor_n, whisper_words_slice):
        """Try concatenating 2-6 whisper tokens and match against anchor."""
        best = 0
        best_k = 0
        concat = ""
        for k, ww in enumerate(whisper_words_slice[:6]):
            concat += ww["text"]
            if k == 0:
                continue
            cn = norm(concat)
            if not cn:
                continue
            # Exact concat match
            if cn == anchor_n:
                return 100, k
            score = fuzz.ratio(anchor_n, cn)
            # Also try consonant skeleton for concat
            cs = consonant_skeleton(cn)
            as_ = consonant_skeleton(anchor_n)
            if cs and as_:
                score = max(score, fuzz.ratio(as_, cs))
            if score > best:
                best = score
                best_k = k
        return best, best_k

    # ══════════════════════════════════════════════════════════════════════════
    # PASS 0: LRC-GUIDED DIRECT ASSIGNMENT
    # If we have LRC line timestamps, match Whisper words to lines by time window.
    # If the word count in a time window matches the anchor line → assign directly.
    # This bypasses all fuzzy matching for lines where Whisper got it right.
    # ══════════════════════════════════════════════════════════════════════════

    lrc_direct_sync = []  # [(ai, wi, wi)] pre-matched by LRC windows

    if lrc_timings:
        # Build LRC line windows: [(start_time, end_time, line_text)]
        non_empty_lrc = [(t, txt) for t, txt in lrc_timings if txt.strip()]
        lrc_windows = []
        for i, (t, txt) in enumerate(non_empty_lrc):
            end_t = non_empty_lrc[i + 1][0] if i + 1 < len(non_empty_lrc) else (audio_duration or t + 10)
            lrc_windows.append((t, end_t, txt))

        # For each anchor line, find which LRC window it belongs to (by text similarity)
        # Then grab all Whisper words in that time window
        line_start_ai = 0
        lrc_assigned_count = 0
        last_matched_lrc = -1  # enforce sequential ordering
        # Track how many words we've consumed from current LRC window (for multi-anchor-per-LRC)
        lrc_word_offset = 0
        prev_lrc_idx = -1
        for li, line_text in enumerate(anchor_lines):
            line_words = line_text.split()
            line_word_count = len(line_words)
            line_end_ai = line_start_ai + line_word_count

            # Find best matching LRC window SEQUENTIALLY (must be after last match)
            # BUT: allow re-matching the same LRC window if anchor is a subset (multi-line split)
            best_lrc_idx = -1
            best_lrc_score = 0
            line_norm = norm(line_text)
            if line_norm:
                # First: check if current anchor is a substring of the PREVIOUS LRC match
                # (handles Genius splitting one LRC line into multiple anchor lines)
                if prev_lrc_idx >= 0:
                    _, _, prev_lrc_txt = lrc_windows[prev_lrc_idx]
                    prev_lrc_norm = norm(prev_lrc_txt)
                    if prev_lrc_norm and line_norm in prev_lrc_norm:
                        best_lrc_idx = prev_lrc_idx
                        best_lrc_score = 95  # high confidence substring match

                # If no substring match, search forward
                if best_lrc_idx < 0:
                    search_start = last_matched_lrc + 1
                    search_end = min(len(lrc_windows), search_start + 8)
                    for lrc_i in range(search_start, search_end):
                        lrc_start_t, lrc_end_t, lrc_txt = lrc_windows[lrc_i]
                        lrc_norm = norm(lrc_txt)
                        if not lrc_norm:
                            continue
                        score = fuzz.ratio(line_norm, lrc_norm)
                        # Also check if anchor is a substring of LRC (partial match)
                        if line_norm in lrc_norm and score < 80:
                            score = max(score, 80)  # boost substring matches
                        if score > best_lrc_score:
                            best_lrc_score = score
                            best_lrc_idx = lrc_i

            if best_lrc_idx >= 0 and best_lrc_score >= 70:
                lrc_start, lrc_end, lrc_matched_txt = lrc_windows[best_lrc_idx]
                # Find all Whisper words within this time window
                words_in_window = []
                for wi_idx in range(total_whisper):
                    w = whisper_words[wi_idx]
                    if w["start"] >= lrc_start - 0.5 and w["start"] < lrc_end + 0.5:
                        words_in_window.append(wi_idx)

                # Reset word offset if this is a new LRC window
                if best_lrc_idx != prev_lrc_idx:
                    lrc_word_offset = 0

                # If word count matches (±2) → direct assignment!
                if abs(len(words_in_window) - line_word_count) <= 2 and words_in_window:
                    # Assign whisper words to anchor words in order
                    for k in range(min(line_word_count, len(words_in_window))):
                        ai_idx = line_start_ai + k
                        wi_idx = words_in_window[k]
                        lrc_direct_sync.append((ai_idx, wi_idx, wi_idx))
                    lrc_assigned_count += line_word_count
                elif len(words_in_window) > line_word_count and words_in_window:
                    # Anchor line is a SUBSET of LRC line — take words at offset
                    start_offset = lrc_word_offset
                    end_offset = min(start_offset + line_word_count, len(words_in_window))
                    if end_offset <= len(words_in_window):
                        for k in range(end_offset - start_offset):
                            ai_idx = line_start_ai + k
                            wi_idx = words_in_window[start_offset + k]
                            lrc_direct_sync.append((ai_idx, wi_idx, wi_idx))
                        lrc_assigned_count += (end_offset - start_offset)
                        lrc_word_offset = end_offset

                prev_lrc_idx = best_lrc_idx
                # Only advance last_matched_lrc if we've consumed all words in this LRC window
                # or if the next anchor line won't be part of this window
                lrc_total_words = len(norm(lrc_matched_txt).split()) if norm(lrc_matched_txt) else 0
                if lrc_word_offset >= lrc_total_words - 1 or best_lrc_idx != prev_lrc_idx:
                    last_matched_lrc = best_lrc_idx

            line_start_ai = line_end_ai

        if lrc_assigned_count > 0:
            print(f"[aligner] 📐 LRC direct assignment: {lrc_assigned_count} words across {len(anchor_lines)} lines", file=sys.stderr)

    # ══════════════════════════════════════════════════════════════════════════
    # PRE-PASS: LINE-LEVEL SEGMENT MATCHING
    # Before word-level matching, find which Whisper time range each anchor line
    # should occupy. This prevents chorus lines from "stealing" verse Whisper words.
    # Uses rapidfuzz to match entire anchor lines to Whisper segment texts.
    # ══════════════════════════════════════════════════════════════════════════
    line_time_ranges = {}  # line_idx -> (start_time, end_time)

    if not lrc_direct_sync and total_whisper > 20:
        # Build Whisper segments by grouping consecutive words
        whisper_segs = []
        seg_text = []
        seg_start = 0
        seg_end = 0
        for wi, w in enumerate(whisper_words):
            if not seg_text:
                seg_start = w["start"]
            seg_text.append(w["text"])
            seg_end = w["end"]
            # Segment break: gap > 0.5s or accumulated > 8 words
            next_gap = whisper_words[wi+1]["start"] - w["end"] if wi+1 < len(whisper_words) else 99
            if next_gap > 0.5 or len(seg_text) >= 8:
                whisper_segs.append({
                    "text": _join_words_cjk(seg_text),
                    "start": seg_start,
                    "end": seg_end,
                    "wi_start": wi - len(seg_text) + 1,
                    "wi_end": wi,
                })
                seg_text = []

        if whisper_segs:
            # For each anchor line, find best matching Whisper segment
            # Use sequential constraint: anchor lines must map to non-decreasing time
            last_seg_idx = 0
            for li, line in enumerate(anchor_lines):
                line_norm = norm(line)
                if not line_norm or len(line_norm) < 3:
                    continue
                best_score = 0
                best_seg = -1
                # Search STRICTLY forward from last matched segment
                for si in range(last_seg_idx, len(whisper_segs)):
                    seg_norm = norm(whisper_segs[si]["text"])
                    if not seg_norm:
                        continue
                    score = fuzz.ratio(line_norm, seg_norm)
                    # Also try partial ratio for long lines
                    if len(line_norm) > 20 or len(seg_norm) > 20:
                        partial = fuzz.partial_ratio(line_norm, seg_norm)
                        score = max(score, partial)
                    if score >= 50:
                        # Take the FIRST adequate match (sequential order)
                        # Only upgrade to a later seg if score is much better
                        if best_seg < 0 or score > best_score + 20:
                            best_score = score
                            best_seg = si
                        if score >= 70:
                            break  # Good enough — stop searching forward
                if best_seg >= 0:
                    line_time_ranges[li] = (whisper_segs[best_seg]["start"], whisper_segs[best_seg]["end"])
                    last_seg_idx = best_seg

            if line_time_ranges:
                print(f"[aligner] 📐 Pre-pass: {len(line_time_ranges)}/{len(anchor_lines)} lines matched to Whisper segments", file=sys.stderr)
                # Debug: show first few
                for li in sorted(line_time_ranges.keys())[:5]:
                    s, e = line_time_ranges[li]
                    print(f"[aligner]   Line {li}: {s:.1f}-{e:.1f}s = {anchor_lines[li][:40]}", file=sys.stderr)

    # ══════════════════════════════════════════════════════════════════════════
    # TWO-PASS ALIGNMENT
    # Pass 1: Hard matches (exact + high confidence) — creates anchor pillars
    # Pass 2: Soft matches between pillars — fills gaps with lower threshold
    # ══════════════════════════════════════════════════════════════════════════

    SEARCH_WINDOW = 60
    HARD_THRESHOLD = 85   # Pass 1: strict
    SOFT_THRESHOLD = 45   # Pass 2: very lenient (trust Whisper's timing)

    # Start with LRC direct assignments as the base sync
    sync_pass1 = list(lrc_direct_sync)
    lrc_matched_ais = set(e[0] for e in lrc_direct_sync)
    lrc_matched_wis = set(e[1] for e in lrc_direct_sync)

    # ── Pass 1: Hard match (pillars) — only for words NOT already assigned by LRC ──
    wi_cursor = 0
    for ai in range(total_anchor):
        if ai in lrc_matched_ais:
            continue
        anchor_word_raw = anchor_words_flat[ai]
        anchor_n = norm(anchor_word_raw)
        if not anchor_n:
            continue

        # If we have line-level time ranges, constrain the search window
        li = word_to_line[ai]
        if li in line_time_ranges:
            lr_start, lr_end = line_time_ranges[li]
            # Find wi range for this time range
            constrained_start = None
            constrained_end = None
            for wi in range(total_whisper):
                if whisper_words[wi]["start"] >= lr_start - 1.0 and constrained_start is None:
                    constrained_start = wi
                if whisper_words[wi]["end"] <= lr_end + 1.0:
                    constrained_end = wi
            if constrained_start is not None and constrained_end is not None:
                search_start = constrained_start
                search_end = min(constrained_end + 1, total_whisper)
            else:
                search_start = wi_cursor
                search_end = min(wi_cursor + SEARCH_WINDOW, total_whisper)
        else:
            search_start = wi_cursor
            search_end = min(wi_cursor + SEARCH_WINDOW, total_whisper)
        best_wi = -1
        best_score = 0
        best_wi_end = -1
        best_effective = -999
        expected_wi = int((ai / max(1, total_anchor - 1)) * max(0, total_whisper - 1))

        for wi in range(search_start, search_end):
            score = match_score(anchor_n, norm(whisper_words[wi]["text"]), anchor_word_raw)
            penalty = min(30.0, abs(wi - expected_wi) * 0.6)
            effective = score - penalty
            if score >= HARD_THRESHOLD and effective > best_effective:
                best_wi = wi
                best_wi_end = wi
                best_score = score
                best_effective = effective
            if score == 100:
                break

        # Multi-token concat (strict)
        if best_score < 90:
            for wi in range(search_start, search_end):
                if wi + 1 >= total_whisper:
                    break
                cs, ck = match_concat_score(anchor_n, whisper_words[wi:wi+6])
                penalty = min(30.0, abs(wi - expected_wi) * 0.6)
                effective = cs - penalty
                if cs >= HARD_THRESHOLD and effective > best_effective:
                    best_wi = wi
                    best_wi_end = wi + ck
                    best_score = cs
                    best_effective = effective
                if cs == 100:
                    break

        if best_wi >= 0:
            sync_pass1.append((ai, best_wi, best_wi_end))
            wi_cursor = best_wi_end + 1

    # ── Pass 2: Soft match (fill gaps between pillars) ──
    sync = list(sync_pass1)
    matched_ais = set(ai for ai, _, _ in sync)
    matched_wis = set()
    for _, wi, wi_end in sync:
        for w in range(wi, wi_end + 1):
            matched_wis.add(w)

    # For each unmatched anchor word, find best whisper match within bounded region
    for ai in range(total_anchor):
        if ai in matched_ais:
            continue
        anchor_word_raw = anchor_words_flat[ai]
        anchor_n = norm(anchor_word_raw)
        if not anchor_n:
            continue

        # Find bounding pillars (previous and next matched anchors)
        prev_wi_end = 0
        next_wi_start = total_whisper
        for sai, swi, swie in sync:
            if sai < ai:
                prev_wi_end = max(prev_wi_end, swie + 1)
            elif sai > ai:
                next_wi_start = min(next_wi_start, swi)
                break

        # Search within bounded region only
        search_start = max(0, prev_wi_end)
        search_end_bounded = min(next_wi_start, total_whisper)
        if search_start >= search_end_bounded:
            continue

        best_wi = -1
        best_score = 0
        best_wi_end = -1
        best_effective = -999
        expected_wi = int((ai / max(1, total_anchor - 1)) * max(0, total_whisper - 1))

        for wi in range(search_start, search_end_bounded):
            if wi in matched_wis:
                continue
            score = match_score(anchor_n, norm(whisper_words[wi]["text"]), anchor_word_raw)
            penalty = min(26.0, abs(wi - expected_wi) * 0.5)
            effective = score - penalty
            if score >= SOFT_THRESHOLD and effective > best_effective:
                best_wi = wi
                best_wi_end = wi
                best_score = score
                best_effective = effective
            if score == 100:
                break

        # Multi-token concat (soft)
        if best_score < 80:
            for wi in range(search_start, search_end_bounded):
                if wi in matched_wis:
                    continue
                remaining = [whisper_words[wi + k] for k in range(min(6, search_end_bounded - wi)) if (wi + k) not in matched_wis]
                if len(remaining) < 2:
                    continue
                cs, ck = match_concat_score(anchor_n, remaining)
                penalty = min(26.0, abs(wi - expected_wi) * 0.5)
                effective = cs - penalty
                if cs >= SOFT_THRESHOLD and effective > best_effective:
                    best_wi = wi
                    # Find actual end index
                    actual_end = wi
                    count = 0
                    for w in range(wi, search_end_bounded):
                        if w not in matched_wis:
                            if count == ck:
                                actual_end = w
                                break
                            count += 1
                    best_wi_end = actual_end
                    best_score = cs
                    best_effective = effective
                if cs >= 90:
                    break

        if best_wi >= 0:
            sync.append((ai, best_wi, best_wi_end))
            matched_ais.add(ai)
            for w in range(best_wi, best_wi_end + 1):
                matched_wis.add(w)

    # Sort sync by anchor index
    sync.sort(key=lambda x: x[0])

    # ── Pass 2.5: Desperation match ──
    # For still-unmatched words: if Whisper has a token at the expected proportional
    # position with same first letter → accept it. "If you heard SOMETHING there, it's it."
    matched_ais = set(e[0] for e in sync)
    matched_wis = set()
    for entry in sync:
        for w in range(entry[1], entry[2] + 1):
            matched_wis.add(w)

    ratio = total_whisper / max(total_anchor, 1)
    for ai in range(total_anchor):
        if ai in matched_ais:
            continue
        anchor_n = norm(anchor_words_flat[ai])
        if not anchor_n:
            continue
        # Expected whisper position based on proportional mapping
        expected_wi = int(ai * ratio)
        # Search ±3 positions around expected
        for wi in range(max(0, expected_wi - 5), min(total_whisper, expected_wi + 6)):
            if wi in matched_wis:
                continue
            whisper_n = norm(whisper_words[wi]["text"])
            if not whisper_n:
                continue
            # First letter match + same general length category = accept
            if anchor_n[0] == whisper_n[0]:
                sync.append((ai, wi, wi))
                matched_ais.add(ai)
                matched_wis.add(wi)
                break

    # Sort sync by anchor index
    sync.sort(key=lambda x: x[0])
    # Find gaps > 10s between consecutive sync points with many unmatched words.
    matched_ais = set(e[0] for e in sync)
    sorted_sync = sorted(sync, key=lambda e: e[0])

    gaps_to_fill = []
    for idx in range(len(sorted_sync) - 1):
        curr_entry = sorted_sync[idx]
        next_entry = sorted_sync[idx + 1]
        curr_wi_end = curr_entry[2] if len(curr_entry) > 2 else curr_entry[1]
        next_wi = next_entry[1]
        curr_time_end = whisper_words[curr_wi_end]["end"]
        next_time_start = whisper_words[next_wi]["start"]
        time_gap = next_time_start - curr_time_end
        ai_gap_start = curr_entry[0] + 1
        ai_gap_end = next_entry[0]
        unmatched_in_gap = [ai for ai in range(ai_gap_start, ai_gap_end) if ai not in matched_ais and norm(anchor_words_flat[ai])]
        if time_gap > 10.0 and len(unmatched_in_gap) > 5:
            gaps_to_fill.append((unmatched_in_gap, curr_time_end, next_time_start))

    # Also check tail
    if sorted_sync:
        last_entry = sorted_sync[-1]
        last_wi_end = last_entry[2] if len(last_entry) > 2 else last_entry[1]
        last_time = whisper_words[last_wi_end]["end"]
        remaining = (audio_duration or 253.0) - last_time
        tail_unmatched = [ai for ai in range(last_entry[0] + 1, total_anchor) if ai not in matched_ais and norm(anchor_words_flat[ai])]
        if remaining > 3.0 and len(tail_unmatched) > 3:
            gaps_to_fill.append((tail_unmatched, last_time, audio_duration or 253.0))

    for unmatched_in_gap, gap_start_time, gap_end_time in gaps_to_fill:
        # Build pattern from unmatched words — prioritize unique/distinctive words
        # that will help us find the right section in whisper output
        pattern_words = []
        # First try: non-vocalizations (more distinctive for pattern matching)
        for ai in unmatched_in_gap:
            w = anchor_words_flat[ai]
            n = norm(w)
            if n and not is_vocalization(w) and len(n) > 2:
                pattern_words.append(n)
                if len(pattern_words) >= 5:
                    break
        # If not enough non-vocal patterns, use vocalizations
        if len(pattern_words) < 3:
            vocal_patterns = []
            for ai in unmatched_in_gap:
                w = anchor_words_flat[ai]
                n = norm(w)
                if n and is_vocalization(w) and len(n) >= 4:
                    vocal_patterns.append(n)
                    if len(vocal_patterns) >= 5:
                        break
            # If we have more vocal patterns, use those instead
            if len(vocal_patterns) > len(pattern_words):
                pattern_words = vocal_patterns
        if len(pattern_words) < 2:
            # Last resort: any words
            pattern_words = []
            for ai in unmatched_in_gap:
                n = norm(anchor_words_flat[ai])
                if n and len(n) >= 2:
                    pattern_words.append(n)
                    if len(pattern_words) >= 5:
                        break
        if len(pattern_words) < 2:
            continue

        best_offset_wi = -1
        best_match_count = 0
        for start_wi in range(total_whisper - 3):
            match_count = 0
            for k, fn in enumerate(pattern_words):
                if start_wi + k >= total_whisper:
                    break
                if match_score(fn, norm(whisper_words[start_wi + k]["text"]), "") >= 80:
                    match_count += 1
            if match_count > best_match_count:
                best_match_count = match_count
                best_offset_wi = start_wi

        # Also try non-consecutive matching (vocalizations may be spaced differently in Whisper)
        if best_match_count < 3:
            for start_wi in range(min(20, total_whisper)):  # Try intro first
                match_count = 0
                wi_scan = start_wi
                for fn in pattern_words:
                    for wi_check in range(wi_scan, min(wi_scan + 10, total_whisper)):
                        if match_score(fn, norm(whisper_words[wi_check]["text"]), "") >= 80:
                            match_count += 1
                            wi_scan = wi_check + 1
                            break
                    else:
                        wi_scan += 1
                if match_count > best_match_count:
                    best_match_count = match_count
                    best_offset_wi = start_wi

        if best_offset_wi >= 0 and best_match_count >= 2:
            pattern_start_time = whisper_words[best_offset_wi]["start"]
            time_offset = gap_start_time - pattern_start_time + 0.5
            print(f"[aligner] 🔄 Loop-back: gap {gap_start_time:.1f}-{gap_end_time:.1f}s, pattern@whisper[{best_offset_wi}] t={pattern_start_time:.1f}s, offset={time_offset:.1f}s", file=sys.stderr)

            wi_cursor_lb = best_offset_wi
            for ai in unmatched_in_gap:
                anchor_n = norm(anchor_words_flat[ai])
                if not anchor_n:
                    continue
                search_end_lb = min(wi_cursor_lb + 30, total_whisper)
                for wi in range(wi_cursor_lb, search_end_lb):
                    score = match_score(anchor_n, norm(whisper_words[wi]["text"]), anchor_words_flat[ai])
                    if score >= 60:  # Lower threshold for loop-back (vocalizations are hard to match)
                        offset_start = whisper_words[wi]["start"] + time_offset
                        offset_end = whisper_words[wi]["end"] + time_offset
                        if offset_start >= gap_start_time - 1.0 and offset_end <= gap_end_time + 1.0:
                            sync.append((ai, wi, wi, time_offset))
                            matched_ais.add(ai)
                        wi_cursor_lb = wi + 1
                        break

    # Re-sort
    sync.sort(key=lambda x: x[0])

    # ── Pass 4: Vocalization reuse ──
    # For still-unmatched vocalizations, find ANY matching whisper token and reuse with LRC timing
    matched_ais = set(e[0] for e in sync)
    still_unmatched_vocals = []
    for ai in range(total_anchor):
        if ai in matched_ais:
            continue
        w = anchor_words_flat[ai]
        n = norm(w)
        if n and (is_vocalization(w) or len(n) <= 3):  # short words like "Oh," "Ooh", "yet"
            still_unmatched_vocals.append(ai)

    if still_unmatched_vocals and lrc_timings:
        # For these words, find the BEST matching whisper token anywhere and assign with proper time offset
        # based on their position relative to neighboring matched words
        for ai in still_unmatched_vocals:
            anchor_n = norm(anchor_words_flat[ai])
            if not anchor_n:
                continue
            # Find best whisper match globally
            best_wi = -1
            best_score = 0
            for wi in range(total_whisper):
                score = match_score(anchor_n, norm(whisper_words[wi]["text"]), anchor_words_flat[ai])
                if score > best_score:
                    best_score = score
                    best_wi = wi
                if score == 100:
                    break
            if best_wi >= 0 and best_score >= 70:
                # Calculate time offset: find where this anchor word SHOULD be
                # by interpolating between neighboring matched words
                prev_time = None
                next_time = None
                for entry in sync:
                    if entry[0] < ai:
                        e_wi = entry[1]
                        e_offset = entry[3] if len(entry) > 3 else 0
                        prev_time = whisper_words[e_wi]["end"] + e_offset
                    elif entry[0] > ai:
                        e_wi = entry[1]
                        e_offset = entry[3] if len(entry) > 3 else 0
                        next_time = whisper_words[e_wi]["start"] + e_offset
                        break
                # Compute offset so that whisper_words[best_wi].start + offset lands between prev/next
                if prev_time is not None:
                    target_time = prev_time + 0.1
                elif next_time is not None:
                    target_time = next_time - 0.3
                else:
                    continue
                time_offset = target_time - whisper_words[best_wi]["start"]
                sync.append((ai, best_wi, best_wi, time_offset))
                matched_ais.add(ai)

    # Re-sort
    sync.sort(key=lambda x: x[0])

    print(f"[aligner] Found {len(sync)} sync points out of {total_anchor} anchor words ({100*len(sync)//max(total_anchor,1)}%)", file=sys.stderr)

    # Debug: show unmatched words
    matched_final = set(e[0] for e in sync)
    unmatched = [(ai, anchor_words_flat[ai]) for ai in range(total_anchor) if ai not in matched_final and norm(anchor_words_flat[ai])]
    if unmatched:
        sample = unmatched[:15]
        print(f"[aligner] ❌ Unmatched ({len(unmatched)}): {[(ai, w) for ai, w in sample]}", file=sys.stderr)


    # Assign timings — matched get direct, gaps get char-length interpolation
    timing_map = [None] * total_anchor
    for entry in sync:
        ai = entry[0]
        wi = entry[1]
        timing_map[ai] = whisper_words[wi]

    def _fill_gap(start_time, end_time, words_in_gap):
        total_chars = sum(max(len(w), 1) for w in words_in_gap)
        total_duration = end_time - start_time
        results = []
        cursor = start_time
        for w in words_in_gap:
            char_frac = max(len(w), 1) / total_chars
            dur = max(0.05, min(total_duration * char_frac, 1.5))
            results.append({"start": round(cursor, 3), "end": round(cursor + dur, 3)})
            cursor += dur
        return results

    final_timings = [None] * total_anchor
    for entry in sync:
        if len(entry) == 4:
            ai, wi, wi_end, time_offset = entry
            final_timings[ai] = {
                "start": whisper_words[wi]["start"] + time_offset,
                "end": whisper_words[wi_end]["end"] + time_offset
            }
        else:
            ai, wi, wi_end = entry
            final_timings[ai] = {"start": whisper_words[wi]["start"], "end": whisper_words[wi_end]["end"]}

    # Enforce monotonicity: remove sync points that go backwards in time
    # (can happen when Pass 2 soft-matches to an earlier whisper word)
    prev_end = 0.0
    for i in range(total_anchor):
        if final_timings[i] is not None:
            if final_timings[i]["start"] < prev_end - 0.5:
                # This timing goes backwards — discard it (let interpolation handle it)
                final_timings[i] = None
            else:
                prev_end = final_timings[i]["end"]

    # ── Detect Whisper silence gaps BEFORE interpolation ──
    # Find gaps ≥ 4s between consecutive Whisper words where no speech was detected.
    # These are instrumental breaks — we must NOT fill them with interpolated words.
    whisper_silence_gaps = []  # [(gap_start_time, gap_end_time)]
    for wi in range(len(whisper_words) - 1):
        gap = whisper_words[wi + 1]["start"] - whisper_words[wi]["end"]
        if gap >= 4.0:
            whisper_silence_gaps.append((whisper_words[wi]["end"], whisper_words[wi + 1]["start"]))
    # Also check gap before first whisper word
    if whisper_words and whisper_words[0]["start"] > 5.0:
        whisper_silence_gaps.insert(0, (0, whisper_words[0]["start"]))
    # And gap after last whisper word
    if whisper_words and audio_duration and (audio_duration - whisper_words[-1]["end"]) > 5.0:
        whisper_silence_gaps.append((whisper_words[-1]["end"], audio_duration))
    if whisper_silence_gaps:
        print(f"[aligner] 🔇 Whisper silence gaps: {[(f'{s:.1f}-{e:.1f}s') for s, e in whisper_silence_gaps]}", file=sys.stderr)

    # Determine the last time where Whisper detected speech
    # Unmatched tail words should NOT go past this point
    whisper_speech_end = 0.0
    whisper_speech_start = 0.0
    if whisper_words:
        whisper_speech_end = whisper_words[-1]["end"]
        whisper_speech_start = whisper_words[0]["start"]

    # ── Build LRC line-time lookup for fallback ──
    lrc_line_times = {}
    if lrc_timings:
        non_empty_lrc_fb = [(t, txt) for t, txt in lrc_timings if txt.strip()]
        _fb_last = -1
        for li, line_text in enumerate(anchor_lines):
            line_n = norm(line_text)
            if not line_n:
                continue
            best_idx = -1
            best_score = 0
            for lrc_i in range(max(0, _fb_last + 1), min(len(non_empty_lrc_fb), (_fb_last + 1) + 10)):
                _, lrc_txt = non_empty_lrc_fb[lrc_i]
                score = fuzz.ratio(line_n, norm(lrc_txt))
                if line_n in norm(lrc_txt):
                    score = max(score, 80)
                if score > best_score:
                    best_score = score
                    best_idx = lrc_i
            if best_idx >= 0 and best_score >= 50:
                lrc_t = non_empty_lrc_fb[best_idx][0]
                lrc_end_t = non_empty_lrc_fb[best_idx + 1][0] if best_idx + 1 < len(non_empty_lrc_fb) else (audio_duration or lrc_t + 5)
                lrc_line_times[li] = (lrc_t, lrc_end_t)
                _fb_last = best_idx
        if lrc_line_times:
            print(f"[aligner] 📐 LRC line-time lookup: {len(lrc_line_times)}/{len(anchor_lines)} lines mapped", file=sys.stderr)

    # Fill gaps — but respect Whisper silence gaps (don't interpolate across them)
    i = 0
    while i < total_anchor:
        if final_timings[i] is not None:
            i += 1
            continue
        gap_start = i
        while i < total_anchor and final_timings[i] is None:
            i += 1
        gap_end = i

        left_time = final_timings[gap_start - 1]["end"] if gap_start > 0 and final_timings[gap_start - 1] else 0.0
        if gap_end < total_anchor and final_timings[gap_end]:
            right_time = final_timings[gap_end]["start"]
        else:
            # Tail gap: check LRC first, then Whisper speech end
            tail_lrc_end = 0.0
            if lrc_line_times:
                for j in range(gap_start, gap_end):
                    li = word_to_line[j]
                    if li in lrc_line_times:
                        tail_lrc_end = max(tail_lrc_end, lrc_line_times[li][1])
            # Only use LRC end if it doesn't exceed audio duration
            if tail_lrc_end > left_time + 1.0 and (not audio_duration or tail_lrc_end <= audio_duration + 1.0):
                right_time = tail_lrc_end
            elif whisper_speech_end > left_time + 1.0:
                right_time = whisper_speech_end
            elif audio_duration and audio_duration > left_time:
                right_time = max(left_time + (gap_end - gap_start) * 0.3, audio_duration - 5.0)
            else:
                right_time = left_time + (gap_end - gap_start) * 0.3

        if right_time <= left_time:
            right_time = left_time + (gap_end - gap_start) * 0.01

        # ── LRC-based placement for words in Whisper silence zones ──
        if lrc_line_times:
            gap_lines = set(word_to_line[j] for j in range(gap_start, gap_end))
            covered_lines = [li for li in gap_lines if li in lrc_line_times]
            if len(covered_lines) >= len(gap_lines) * 0.5 and len(covered_lines) >= 2:
                # Validate: check if LRC times would exceed audio_duration
                # If so, fall back to proportional interpolation instead
                max_lrc_time = max(lrc_line_times[li][1] for li in covered_lines)
                effective_end = audio_duration if audio_duration else right_time
                if max_lrc_time > effective_end + 1.0:
                    # LRC timestamps exceed audio bounds — use proportional interpolation
                    # Spread words evenly between left_time and right_time
                    print(f"[aligner] ⚠️ LRC times exceed audio ({max_lrc_time:.0f}s > {effective_end:.0f}s), using interpolation for {gap_end - gap_start} words", file=sys.stderr)
                    # Fall through to normal interpolation below
                else:
                    for j in range(gap_start, gap_end):
                        li = word_to_line[j]
                        if li in lrc_line_times:
                            lrc_s, lrc_e = lrc_line_times[li]
                            # Clamp to audio duration
                            if audio_duration:
                                lrc_s = min(lrc_s, audio_duration - 0.5)
                                lrc_e = min(lrc_e, audio_duration - 0.1)
                            line_words_in_gap = [k for k in range(gap_start, gap_end) if word_to_line[k] == li]
                            word_pos = line_words_in_gap.index(j)
                            n_words = len(line_words_in_gap)
                            line_dur = min(lrc_e - lrc_s, 8.0)
                            w_dur = line_dur / max(n_words, 1)
                            w_start = lrc_s + word_pos * w_dur
                            w_end = w_start + w_dur * 0.9
                            final_timings[j] = {"start": round(w_start, 3), "end": round(w_end, 3), "interpolated": True}
                        else:
                            prev_t = None
                            for k in range(j - 1, max(gap_start - 2, -1), -1):
                                if k >= 0 and final_timings[k]:
                                    prev_t = final_timings[k]["end"]
                                    break
                            if prev_t is not None:
                                final_timings[j] = {"start": round(prev_t + 0.1, 3), "end": round(prev_t + 0.4, 3), "interpolated": True}
                    print(f"[aligner] 📐 LRC fallback: placed {len(covered_lines)} lines ({gap_end - gap_start} words) via LRC timestamps", file=sys.stderr)
                    continue

        # Check if a Whisper silence gap falls within this interpolation range.
        # If so, split interpolation: words before silence get time before gap,
        # words after silence get time after gap. The silence itself stays empty.
        silence_in_range = None
        for sg_start, sg_end in whisper_silence_gaps:
            # Silence gap is within our interpolation range
            if sg_start > left_time + 0.5 and sg_end < right_time - 0.5:
                silence_in_range = (sg_start, sg_end)
                break

        gap_words = [anchor_words_flat[j] for j in range(gap_start, gap_end)]

        if silence_in_range:
            sg_start, sg_end = silence_in_range
            # Find which anchor word should be the split point
            # Use line boundaries: find the line boundary closest to the silence
            split_ai = gap_start
            for j in range(gap_start, gap_end):
                # Find the first word that belongs to a different line after the silence
                if j > gap_start and word_to_line[j] != word_to_line[j - 1]:
                    # This is a line boundary — check if it's roughly in the right proportion
                    proportion = (j - gap_start) / (gap_end - gap_start)
                    time_proportion = (sg_start - left_time) / (right_time - left_time) if right_time > left_time else 0.5
                    if abs(proportion - time_proportion) < 0.4:
                        split_ai = j
                        break

            if split_ai > gap_start and split_ai < gap_end:
                # Fill before silence
                before_words = gap_words[:split_ai - gap_start]
                before_filled = _fill_gap(left_time, sg_start - 0.3, before_words)
                for idx, j in enumerate(range(gap_start, split_ai)):
                    final_timings[j] = before_filled[idx]
                    final_timings[j]["interpolated"] = True

                # Fill after silence
                after_words = gap_words[split_ai - gap_start:]
                after_filled = _fill_gap(sg_end + 0.3, right_time, after_words)
                for idx, j in enumerate(range(split_ai, gap_end)):
                    final_timings[j] = after_filled[idx]
                    final_timings[j]["interpolated"] = True

                print(f"[aligner] 🔇 Split interpolation around silence {sg_start:.1f}-{sg_end:.1f}s (split at anchor word {split_ai})", file=sys.stderr)
            else:
                # Can't find good split point — fill normally but mark the silence
                filled = _fill_gap(left_time, right_time, gap_words)
                for idx, j in enumerate(range(gap_start, gap_end)):
                    final_timings[j] = filled[idx]
                    final_timings[j]["interpolated"] = True
        else:
            gap_words = [anchor_words_flat[j] for j in range(gap_start, gap_end)]
            filled = _fill_gap(left_time, right_time, gap_words)
            for idx, j in enumerate(range(gap_start, gap_end)):
                final_timings[j] = filled[idx]
                final_timings[j]["interpolated"] = True  # Mark as interpolated (no real Whisper data)

    # ── Degenerate tail detection ──
    # If a large number of anchor words at the end have identical/near-identical timing
    # (clamped to whisper_speech_end), the matching went wrong.
    # Fix: find the last good sync point, compute remaining Whisper speech time,
    # and proportionally spread tail words across that range.
    if total_anchor > 10:
        # Count how many tail words are crammed into < 2s
        # Strategy 1: words with tiny duration (< 0.05s)
        crammed_start = total_anchor
        for ai in range(total_anchor - 1, -1, -1):
            t = final_timings[ai]
            if t and not t.get("interpolated"):
                break
            if t and t["end"] - t["start"] < 0.05:
                crammed_start = ai
            else:
                break

        # Strategy 2: words sharing nearly identical start times (clamped to audio end)
        # This catches cases where words are clamped to audio_duration and have duration > 0.05
        if crammed_start == total_anchor and total_anchor > 20:
            # Check if many tail words share the same start time (within 0.5s)
            tail_check_count = min(total_anchor, 30)
            tail_starts = []
            for ai in range(total_anchor - tail_check_count, total_anchor):
                t = final_timings[ai]
                if t:
                    tail_starts.append((ai, t["start"]))
            if len(tail_starts) >= 10:
                # Find the most common start time cluster (within 0.5s)
                from collections import Counter
                # Round to 0.5s bins
                binned = Counter(round(s * 2) / 2 for _, s in tail_starts)
                most_common_time, most_common_count = binned.most_common(1)[0]
                if most_common_count >= 10 and most_common_count >= len(tail_starts) * 0.5:
                    # Many words share the same timestamp — degenerate
                    crammed_start = min(ai for ai, s in tail_starts if abs(s - most_common_time) < 0.5)
                    print(f"[aligner] ⚠️ Detected {most_common_count} tail words clamped to ~{most_common_time:.1f}s", file=sys.stderr)

        crammed_count = total_anchor - crammed_start
        if crammed_count > total_anchor * 0.15 and crammed_count >= 10:
            # Find the last valid sync point
            last_sync_time = 0.0
            last_sync_ai = 0
            for ai in range(crammed_start - 1, -1, -1):
                t = final_timings[ai]
                if t and not t.get("interpolated"):
                    last_sync_time = t["end"]
                    last_sync_ai = ai
                    break

            # Calculate how much Whisper speech time remains
            remaining_speech = whisper_speech_end - last_sync_time
            if remaining_speech > 2.0:
                print(f"[aligner] ⚠️ Degenerate tail: {crammed_count} words crammed after {last_sync_time:.1f}s. Re-spreading across {last_sync_time:.1f}-{whisper_speech_end:.1f}s", file=sys.stderr)
                tail_words = [anchor_words_flat[j] for j in range(crammed_start, total_anchor)]
                filled = _fill_gap(last_sync_time + 0.1, whisper_speech_end, tail_words)
                for idx, j in enumerate(range(crammed_start, total_anchor)):
                    final_timings[j] = filled[idx]
                    final_timings[j]["interpolated"] = True
            else:
                # No Whisper speech time left. These are truly unplaced lyrics.
                # Likely a repeated chorus — try to find matching lines earlier and copy timing
                anchor_line_texts = {}
                for ai2 in range(crammed_start):
                    li = word_to_line[ai2]
                    if li not in anchor_line_texts and final_timings[ai2] and not final_timings[ai2].get("interpolated"):
                        anchor_line_texts[li] = final_timings[ai2]["start"]

                for ai2 in range(crammed_start, total_anchor):
                    li = word_to_line[ai2]
                    # Check if this line's text appeared before
                    for prev_li, prev_start in anchor_line_texts.items():
                        if anchor_lines[prev_li].strip() == anchor_lines[li].strip():
                            # Found a repeat! Copy timing from the first occurrence
                            # Find all words in the first occurrence
                            first_word_idx = None
                            for ai3 in range(crammed_start):
                                if word_to_line[ai3] == prev_li:
                                    if first_word_idx is None:
                                        first_word_idx = ai3
                            if first_word_idx is not None:
                                offset = ai2 - crammed_start
                                line_words_in_first = [ai3 for ai3 in range(total_anchor) if word_to_line[ai3] == prev_li and ai3 < crammed_start]
                                word_in_line = ai2 - min(ai3 for ai3 in range(total_anchor) if word_to_line[ai3] == li)
                                if word_in_line < len(line_words_in_first):
                                    src = final_timings[line_words_in_first[word_in_line]]
                                    if src:
                                        final_timings[ai2] = {"start": src["start"], "end": src["end"], "interpolated": True}
                            break

                print(f"[aligner] ⚠️ Degenerate tail: {crammed_count} words with no Whisper speech remaining. Attempted repeat-copy.", file=sys.stderr)

    # Build output lines — merge CJK chars back into original Genius word groups
    # word_to_group tracks which original anchor word each split char belongs to.
    # Adjacent chars with the same group ID get merged into one word with combined timing.

    # ── Safety net: ensure ALL anchor words have timings (no None remaining) ──
    # If any words are still None after gap-filling, interpolate from nearest neighbors
    none_count = sum(1 for t in final_timings if t is None)
    if none_count > 0:
        print(f"[aligner] ⚠️ {none_count}/{total_anchor} words still have no timing — interpolating from neighbors", file=sys.stderr)
        for ai in range(total_anchor):
            if final_timings[ai] is not None:
                continue
            # Find nearest previous timed word
            prev_end = 0.0
            for j in range(ai - 1, -1, -1):
                if final_timings[j] is not None:
                    prev_end = final_timings[j]["end"]
                    break
            # Find nearest next timed word
            next_start = prev_end + 1.0
            for j in range(ai + 1, total_anchor):
                if final_timings[j] is not None:
                    next_start = final_timings[j]["start"]
                    break
            # Count consecutive None words to spread evenly
            consecutive = 1
            for j in range(ai + 1, total_anchor):
                if final_timings[j] is None:
                    consecutive += 1
                else:
                    break
            # Find position of this word within the consecutive None block
            pos_in_block = 0
            for j in range(ai - 1, -1, -1):
                if final_timings[j] is None:
                    pos_in_block += 1
                else:
                    break
            total_in_block = pos_in_block + consecutive
            slot_dur = (next_start - prev_end) / max(1, total_in_block)
            word_start = prev_end + pos_in_block * slot_dur
            word_end = word_start + slot_dur
            final_timings[ai] = {"start": round(word_start, 3), "end": round(word_end, 3), "interpolated": True}

    lines_output = []
    current_line_idx = -1
    current_line_words = []

    # First pass: build raw per-char word objects
    raw_word_objs = []
    for ai in range(total_anchor):
        timing = final_timings[ai]
        start = timing["start"]
        end = timing["end"]
        word_obj = {
            "word": anchor_words_flat[ai],
            "start": round(start, 3),
            "end": round(end, 3),
            "_group": word_to_group[ai] if ai < len(word_to_group) else (word_to_line[ai], ai),
            "_line": word_to_line[ai],
        }
        if timing.get("interpolated"):
            word_obj["_interpolated"] = True
        raw_word_objs.append(word_obj)

    # Second pass: merge chars that share the same group into single words
    merged_word_objs = []
    i = 0
    while i < len(raw_word_objs):
        obj = raw_word_objs[i]
        group = obj["_group"]
        line_idx = obj["_line"]
        # Collect all chars in same group
        group_chars = [obj]
        j = i + 1
        while j < len(raw_word_objs) and raw_word_objs[j]["_group"] == group and raw_word_objs[j]["_line"] == line_idx:
            group_chars.append(raw_word_objs[j])
            j += 1
        if len(group_chars) > 1:
            # Merge: concatenate words, use first start and last end
            merged_text = ''.join(c["word"] for c in group_chars)
            merged_obj = {
                "word": merged_text,
                "start": group_chars[0]["start"],
                "end": group_chars[-1]["end"],
                "_line": line_idx,
            }
            if any(c.get("_interpolated") for c in group_chars):
                merged_obj["_interpolated"] = True
            # Preserve per-char timings for karaoke sub-word highlighting
            merged_obj["_chars"] = [{"char": c["word"], "start": c["start"], "end": c["end"]} for c in group_chars]
            merged_word_objs.append(merged_obj)
        else:
            merged_word_objs.append(obj)
        i = j

    # Third pass: build line output from merged words
    _VOWELS = set("aeiouyAEIOUYаеёиоуыэюяАЕЁИОУЫЭЮЯіїєґІЇЄҐ")

    def _smart_char_starts(word_text, chars, stretch_hint=False):
        if not chars or len(chars) < 2:
            return None, bool(stretch_hint)
        starts = [round(float(c.get("start", 0.0)), 3) for c in chars]
        durs = [max(0.01, float(c.get("end", s + 0.05)) - s) for c, s in zip(chars, starts)]
        sorted_d = sorted(durs)
        median = sorted_d[len(sorted_d) // 2] if sorted_d else 0.05
        median = max(0.02, median)
        long_idx = [i for i, d in enumerate(durs) if d > median * 1.6]
        long_ratio = len(long_idx) / max(1, len(durs))
        tail_heavy = len(durs) >= 2 and durs[-1] > median * 1.8
        vowel_long = sum(1 for i in long_idx if i < len(word_text) and word_text[i] in _VOWELS)
        should_stretch = bool(stretch_hint or long_ratio >= 0.5 or tail_heavy or vowel_long >= 1)
        # Tail-heavy words like "too": keep onset grouped and give tail room to stretch.
        if tail_heavy and long_ratio < 0.5 and len(starts) >= 3:
            head_end = starts[0] + max(0.03, (starts[-1] - starts[0]) * 0.2)
            step = max(0.01, (head_end - starts[0]) / max(1, len(starts) - 2))
            for idx in range(1, len(starts) - 1):
                starts[idx] = round(starts[0] + step * idx, 3)
        emit = should_stretch or long_ratio >= 0.35
        return (starts if emit else None), should_stretch

    for mw in merged_word_objs:
        line_idx = mw["_line"]
        start = mw["start"]
        end = mw["end"]

        if current_line_words and start <= current_line_words[-1]["end"]:
            start = round(current_line_words[-1]["end"] + 0.01, 3)
            if end <= start:
                end = round(start + 0.1, 3)

        duration = end - start
        word_len = len(mw["word"].replace("'", ""))
        word_obj = {
            "word": mw["word"],
            "start": round(start, 3),
            "end": round(end, 3),
        }
        if mw.get("_interpolated"):
            word_obj["_interpolated"] = True
        stretch_hint = duration > 1.2 or (word_len > 2 and duration / max(word_len, 1) > 0.25)
        if mw.get("_chars"):
            char_starts, char_stretch = _smart_char_starts(mw["word"], mw["_chars"], stretch_hint=stretch_hint)
            if char_starts:
                word_obj["char_starts"] = char_starts
            if char_stretch:
                word_obj["stretch"] = True
        elif stretch_hint:
            word_obj["stretch"] = True

        # Clean up internal fields
        mw.pop("_group", None)
        mw.pop("_line", None)

        if line_idx != current_line_idx:
            if current_line_words:
                line_obj = {
                    "time": current_line_words[0]["start"],
                    "text": _join_words_cjk(current_line_words),
                    "words": current_line_words,
                }
                if all(w.get("_interpolated") for w in current_line_words):
                    line_obj["_interpolated"] = True
                lines_output.append(line_obj)
            current_line_idx = line_idx
            current_line_words = []
        current_line_words.append(word_obj)

    if current_line_words:
        line_obj = {
            "time": current_line_words[0]["start"],
            "text": _join_words_cjk(current_line_words),
            "words": current_line_words,
        }
        if all(w.get("_interpolated") for w in current_line_words):
            line_obj["_interpolated"] = True
        lines_output.append(line_obj)

    print(f"[aligner] ✅ Mapped {total_anchor} words across {len(lines_output)} lines (strict text from anchor)", file=sys.stderr)

    # ── LRC Time Correction ──
    # Use LRC line start times as MINIMUM start times for each line.
    # This prevents lines from being crammed earlier than they should be.
    # Only shift forward (never backward) to avoid creating gaps.
    if lrc_timings:
        non_empty_lrc = [(t, txt) for t, txt in lrc_timings if txt.strip()]
        last_matched_lrc_idx = -1  # Enforce sequential ordering
        for line in lines_output:
            words = line.get("words", [])
            if not words:
                continue
            line_norm = norm(line.get("text", ""))
            current_start = words[0]["start"]

            # Find matching LRC line — must be AFTER last matched (sequential)
            best_lrc_idx = -1
            best_lrc_time = None
            best_score = 0
            search_start = last_matched_lrc_idx + 1
            search_end = min(len(non_empty_lrc), search_start + 10)
            for lrc_i in range(search_start, search_end):
                lrc_t, lrc_txt = non_empty_lrc[lrc_i]
                lrc_norm = norm(lrc_txt)
                if not lrc_norm:
                    continue
                score = fuzz.ratio(line_norm, norm(lrc_txt))
                if score > best_score:
                    best_score = score
                    best_lrc_time = lrc_t
                    best_lrc_idx = lrc_i

            if best_lrc_idx >= 0 and best_score >= 55:
                last_matched_lrc_idx = best_lrc_idx
                # Shift words to match LRC timing (forward or backward)
                time_diff = best_lrc_time - current_start
                if abs(time_diff) > 1.0:
                    for w in words:
                        w["start"] = round(w["start"] + time_diff, 3)
                        w["end"] = round(w["end"] + time_diff, 3)
                # Keep line anchor at LRC start; optionally delay first fill a touch to avoid scroll/fill clash.
                line["time"] = round(best_lrc_time, 3)
                if len(words) >= 2 and words[0]["start"] <= best_lrc_time + 0.02 and (words[1]["start"] - best_lrc_time) > 0.18:
                    delayed = min(best_lrc_time + 0.06, words[0]["end"] - 0.04, words[1]["start"] - 0.04)
                    if delayed > words[0]["start"] + 0.02:
                        words[0]["start"] = round(delayed, 3)
                        if "char_starts" in words[0] and words[0]["char_starts"]:
                            words[0]["char_starts"][0] = words[0]["start"]

    # ── Enforce line monotonicity after LRC correction ──
    # LRC time correction can shift lines out of order. Fix by trimming the PREVIOUS
    # line's last word instead of shifting current line forward (which would break LRC timing).
    for i in range(1, len(lines_output)):
        prev_words = lines_output[i - 1].get("words", [])
        curr_words = lines_output[i].get("words", [])
        if not prev_words or not curr_words:
            continue
        prev_end = prev_words[-1]["end"]
        curr_start = curr_words[0]["start"]
        if curr_start < prev_end - 0.1:
            # Trim previous line's last word to end just before current line starts
            # This preserves LRC line start times as ground truth
            prev_words[-1]["end"] = round(curr_start - 0.02, 3)
            # If trimming makes duration negative/tiny, set a minimal duration
            if prev_words[-1]["end"] <= prev_words[-1]["start"]:
                prev_words[-1]["end"] = round(prev_words[-1]["start"] + 0.1, 3)
            # Remove stretch flag if we trimmed significantly
            if prev_words[-1].get("stretch") and (prev_words[-1]["end"] - prev_words[-1]["start"]) < 0.5:
                prev_words[-1].pop("stretch", None)

    # Line coherence repair
    max_internal_gap = 2.0
    for line in lines_output:
        words = line.get("words", [])
        if len(words) < 3:
            continue
        max_gap = 0
        max_gap_idx = 0
        for j in range(1, len(words)):
            gap = words[j]["start"] - words[j-1]["end"]
            if gap > max_gap:
                max_gap = gap
                max_gap_idx = j
        if max_gap <= max_internal_gap:
            continue
        before = words[:max_gap_idx]
        after = words[max_gap_idx:]
        if len(after) >= len(before):
            cluster_start = after[0]["start"]
            for k, w in enumerate(reversed(before)):
                w["start"] = round(cluster_start - (k + 1) * 0.2, 3)
                w["end"] = round(w["start"] + 0.15, 3)
                w.pop("stretch", None)
        else:
            cluster_end = before[-1]["end"]
            for k, w in enumerate(after):
                w["start"] = round(cluster_end + k * 0.2 + 0.01, 3)
                w["end"] = round(w["start"] + 0.15, 3)
                w.pop("stretch", None)
        line["time"] = words[0]["start"]

    # Split lines with big internal gaps
    split_lines = []
    for line in lines_output:
        words = line.get("words", [])
        if len(words) < 2:
            split_lines.append(line)
            continue
        chunks = [[words[0]]]
        for j in range(1, len(words)):
            if words[j]["start"] - words[j-1]["end"] > 3.0:
                chunks.append([words[j]])
            else:
                chunks[-1].append(words[j])
        if len(chunks) == 1:
            split_lines.append(line)
        else:
            for chunk in chunks:
                split_lines.append({
                    "time": chunk[0]["start"],
                    "text": _join_words_cjk(chunk),
                    "words": chunk,
                })

    # Clamp all timestamps to audio duration
    if audio_duration:
        for line in split_lines:
            if line.get("words"):
                for w in line["words"]:
                    w["start"] = min(w["start"], audio_duration - 0.1)
                    w["end"] = min(w["end"], audio_duration)
                line["time"] = line["words"][0]["start"]

    return split_lines


# ─── Blind Mode ───────────────────────────────────────────────────────────────

def _merge_cjk_char_words(words):
    """Merge adjacent single-CJK-character words into natural word groups.

    Whisper often outputs Japanese/Chinese as individual characters with equal spacing.
    Without reference lyrics, we merge them based on timing gaps:
    - If gap between two adjacent CJK chars is < 0.15s, merge them into one word.
    - A larger gap or a non-CJK word breaks the group.
    This produces natural word groups like セックス instead of セ ッ ク ス.
    """
    if not words:
        return words

    # Check if any words are single CJK characters
    has_single_cjk = any(
        len(w["word"].rstrip('、。！？,.!?')) <= 2 and _CJK_RE.search(w["word"])
        for w in words
    )
    if not has_single_cjk:
        return words

    merged = []
    group = None  # accumulating CJK group

    for w in words:
        stripped = w["word"].rstrip('、。！？,.!?')
        trailing = w["word"][len(stripped):]
        is_cjk_char = len(stripped) <= 2 and _CJK_RE.search(stripped)

        if is_cjk_char:
            if group is not None:
                # Check gap: if small enough, merge
                gap = w["start"] - group["end"]
                if gap < 0.15:
                    group["word"] += w["word"]
                    group["end"] = w["end"]
                    continue
                else:
                    # Gap too large — flush group, start new one
                    merged.append(group)
                    group = {"word": w["word"], "start": w["start"], "end": w["end"]}
            else:
                # Start new CJK group
                group = {"word": w["word"], "start": w["start"], "end": w["end"]}
        else:
            # Non-CJK: flush any pending group
            if group is not None:
                merged.append(group)
                group = None
            merged.append(w)

    # Flush final group
    if group is not None:
        merged.append(group)

    # Recalculate stretch markers for merged words
    for w in merged:
        duration = w.end - w.start
        word_len = len(w.word.replace("'", ""))
        if duration > 0.8 or (word_len > 0 and duration / word_len > 0.15):
            w.stretch = True
        else:
            w.pop("stretch", None)

    return merged


def format_blind(segments):
    lines = []
    for seg in segments:
        words = []
        if seg.words:
            for w in seg.words:
                word_text = w.word.strip()
                if not word_text:
                    continue
                duration = w.end - w.start
                word_len = len(word_text.replace("'", ""))
                word_obj = {"word": word_text, "start": round(w.start, 3), "end": round(w.end, 3)}
                if duration > 0.8 or (word_len > 0 and duration / word_len > 0.15):
                    word_obj["stretch"] = True
                words.append(word_obj)
        # Merge adjacent single CJK characters into natural word groups
        words = _merge_cjk_char_words(words)
        if words:
            lines.append({"time": words[0]["start"], "text": _join_words_cjk(words), "words": words})
    return lines


# ─── Gap Detection ────────────────────────────────────────────────────────────

def insert_vocal_cues(lines, whisper_segments=None, audio_duration=None):
    """
    Heuristic vocal cue insertion when no LRC timings are available.
    Detects gaps > 5s between consecutive lyric lines and inserts instrumental markers.
    """
    text_lines = [l for l in lines if l.get("type") != "vocal_cue" and l.get("words")]
    if len(text_lines) < 2:
        return lines

    gaps = []
    for i in range(len(text_lines) - 1):
        curr_words = text_lines[i].get("words", [])
        next_words = text_lines[i + 1].get("words", [])
        if not curr_words or not next_words:
            continue
        curr_end = curr_words[-1].get("end", curr_words[-1].get("start", 0))
        next_start = next_words[0].get("start", 0)
        gap = next_start - curr_end
        if gap > 5.0:
            gaps.append((curr_end + 0.3, next_start - 0.3))

    # Intro gap
    if text_lines and text_lines[0].get("words"):
        first_start = text_lines[0]["words"][0].get("start", 0)
        if first_start > 8.0:
            gaps.insert(0, (0.3, first_start - 0.3))

    # Outro gap
    if audio_duration and text_lines and text_lines[-1].get("words"):
        last_end = text_lines[-1]["words"][-1].get("end", 0)
        if audio_duration - last_end > 8.0:
            gaps.append((last_end + 0.3, audio_duration - 0.3))

    if not gaps:
        return lines

    print(f"[aligner] 🎵 Heuristic gaps detected: {[(f'{s:.0f}-{e:.0f}s') for s, e in gaps]}", file=sys.stderr)

    cues = []
    for gap_start, gap_end in gaps:
        gap_dur = gap_end - gap_start
        n_dots = min(4, max(2, int(gap_dur / 3)))
        spacing = gap_dur / (n_dots + 1)
        for d in range(n_dots):
            t = gap_start + spacing * (d + 1)
            cues.append({"type": "vocal_cue", "time": round(t, 2), "text": "●"})

    result = lines + cues
    result.sort(key=lambda l: l.get("time", 0))
    return result


def insert_vocal_cues_from_lrc(lines, lrc_timings, audio_duration=None):
    """
    Use LRC line-level timestamps to detect instrumental breaks.
    An empty LRC line or a gap > 5s between consecutive LRC lines = vocal_cue.
    This is far more reliable than guessing from Whisper output.

    KEY PRINCIPLE: When we have LRC timestamps, detect gaps DIRECTLY from LRC
    (ground truth), NOT from aligned output which may have interpolation artifacts.
    """
    lrc_gaps = []  # [(start_time, end_time)]

    # ── PRIMARY: Detect gaps directly from LRC timestamps ──
    # LRC timestamps are ground truth for when vocals occur.
    # A gap > 5s between consecutive non-empty LRC lines = instrumental break.
    non_empty_lines = [(t, txt) for t, txt in lrc_timings if txt.strip()]

    if len(non_empty_lines) >= 2:
        for i in range(len(non_empty_lines) - 1):
            curr_time, curr_txt = non_empty_lines[i]
            next_time, next_txt = non_empty_lines[i + 1]
            # The line occupies the full span until the next line starts.
            # Only consider it a "gap" (instrumental break) if the inter-line time
            # is much longer than what the text content would reasonably take to sing.
            line_span = next_time - curr_time
            # Estimate reasonable max singing duration for this line
            if _CJK_RE.search(curr_txt):
                char_count = len(curr_txt.replace(' ', ''))
                max_singing_dur = max(3.0, char_count * 0.4)
            else:
                word_count = len(curr_txt.split())
                max_singing_dur = max(2.0, word_count * 0.5)
            # Only insert gap if the span is significantly longer than singing could take
            if line_span > max_singing_dur + 5.0:
                gap_start = curr_time + max_singing_dur + 0.3
                gap_end = next_time - 0.3
                if gap_end - gap_start > 3.0:
                    lrc_gaps.append((gap_start, gap_end))

        # Also check gap before first LRC line (intro instrumental)
        if non_empty_lines[0][0] > 8.0:
            lrc_gaps.insert(0, (0.3, non_empty_lines[0][0] - 0.3))

        # Also check gap after last LRC line (outro instrumental)
        if audio_duration:
            last_time = non_empty_lines[-1][0]
            last_txt = non_empty_lines[-1][1]
            if _CJK_RE.search(last_txt):
                last_char_count = len(last_txt.replace(' ', ''))
                last_end = last_time + max(2.0, min(8.0, last_char_count * 0.2))
            else:
                last_words = len(last_txt.split())
                last_end = last_time + max(1.0, min(5.0, last_words * 0.3))
            if audio_duration - last_end > 8.0:
                lrc_gaps.append((last_end + 0.3, audio_duration - 0.3))

    if not lrc_gaps:
        # No gaps found, clean up flags and return
        for line in lines:
            line.pop("_interpolated", None)
            if line.get("words"):
                for w in line["words"]:
                    w.pop("_interpolated", None)
        return lines

    print(f"[aligner] 🎵 LRC gaps detected: {[(f'{s:.0f}-{e:.0f}s') for s, e in lrc_gaps]}", file=sys.stderr)

    # ─── Pre-check: detect compressed lines that should fill a gap ───
    # If lines immediately after a gap have impossibly short durations (< 0.15s/word),
    # they were likely interpolated into the wrong position and should be redistributed
    # across the gap instead of inserting a vocal_cue.
    final_gaps = []
    for gap_start, gap_end in lrc_gaps:
        gap_duration = gap_end - gap_start
        # Find lines that start within 2s after gap_end and are suspiciously compressed
        compressed_lines = []
        for line in lines:
            if line.get("type") == "vocal_cue":
                continue
            lt = line.get("time", 0)
            words = line.get("words", [])
            if words:
                lt = words[0]["start"]
            # Line starts at or just after gap_end
            if lt >= gap_end - 1.0 and lt < gap_end + 5.0 and words:
                line_dur = words[-1].get("end", lt) - words[0].get("start", lt)
                word_count = len(words)
                avg_per_word = line_dur / word_count if word_count > 0 else 999
                if avg_per_word < 0.15 and word_count >= 4:
                    compressed_lines.append(line)

        if compressed_lines:
            # Redistribute compressed lines across the gap
            total_words_to_spread = sum(len(l.get("words", [])) for l in compressed_lines)
            total_chars = sum(sum(len(w["word"]) for w in l.get("words", [])) for l in compressed_lines)
            # Add small intro gap for vocal_cue (if gap is long enough)
            cue_duration = min(3.0, gap_duration * 0.15)
            spread_start = gap_start + cue_duration
            spread_end = gap_end - 0.3
            spread_duration = spread_end - spread_start

            if spread_duration > 2.0 and total_chars > 0:
                # Insert a short vocal_cue at the start, then spread lines
                if cue_duration > 1.5:
                    final_gaps.append((gap_start, gap_start + cue_duration))

                # Redistribute word timings proportionally across the spread
                cursor = spread_start
                for line in compressed_lines:
                    words = line.get("words", [])
                    line_chars = sum(len(w["word"]) for w in words)
                    line_proportion = line_chars / total_chars
                    line_time_budget = spread_duration * line_proportion
                    line_start = cursor

                    for wi, w in enumerate(words):
                        w_chars = len(w["word"])
                        w_proportion = w_chars / line_chars if line_chars > 0 else 1.0 / len(words)
                        w_dur = max(0.3, line_time_budget * w_proportion)
                        w["start"] = round(cursor, 3)
                        w["end"] = round(cursor + w_dur, 3)
                        if w_dur > 0.8:
                            w["stretch"] = True
                        else:
                            w.pop("stretch", None)
                        cursor += w_dur

                    line["time"] = words[0]["start"]
                    line["text"] = _join_words_cjk(words)

                print(f"[aligner] 🔧 Redistributed {len(compressed_lines)} compressed lines into gap {gap_start:.0f}-{gap_end:.0f}s", file=sys.stderr)
            else:
                final_gaps.append((gap_start, gap_end))
        else:
            final_gaps.append((gap_start, gap_end))

    lrc_gaps = final_gaps

    if not lrc_gaps:
        # No gaps remaining after redistribution
        for line in lines:
            line.pop("_interpolated", None)
            if line.get("words"):
                for w in line["words"]:
                    w.pop("_interpolated", None)
        return lines

    # Insert vocal_cues at the detected gap positions
    # Simple approach: find the output line whose time is closest to gap_end, insert cue before it
    result = []
    gaps_inserted = set()

    for line in lines:
        if line.get("type") == "vocal_cue":
            continue

        line_time = line.get("time", 0)

        # Check if any gap should go before this line
        for gi, (gap_start, gap_end) in enumerate(lrc_gaps):
            if gi in gaps_inserted:
                continue
            # Insert cue if this line starts at or after the gap end
            if line_time >= gap_end - 2.0:
                # Skip intro gaps: if only 0-2 text lines precede this gap,
                # it's a track intro, not a mid-song break
                text_lines_before = len([l for l in result if l.get("type") != "vocal_cue"])
                if text_lines_before <= 2:
                    print(f"[aligner] ⏭️  Skipping intro cue at {gap_start:.1f}-{gap_end:.1f}s (only {text_lines_before} text lines before)", file=sys.stderr)
                else:
                    # Don't insert cue if it overlaps with the previous line's actual singing
                    # Use the previous line's start time + reasonable duration as boundary
                    # (Whisper word end times can be unreliable for CJK)
                    prev_line = next((l for l in reversed(result) if l.get("type") != "vocal_cue" and l.get("words")), None)
                    prev_line_start = prev_line.get("time", 0) if prev_line else 0
                    # If the previous line starts AFTER the gap start, it overlaps
                    if prev_line and prev_line_start > gap_start - 0.5:
                        print(f"[aligner] ⏭️  Skipping overlapping cue at {gap_start:.1f}-{gap_end:.1f}s (prev line starts at {prev_line_start:.1f}s)", file=sys.stderr)
                    else:
                        result.append({"type": "vocal_cue", "time": round(gap_start, 3), "end": round(gap_end, 3)})
                gaps_inserted.add(gi)

        result.append(line)

    # Clean up internal flags
    for line in result:
        line.pop("_interpolated", None)
        if line.get("words"):
            for w in line["words"]:
                w.pop("_interpolated", None)

    return result


# ─── Genius Text + LRC Timestamps + Whisper Word Timing ──────────────────────

def map_genius_lrc_whisper(anchor_text, lrc_timings, whisper_segments, audio_duration=None):
    """
    Strategy: Genius provides TEXT (explicit), LRC provides LINE TIMESTAMPS,
    Whisper provides WORD-LEVEL timing within each line's time window.
    """
    from rapidfuzz import fuzz

    def norm(s):
        if not s:
            return ""
        return re.sub(r'[^\w]', '', s.lower(), flags=re.UNICODE).replace('_', '')

    anchor_lines = [l.strip() for l in anchor_text.strip().split('\n') if l.strip()]
    non_empty_lrc = [(t, txt) for t, txt in lrc_timings if txt.strip()]

    # Flatten all Whisper words
    whisper_words = []
    for seg in whisper_segments:
        if hasattr(seg, 'no_speech_prob') and seg.no_speech_prob > 0.95:
            continue
        seg_words = seg.words if hasattr(seg, 'words') else seg.get("words", [])
        seg_text = seg.text if hasattr(seg, 'text') else seg.get("text", "")
        if seg_words:
            for w in seg_words:
                whisper_words.append({
                    "word": (w.word if hasattr(w, 'word') else w.get("word", "")).strip(),
                    "start": round(w.start if hasattr(w, 'start') else w.get("start", 0), 3),
                    "end": round(w.end if hasattr(w, 'end') else w.get("end", 0), 3),
                })

    print(f"[aligner] 🎯 Genius+LRC+Whisper mode: {len(anchor_lines)} Genius lines, {len(non_empty_lrc)} LRC lines, {len(whisper_words)} Whisper words", file=sys.stderr)

    # ── LRC Global Offset Detection ──
    # Sometimes the LRC timestamps from APIs are globally shifted (e.g., 10s too late).
    # Detect by finding where Whisper places the first few lines vs where LRC says they are.
    # Strategy: for first 3 LRC lines, find the matching sequence of Whisper words anywhere
    # and compute the offset.
    if whisper_words and non_empty_lrc and len(non_empty_lrc) >= 3:
        offsets = []
        for lrc_i in range(min(5, len(non_empty_lrc))):
            lrc_t, lrc_txt = non_empty_lrc[lrc_i]
            if not lrc_txt.strip():
                continue
            lrc_words_lower = [w.lower().strip('.,!?"\'-') for w in lrc_txt.split() if len(w) > 1]
            if len(lrc_words_lower) < 2:
                continue
            # Look for the first 2 words of this LRC line appearing consecutively in Whisper
            target_w1 = lrc_words_lower[0]
            target_w2 = lrc_words_lower[1]
            for wi in range(len(whisper_words) - 1):
                w1_text = whisper_words[wi]["word"].lower().strip('.,!?"\'-')
                w2_text = whisper_words[wi+1]["word"].lower().strip('.,!?"\'-')
                if w1_text == target_w1 and w2_text == target_w2:
                    whisper_time = whisper_words[wi]["start"]
                    offset = lrc_t - whisper_time
                    if abs(offset) > 2.0:  # Only count significant offsets
                        offsets.append(offset)
                    break  # Use first match only
        if len(offsets) >= 2:
            # Check if offsets are consistent (within 3s of each other)
            median_offset = sorted(offsets)[len(offsets) // 2]
            consistent = sum(1 for o in offsets if abs(o - median_offset) < 3.0)
            if consistent >= 2 and abs(median_offset) > 3.0:
                # Safety: if LRC starts near 0 and offset is negative (would push times forward),
                # it likely means Whisper matched a later repetition — don't shift
                first_lrc_time = non_empty_lrc[0][0] if non_empty_lrc else 0
                if median_offset < 0 and first_lrc_time < 5.0:
                    print(f"[aligner] ⚠️ LRC global offset detected: {median_offset:.1f}s but LRC starts near 0 — skipping correction (likely repeated lyrics)", file=sys.stderr)
                else:
                    print(f"[aligner] ⚠️ LRC global offset detected: {median_offset:.1f}s (LRC is {median_offset:.1f}s late). Correcting.", file=sys.stderr)
                    non_empty_lrc = [(t - median_offset, txt) for t, txt in non_empty_lrc]

    # Step 1: Group Genius lines by LRC line (handles Genius splitting one LRC line into multiple)
    # For each Genius line, find which LRC line it belongs to
    genius_to_lrc = []  # [(genius_idx, lrc_idx, score)]
    last_matched = -1
    for li, genius_text in enumerate(anchor_lines):
        genius_norm = norm(genius_text)
        if not genius_norm:
            genius_to_lrc.append((li, -1, 0))
            continue

        best_lrc_idx = -1
        best_score = 0
        search_start = max(0, last_matched)
        search_end = min(len(non_empty_lrc), search_start + 10)

        for lrc_i in range(search_start, search_end):
            lrc_t, lrc_txt = non_empty_lrc[lrc_i]
            lrc_norm = norm(lrc_txt)
            if not lrc_norm:
                continue
            score = fuzz.ratio(genius_norm, lrc_norm)
            if genius_norm in lrc_norm:
                score = max(score, 85)
            if score > best_score:
                best_score = score
                best_lrc_idx = lrc_i

        if best_lrc_idx >= 0 and best_score >= 50:
            genius_to_lrc.append((li, best_lrc_idx, best_score))
            if best_lrc_idx > last_matched:
                last_matched = best_lrc_idx
        else:
            genius_to_lrc.append((li, -1, 0))

    # Step 2: Group by LRC index — merge Genius lines that share same LRC line
    from collections import defaultdict
    lrc_groups = defaultdict(list)
    unmatched_genius = []
    for li, lrc_idx, score in genius_to_lrc:
        if lrc_idx >= 0:
            lrc_groups[lrc_idx].append(li)
        else:
            unmatched_genius.append(li)

    merged_count = sum(1 for g in lrc_groups.values() if len(g) > 1)
    if merged_count:
        print(f"[aligner] 🔗 Merged {merged_count} LRC lines (Genius had them split)", file=sys.stderr)

    # ══════════════════════════════════════════════════════════════════════════
    # GLOBAL SEQUENTIAL WORD MAPPING
    # ══════════════════════════════════════════════════════════════════════════
    # Whisper word timestamps are accurate, but Whisper may group multiple LRC lines
    # into one segment. Instead of matching per-line, we:
    # 1. Flatten ALL whisper words into a single sequence with timestamps
    # 2. Flatten ALL LRC words into a single sequence (preserving line boundaries)
    # 3. Map whisper timestamps to LRC words based on time windows
    # 4. Filter out hallucinated Whisper segments

    # ══════════════════════════════════════════════════════════════════════════
    # HALLUCINATION FILTERING
    # ══════════════════════════════════════════════════════════════════════════
    # Whisper sometimes hallucinates (repeating same word, e.g., "supernatural" 200x)
    # Detect and filter out hallucinated words before mapping.
    # Hallucination patterns:
    # 1. Same word repeated many times in sequence
    # 2. Very low unique word ratio (< 30%)
    # 3. Many words with zero duration (start == end)

    def is_hallucinated_sequence(words):
        """Check if a sequence of words is likely hallucinated."""
        if len(words) < 5:
            return False
        unique = len(set(w["word"].lower() for w in words))
        ratio = unique / len(words)
        if ratio < 0.3:  # Less than 30% unique words
            return True
        # Check for consecutive repeats
        repeats = 0
        for i in range(1, len(words)):
            if words[i]["word"].lower() == words[i-1]["word"].lower():
                repeats += 1
        if repeats > len(words) * 0.5:  # More than 50% consecutive repeats
            return True
        return False

    # Filter whisper words - remove hallucinations
    # Group by detecting when a new "real" segment starts (capital letter after gap)
    filtered_whisper_words = []
    current_segment = []

    for w in whisper_words:
        if not w["word"].strip() or w["start"] <= 0:
            continue

        # Check if this starts a new segment (gap > 1s or ends current segment)
        if current_segment:
            gap = w["start"] - current_segment[-1]["end"]
            if gap > 1.0 or (w["word"][0].isupper() and gap > 0.3):
                # End of segment - check if it's hallucinated
                if not is_hallucinated_sequence(current_segment):
                    filtered_whisper_words.extend(current_segment)
                current_segment = []

        current_segment.append(w)

    # Don't forget the last segment
    if current_segment and not is_hallucinated_sequence(current_segment):
        filtered_whisper_words.extend(current_segment)

    # Also filter individual words with zero duration at same timestamp
    seen_timestamps = {}
    final_whisper_words = []
    for w in filtered_whisper_words:
        ts_key = (round(w["start"], 2), round(w["end"], 2))
        if ts_key not in seen_timestamps:
            seen_timestamps[ts_key] = 0
        seen_timestamps[ts_key] += 1
        # Allow max 3 words at same timestamp
        if seen_timestamps[ts_key] <= 3:
            final_whisper_words.append(w)

    valid_whisper_words = final_whisper_words
    valid_whisper_words.sort(key=lambda x: x["start"])

    hallucinated_count = len(whisper_words) - len(valid_whisper_words)
    if hallucinated_count > 10:
        print(f"[aligner] 🚫 Filtered {hallucinated_count} hallucinated whisper words", file=sys.stderr)

    n_whisper_words = len(valid_whisper_words)
    print(f"[aligner] 📊 Valid Whisper words after filtering: {n_whisper_words}", file=sys.stderr)

    # ══════════════════════════════════════════════════════════════════════════
    # CONTENT-BASED GLOBAL WORD ALIGNMENT
    # ══════════════════════════════════════════════════════════════════════════
    # Core principles:
    #   • Whisper word TIMESTAMPS are accurate and smooth — but Whisper mishears
    #     words and groups several LRC lines into one segment.
    #   • LRC LINE start times are ground truth for *where a line begins*.
    #   • Genius/LRC text is ground truth for *what words are sung*.
    #
    # The old approach mapped LRC words → Whisper words by POSITION within a ±1.5s
    # time window. Any missed/extra/misheard Whisper word (or words bleeding in
    # from an adjacent line) shifted every following index, smearing the timing.
    #
    # Instead we align the full LRC word stream to the full Whisper word stream by
    # CONTENT (difflib), borrow Whisper's exact timestamps for matched words, and
    # interpolate the gaps — all bounded inside each line's LRC window. Each match
    # is verified against the line's LRC window (trust Whisper, check the LRC cue),
    # so a chorus repetition matched far away is rejected.
    from difflib import SequenceMatcher

    def _interp_starts(starts, lo, hi, t_left, t_right, words):
        """Spread start times for words[lo:hi] across (t_left, t_right) by char length."""
        seg = words[lo:hi]
        if not seg:
            return
        total = max(1, sum(len(w) for w in seg))
        span = max(0.0, t_right - t_left)
        cursor = t_left
        for idx, w in enumerate(seg):
            starts[lo + idx] = cursor
            cursor += span * (max(len(w), 1) / total)

    def _proportional(words, start, end):
        """Even, char-weighted timing fallback within an LRC window."""
        total_chars = max(1, sum(len(w) for w in words))
        dur = min(total_chars * 0.15, max(0.5, end - start), 8.0)
        dur = max(dur, 0.5)
        cursor = start
        out = []
        for w in words:
            wd = max(0.1, dur * (max(len(w), 1) / total_chars))
            out.append({"word": w, "start": round(cursor, 3), "end": round(cursor + wd, 3)})
            cursor += wd
        return out

    # Build per-line specs (text + word list + LRC window), preserving LRC order
    specs = []
    for lrc_i, (lrc_t, lrc_txt) in enumerate(non_empty_lrc):
        if lrc_i not in lrc_groups:
            continue
        genius_indices = lrc_groups[lrc_i]
        merged_text = ' '.join(anchor_lines[gi] for gi in genius_indices)
        if ' ' in merged_text.strip() and _CJK_RE.search(merged_text):
            merged_words = merged_text.split()
        else:
            merged_words = _split_words_cjk(merged_text)
        lrc_start = lrc_t
        lrc_end = non_empty_lrc[lrc_i + 1][0] if lrc_i + 1 < len(non_empty_lrc) else (audio_duration or lrc_start + 8)
        specs.append({
            "text": merged_text,
            "words": merged_words,
            "start": lrc_start,
            "end": lrc_end,
            "is_cjk": bool(merged_words and _CJK_RE.search(merged_text) and ' ' in merged_text.strip()),
            "anchor": {},  # word_index -> {"start","end"} from Whisper
        })

    # Flatten LRC stream with back-references (spec_index, word_index)
    lrc_tokens = []
    for si, sp in enumerate(specs):
        for wi, w in enumerate(sp["words"]):
            lrc_tokens.append((si, wi))
    lrc_norm_seq = [norm(specs[si]["words"][wi]) for (si, wi) in lrc_tokens]
    whisper_norm_seq = [norm(w["word"]) for w in valid_whisper_words]

    # Global content alignment → anchor map: lrc_token_index -> whisper word
    ANCHOR_TOL = 2.5  # seconds of slack vs LRC window before a match is rejected
    if lrc_norm_seq and whisper_norm_seq:
        sm = SequenceMatcher(None, lrc_norm_seq, whisper_norm_seq, autojunk=False)
        prev_lt = -1
        prev_wi = -1
        for i, j, n in sm.get_matching_blocks():
            for k in range(n):
                lt = i + k
                if not lrc_norm_seq[lt]:
                    continue  # skip punctuation-only tokens
                ww_idx = j + k
                if ww_idx >= len(valid_whisper_words):
                    continue
                # Locality guard for repeated tokens (e.g. da-da-da lines).
                expected_wi = int((lt / max(1, len(lrc_norm_seq) - 1)) * max(0, len(whisper_norm_seq) - 1))
                if abs(ww_idx - expected_wi) > max(40, int(len(whisper_norm_seq) * 0.18)):
                    continue
                if prev_lt >= 0 and lt > prev_lt:
                    delta_l = lt - prev_lt
                    delta_w = ww_idx - prev_wi
                    if delta_w > max(6, delta_l * 4 + 2):
                        continue

                ww = valid_whisper_words[ww_idx]
                si, wi = lrc_tokens[lt]
                sp = specs[si]
                # Verify Whisper placed this word inside the line's LRC window
                if sp["start"] - ANCHOR_TOL <= ww["start"] < sp["end"] + ANCHOR_TOL:
                    sp["anchor"][wi] = {"start": ww["start"], "end": ww["end"]}
                    prev_lt = lt
                    prev_wi = ww_idx

    anchored_lines = sum(1 for sp in specs if sp["anchor"])
    print(f"[aligner] 🧩 Content alignment: {anchored_lines}/{len(specs)} lines anchored to Whisper", file=sys.stderr)

    # Build output: anchored words use Whisper timing, gaps interpolated within window
    lines_output = []
    matched_count = 0

    for sp in specs:
        words = sp["words"]
        n = len(words)
        if n == 0:
            continue
        matched_count += 1
        start, end = sp["start"], sp["end"]
        anchor = sp["anchor"]

        # CJK: distribute proportionally by character count (preserve space boundaries)
        if sp["is_cjk"]:
            total_chars = max(1, sum(len(w) for w in words))
            total_dur = min(total_chars * 0.4, end - start, 12.0)
            cursor = start
            word_data = []
            for k, mw in enumerate(words):
                w_dur = total_dur * (len(mw) / total_chars)
                entry = {"word": mw, "start": round(cursor, 3), "end": round(cursor + w_dur, 3)}
                if k > 0:
                    entry["_space_boundary"] = True
                word_data.append(entry)
                cursor += w_dur
            lines_output.append({"time": round(start, 2), "text": sp["text"], "words": word_data})
            continue

        # No reliable Whisper coverage — proportional fallback within LRC window.
        # Begin filling at the actual vocal onset (first Whisper word inside the
        # window) instead of the LRC line start, so we don't "slowly fill" the
        # first word across the pre-vocal gap (line @30s, vocals @31s).
        if not anchor:
            onset = start
            for ww in valid_whisper_words:
                if ww["start"] >= start - 0.5 and ww["start"] < end:
                    onset = max(start, ww["start"])
                    break
            word_data = _proportional(words, onset, min(end, onset + 8.0))
            lines_output.append({"time": round(start, 2), "text": sp["text"], "words": word_data})
            continue

        # Fill a start time for every word: anchors are fixed, gaps interpolated
        starts = [None] * n
        for k in anchor:
            starts[k] = anchor[k]["start"]
        anchor_idxs = sorted(anchor.keys())
        first_a, last_a = anchor_idxs[0], anchor_idxs[-1]

        # Words before first anchor: cluster them JUST BEFORE the first anchored
        # word's onset — do NOT stretch them back to the LRC line start, which
        # would make the first word slowly fill during the pre-vocal gap.
        if first_a > 0:
            a_start = anchor[first_a]["start"]
            budget = max(0.0, min(a_start - start, 0.35 * first_a))
            left = max(start, a_start - budget)
            _interp_starts(starts, 0, first_a, left, a_start, words)
        # Words between consecutive anchors
        for ai in range(len(anchor_idxs) - 1):
            a0, a1 = anchor_idxs[ai], anchor_idxs[ai + 1]
            if a1 - a0 > 1:
                _interp_starts(starts, a0 + 1, a1, anchor[a0]["end"], anchor[a1]["start"], words)
        # Words after last anchor: spread toward line end
        if last_a < n - 1:
            right = min(end, anchor[last_a]["end"] + (n - 1 - last_a) * 0.4)
            right = max(right, anchor[last_a]["end"] + 0.1)
            _interp_starts(starts, last_a + 1, n, anchor[last_a]["end"], right, words)

        # Assemble word entries (end = next word's start, or anchor/own tail)
        word_data = []
        for k in range(n):
            s = starts[k]
            if s is None:
                s = (word_data[k - 1]["start"] + 0.1) if word_data else start
            word_data.append({"word": words[k], "start": s, "end": s})
        for k in range(n):
            if k in anchor and anchor[k]["end"] > word_data[k]["start"]:
                word_data[k]["end"] = anchor[k]["end"]
            if k + 1 < n and word_data[k + 1]["start"] > word_data[k]["start"]:
                word_data[k]["end"] = word_data[k + 1]["start"]
            elif k == n - 1:
                word_data[k]["end"] = max(word_data[k]["end"], min(end, word_data[k]["start"] + 0.6))

        # Monotonic cleanup, duration caps, stretch flags, rounding
        for k in range(n):
            if k > 0 and word_data[k]["start"] < word_data[k - 1]["end"]:
                word_data[k]["start"] = word_data[k - 1]["end"] + 0.01
            if word_data[k]["end"] <= word_data[k]["start"]:
                word_data[k]["end"] = word_data[k]["start"] + 0.1
            dur = word_data[k]["end"] - word_data[k]["start"]
            if dur > 5.0:
                word_data[k]["end"] = word_data[k]["start"] + 5.0
                word_data[k]["stretch"] = True
            elif k == n - 1 and dur > 1.0:
                word_data[k]["stretch"] = True
            word_data[k]["start"] = round(word_data[k]["start"], 3)
            word_data[k]["end"] = round(word_data[k]["end"], 3)

        lines_output.append({"time": round(start, 2), "text": sp["text"], "words": word_data})

    # Add unmatched Genius lines (estimate timing)
    for gi in unmatched_genius:
        prev_time = lines_output[-1]["time"] + 3.0 if lines_output else 0
        lines_output.append({"time": round(prev_time, 2), "text": anchor_lines[gi]})

    print(f"[aligner] ✅ Genius+LRC+Whisper: {matched_count}/{len(anchor_lines)} Genius lines matched, {len(lines_output)} output lines", file=sys.stderr)
    if unmatched_genius:
        print(f"[aligner] ❌ Unmatched Genius lines: {[(i, anchor_lines[i][:30]) for i in unmatched_genius[:5]]}", file=sys.stderr)

    return lines_output


# ─── API LRC Validation ──────────────────────────────────────────────────────

def _validate_api_lrc_against_whisper(lrc_timings, whisper_segments, anchor_text=None):
    """
    Validate API LRC timestamps against Whisper word positions.
    If they align well (first lines' timestamps match where Whisper heard those words),
    the API LRC can be trusted as if it were a local .lrc file.

    Returns True if API LRC timestamps match the audio mastering.
    """
    from rapidfuzz import fuzz

    # Flatten Whisper words
    whisper_words = []
    for seg in whisper_segments:
        if hasattr(seg, 'no_speech_prob') and seg.no_speech_prob > 0.95:
            continue
        if seg.words:
            for w in seg.words:
                text = w.word.strip() if hasattr(w, 'word') else ""
                start = w.start if hasattr(w, 'start') else 0
                end = w.end if hasattr(w, 'end') else 0
                if text:
                    whisper_words.append({"start": start, "end": end, "text": text})

    if not whisper_words or not lrc_timings:
        return False

    non_empty_lrc = [(t, txt) for t, txt in lrc_timings if txt.strip()]
    if len(non_empty_lrc) < 5:
        return False

    def norm(s):
        return re.sub(r'[^\w]', '', s.lower(), flags=re.UNICODE).replace('_', '') if s else ""

    # For each of the first N LRC lines, find where Whisper places those words
    # and compare the timestamps
    matches = 0
    checks = 0
    max_checks = min(8, len(non_empty_lrc))

    for lrc_i in range(max_checks):
        lrc_time, lrc_text = non_empty_lrc[lrc_i]
        if not lrc_text.strip():
            continue

        lrc_words = [w.strip('.,!?"\'-') for w in lrc_text.split() if len(w.strip('.,!?"\'-')) > 1]
        if len(lrc_words) < 2:
            continue

        # Find first 2 words of this LRC line in Whisper output (consecutive)
        target_w1 = norm(lrc_words[0])
        target_w2 = norm(lrc_words[1])
        if not target_w1 or not target_w2:
            continue

        checks += 1
        for wi in range(len(whisper_words) - 1):
            w1_norm = norm(whisper_words[wi]["text"])
            w2_norm = norm(whisper_words[wi + 1]["text"])
            if not w1_norm or not w2_norm:
                continue

            w1_match = (w1_norm == target_w1 or fuzz.ratio(w1_norm, target_w1) >= 80)
            w2_match = (w2_norm == target_w2 or fuzz.ratio(w2_norm, target_w2) >= 80)

            if w1_match and w2_match:
                whisper_time = whisper_words[wi]["start"]
                time_diff = abs(lrc_time - whisper_time)
                # If LRC timestamp is within 3s of where Whisper heard the words → match
                if time_diff <= 3.0:
                    matches += 1
                elif time_diff <= 5.0:
                    matches += 0.5  # Partial credit for close-ish matches
                break  # Use first match only

    if checks < 3:
        # Not enough lines to validate
        print(f"[aligner] ℹ️ API LRC validation: only {checks} lines checked, not enough to validate", file=sys.stderr)
        return False

    match_ratio = matches / checks
    print(f"[aligner] 📐 API LRC validation: {matches:.1f}/{checks} lines matched within tolerance (ratio={match_ratio:.2f})", file=sys.stderr)

    # If ≥40% of checked lines match, trust the API LRC
    if match_ratio >= 0.4:
        return True

    return False


# ─── Local Lyrics as Anchor ───────────────────────────────────────────────────

def _get_local_lyrics_as_anchor(audio_path):
    """
    Extract plain text lyrics from local .lrc sidecar or embedded metadata.
    These match the exact file version and should be preferred over Genius
    when they are more complete.
    Returns plain text (newline-separated lines) or None.
    """
    lines = []

    # Priority 1: Local .lrc sidecar file
    lrc_path = re.sub(r'\.[^.]+$', '.lrc', audio_path)
    if os.path.exists(lrc_path):
        try:
            lrc_content = open(lrc_path, 'r', encoding='utf-8').read()
            for line in lrc_content.strip().split('\n'):
                # Strip LRC timestamps
                cleaned = re.sub(r'\[\d{1,2}:\d{2}\.\d{2,3}\]\s*', '', line).strip()
                # Skip metadata tags like [ar:Artist]
                if cleaned and not re.match(r'^\[.*\]$', cleaned):
                    lines.append(cleaned)
            if len(lines) >= 5:
                print(f"[aligner] 📂 Local .lrc text: {len(lines)} lines", file=sys.stderr)
                return '\n'.join(lines)
        except Exception as e:
            print(f"[aligner] ⚠️ Failed to read local .lrc for anchor: {e}", file=sys.stderr)

    # Priority 2: Embedded metadata lyrics (LYRICS/UNSYNCEDLYRICS tag)
    try:
        import subprocess as _sp
        r = _sp.run(
            ['ffprobe', '-v', 'quiet', '-print_format', 'json', '-show_format', audio_path],
            capture_output=True, text=True, timeout=10
        )
        if r.returncode == 0:
            data = json.loads(r.stdout)
            tags = data.get('format', {}).get('tags', {})
            # Try synced lyrics first
            lyrics_text = (tags.get('LYRICS', '') or tags.get('lyrics', '') or
                          tags.get('UNSYNCEDLYRICS', '') or tags.get('unsyncedlyrics', ''))
            if lyrics_text:
                # Strip LRC timestamps if present
                if re.search(r'\[\d{1,2}:\d{2}\.\d{2,3}\]', lyrics_text):
                    for line in lyrics_text.strip().split('\n'):
                        cleaned = re.sub(r'\[\d{1,2}:\d{2}\.\d{2,3}\]\s*', '', line).strip()
                        if cleaned and not re.match(r'^\[.*\]$', cleaned):
                            lines.append(cleaned)
                else:
                    # Plain text lyrics in metadata
                    lines = [l.strip() for l in lyrics_text.strip().split('\n') if l.strip()]

                if len(lines) >= 5:
                    print(f"[aligner] 📂 Embedded metadata lyrics: {len(lines)} lines", file=sys.stderr)
                    return '\n'.join(lines)
    except Exception as e:
        print(f"[aligner] ⚠️ Failed to read embedded lyrics for anchor: {e}", file=sys.stderr)

    return None


def _merge_timings_preserving_metadata(existing_lines, new_lines):
    """Update start/end (and optional char_starts) without touching existing custom tags."""
    from difflib import SequenceMatcher

    if not isinstance(existing_lines, list) or not isinstance(new_lines, list):
        return new_lines, {"updated_words": 0, "total_existing_words": 0, "total_new_words": 0, "old_coverage": 0.0, "new_coverage": 0.0}

    merged = copy.deepcopy(existing_lines)

    def _norm(s):
        return re.sub(r'[^\w]', '', (s or '').lower(), flags=re.UNICODE).replace('_', '')

    old_refs, old_tokens = [], []
    for li, line in enumerate(merged):
        for wi, word in enumerate(line.get("words", []) or []):
            old_refs.append((li, wi))
            old_tokens.append(_norm(word.get("word") or word.get("text") or ""))

    new_refs, new_tokens = [], []
    for li, line in enumerate(new_lines):
        for wi, word in enumerate(line.get("words", []) or []):
            new_refs.append((li, wi))
            new_tokens.append(_norm(word.get("word") or word.get("text") or ""))

    if not old_tokens or not new_tokens:
        return new_lines, {
            "updated_words": 0,
            "total_existing_words": len(old_tokens),
            "total_new_words": len(new_tokens),
            "old_coverage": 0.0,
            "new_coverage": 0.0,
        }

    sm = SequenceMatcher(None, old_tokens, new_tokens, autojunk=False)
    updated = 0
    for i, j, n in sm.get_matching_blocks():
        for k in range(n):
            oi = i + k
            nj = j + k
            if oi >= len(old_refs) or nj >= len(new_refs):
                continue
            old_li, old_wi = old_refs[oi]
            new_li, new_wi = new_refs[nj]
            old_word = merged[old_li].get("words", [])[old_wi]
            new_word = (new_lines[new_li].get("words", []) or [])[new_wi]
            if "start" in new_word:
                old_word["start"] = new_word["start"]
            if "end" in new_word:
                old_word["end"] = new_word["end"]
            if "char_starts" in new_word and isinstance(new_word["char_starts"], list):
                old_word["char_starts"] = list(new_word["char_starts"])
                old_word["stretch"] = True
            updated += 1

    for line in merged:
        words = line.get("words", []) or []
        if words:
            line["time"] = words[0].get("start", line.get("time", 0))

    old_cov = updated / max(1, len(old_tokens))
    new_cov = updated / max(1, len(new_tokens))
    return merged, {
        "updated_words": updated,
        "total_existing_words": len(old_tokens),
        "total_new_words": len(new_tokens),
        "old_coverage": old_cov,
        "new_coverage": new_cov,
    }


# ─── Main ─────────────────────────────────────────────────────────────────────

# ─── Acoustic Feature Analysis ─────────────────────────────────────────────────

def _tag_acoustic_features(audio_path, lines):
    """
    Analyze audio to tag words with whisper/spoken/sung flags.
    Uses librosa for pitch (pyin) and RMS energy analysis.
    Processes in bulk per-line for efficiency.
    """
    try:
        import librosa
        import numpy as np
    except ImportError:
        print("[aligner] ⚠️ librosa not installed — skipping acoustic feature tagging", file=sys.stderr)
        return

    print("[aligner] 🎤 Running acoustic feature analysis (whisper/spoken/sung)...", file=sys.stderr)

    # Load audio once (mono, native sr)
    y, sr = librosa.load(audio_path, sr=22050, mono=True)
    total_duration = len(y) / sr

    # Precompute full-track RMS for relative thresholds
    frame_length = 2048
    hop_length = 512
    rms_full = librosa.feature.rms(y=y, frame_length=frame_length, hop_length=hop_length)[0]
    rms_median = float(np.median(rms_full[rms_full > 0])) if np.any(rms_full > 0) else 0.01
    whisper_threshold = rms_median * 0.3  # Below 30% of median = whisper

    tagged_count = {"whisper": 0, "spoken": 0, "sung": 0}

    for line in lines:
        if line.get("type") == "vocal_cue":
            continue
        words = line.get("words", [])
        if not words:
            continue

        # Get line audio segment for pitch analysis (more efficient than per-word)
        line_start = words[0].get("start", 0)
        line_end = words[-1].get("end", line_start + 1)
        if line_end <= line_start:
            continue

        start_sample = int(line_start * sr)
        end_sample = min(int(line_end * sr), len(y))
        if end_sample <= start_sample:
            continue

        y_line = y[start_sample:end_sample]
        if len(y_line) < frame_length:
            continue

        # Compute pitch for the line segment using pyin
        f0, voiced_flag, voiced_prob = librosa.pyin(
            y_line, fmin=60, fmax=600, sr=sr,
            frame_length=frame_length, hop_length=hop_length
        )

        # Compute RMS for the line segment
        rms_line = librosa.feature.rms(y=y_line, frame_length=frame_length, hop_length=hop_length)[0]

        line_duration = line_end - line_start
        frames_per_sec = sr / hop_length

        for w in words:
            w_start = w.get("start", 0)
            w_end = w.get("end", w_start + 0.1)
            w_dur = w_end - w_start
            if w_dur < 0.05:
                continue

            # Map word times to frame indices within line segment
            w_rel_start = max(0, w_start - line_start)
            w_rel_end = min(line_duration, w_end - line_start)
            frame_start = int(w_rel_start * frames_per_sec)
            frame_end = int(w_rel_end * frames_per_sec)
            frame_end = min(frame_end, len(rms_line) - 1)
            if frame_start >= frame_end:
                continue

            # ── Whisper detection: low RMS energy ──
            word_rms = rms_line[frame_start:frame_end + 1]
            if len(word_rms) > 0:
                word_rms_mean = float(np.mean(word_rms))
                if len(word_rms) >= 4:
                    onset_thr = max(whisper_threshold * 1.2, word_rms_mean * 1.35)
                    onset_i = next((ix for ix, rv in enumerate(word_rms) if rv >= onset_thr), None)
                    if onset_i is not None and onset_i > 0:
                        onset_shift = onset_i / frames_per_sec
                        if onset_shift > 0.04:
                            max_shift = min(0.35, w_dur * 0.6)
                            shifted_start = min(w_end - 0.04, w_start + min(onset_shift, max_shift))
                            if shifted_start > w_start + 0.02:
                                w["start"] = round(shifted_start, 3)
                                if "char_starts" in w and isinstance(w["char_starts"], list) and w["char_starts"]:
                                    w["char_starts"][0] = w["start"]
                if word_rms_mean < whisper_threshold and word_rms_mean > 0:
                    w["whisper"] = True
                    tagged_count["whisper"] += 1
                    continue  # Whisper overrides spoken/sung

            # ── Spoken vs Sung: pitch variance analysis ──
            if f0 is not None and frame_end < len(f0):
                word_f0 = f0[frame_start:frame_end + 1]
                voiced_frames = word_f0[~np.isnan(word_f0)]

                if len(voiced_frames) >= 2:
                    # Pitch variance (in semitones for perceptual relevance)
                    f0_semitones = 12 * np.log2(voiced_frames / np.median(voiced_frames))
                    pitch_std = float(np.std(f0_semitones))

                    # Thresholds tuned empirically:
                    # spoken/rap: pitch_std < 1.5 semitones (relatively flat)
                    # sung: pitch_std > 2.5 semitones (clear melodic movement)
                    if pitch_std < 1.5:
                        w["spoken"] = True
                        tagged_count["spoken"] += 1
                    elif pitch_std > 2.5:
                        w["sung"] = True
                        tagged_count["sung"] += 1

    total = sum(tagged_count.values())
    if total > 0:
        print(f"[aligner] 🎤 Acoustic tags: {tagged_count['whisper']} whisper, "
              f"{tagged_count['spoken']} spoken, {tagged_count['sung']} sung "
              f"(total {total} words tagged)", file=sys.stderr)
    else:
        print("[aligner] 🎤 Acoustic analysis complete — no words tagged (track may be uniform)", file=sys.stderr)


def _split_repeated_phrase_lines(lines):
    """Split one LRC line that contains the SAME phrase repeated back-to-back
    (layered / doubled vocals crammed onto a single line) into separate lines.

    Source LRC files sometimes place doubled vocals on one line, e.g.
        "(Oh) I'm standing in front of you (Oh) I'm standing in front of you"
    The renderer then wraps that into several rows that all fill at the same
    time, which looks wrong. Per-word timings are already correct, so we simply
    partition the words at the repetition boundary into separate line entries.
    The renderer pairs consecutive "(...)"-prefixed lines and fills each one
    correctly (top-left -> bottom-right) instead of all rows at once.

    Only exact (normalized) N-fold repetitions of a phrase >= 3 words long are
    split, so normal lines are never touched. CJK lines are left as-is.
    """
    def _norm(s):
        return re.sub(r'[^\w]', '', s.lower(), flags=re.UNICODE) if s else ""

    def _segments(words):
        """Return repeated word-slices if `words` is a repeated phrase, else [words]."""
        n = len(words)
        if n < 6:
            return [words]
        toks = [_norm(w.get("word", "")) for w in words]
        # Fully periodic: N copies of a base phrase of length p (p >= 3 words).
        # Smallest valid period wins (handles doubles, triples, etc.).
        for p in range(3, n // 2 + 1):
            if n % p != 0:
                continue
            if all(toks[i] == toks[i % p] for i in range(n)):
                return [words[i:i + p] for i in range(0, n, p)]
        return [words]

    out = []
    for line in lines:
        words = line.get("words")
        if line.get("type") == "vocal_cue" or not words:
            out.append(line)
            continue
        # Leave CJK lines untouched (no space-joined reconstruction).
        if _CJK_RE.search(line.get("text", "")):
            out.append(line)
            continue
        segs = _segments(words)
        if len(segs) <= 1:
            out.append(line)
            continue
        for seg in segs:
            if not seg:
                continue
            new_line = {
                "time": round(seg[0].get("start", line.get("time", 0)), 3),
                "text": " ".join(w.get("word", "") for w in seg),
                "words": seg,
            }
            if "end" in line or any("end" in w for w in seg):
                new_line["end"] = round(seg[-1].get("end", new_line["time"]), 3)
            out.append(new_line)
    return out


def _tag_adlib_words(lines):
    """Mark words that are inside parentheses in the lyrics as ad-libs.

    Position-aware: walks the line text tracking paren depth and matches words
    to line-text tokens by normalized content in order. This ensures that for a
    line like "Dracula (Dracula)" ONLY the parenthesized occurrence is tagged,
    not the regular word that happens to share the same text.
    """
    def _norm(s):
        return re.sub(r'[^\w]', '', s.lower(), flags=re.UNICODE) if s else ""

    for line in lines:
        if line.get("type") == "vocal_cue":
            continue
        words = line.get("words", [])
        if not words:
            continue
        line_text = line.get("text", "")

        # Tokenize line text into (normalized, is_inside_parens), tracking depth.
        lt_tokens = []
        depth = 0
        for tok in re.findall(r'\(|\)|[^\s()]+', line_text):
            if tok == '(':
                depth += 1
            elif tok == ')':
                depth = max(0, depth - 1)
            else:
                lt_tokens.append((_norm(tok), depth > 0))

        has_paren = any(inp for _, inp in lt_tokens)

        # Sequentially align words to line-text tokens by content.
        ti = 0
        for w in words:
            wtxt = w.get("word", "")
            wn = _norm(wtxt)
            # Word token that itself carries an opening paren is an ad-lib.
            if "(" in wtxt:
                w["adlib"] = True
            if not has_paren or not wn:
                continue
            scan = ti
            while scan < len(lt_tokens):
                tn, tin = lt_tokens[scan]
                if tn and tn == wn:
                    ti = scan + 1
                    if tin:
                        w["adlib"] = True
                    break
                scan += 1


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("audio_path")
    parser.add_argument("--artist", default="")
    parser.add_argument("--title", default="")
    parser.add_argument("--model", default="medium")
    parser.add_argument("--language", default=None)
    parser.add_argument("--engine", default=None, choices=["mlx", "whisperx", "faster", "openai"])
    parser.add_argument("--use-adapter", action="store_true", help="Use LoRA adapter from HF_ADAPTER_REPO for inference")
    parser.add_argument("--no-decensor", action="store_true", help="Skip de-censoring even if censored words are detected")
    parser.add_argument("--force-realign", action="store_true", help="Ignore local/API LRC timings and regenerate timing skeleton from Whisper")
    args = parser.parse_args()

    if not os.path.exists(args.audio_path):
        print(json.dumps({"error": f"File not found: {args.audio_path}"}))
        sys.exit(1)

    clean_artist = sanitize_name(args.artist)
    clean_title = sanitize_name(args.title)

    # Step 1: Get anchor text (Genius > syncedlyrics, with validation)
    anchor = get_anchor_text(args.artist, args.title)
    genius_anchor = anchor  # Keep reference for de-censoring

    # Step 1.5: Check if local .lrc or embedded metadata has MORE COMPLETE text
    # Local sources match our exact file version — Genius may have a different version
    local_anchor = _get_local_lyrics_as_anchor(args.audio_path)
    if local_anchor and anchor:
        local_words = len(local_anchor.split())
        genius_words = len(anchor.split())
        local_lines = len([l for l in local_anchor.strip().split('\n') if l.strip()])
        genius_lines = len([l for l in anchor.strip().split('\n') if l.strip()])
        # If local has significantly more words (>10% more), prefer it
        if local_words > genius_words * 1.1:
            print(f"[aligner] 📝 Local lyrics MORE COMPLETE than Genius ({local_words} vs {genius_words} words) — using local as anchor", file=sys.stderr)
            anchor = local_anchor
        elif local_words >= genius_words * 0.9:
            # Similar length — prefer local since it matches our file version
            print(f"[aligner] 📝 Local lyrics similar to Genius ({local_words} vs {genius_words} words) — preferring local (matches file)", file=sys.stderr)
            anchor = local_anchor
        elif local_words >= genius_words * 0.7 and local_lines > genius_lines:
            # Fewer words but MORE lines = better line structure (Genius merges repeated lines)
            print(f"[aligner] 📝 Local has better line structure ({local_lines} vs {genius_lines} lines, {local_words} vs {genius_words} words) — preferring local", file=sys.stderr)
            anchor = local_anchor
        else:
            print(f"[aligner] 📝 Genius has more text ({genius_words} vs {local_words} local words) — keeping Genius anchor", file=sys.stderr)
    elif local_anchor and not anchor:
        print(f"[aligner] 📝 No Genius anchor but local lyrics found ({len(local_anchor.split())} words) — using local", file=sys.stderr)
        anchor = local_anchor

    # Step 1.6: De-censor local anchor using Genius explicit text
    # If we chose local but it has censored words, and Genius is explicit — replace censored words
    if not args.no_decensor and anchor and is_censored(anchor) and genius_anchor and not is_censored(genius_anchor):
        anchor_lines = [l for l in anchor.strip().split('\n') if l.strip()]
        anchor_lines = _decensor_with_genius(anchor_lines, genius_anchor)
        anchor = '\n'.join(anchor_lines)
        print(f"[aligner] 🔓 De-censored local lyrics using Genius explicit text", file=sys.stderr)

    # Auto-detect language from anchor text if not specified
    language = args.language
    if not language and anchor:
        cyrillic = len(re.findall(r'[\u0400-\u04FF]', anchor))
        latin = len(re.findall(r'[a-zA-Z]', anchor))
        cjk = len(re.findall(r'[\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF]', anchor))
        arabic = len(re.findall(r'[\u0600-\u06FF]', anchor))
        total = cyrillic + latin + cjk + arabic or 1
        if cyrillic / total > 0.3:
            language = 'uk' if re.search(r'[іїєґ]', anchor, re.IGNORECASE) else 'ru'
        elif cjk / total > 0.3:
            language = 'ja'
        elif arabic / total > 0.3:
            language = 'ar'
        elif latin / total > 0.3:
            # Explicitly set English to avoid fragile auto language detection in some runtimes.
            language = 'en'
        if language:
            print(f"[aligner] 🌐 Auto-detected language from anchor text: {language}", file=sys.stderr)

    # Step 2: Whisper transcription
    use_adapter = args.use_adapter or os.environ.get("HF_USE_ADAPTER") == "true"
    adapter_repo = os.environ.get("HF_ADAPTER_REPO", "")
    if use_adapter and adapter_repo:
        print(f"[aligner] 🧬 Using LoRA adapter from {adapter_repo}", file=sys.stderr)
        segments = _run_transformers_whisper_with_adapter(args.audio_path, args.model, adapter_repo, anchor, language=language)
    else:
        segments = run_whisper(args.audio_path, args.model, anchor, language=language, engine=args.engine)

    # Step 2.1: Snapshot raw Whisper output before alignment modifies anything
    raw_whisper_lines = []
    for seg in (segments or []):
        seg_words = seg.words if hasattr(seg, 'words') else seg.get("words", [])
        seg_text = seg.text if hasattr(seg, 'text') else seg.get("text", "")
        rw_words = []
        if seg_words:
            for w in seg_words:
                rw_words.append({
                    "word": (w.word if hasattr(w, 'word') else w.get("word", "")).strip(),
                    "start": round(w.start if hasattr(w, 'start') else w.get("start", 0), 3),
                    "end": round(w.end if hasattr(w, 'end') else w.get("end", 0), 3),
                })
        raw_whisper_lines.append({
            "text": seg_text.strip() if seg_text else "",
            "start": round(seg.start if hasattr(seg, 'start') else seg.get("start", 0), 3),
            "end": round(seg.end if hasattr(seg, 'end') else seg.get("end", 0), 3),
            "words": rw_words,
        })

    # Step 2.5: De-censor if needed (and not disabled)
    if not args.no_decensor and anchor and is_censored(anchor):
        anchor_lines = [l for l in anchor.strip().split('\n') if l.strip()]
        anchor_lines = decensor_with_whisper(anchor_lines, segments)
        anchor = '\n'.join(anchor_lines)

    # Step 3: STRICT mapping if anchor, blind otherwise
    # Get audio duration (needed for clamping, vocal cues, etc.)
    audio_duration = None
    try:
        import subprocess
        probe = subprocess.run(
            ["ffprobe", "-v", "quiet", "-show_entries", "format=duration", "-of", "csv=p=0", args.audio_path],
            capture_output=True, text=True, timeout=10
        )
        if probe.returncode == 0 and probe.stdout.strip():
            audio_duration = float(probe.stdout.strip())
            print(f"[aligner] Audio duration: {audio_duration:.1f}s", file=sys.stderr)
    except Exception:
        pass

    if anchor:
        print(f"[aligner] Mapping Whisper timestamps to official lyrics...", file=sys.stderr)
        # Get LRC line-level timings — but distinguish LOCAL (trusted) vs API (untrusted)
        lrc_timings = None
        lrc_is_local = False

        if args.force_realign:
            print("[aligner] ♻️ Force realign mode: bypassing local/API LRC timing hints", file=sys.stderr)

        # Check local .lrc sidecar
        if args.audio_path and not args.force_realign:
            lrc_path = re.sub(r'\.[^.]+$', '.lrc', args.audio_path)
            if os.path.exists(lrc_path):
                try:
                    lrc_content = open(lrc_path, 'r', encoding='utf-8').read()
                    local_lines = _parse_lrc_content(lrc_content)
                    if len(local_lines) >= 5:
                        lrc_timings = local_lines
                        lrc_is_local = True
                        print(f"[aligner] ✅ LOCAL .lrc sidecar ({len(local_lines)} lines) — timestamps TRUSTED", file=sys.stderr)
                except Exception as e:
                    print(f"[aligner] ⚠️ Failed to read local .lrc: {e}", file=sys.stderr)

        # Check embedded LYRICS tag in audio metadata (trusted — matches this file)
        if not lrc_timings and args.audio_path and not args.force_realign:
            embedded = _read_embedded_lyrics(args.audio_path)
            if embedded:
                lrc_timings = embedded
                lrc_is_local = True
                print(f"[aligner] ✅ EMBEDDED synced lyrics ({len(embedded)} lines) — timestamps TRUSTED", file=sys.stderr)

        # If no local .lrc, get API timings — then validate against Whisper
        if not lrc_timings and not args.force_realign:
            lrc_timings = get_lrc_timings(args.artist, args.title, audio_path=args.audio_path)
            if lrc_timings:
                lrc_is_local = False
                # Validate API LRC against Whisper: if first lines match, trust them
                lrc_is_local = _validate_api_lrc_against_whisper(lrc_timings, segments, anchor)
                if lrc_is_local:
                    print(f"[aligner] ✅ API LRC validated against Whisper — timestamps TRUSTED", file=sys.stderr)
                else:
                    print(f"[aligner] ℹ️ API LRC timings — timestamps NOT trusted (different mastering)", file=sys.stderr)

        # STRATEGY:
        # - LOCAL .lrc or validated API LRC: use map_genius_lrc_whisper (timestamps match our file)
        # - Unvalidated API LRC or no LRC: use map_anchor_to_timings (Whisper timestamps + anchor text)
        #   API LRC timings passed as hints only (for vocal_cue detection, not word timing)
        if lrc_timings and lrc_is_local:
            lines = map_genius_lrc_whisper(anchor, lrc_timings, segments, audio_duration=audio_duration)
            source = "genius-lrc-whisper"

            # Quality check: if too many lines have no word data, fall back
            word_lines = [l for l in lines if l.get("words")]
            if len(word_lines) < len(lines) * 0.5:
                print(f"[aligner] ⚠️ Genius+LRC+Whisper quality low ({len(word_lines)}/{len(lines)} with words), trying guided-whisper", file=sys.stderr)
                lines = map_anchor_to_timings(anchor, segments, audio_duration=audio_duration, lrc_timings=lrc_timings)
                source = "guided-whisper"
        elif lrc_timings and not lrc_is_local:
            # Untrusted API LRC — pass as hints for LRC direct assignment (improves alignment)
            # but don't use map_genius_lrc_whisper (which fully trusts line timestamps)
            lines = map_anchor_to_timings(anchor, segments, audio_duration=audio_duration, lrc_timings=lrc_timings)
            source = "guided-whisper"
        else:
            # No LRC at all — Whisper provides timestamps, anchor provides text
            lines = map_anchor_to_timings(anchor, segments, audio_duration=audio_duration, lrc_timings=None)
            source = "guided-whisper"

        # Quality check: detect if Whisper timestamps are garbage
        # If many consecutive lines are crammed into a tiny time window, LOG a warning
        # but DO NOT fall back to LRC-only — word-level sync is still valuable for karaoke
        if lines:
            text_lines = [l for l in lines if l.get("text") and not l.get("type") == "vocal_cue"]
            if len(text_lines) >= 5:
                # Check for compressed clusters: count lines where gap to next < 0.15s
                # (truly crammed lines, not legitimate fast pacing)
                compressed = 0
                for j in range(1, len(text_lines)):
                    gap = text_lines[j].get("time", 0) - text_lines[j-1].get("time", 0)
                    if 0 < gap < 0.15:
                        compressed += 1
                # Also check for lines with identical timestamps (clamped to audio end)
                from collections import Counter
                time_bins = Counter(round(l.get("time", 0) * 5) / 5 for l in text_lines)
                most_common_time, most_common_count = time_bins.most_common(1)[0]
                if most_common_count >= len(text_lines) * 0.25 and most_common_count >= 5:
                    compressed = max(compressed, most_common_count)

                ratio = compressed / len(text_lines)
                if ratio > 0.3:
                    # Check if we have word-level data — if so, KEEP it (don't fall back)
                    has_words = any(l.get("words") for l in lines if l.get("text"))
                    if has_words:
                        # Keep word-level sync — it's still valuable for karaoke even with tight timing
                        print(f"[aligner] ⚠️ Whisper quality notice: {compressed}/{len(text_lines)} lines tightly spaced (fast-paced vocals). Keeping word-level sync.", file=sys.stderr)
                        # source stays as-is (guided-whisper)
                    elif lrc_timings:
                        print(f"[aligner] ⚠️ Whisper quality BAD: {compressed}/{len(text_lines)} lines compressed, no word data. Falling back to LRC-only.", file=sys.stderr)
                        # Build LRC-only output (line-level timing, no word timestamps)
                        non_empty = [(t, txt) for t, txt in lrc_timings if txt.strip()]
                        lines = [{"time": round(t, 2), "text": txt} for t, txt in non_empty]
                        source = "lrc-only"
                    else:
                        print(f"[aligner] ⚠️ Whisper quality BAD: {compressed}/{len(text_lines)} lines compressed. No LRC available — falling back to blind Whisper.", file=sys.stderr)
                        lines = format_blind(segments)
                        source = "blind-whisper"
    else:
        lines = format_blind(segments)
        source = "blind-whisper"

    # Step 3.5: For blind-whisper CJK content, try fetching API lyrics to improve word grouping
    # (anchor search may have failed with original metadata — try with Whisper-detected text)
    if source == "blind-whisper" and lines and (args.artist or args.title):
        all_text = ' '.join(l.get("text", "") for l in lines)
        if _CJK_RE.search(all_text) and not anchor:
            # Try searching Genius using the Whisper-detected first line as title hint
            whisper_first_line = next((l.get("text", "") for l in lines if l.get("text", "").strip()), "")
            search_title = args.title or whisper_first_line[:30]
            search_artist = args.artist
            if search_artist or search_title:
                print(f"[aligner] 🈁 Blind-whisper has CJK — retrying API lyrics (artist=\"{search_artist}\", title=\"{search_title}\")", file=sys.stderr)
                api_anchor = get_anchor_text(search_artist, search_title)
                if api_anchor and len(api_anchor.strip()) > 20:
                    print(f"[aligner] ✅ Got API lyrics ({len(api_anchor.split())} words) — re-aligning with anchor", file=sys.stderr)
                    lines = map_anchor_to_timings(api_anchor, segments, audio_duration=audio_duration, lrc_timings=None)
                    source = "guided-whisper"
                    anchor = api_anchor
                else:
                    print(f"[aligner] ℹ️ No API lyrics found — keeping CJK-merged blind output", file=sys.stderr)

    # Step 3.9: Split doubled / repeated-phrase lines (layered vocals crammed onto
    # one LRC line) into separate lines so the renderer can pair them and fill each
    # correctly instead of filling all wrapped rows at once.
    if lines:
        lines = _split_repeated_phrase_lines(lines)

    # Step 4: Vocal cues + overlap fix
    if anchor and lrc_timings:
        # Use LRC timestamps for vocal_cue detection (much more reliable than heuristics)
        lines = insert_vocal_cues_from_lrc(lines, lrc_timings, audio_duration)
    else:
        lines = insert_vocal_cues(lines, whisper_segments=segments, audio_duration=audio_duration)
    lines = sanitize_overlaps(lines)

    # Step 4.25: Sort lines by time to fix any remaining non-monotonic ordering
    # (can happen after vocal cue redistribution or LRC correction)
    lines.sort(key=lambda l: l.get("time", 0) if l.get("type") != "vocal_cue" else l.get("time", 0))

    # Step 4.5: Clamp ALL timestamps to audio duration (prevent sidecar rejection)
    if audio_duration:
        for line in lines:
            if line.get("type") == "vocal_cue":
                line["time"] = min(line["time"], audio_duration)
                line["end"] = min(line.get("end", audio_duration), audio_duration)
            elif line.get("words"):
                for w in line["words"]:
                    w["start"] = round(min(w["start"], audio_duration - 0.1), 3)
                    w["end"] = round(min(w["end"], audio_duration), 3)
                line["time"] = line["words"][0]["start"]
            else:
                line["time"] = min(line.get("time", 0), audio_duration)

    # Step 4.75: Final monotonicity enforcement (safety net)
    # After sort + clamp, ensure no line starts before the previous line ends.
    # KEY CHANGE: When LRC timing is authoritative, TRIM the previous line's last word
    # instead of shifting the current line forward. This preserves LRC ground truth.
    text_lines_final = [l for l in lines if l.get("type") != "vocal_cue" and l.get("words")]
    for i in range(1, len(text_lines_final)):
        prev_words = text_lines_final[i - 1].get("words", [])
        curr_words = text_lines_final[i].get("words", [])
        if prev_words and curr_words:
            prev_end = prev_words[-1]["end"]
            curr_start = curr_words[0]["start"]
            if curr_start < prev_end - 0.05:
                # Instead of shifting current line forward (which breaks LRC timing),
                # trim the previous line's last word to end just before current line starts.
                # This preserves LRC line start times as ground truth.
                prev_words[-1]["end"] = round(curr_start - 0.02, 3)
                # If trimming makes duration negative/tiny, set a minimal duration
                if prev_words[-1]["end"] <= prev_words[-1]["start"]:
                    prev_words[-1]["end"] = round(prev_words[-1]["start"] + 0.1, 3)
                # Remove stretch flag if we trimmed significantly
                if prev_words[-1].get("stretch") and (prev_words[-1]["end"] - prev_words[-1]["start"]) < 0.5:
                    prev_words[-1].pop("stretch", None)

    # Also fix overlapping words within each line
    for l in lines:
        words = l.get("words", [])
        for wi in range(len(words)):
            w = words[wi]
            if w.get("end", 0) < w.get("start", 0):
                w["end"] = round(w["start"] + 0.15, 3)
            if wi > 0:
                prev_e = words[wi - 1].get("end", 0)
                if w["start"] < prev_e - 0.01:
                    w["start"] = round(prev_e + 0.01, 3)
                    if w["end"] < w["start"]:
                        w["end"] = round(w["start"] + 0.1, 3)

    # Step 4.9: Re-clamp after monotonicity (enforcement can push past audio_duration)
    if audio_duration:
        for line in lines:
            if line.get("type") == "vocal_cue":
                continue
            words = line.get("words", [])
            if words:
                for w in words:
                    w["start"] = round(min(w["start"], audio_duration - 0.1), 3)
                    w["end"] = round(min(w["end"], audio_duration), 3)
                line["time"] = words[0]["start"]

    # Step 4.10: CJK Semantic Grouping — merge single-char tokens into natural phrases
    # This prevents the "machine gun" effect where each character flashes individually.
    # Grouping rules:
    #   1. Japanese punctuation (。、！？〜) = hard boundary, never merge across
    #   2. Particles (は,が,を,etc.) attach to preceding word IF gap < 400ms
    #   3. Temporal proximity: chars with gap < 150ms get grouped
    #   4. Max 7 chars per group (CJK chars are compact, 7 is visual sweet spot)
    #   5. Parentheses: ( starts group, ) closes it
    #   6. Latin/English words excluded from CJK proximity merging
    #   7. Original per-char timestamps preserved in _chars array
    _JP_PARTICLES = set('はがをのにでともへかよねわやまらけたてるれさせ')
    _JP_PUNCTUATION = set('。、！？〜…・')
    _OPEN_PARENS = set('(（「')
    _CLOSE_PARENS = set(')）」')
    _CJK_MAX_GROUP = 7

    def _is_single_cjk_char(w):
        """Check if a word token is a single CJK character (candidate for grouping)."""
        word = w.get("word", "")
        if len(word) != 1:
            return False
        return bool(_CJK_RE.match(word)) or word in _OPEN_PARENS or word in _CLOSE_PARENS or word in _JP_PUNCTUATION

    def _is_latin_word(w):
        """Check if a word is Latin/English (should not be merged with CJK)."""
        word = w.get("word", "")
        if not word:
            return False
        return all(c.isascii() and c.isalpha() for c in word.replace("'", "").replace("-", ""))

    def _group_cjk_words(words):
        """Group single-CJK-char words into semantic phrases."""
        if not words:
            return words

        # Only group if many single-char tokens exist (>50% of line)
        single_count = sum(1 for w in words if _is_single_cjk_char(w))
        if single_count < 3 or single_count / len(words) < 0.5:
            return words  # Already grouped or Latin text

        grouped = []
        i = 0
        while i < len(words):
            w = words[i]

            # Latin/English word — never merge into CJK group
            if _is_latin_word(w):
                grouped.append(w)
                i += 1
                continue

            if not _is_single_cjk_char(w):
                # Multi-char token — keep as-is
                grouped.append(w)
                i += 1
                continue

            # Japanese punctuation — always standalone (hard boundary)
            if w["word"] in _JP_PUNCTUATION:
                grouped.append(w)
                i += 1
                continue

            # Start a new group
            group_chars = [w]
            group_text = w["word"]
            group_start = w["start"]
            group_end = w["end"]

            j = i + 1
            while j < len(words) and len(group_text) < _CJK_MAX_GROUP:
                nw = words[j]

                # SACRED BOUNDARY: LRC space boundaries are never crossed
                if nw.get("_space_boundary"):
                    break

                # Never merge Latin/English words into CJK groups
                if _is_latin_word(nw):
                    break

                if not _is_single_cjk_char(nw):
                    break

                nw_char = nw["word"]
                gap = nw["start"] - group_end

                # HARD BOUNDARY: Japanese punctuation stops the group
                if nw_char in _JP_PUNCTUATION:
                    # Attach punctuation to current group (it's a suffix), then stop
                    group_chars.append(nw)
                    group_text += nw_char
                    group_end = nw["end"]
                    j += 1
                    break

                # Close parenthesis — attach and stop
                if nw_char in _CLOSE_PARENS:
                    group_chars.append(nw)
                    group_text += nw_char
                    group_end = nw["end"]
                    j += 1
                    break

                # Open parenthesis — starts a new group
                if nw_char in _OPEN_PARENS:
                    break

                # Particle attachment — only if gap < 400ms (respect dramatic pauses)
                if nw_char in _JP_PARTICLES and len(group_text) >= 1 and group_text[-1] not in _OPEN_PARENS:
                    if gap < 0.4:
                        group_chars.append(nw)
                        group_text += nw_char
                        group_end = nw["end"]
                        j += 1
                        continue
                    else:
                        # Large gap before particle — it's a dramatic pause, don't attach
                        break

                # Temporal proximity (gap < 150ms)
                if gap < 0.15:
                    group_chars.append(nw)
                    group_text += nw_char
                    group_end = nw["end"]
                    j += 1
                    continue

                # Orphan prevention: if group has only 1-2 chars and gap < 500ms, keep merging
                if len(group_text) <= 2 and gap < 0.5:
                    group_chars.append(nw)
                    group_text += nw_char
                    group_end = nw["end"]
                    j += 1
                    continue

                break

            if len(group_chars) > 1:
                # Create merged word with _chars preserving original timings
                merged = {
                    "word": group_text,
                    "start": round(group_start, 3),
                    "end": round(group_end, 3),
                    "_chars": [{"char": c["word"], "start": c["start"], "end": c["end"]} for c in group_chars],
                }
                if any(c.get("_interpolated") for c in group_chars):
                    merged["_interpolated"] = True
                grouped.append(merged)
            else:
                grouped.append(w)

            i = j

        return grouped

    for line in lines:
        if line.get("type") == "vocal_cue":
            continue
        words = line.get("words", [])
        if words:
            new_words = _group_cjk_words(words)
            if len(new_words) != len(words):
                line["words"] = new_words
                # Update text to match grouped words
                line["text"] = _join_words_cjk(new_words)

    cjk_grouped = sum(1 for l in lines if l.get("words") and any(w.get("_chars") for w in l.get("words", [])))
    if cjk_grouped > 0:
        print(f"[aligner] 🀄 CJK grouping: {cjk_grouped} lines regrouped into semantic phrases", file=sys.stderr)

    # Tag adlib words: words inside parentheses in lyrics are ad-libs.
    # Only the parenthesized occurrence is marked (position-aware), so
    # "Dracula (Dracula)" tags ONLY the second one.
    _tag_adlib_words(lines)

    # ── Acoustic Feature Analysis: whisper/spoken/sung detection ──
    # Uses librosa for pitch and energy analysis per word segment
    try:
        _tag_acoustic_features(args.audio_path, lines)
    except Exception as e:
        print(f"[aligner] ⚠️ Acoustic feature analysis failed (non-fatal): {e}", file=sys.stderr)

    sidecar_path = re.sub(r'\.[^.]+$', '.lyrics.json', args.audio_path)
    if args.force_realign and os.path.exists(sidecar_path):
        try:
            existing = json.loads(open(sidecar_path, 'r', encoding='utf-8').read())
            if isinstance(existing, list) and existing:
                merged_lines, stats = _merge_timings_preserving_metadata(existing, lines)
                if (
                    stats["updated_words"] >= max(8, int(stats["total_existing_words"] * 0.25))
                    and stats.get("old_coverage", 0.0) >= 0.6
                    and stats.get("new_coverage", 0.0) >= 0.6
                ):
                    lines = merged_lines
                    print(
                        f"[aligner] 🔀 Merge phase: refreshed {stats['updated_words']} words "
                        f"(old_cov={stats.get('old_coverage', 0.0):.2f}, new_cov={stats.get('new_coverage', 0.0):.2f}) while preserving metadata tags",
                        file=sys.stderr,
                    )
                else:
                    print(
                        f"[aligner] ℹ️ Merge phase skipped: weak overlap "
                        f"(updated={stats['updated_words']}, old_cov={stats.get('old_coverage', 0.0):.2f}, new_cov={stats.get('new_coverage', 0.0):.2f})",
                        file=sys.stderr,
                    )
        except Exception as e:
            print(f"[aligner] ⚠️ Metadata-preserving merge skipped: {e}", file=sys.stderr)

    # Clean up internal flags before output
    for line in lines:
        for w in line.get("words", []):
            w.pop("_space_boundary", None)
            w.pop("_interpolated", None)
            w.pop("_chars", None)

    # Step 5: Output
    output = {"source": source, "lines": lines}
    if raw_whisper_lines:
        output["raw_whisper"] = raw_whisper_lines
    if anchor:
        # Tokenize reference text into word tokens per line
        ref_lines = []
        for ref_line in anchor.strip().split('\n'):
            ref_line = ref_line.strip()
            if ref_line:
                ref_lines.append({"text": ref_line, "words": ref_line.split()})
        output["reference_text"] = ref_lines
    if clean_artist and clean_artist != args.artist:
        output["cleanArtist"] = clean_artist
    if clean_title and clean_title != args.title:
        output["cleanTitle"] = clean_title

    print(json.dumps(output, ensure_ascii=False))
    print(f"[aligner] ✅ Done: {len(lines)} segments", file=sys.stderr)


if __name__ == "__main__":
    main()

