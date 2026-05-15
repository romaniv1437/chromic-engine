#!/usr/bin/env python3
"""Analyze aligner stdout output (handles STATUS: lines mixed in)."""
import json, sys

f = sys.argv[1]
data = open(f).read().strip()
# Find JSON start
for i, c in enumerate(data):
    if c in '{[':
        try:
            d = json.loads(data[i:])
            break
        except:
            continue
else:
    print("No JSON found!")
    print(data[:500])
    sys.exit(1)

lines = d.get('lines', d) if isinstance(d, dict) else d
source = d.get('source', '?') if isinstance(d, dict) else '?'
text_lines = [l for l in lines if l.get('text') and l.get('type') != 'vocal_cue']
word_lines = [l for l in text_lines if l.get('words')]
pct = round(100 * len(word_lines) / max(len(text_lines), 1))
total_words = sum(len(l.get('words', [])) for l in lines)
print(f"Source: {source}")
print(f"Text lines: {len(text_lines)}, Word-synced: {len(word_lines)} ({pct}%)")
print(f"Total words: {total_words}")
for l in text_lines[:5]:
    words = l.get('words', [])
    print(f"  [{l['time']:.1f}s] {l['text'][:60]}  words={len(words)}")

