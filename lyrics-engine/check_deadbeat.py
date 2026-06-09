import json, os, glob

dir_path = '/Users/illiaromaniv/WebstormProjects/claudecode/media/music/Tame Impala - 2025 - Deadbeat 24-96 FLAC'
for f in sorted(glob.glob(os.path.join(dir_path, '*.lyrics.json'))):
    if 'backup' in f:
        continue
    name = os.path.basename(f).replace('.lyrics.json', '')
    with open(f) as fh:
        data = json.load(fh)
    lines = data if isinstance(data, list) else data.get('lines', [])
    text_lines = [l for l in lines if l.get('type') != 'vocal_cue']

    issues = []
    prev_time = -1
    for i, l in enumerate(text_lines):
        words = l.get('words', [])
        t = words[0]['start'] if words else l.get('time', 0)
        if t < prev_time - 0.5:
            issues.append(f'line {i}: {t:.1f}s < prev {prev_time:.1f}s')
        prev_time = t

    if issues:
        print(f'X {name}: {len(issues)} non-monotonic')
        for iss in issues[:3]:
            print(f'   {iss}')
    else:
        compressed = 0
        for i in range(1, len(text_lines)):
            t1 = text_lines[i-1].get('time', 0)
            t2 = text_lines[i].get('time', 0)
            if 0 < t2 - t1 < 0.3:
                compressed += 1
        if compressed > len(text_lines) * 0.2:
            print(f'W {name}: {compressed}/{len(text_lines)} compressed lines')
        else:
            print(f'OK {name}: ({len(text_lines)} lines)')

