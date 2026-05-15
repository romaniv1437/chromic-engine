# Lyrics Aligner — Architecture & Integration

## Overview

`lyrics-engine/aligner.py` is a standalone Python CLI that produces **word-level timed lyrics** (JSON) from an audio file. It combines multiple data sources to achieve studio-grade sync accuracy:

```
Audio File → Whisper (timing) + Genius/LRCLIB (text) → Word-level JSON
```

## How It Works

### Pipeline (5 Steps)

```
┌─────────────────────────────────────────────────────────────┐
│  Step 1: Get Anchor Text                                    │
│  ┌──────────┐    ┌──────────────┐                           │
│  │  Genius   │ →  │ syncedlyrics │  → Plain text lyrics     │
│  │ (priority)│    │  (fallback)  │     (spelling = LAW)     │
│  └──────────┘    └──────────────┘                           │
├─────────────────────────────────────────────────────────────┤
│  Step 2: Whisper Transcription                              │
│  ┌────────────┐  ┌────────────────┐  ┌───────────────┐     │
│  │ mlx-whisper│  │ faster-whisper │  │   WhisperX    │     │
│  │(Apple GPU) │  │  (CTranslate2) │  │ (Wav2Vec2 FA) │     │
│  └────────────┘  └────────────────┘  └───────────────┘     │
│  → Word timestamps (timing source)                          │
├─────────────────────────────────────────────────────────────┤
│  Step 2.5: De-Censorship                                    │
│  If anchor has "f***", "s**t", dash-censored words →        │
│  replace with Whisper-heard explicit words                   │
├─────────────────────────────────────────────────────────────┤
│  Step 3: Forced Alignment (Strict Text Mapping)             │
│  THREE strategies by priority:                               │
│                                                              │
│  A) genius-lrc-whisper (BEST):                               │
│     Genius text + LRC line timestamps + Whisper word timing  │
│     → LRC constrains line boundaries, Whisper fills words    │
│                                                              │
│  B) guided-whisper:                                          │
│     Anchor text + Whisper words (rapidfuzz matching)         │
│     → Word-by-word: Whisper timing[i] → Anchor word[i]      │
│                                                              │
│  C) blind-whisper:                                           │
│     No anchor → Whisper decides everything                   │
│                                                              │
│  Quality gate: if >30% lines compressed (<0.5s gaps),        │
│  falls back to lrc-only (line-level, no word timestamps)     │
├─────────────────────────────────────────────────────────────┤
│  Step 4: Post-Processing                                     │
│  • Insert vocal_cue markers (instrumental gaps ≥5s)          │
│  • Sanitize overlapping timestamps                           │
├─────────────────────────────────────────────────────────────┤
│  Step 5: Output JSON to stdout                               │
│  { "source": "genius-lrc-whisper",                           │
│    "lines": [{ "time": 12.5, "text": "Hello",               │
│      "words": [{"text":"Hello","start":12.5,"end":13.1}]}]}  │
└─────────────────────────────────────────────────────────────┘
```

### Key Design Principles

1. **Anchor text is LAW** — Whisper provides TIMINGS only, never spelling
2. **LOCAL .lrc timestamps are ground truth** for line boundaries (from sidecar file next to audio)
3. **API LRC timestamps are HINTS only** — different mastering, used for vocal_cue detection + Pass 0 direct assignment
4. **Whisper timestamps are authoritative** when no local .lrc exists (from our actual audio file)
5. **De-censorship** — censored online lyrics get explicit words from Whisper audio
6. **Language auto-detection** — detects Cyrillic/CJK/Arabic from anchor text to guide Whisper
7. **Chorus detection** — repeated sections fed as `initial_prompt` to guide Whisper

## CLI Usage

```bash
# Basic usage
python lyrics-engine/aligner.py /path/to/song.mp3 \
  --artist "Kendrick Lamar" \
  --title "HUMBLE." \
  --model large-v3-turbo

# With specific engine
python lyrics-engine/aligner.py /path/to/song.mp3 \
  --artist "Artist" --title "Song" \
  --engine whisperx          # whisperx | mlx | faster

# Force language
python lyrics-engine/aligner.py /path/to/song.mp3 \
  --artist "Artist" --title "Song" \
  --language de

# Output goes to stdout (JSON), logs to stderr
python lyrics-engine/aligner.py song.mp3 --artist "X" --title "Y" 2>aligner.log > output.json
```

### Output Format

```json
{
  "source": "genius-lrc-whisper",
  "cleanArtist": "Kendrick Lamar",
  "cleanTitle": "HUMBLE.",
  "lines": [
    {
      "time": 12.50,
      "text": "Be humble, sit down",
      "words": [
        { "text": "Be", "start": 12.50, "end": 12.72 },
        { "text": "humble,", "start": 12.72, "end": 13.15 },
        { "text": "sit", "start": 13.15, "end": 13.40 },
        { "text": "down", "start": 13.40, "end": 13.88 }
      ]
    },
    {
      "time": 45.00,
      "text": "🎵",
      "type": "vocal_cue"
    }
  ]
}
```

### Source Values

| Source | Meaning |
|--------|---------|
| `genius-lrc-whisper` | Best quality: Genius text + LRC line timing + Whisper word timing |
| `guided-whisper` | Anchor text + Whisper fuzzy-matched (no LRC available) |
| `blind-whisper` | No lyrics found online, Whisper transcribed everything |
| `lrc-only` | Whisper quality too low, using LRC line timestamps only (no word-level) |

## Integration with Chromic Engine

### Server-Side (index.js)

The aligner is called directly from the Node.js server via `fetchFromAligner()`:

```
Track enrich request → fetchAndStoreLyrics(path, artist, title, album)
                           ↓
                   spawn aligner.py (audio_path, artist, title, model)
                           ↓
                   Aligner returns JSON: {source, lines}
                           ↓
                   Store in SQLite + .lyrics.json sidecar
                           ↓
                   FALLBACK: fetchFromWhisper (basic, if aligner fails)
```

**No lyrics fetching in index.js.** No merge logic. Aligner handles everything.

### Frontend Integration

The frontend reads lyrics from `/api/track-info/:path` which returns:
```json
{ "lyrics": "[00:12.50]Be humble...", "lyricsType": "synced" }
```

The `💎 Sync Lyrics` button in album view triggers `/api/lyrics/enrich-album` which bulk-enqueues tracks for the server's LRCLIB/syncedlyrics pipeline.

### Environment Setup

```bash
cd lyrics-engine

# Create Python venv
python3 -m venv venv
source venv/bin/activate

# Core dependencies
pip install syncedlyrics lyricsgenius rapidfuzz python-dotenv

# Whisper backend (pick one or more):
pip install mlx-whisper          # Apple Silicon (fastest)
pip install faster-whisper       # CPU (CTranslate2)
pip install whisperx torch       # Best quality (Wav2Vec2 alignment)

# Create .env file
echo 'GENIUS_ACCESS_TOKEN=your_token_here' > .env
```

### Dependencies

| Package | Purpose |
|---------|---------|
| `mlx-whisper` | Apple Silicon GPU transcription (default on M-series) |
| `faster-whisper` | CPU transcription via CTranslate2 |
| `whisperx` | Ensemble: Whisper + Wav2Vec2 phoneme alignment |
| `lyricsgenius` | Genius API for explicit/uncensored lyrics |
| `syncedlyrics` | Multi-source LRC fetcher |
| `rapidfuzz` | Fuzzy string matching for word alignment |
| `python-dotenv` | Load `.env` config |

### Whisper Model Selection

| Model | Speed | Quality | VRAM |
|-------|-------|---------|------|
| `tiny` | ⚡⚡⚡⚡ | ★☆☆☆ | ~1GB |
| `base` | ⚡⚡⚡ | ★★☆☆ | ~1GB |
| `small` | ⚡⚡ | ★★★☆ | ~2GB |
| `medium` | ⚡ | ★★★★ | ~5GB |
| `large-v3-turbo` | ⚡⚡ | ★★★★★ | ~6GB |

Default: `large-v3-turbo` (best speed/quality ratio on Apple Silicon with MLX)

## Key Functions

| Function | Purpose |
|----------|---------|
| `get_anchor_text(artist, title)` | Fetch plain lyrics: Genius → syncedlyrics |
| `get_lrc_timings(artist, title, audio_path)` | Fetch LRC timestamps: local .lrc → online |
| `run_whisper(audio_path, model, anchor, ...)` | Transcribe with word timestamps |
| `map_genius_lrc_whisper(anchor, lrc, segments, ...)` | Best alignment: 3-source fusion |
| `map_anchor_to_timings(anchor, segments, ...)` | Fallback: anchor + Whisper fuzzy match |
| `format_blind(segments)` | No anchor: raw Whisper output |
| `decensor_with_whisper(anchor_lines, segments)` | Replace censored words with Whisper audio |
| `sanitize_name(text)` | Strip junk from titles (slowed+reverb, official audio, etc.) |
| `insert_vocal_cues(lines)` / `insert_vocal_cues_from_lrc(...)` | Add 🎵 instrumental markers |
| `sanitize_overlaps(lines)` | Fix overlapping timestamps |

