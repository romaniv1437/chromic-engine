#!/usr/bin/env python3
"""Quick check: run aligner on test tracks and report adlib/whisper/spoken/sung flags."""
import subprocess, json, os, sys
from pathlib import Path

VENV_PYTHON = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'venv', 'bin', 'python3')
ALIGNER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'aligner.py')

TRACKS = [
    # Has .lrc sidecar (Melanie Martinez K-12)
    ("/Users/illiaromaniv/Music/Music/Melanie Martinez - K-12/Disc 1/09 - Melanie Martinez - Orange Juice.flac", "Melanie Martinez", "Orange Juice"),
    ("/Users/illiaromaniv/Music/Music/Melanie Martinez - K-12/Disc 1/05 - Melanie Martinez - Nurse's Office.flac", "Melanie Martinez", "Nurse's Office"),
    # Detsl - Fibonacci (embedded LRC / RU)
    ("/Users/illiaromaniv/Music/Music/2018-11-20 - flac/11 Fibonacci.flac", "Detsl aka Le Truk", "Fibonacci"),
    # API-only (no LRC)
    ("/Users/illiaromaniv/Music/Music/GATOR (2023)/01. Death gotta be easy (cause life is hard).flac", "Kevin Gates", "Death gotta be easy"),
    ("/Users/illiaromaniv/Music/Music/Blood Was Never Thick As Water (2021)/03. Why Do We Get High.flac", "Kevin Gates", "Why Do We Get High"),
]

for audio_path, artist, title in TRACKS:
    if not os.path.exists(audio_path):
        print(f"SKIP (not found): {Path(audio_path).name}")
        continue

    print(f"\n{'='*70}")
    print(f"Track: {artist} - {title}")
    print(f"{'='*70}")

    r = subprocess.run(
        [VENV_PYTHON, ALIGNER, audio_path, '--artist', artist, '--title', title, '--engine', 'mlx'],
        capture_output=True, text=True, timeout=300,
        cwd=os.path.dirname(ALIGNER)
    )

    if r.returncode != 0:
        print(f"  FAILED: {r.stderr[-300:]}")
        continue

    # Parse JSON
    stdout = r.stdout.strip()
    d = None
    for i, c in enumerate(stdout):
        if c in '{[':
            try:
                d = json.loads(stdout[i:])
                break
            except:
                continue
    if not d:
        print("  No JSON output")
        continue

    lines = d.get('lines', [])
    total_words = sum(len(l.get('words', [])) for l in lines)
    adlib_count = sum(1 for l in lines for w in l.get('words', []) if w.get('adlib'))
    whisper_count = sum(1 for l in lines for w in l.get('words', []) if w.get('whisper'))
    spoken_count = sum(1 for l in lines for w in l.get('words', []) if w.get('spoken'))
    sung_count = sum(1 for l in lines for w in l.get('words', []) if w.get('sung'))

    print(f"  Source: {d.get('source', '?')}")
    print(f"  Lines: {len(lines)}, Words: {total_words}")
    print(f"  Adlib: {adlib_count}, Whisper: {whisper_count}, Spoken: {spoken_count}, Sung: {sung_count}")

    # Show flagged words (first 30)
    shown = 0
    for l in lines:
        for w in l.get('words', []):
            flags = []
            if w.get('adlib'): flags.append('adlib')
            if w.get('whisper'): flags.append('whisper')
            if w.get('spoken'): flags.append('spoken')
            if w.get('sung'): flags.append('sung')
            if flags and shown < 30:
                print(f"    [{w.get('start',0):.1f}s] \"{w.get('word','')}\" -> {flags}")
                shown += 1

