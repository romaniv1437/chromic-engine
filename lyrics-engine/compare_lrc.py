#!/usr/bin/env python3
"""Compare aligner output timings with embedded LRC timestamps."""
import json, subprocess, re, sys

audio = '/Users/illiaromaniv/Music/Music/2018-11-20 - flac/11 Fibonacci.flac'
output_file = 'test_fib_stdout.json'

# Get embedded LRC
r = subprocess.run(['ffprobe', '-v', 'quiet', '-print_format', 'json', '-show_format', audio],
                   capture_output=True, text=True)
d = json.loads(r.stdout)
lyrics = d['format']['tags']['LYRICS']
lrc = []
for line in lyrics.strip().split('\n'):
    m = re.match(r'\[(\d+):(\d+)\.(\d+)\]\s*(.*)', line)
    if m:
        t = int(m.group(1)) * 60 + int(m.group(2)) + int(m.group(3)) / 100
        txt = m.group(4).strip()
        if txt:
            lrc.append((t, txt))

# Get aligner output
data = open(output_file).read().strip()
for i, c in enumerate(data):
    if c in '{[':
        try:
            out = json.loads(data[i:])
            break
        except:
            continue

alines = [l for l in out['lines'] if l.get('text') and l.get('type') != 'vocal_cue']

print(f"Aligner lines: {len(alines)}, LRC lines: {len(lrc)}")
print(f"{'':2s} {'A#':>3s} {'A_time':>7s}  {'L#':>3s} {'L_time':>7s}  {'diff':>6s}  text")
print("-" * 80)

lrc_i = 0
total_drift = 0
drift_count = 0
for ai, al in enumerate(alines):
    at = al['time']
    if lrc_i < len(lrc):
        lt, ltxt = lrc[lrc_i]
        diff = at - lt
        flag = '  ' if abs(diff) < 1.0 else '⚠️' if abs(diff) < 3.0 else '❌'
        print(f'{flag} {ai:3d} {at:7.1f}s  {lrc_i:3d} {lt:7.1f}s  {diff:+6.1f}s  {al["text"][:45]}')
        total_drift += abs(diff)
        drift_count += 1
        lrc_i += 1
    else:
        print(f'?? {ai:3d} {at:7.1f}s  ---  ------  ------  {al["text"][:45]}')

if drift_count:
    print(f"\nAverage drift: {total_drift / drift_count:.2f}s")
    big_drifts = sum(1 for ai, al in enumerate(alines) if ai < len(lrc) and abs(al['time'] - lrc[ai][0]) > 1.0)
    print(f"Lines with >1s drift: {big_drifts}/{drift_count}")

