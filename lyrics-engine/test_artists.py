#!/usr/bin/env python3
"""Test aligner on 2 random tracks per artist."""
import sqlite3, os, sys, json, subprocess, time

MEDIA_ROOT = '/Users/illiaromaniv/WebstormProjects/claudecode/media'
DB_PATH = os.path.join(MEDIA_ROOT, 'tracks.db')
ALIGNER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'aligner.py')
PYTHON = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'venv', 'bin', 'python3')
OUT_FILE = '/tmp/test_artists_results.txt'

ARTISTS = ['Detsl', 'Pouya', 'Tame Impala', 'Melanie Martinez', 'Lana Del Rey', 'Twenty One Pilots', 'Princess Chelsea']
# Specific albums: test ALL tracks (validates API LRC trust, etc.)
SPECIFIC_ALBUMS = ['Blood Was Never Thick As Water']

def out(msg):
    print(msg, flush=True)
    with open(OUT_FILE, 'a') as f:
        f.write(msg + '\n')

open(OUT_FILE, 'w').close()

db = sqlite3.connect(DB_PATH)
total_ok = 0
total_issues = 0
total_failed = 0

for artist_q in ARTISTS:
    rows = db.execute(
        "SELECT path, artist, title, album FROM tracks WHERE artist LIKE ? ORDER BY RANDOM() LIMIT 2",
        (f'%{artist_q}%',)
    ).fetchall()

    out(f"\n{'='*60}")
    out(f"  {artist_q} ({len(rows)} tracks)")
    out(f"{'='*60}")

    for path, artist, title, album in rows:
        full_path = os.path.join(MEDIA_ROOT, path)
        if not os.path.exists(full_path):
            out(f"  SKIP (missing): {title}")
            continue

        short = f"{artist} - {title}"[:55]
        out(f"  Aligning: {short}...")

        t0 = time.time()
        proc = subprocess.run(
            [PYTHON, ALIGNER, full_path, '--artist', artist or '', '--title', title or ''],
            capture_output=True, text=True, timeout=300,
            cwd=os.path.dirname(ALIGNER)
        )
        elapsed = time.time() - t0

        if proc.returncode != 0:
            total_failed += 1
            err = proc.stderr.strip().split('\n')[-1][:80] if proc.stderr else 'unknown'
            out(f"    FAILED ({elapsed:.0f}s) — {err}")
            continue

        try:
            result = json.loads(proc.stdout.strip())
        except:
            total_failed += 1
            out(f"    FAILED (bad JSON)")
            continue

        lines = result.get('lines', [])
        source = result.get('source', '?')
        text_lines = [l for l in lines if l.get('type') != 'vocal_cue']
        cue_lines = [l for l in lines if l.get('type') == 'vocal_cue']
        words_total = sum(len(l.get('words', [])) for l in text_lines)
        has_words = sum(1 for l in text_lines if l.get('words'))

        issues = []

        prev_t = -1
        for l in text_lines:
            w = l.get('words', [])
            t = w[0]['start'] if w else l.get('time', 0)
            if t < prev_t - 0.5:
                issues.append('nonmono')
                break
            prev_t = t

        compressed = 0
        for i in range(1, len(text_lines)):
            t1 = text_lines[i-1].get('time', 0)
            t2 = text_lines[i].get('time', 0)
            if 0 < t2 - t1 < 0.15:
                compressed += 1
        if compressed > len(text_lines) * 0.3:
            issues.append(f'compressed={compressed}/{len(text_lines)}')

        max_end = 0
        for l in text_lines:
            for w in l.get('words', []):
                max_end = max(max_end, w.get('end', 0))

        if has_words == 0:
            issues.append('no_words')

        if issues:
            total_issues += 1
            out(f"    ⚠️  ({elapsed:.0f}s, {source}) {len(text_lines)}L/{words_total}W/{len(cue_lines)}C max={max_end:.0f}s — {issues}")
        else:
            total_ok += 1
            out(f"    ✅ ({elapsed:.0f}s, {source}) {len(text_lines)}L/{words_total}W/{len(cue_lines)}C max={max_end:.0f}s")

db.close()

# ─── Specific Album Tests ────────────────────────────────────────────────────
db2 = sqlite3.connect(DB_PATH)

for album_q in SPECIFIC_ALBUMS:
    rows = db2.execute(
        "SELECT path, artist, title, album FROM tracks WHERE album LIKE ? ORDER BY path",
        (f'%{album_q}%',)
    ).fetchall()

    out(f"\n{'='*60}")
    out(f"  ALBUM: {album_q} ({len(rows)} tracks)")
    out(f"{'='*60}")

    for path, artist, title, album in rows:
        full_path = os.path.join(MEDIA_ROOT, path)
        if not os.path.exists(full_path):
            out(f"  SKIP (missing): {title}")
            continue

        short = f"{artist} - {title}"[:55]
        out(f"  Aligning: {short}...")

        t0 = time.time()
        proc = subprocess.run(
            [PYTHON, ALIGNER, full_path, '--artist', artist or '', '--title', title or ''],
            capture_output=True, text=True, timeout=300,
            cwd=os.path.dirname(ALIGNER)
        )
        elapsed = time.time() - t0

        if proc.returncode != 0:
            total_failed += 1
            err = proc.stderr.strip().split('\n')[-1][:80] if proc.stderr else 'unknown'
            out(f"    FAILED ({elapsed:.0f}s) — {err}")
            continue

        try:
            result = json.loads(proc.stdout.strip())
        except:
            total_failed += 1
            out(f"    FAILED (bad JSON)")
            continue

        lines = result.get('lines', [])
        source = result.get('source', '?')
        text_lines = [l for l in lines if l.get('type') != 'vocal_cue']
        cue_lines = [l for l in lines if l.get('type') == 'vocal_cue']
        words_total = sum(len(l.get('words', [])) for l in text_lines)
        has_words = sum(1 for l in text_lines if l.get('words'))

        issues = []

        prev_t = -1
        for l in text_lines:
            w = l.get('words', [])
            t = w[0]['start'] if w else l.get('time', 0)
            if t < prev_t - 0.5:
                issues.append('nonmono')
                break
            prev_t = t

        compressed = 0
        for i in range(1, len(text_lines)):
            t1 = text_lines[i-1].get('time', 0)
            t2 = text_lines[i].get('time', 0)
            if 0 < t2 - t1 < 0.15:
                compressed += 1
        if compressed > len(text_lines) * 0.3:
            issues.append(f'compressed={compressed}/{len(text_lines)}')

        max_end = 0
        for l in text_lines:
            for w in l.get('words', []):
                max_end = max(max_end, w.get('end', 0))

        if has_words == 0:
            issues.append('no_words')

        # Check if API LRC was trusted
        lrc_trusted = 'genius-lrc-whisper' in source
        trust_note = ' [LRC-trusted]' if lrc_trusted else ''

        if issues:
            total_issues += 1
            out(f"    ⚠️  ({elapsed:.0f}s, {source}{trust_note}) {len(text_lines)}L/{words_total}W/{len(cue_lines)}C max={max_end:.0f}s — {issues}")
        else:
            total_ok += 1
            out(f"    ✅ ({elapsed:.0f}s, {source}{trust_note}) {len(text_lines)}L/{words_total}W/{len(cue_lines)}C max={max_end:.0f}s")

db2.close()

out(f"\n{'='*60}")
out(f"SUMMARY: {total_ok} OK, {total_issues} issues, {total_failed} failed")
out(f"{'='*60}")
