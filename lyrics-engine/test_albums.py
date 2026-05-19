#!/usr/bin/env python3
"""Batch test all albums from media/music - using ffprobe metadata."""
import subprocess, json, os, sys
from pathlib import Path

VENV_PYTHON = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'venv', 'bin', 'python3')
ALIGNER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'aligner.py')
MEDIA = '/path/to/project/media/music'

ALBUMS = {
    'Detsl': '2018-11-20 - flac',
    'Pouya': 'Blood Was Never Thick As Water (2021)',
    'Melanie': 'Melanie Martinez - K-12',
}

def get_meta(path):
    r = subprocess.run(['ffprobe','-v','quiet','-print_format','json','-show_format',path], capture_output=True, text=True, timeout=10)
    d = json.loads(r.stdout)
    tags = d.get('format',{}).get('tags',{})
    return tags.get('ARTIST','') or tags.get('artist',''), tags.get('TITLE','') or tags.get('title','')

def run_one(path):
    artist, title = get_meta(path)
    if not artist or not title:
        return None
    cmd = [VENV_PYTHON, ALIGNER, path, '--artist', artist, '--title', title, '--engine', 'mlx']
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
    except subprocess.TimeoutExpired:
        return {'name': Path(path).name, 'error': 'timeout'}

    stdout = r.stdout.strip()
    for i, c in enumerate(stdout):
        if c in '{[':
            try:
                d = json.loads(stdout[i:])
                break
            except: continue
    else:
        # Get sync info from stderr
        for line in r.stderr.split('\n'):
            if 'Found' in line and 'sync points' in line:
                print(f"  {line.strip()}")
        return {'name': Path(path).name, 'error': 'no json', 'stderr_tail': r.stderr[-200:]}

    lines = d.get('lines', d) if isinstance(d, dict) else d
    source = d.get('source', '?') if isinstance(d, dict) else '?'
    tl = [l for l in lines if l.get('text') and l.get('type') != 'vocal_cue']
    wl = [l for l in tl if l.get('words')]
    pct = round(100 * len(wl) / max(len(tl), 1))
    tw = sum(len(l.get('words', [])) for l in lines)

    # Check for crammed lines (lines with <0.2s duration having >3 words)
    crammed = 0
    for l in tl:
        w = l.get('words', [])
        if len(w) >= 3:
            dur = w[-1]['end'] - w[0]['start']
            if dur < 0.5:
                crammed += 1

    # Get sync points from stderr
    sync_pct = '?'
    for line in r.stderr.split('\n'):
        if 'Found' in line and 'sync points' in line:
            sync_pct = line.strip().split('(')[-1].rstrip(')')

    return {
        'name': Path(path).name, 'artist': artist, 'title': title,
        'source': source, 'lines': len(tl), 'word_pct': pct,
        'words': tw, 'crammed': crammed, 'sync': sync_pct
    }

results = []
for label, folder in ALBUMS.items():
    album_dir = os.path.join(MEDIA, folder)
    # Collect all flacs, including subdirs
    flacs = []
    if os.path.isdir(album_dir):
        for root, dirs, files in os.walk(album_dir):
            for f in sorted(files):
                if f.endswith('.flac'):
                    flacs.append(os.path.join(root, f))
    flacs.sort()
    print(f"\n{'='*70}")
    print(f"ALBUM: {label} ({folder}) — {len(flacs)} tracks")
    print(f"{'='*70}")
    for fp in flacs:
        print(f"\n  🎵 {os.path.basename(fp)}")
        sys.stdout.flush()
        r = run_one(fp)
        if r and 'error' not in r:
            flag = '✅' if r['word_pct'] >= 95 and r['crammed'] == 0 else '⚠️' if r['word_pct'] >= 80 else '❌'
            cram = f" CRAMMED={r['crammed']}" if r['crammed'] > 0 else ''
            print(f"  {flag} {r['word_pct']:3d}% | {r['source']:22s} | sync={r['sync']:6s} | {r['lines']} lines, {r['words']} words{cram}")
        elif r:
            print(f"  ❌ {r['error']}")
        results.append(r)

print(f"\n{'='*70}")
print("SUMMARY")
print(f"{'='*70}")
ok = [r for r in results if r and 'word_pct' in r]
fail = [r for r in results if r and 'error' in r]
crammed_tracks = [r for r in ok if r['crammed'] > 0]
print(f"Total: {len(results)} | OK: {len(ok)} | Failed: {len(fail)} | Crammed: {len(crammed_tracks)}")
if ok:
    avg = sum(r['word_pct'] for r in ok) / len(ok)
    print(f"Average word-sync: {avg:.0f}%")
    for r in sorted(ok, key=lambda x: x['word_pct']):
        flag = '✅' if r['word_pct'] >= 95 and r['crammed'] == 0 else '⚠️' if r['word_pct'] >= 80 else '❌'
        cram = f" ⚠️CRAM={r['crammed']}" if r['crammed'] > 0 else ''
        print(f"  {flag} {r['word_pct']:3d}% | {r['source']:22s} | {r['name'][:45]}{cram}")
