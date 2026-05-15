#!/usr/bin/env python3
"""Debug: trace the matching to understand why lines end up at wrong positions."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from aligner import *

anchor = get_anchor_text('Detsl aka Le Truk', 'Бульбик или Бонг')
segs = run_whisper('../media/music/2018-11-20 - flac/09 Бульбик или Бонг.flac', 'medium', anchor, language='ru')

# Show anchor lines
anchor_lines = [l.strip() for l in anchor.strip().split('\n') if l.strip()]
print("\n=== ANCHOR LINES ===")
idx = 0
for li, line in enumerate(anchor_lines):
    words = line.split()
    print(f"  Line {li:2d} [words {idx:3d}-{idx+len(words)-1:3d}]: {line[:60]}")
    idx += len(words)

# Show Whisper words with timestamps
whisper_words = []
for seg in segs:
    if hasattr(seg, 'no_speech_prob') and seg.no_speech_prob > 0.95:
        continue
    if seg.words:
        for w in seg.words:
            if w.word.strip():
                whisper_words.append({"start": w.start, "end": w.end, "text": w.word.strip()})

print(f"\n=== WHISPER: {len(whisper_words)} words, last at {whisper_words[-1]['end']:.1f}s ===")
for i, w in enumerate(whisper_words[:30]):
    print(f"  [{i:3d}] {w['start']:6.1f}-{w['end']:6.1f}s  {w['text']}")
print("  ...")
for i, w in enumerate(whisper_words[-10:], len(whisper_words)-10):
    print(f"  [{i:3d}] {w['start']:6.1f}-{w['end']:6.1f}s  {w['text']}")

