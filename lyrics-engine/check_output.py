import json
data = json.load(open('out.json'))
lines = data['lines']

print('Lines with good timing (< 162s):')
for i, l in enumerate(lines):
    if l.get('type') == 'vocal_cue':
        continue
    w = l.get('words', [])
    if not w:
        continue
    if w[0]['start'] < 162:
        print(f'  [{i:2d}] {w[0]["start"]:6.1f}s {l["text"][:50]}')

print()
print('Lines clamped to end (>= 162s):')
count = 0
for i, l in enumerate(lines):
    if l.get('type') == 'vocal_cue':
        continue
    w = l.get('words', [])
    if not w:
        continue
    if w[0]['start'] >= 162:
        print(f'  [{i:2d}] {w[0]["start"]:6.1f}s {l["text"][:50]}')
        count += 1
print(f'Total clamped: {count}')

