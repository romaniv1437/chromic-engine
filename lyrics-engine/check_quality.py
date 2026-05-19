import json, os, glob, sys

if len(sys.argv) > 1:
    dirs = sys.argv[1:]
else:
    # Auto-discover all directories with lyrics files
    import glob as _g
    _music = '/path/to/project/media/music'
    dirs = sorted(set(os.path.dirname(f) for f in _g.glob(os.path.join(_music, '**', '*.lyrics.json'), recursive=True) if 'backup' not in f))

for dir_path in dirs:
    print(f"\n=== {os.path.basename(dir_path)} ===")
    for f in sorted(glob.glob(os.path.join(dir_path, '*.lyrics.json'))):
        if 'backup' in f:
            continue
        name = os.path.basename(f).replace('.lyrics.json', '')
        with open(f) as fh:
            data = json.load(fh)
        lines = data if isinstance(data, list) else data.get('lines', [])
        text_lines = [l for l in lines if l.get('type') != 'vocal_cue']
        cue_lines = [l for l in lines if l.get('type') == 'vocal_cue']

        issues = []
        prev_time = -1
        for i, l in enumerate(text_lines):
            words = l.get('words', [])
            t = words[0]['start'] if words else l.get('time', 0)
            if t < prev_time - 0.5:
                issues.append(f'line {i}: {t:.1f}s < prev {prev_time:.1f}s')
            prev_time = t

        compressed = 0
        for i in range(1, len(text_lines)):
            t1 = text_lines[i-1].get('time', 0)
            t2 = text_lines[i].get('time', 0)
            if 0 < t2 - t1 < 0.3:
                compressed += 1

        # Check excessive cues
        cue_ratio = len(cue_lines) / max(len(text_lines), 1)

        status = "OK"
        detail = f"({len(text_lines)} lines, {len(cue_lines)} cues)"
        if issues:
            status = "X "
            detail = f"{len(issues)} non-monotonic"
            for iss in issues[:3]:
                detail += f"\n     {iss}"
        elif compressed > len(text_lines) * 0.2:
            status = "W "
            detail = f"{compressed}/{len(text_lines)} compressed lines"
        elif cue_ratio > 0.5 and len(cue_lines) > 3:
            status = "C "
            detail = f"{len(cue_lines)} cues / {len(text_lines)} lines (excessive)"

        print(f"  {status} {name[:55]}: {detail}")
