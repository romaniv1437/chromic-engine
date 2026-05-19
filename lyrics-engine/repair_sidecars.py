#!/usr/bin/env python3
"""
repair_sidecars.py — Fix non-monotonic, compressed, and overlapping issues
in existing .lyrics.json sidecar files WITHOUT re-running the aligner.

Repairs:
1. Sort text lines by time (fixes non-monotonic ordering)
2. Fix overlapping word timestamps within/across lines
3. Enforce monotonicity: each line starts >= previous line's end
"""
import json, os, glob, sys, copy

MUSIC_ROOT = '/path/to/project/media/music'
DRY_RUN = '--dry-run' in sys.argv

def repair_file(filepath):
    with open(filepath) as f:
        data = json.load(f)

    if isinstance(data, dict):
        lines = data.get('lines', [])
        is_wrapped = True
    else:
        lines = data
        is_wrapped = False

    original = json.dumps(lines)

    # Separate vocal_cues and text lines
    text_lines = [l for l in lines if l.get('type') != 'vocal_cue']
    cue_lines = [l for l in lines if l.get('type') == 'vocal_cue']

    # --- Repair 1: Sort text lines by their start time ---
    def line_time(l):
        words = l.get('words', [])
        if words:
            return words[0].get('start', l.get('time', 0))
        return l.get('time', 0)

    text_lines.sort(key=line_time)

    # --- Repair 2: Enforce monotonicity across lines ---
    for i in range(1, len(text_lines)):
        prev_words = text_lines[i - 1].get('words', [])
        curr_words = text_lines[i].get('words', [])
        if not prev_words or not curr_words:
            continue
        prev_end = prev_words[-1].get('end', 0)
        curr_start = curr_words[0].get('start', 0)
        if curr_start < prev_end - 0.05:
            shift = prev_end + 0.05 - curr_start
            for w in curr_words:
                w['start'] = round(w['start'] + shift, 3)
                w['end'] = round(w['end'] + shift, 3)
            text_lines[i]['time'] = curr_words[0]['start']

    # --- Repair 3: Fix overlapping words within each line ---
    for l in text_lines:
        words = l.get('words', [])
        for i in range(len(words)):
            w = words[i]
            # Fix negative duration
            if w.get('end', 0) < w.get('start', 0):
                w['end'] = round(w['start'] + 0.2, 3)
            # Fix overlap with previous word
            if i > 0:
                prev_end = words[i - 1].get('end', 0)
                if w['start'] < prev_end - 0.01:
                    w['start'] = round(prev_end + 0.01, 3)
                    if w['end'] < w['start']:
                        w['end'] = round(w['start'] + 0.1, 3)
        if words:
            l['time'] = words[0]['start']

    # --- Repair 4: Reinsert vocal cues at correct positions ---
    # Vocal cues go between text lines where there's a gap > 3s
    all_lines = list(text_lines)
    for cue in cue_lines:
        cue_time = cue.get('time', 0)
        # Find the right position to insert
        insert_idx = len(all_lines)
        for i, l in enumerate(all_lines):
            lt = line_time(l)
            if lt > cue_time:
                insert_idx = i
                break
        all_lines.insert(insert_idx, cue)

    # Check if anything changed
    if json.dumps(all_lines) == original:
        return False, "no changes needed"

    # Save
    if is_wrapped:
        data['lines'] = all_lines
    else:
        data = all_lines

    if not DRY_RUN:
        with open(filepath, 'w') as f:
            json.dump(data, f, ensure_ascii=False, indent=None)

    return True, "repaired"


# Find all lyrics files
all_files = sorted(glob.glob(os.path.join(MUSIC_ROOT, '**', '*.lyrics.json'), recursive=True))
all_files = [f for f in all_files if 'backup' not in f]

repaired = 0
for f in all_files:
    name = os.path.basename(f).replace('.lyrics.json', '')
    try:
        changed, msg = repair_file(f)
        if changed:
            repaired += 1
            print(f"  FIXED: {name[:60]} — {msg}")
    except Exception as e:
        print(f"  ERROR: {name[:60]} — {e}")

mode = "DRY RUN" if DRY_RUN else "APPLIED"
print(f"\n{mode}: {repaired}/{len(all_files)} files repaired")

