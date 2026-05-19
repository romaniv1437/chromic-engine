#!/usr/bin/env python3
"""
batch_align.py — Run aligner.py on all tracks in the database.
Processes one track at a time with progress tracking.
Saves output as .lyrics.json sidecars.

Usage:
  python3 batch_align.py                    # all tracks
  python3 batch_align.py --force            # re-run even if sidecar exists
  python3 batch_align.py --album "GATOR"    # specific album only
  python3 batch_align.py --check-only       # just quality check existing sidecars
"""
import sqlite3, os, sys, json, subprocess, time, argparse, glob

MEDIA_ROOT = '/path/to/project/media'
DB_PATH = os.path.join(MEDIA_ROOT, 'tracks.db')
ALIGNER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'aligner.py')
PYTHON = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'venv', 'bin', 'python3')
if not os.path.exists(PYTHON):
    PYTHON = sys.executable
PROGRESS_FILE = '/tmp/batch_align_progress.json'
LOG_FILE = '/tmp/batch_align.log'

def log(msg):
    line = f"[{time.strftime('%H:%M:%S')}] {msg}"
    print(line, flush=True)
    with open(LOG_FILE, 'a') as f:
        f.write(line + '\n')

def run_aligner(audio_path, artist, title):
    """Run aligner.py and return (lines, source) or (None, error)."""
    args = [PYTHON, ALIGNER, audio_path, '--artist', artist or '', '--title', title or '']
    try:
        proc = subprocess.run(args, capture_output=True, text=True, timeout=300,
                              cwd=os.path.dirname(ALIGNER))
        if proc.returncode != 0:
            return None, f"exit={proc.returncode}: {proc.stderr[-500:]}"
        result = json.loads(proc.stdout.strip())
        lines = result.get('lines', [])
        source = result.get('source', 'unknown')
        return lines, source
    except subprocess.TimeoutExpired:
        return None, "timeout"
    except json.JSONDecodeError as e:
        return None, f"json: {e}"
    except Exception as e:
        return None, str(e)

def check_quality(lines):
    """Return list of issues found."""
    issues = []
    text_lines = [l for l in lines if l.get('type') != 'vocal_cue']
    cue_lines = [l for l in lines if l.get('type') == 'vocal_cue']

    if not text_lines:
        issues.append('empty')
        return issues

    has_words = sum(1 for l in text_lines if l.get('words'))
    if has_words == 0:
        issues.append(f'no_words ({len(text_lines)} lines)')

    # Non-monotonic
    prev_time = -1
    nonmono = 0
    for l in text_lines:
        words = l.get('words', [])
        t = words[0]['start'] if words else l.get('time', 0)
        if t < prev_time - 0.5:
            nonmono += 1
        prev_time = t
    if nonmono:
        issues.append(f'nonmono={nonmono}')

    # Compressed
    compressed = 0
    for i in range(1, len(text_lines)):
        t1 = text_lines[i-1].get('time', 0)
        t2 = text_lines[i].get('time', 0)
        if 0 < t2 - t1 < 0.15:
            compressed += 1
    if compressed > len(text_lines) * 0.3:
        issues.append(f'compressed={compressed}/{len(text_lines)}')

    # Excessive cues
    if len(cue_lines) > 3 and len(cue_lines) / max(len(text_lines), 1) > 0.5:
        issues.append(f'excess_cues={len(cue_lines)}/{len(text_lines)}')

    # Overlapping words
    overlapping = 0
    for l in text_lines:
        words = l.get('words', [])
        for i in range(1, len(words)):
            if words[i].get('start', 0) < words[i-1].get('end', 0) - 0.05:
                overlapping += 1
    if overlapping > len(text_lines) * 0.1:
        issues.append(f'overlap={overlapping}')

    return issues

def save_progress(progress):
    with open(PROGRESS_FILE, 'w') as f:
        json.dump(progress, f)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--force', action='store_true', help='Re-run even if sidecar exists')
    parser.add_argument('--album', default=None, help='Filter by album name (substring match)')
    parser.add_argument('--check-only', action='store_true', help='Only check existing sidecars')
    parser.add_argument('--limit', type=int, default=0, help='Max tracks to process')
    args = parser.parse_args()

    # Clear log
    open(LOG_FILE, 'w').close()

    db = sqlite3.connect(DB_PATH)
    query = "SELECT path, artist, title, album FROM tracks WHERE artist IS NOT NULL AND title IS NOT NULL"
    if args.album:
        query += f" AND album LIKE '%{args.album}%'"
    query += " ORDER BY album, path"
    rows = db.execute(query).fetchall()
    db.close()

    log(f"Found {len(rows)} tracks in database")

    progress = {
        'total': len(rows),
        'processed': 0,
        'ok': 0,
        'issues': 0,
        'skipped': 0,
        'failed': 0,
        'issue_tracks': [],
        'failed_tracks': [],
        'started_at': time.time(),
    }

    for idx, (rel_path, artist, title, album) in enumerate(rows):
        if args.limit and idx >= args.limit:
            break

        full_path = os.path.join(MEDIA_ROOT, rel_path)
        sidecar_path = os.path.splitext(full_path)[0] + '.lyrics.json'
        short_name = f"{artist} - {title}"[:60]

        if not os.path.exists(full_path):
            progress['skipped'] += 1
            continue

        if args.check_only:
            # Just quality-check existing sidecar
            if os.path.exists(sidecar_path):
                with open(sidecar_path) as f:
                    data = json.load(f)
                lines = data if isinstance(data, list) else data.get('lines', [])
                issues = check_quality(lines)
                if issues:
                    progress['issues'] += 1
                    progress['issue_tracks'].append({'track': short_name, 'album': album, 'issues': issues})
                else:
                    progress['ok'] += 1
            progress['processed'] += 1
            save_progress(progress)
            continue

        # Check if already has a good sidecar
        if not args.force and os.path.exists(sidecar_path):
            try:
                with open(sidecar_path) as f:
                    data = json.load(f)
                # Skip user-edited sidecars (manually verified)
                if isinstance(data, dict) and data.get('userEdited'):
                    progress['ok'] += 1
                    progress['processed'] += 1
                    save_progress(progress)
                    continue
                lines = data if isinstance(data, list) else data.get('lines', [])
                text_lines = [l for l in lines if l.get('type') != 'vocal_cue']
                has_words = any(l.get('words') for l in text_lines)

                if has_words:
                    # Already has word-level alignment — check quality
                    issues = check_quality(lines)
                    if not issues:
                        progress['ok'] += 1
                        progress['processed'] += 1
                        save_progress(progress)
                        continue
                    else:
                        log(f"[{idx+1}/{len(rows)}] RE-ALIGNING (issues: {issues}): {short_name}")
                else:
                    log(f"[{idx+1}/{len(rows)}] ALIGNING (no words): {short_name}")
            except Exception:
                log(f"[{idx+1}/{len(rows)}] ALIGNING (bad sidecar): {short_name}")
        else:
            log(f"[{idx+1}/{len(rows)}] ALIGNING{' (force)' if args.force else ''}: {short_name}")

        # Run aligner
        t0 = time.time()
        lines, source_or_err = run_aligner(full_path, artist, title)
        elapsed = time.time() - t0

        if lines is None:
            progress['failed'] += 1
            progress['failed_tracks'].append({'track': short_name, 'album': album, 'error': source_or_err})
            log(f"  ❌ FAILED ({elapsed:.0f}s): {source_or_err[:100]}")
        else:
            # Quality check
            issues = check_quality(lines)

            # Save sidecar (same format server uses — just the lines array)
            with open(sidecar_path, 'w') as f:
                json.dump(lines, f, ensure_ascii=False)

            text_count = len([l for l in lines if l.get('type') != 'vocal_cue'])
            cue_count = len([l for l in lines if l.get('type') == 'vocal_cue'])
            word_count = sum(1 for l in lines for w in l.get('words', []))

            if issues:
                progress['issues'] += 1
                progress['issue_tracks'].append({'track': short_name, 'album': album, 'issues': issues})
                log(f"  ⚠️  ISSUES ({elapsed:.0f}s, {text_count}L/{word_count}W): {issues}")
            else:
                progress['ok'] += 1
                log(f"  ✅ OK ({elapsed:.0f}s, src={source_or_err if isinstance(source_or_err, str) and 'exit' not in source_or_err else 'aligned'}, {text_count}L/{cue_count}C/{word_count}W)")

        progress['processed'] += 1
        save_progress(progress)

    # Final summary
    elapsed_total = time.time() - progress['started_at']
    log("")
    log("=" * 70)
    log(f"BATCH ALIGNMENT COMPLETE — {progress['processed']} tracks in {elapsed_total/60:.1f} min")
    log("=" * 70)
    log(f"  ✅ OK:       {progress['ok']}")
    log(f"  ⚠️  Issues:  {progress['issues']}")
    log(f"  ❌ Failed:   {progress['failed']}")
    log(f"  ⏭️  Skipped:  {progress['skipped']}")

    if progress['issue_tracks']:
        log("\nTRACKS WITH ISSUES:")
        for t in progress['issue_tracks']:
            log(f"  [{t['album']}] {t['track']}: {t['issues']}")

    if progress['failed_tracks']:
        log("\nFAILED TRACKS:")
        for t in progress['failed_tracks']:
            log(f"  [{t['album']}] {t['track']}: {t['error'][:80]}")

    save_progress(progress)

if __name__ == '__main__':
    main()




