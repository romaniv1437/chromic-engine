#!/usr/bin/env python3
"""Comprehensive quality check across ALL tracks in the music library."""
import json, os, glob, sys

MUSIC_ROOT = '/path/to/project/media/music'

# Find all directories with lyrics files
all_dirs = set()
for f in glob.glob(os.path.join(MUSIC_ROOT, '**', '*.lyrics.json'), recursive=True):
    if 'backup' not in f:
        all_dirs.add(os.path.dirname(f))

all_dirs = sorted(all_dirs)

total_tracks = 0
total_ok = 0
total_nonmono = 0
total_compressed = 0
total_excessive_cues = 0
total_empty = 0
total_no_words = 0

issue_tracks = []  # (album, track, issue_type, detail)

for dir_path in all_dirs:
    album = os.path.basename(dir_path)
    # Handle subfolders (e.g. K-12/Disc 1)
    parent = os.path.basename(os.path.dirname(dir_path))
    if parent != 'music':
        album = f"{parent}/{album}"

    files = sorted(glob.glob(os.path.join(dir_path, '*.lyrics.json')))
    files = [f for f in files if 'backup' not in f]

    for f in files:
        total_tracks += 1
        name = os.path.basename(f).replace('.lyrics.json', '')
        try:
            with open(f) as fh:
                data = json.load(fh)
        except Exception as e:
            issue_tracks.append((album, name, 'ERR', str(e)))
            continue

        lines = data if isinstance(data, list) else data.get('lines', [])
        text_lines = [l for l in lines if l.get('type') != 'vocal_cue']
        cue_lines = [l for l in lines if l.get('type') == 'vocal_cue']

        if not text_lines:
            total_empty += 1
            issue_tracks.append((album, name, 'EMPTY', 'no text lines'))
            continue

        # Check for lines with no words
        no_word_lines = [l for l in text_lines if not l.get('words')]
        if len(no_word_lines) == len(text_lines):
            total_no_words += 1
            issue_tracks.append((album, name, 'NO_WORDS', f'{len(no_word_lines)}/{len(text_lines)} lines have no words'))
            continue

        # Non-monotonic check
        nonmono_issues = []
        prev_time = -1
        for i, l in enumerate(text_lines):
            words = l.get('words', [])
            t = words[0]['start'] if words else l.get('time', 0)
            if t < prev_time - 0.5:
                nonmono_issues.append(f'line {i}: {t:.1f}s < prev {prev_time:.1f}s')
            prev_time = t

        # Compressed lines check
        compressed = 0
        for i in range(1, len(text_lines)):
            t1 = text_lines[i-1].get('time', 0)
            t2 = text_lines[i].get('time', 0)
            if 0 < t2 - t1 < 0.15:
                compressed += 1

        # Excessive cues check
        cue_ratio = len(cue_lines) / max(len(text_lines), 1)

        # Word-level checks
        overlapping_words = 0
        negative_duration_words = 0
        for l in text_lines:
            words = l.get('words', [])
            for wi in range(len(words)):
                w = words[wi]
                s, e = w.get('start', 0), w.get('end', 0)
                if e < s:
                    negative_duration_words += 1
                if wi > 0:
                    prev_e = words[wi-1].get('end', 0)
                    if s < prev_e - 0.05:
                        overlapping_words += 1

        # Determine status
        if nonmono_issues:
            total_nonmono += 1
            detail = f"{len(nonmono_issues)} non-monotonic"
            for iss in nonmono_issues[:3]:
                detail += f"\n       {iss}"
            issue_tracks.append((album, name, 'NONMONO', detail))
        elif compressed > len(text_lines) * 0.2:
            total_compressed += 1
            issue_tracks.append((album, name, 'COMPRESSED', f'{compressed}/{len(text_lines)} compressed lines'))
        elif cue_ratio > 0.5 and len(cue_lines) > 3:
            total_excessive_cues += 1
            issue_tracks.append((album, name, 'CUES', f'{len(cue_lines)} cues / {len(text_lines)} lines'))
        elif overlapping_words > len(text_lines) * 0.1:
            issue_tracks.append((album, name, 'OVERLAP', f'{overlapping_words} overlapping words'))
        elif negative_duration_words > 0:
            issue_tracks.append((album, name, 'NEG_DUR', f'{negative_duration_words} negative duration words'))
        else:
            total_ok += 1

# Print summary
print("=" * 70)
print(f"QUALITY CHECK SUMMARY — {total_tracks} tracks across {len(all_dirs)} albums")
print("=" * 70)
print(f"  ✅ OK:              {total_ok}")
print(f"  ❌ Non-monotonic:   {total_nonmono}")
print(f"  ⚠️  Compressed:     {total_compressed}")
print(f"  🎵 Excessive cues: {total_excessive_cues}")
print(f"  📭 Empty:          {total_empty}")
print(f"  📝 No words:       {total_no_words}")
print(f"  🔀 Other issues:   {len(issue_tracks) - total_nonmono - total_compressed - total_excessive_cues - total_empty - total_no_words}")
print()

if issue_tracks:
    print("=" * 70)
    print("ISSUES BY TYPE:")
    print("=" * 70)

    for issue_type, label in [('NONMONO', '❌ Non-Monotonic'), ('COMPRESSED', '⚠️ Compressed'),
                               ('CUES', '🎵 Excessive Cues'), ('OVERLAP', '🔀 Overlapping Words'),
                               ('NEG_DUR', '⏪ Negative Duration'), ('NO_WORDS', '📝 No Words'),
                               ('EMPTY', '📭 Empty'), ('ERR', '💥 Error')]:
        filtered = [(a, n, t, d) for a, n, t, d in issue_tracks if t == issue_type]
        if filtered:
            print(f"\n  {label} ({len(filtered)}):")
            for album, name, _, detail in filtered:
                print(f"    [{album}] {name[:50]}")
                for line in detail.split('\n'):
                    print(f"      {line}")

print(f"\nPass rate: {total_ok}/{total_tracks} ({100*total_ok/max(total_tracks,1):.1f}%)")



