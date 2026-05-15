import json
data = json.load(open('out.json'))
lines = data['lines']

# Find the last line with timing < 162
last_good = None
for l in lines:
    if l.get('type') == 'vocal_cue':
        continue
    w = l.get('words', [])
    if w and w[-1]['end'] < 163:
        last_good = l

if last_good:
    w = last_good['words']
    print(f"Last good line: {last_good['text'][:50]}")
    print(f"  Time: {w[0]['start']:.1f}-{w[-1]['end']:.1f}s")
else:
    print("No good lines found")

# The issue: line 6 "Им никто" ends at 162.5s (Whisper speech end)
# Line 7 "Как там в Лондоне" starts at 162.5s — gap_start=35+, left_time=162.5
# whisper_speech_end=162.5 so right_time=162.5 = left_time → nothing to fill into
# This creates a 0-width fill range, which then gets clamped

# What SHOULD happen: these lyrics were at 43-88s in Whisper
# The matching consumed Whisper words for the wrong anchor lines

