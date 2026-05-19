#!/usr/bin/env python3
"""Test aligner on multiple tracks and report results."""
import subprocess
import json
import os
import sys
from pathlib import Path
from datetime import datetime

# Test tracks
EN_API_TRACKS = [
    '/path/to/music/GATOR (2023)/01. Death gotta be easy (cause life is hard).flac',
    '/path/to/music/Five Five (2018)/05. Five Five.flac',
    '/path/to/music/(2022) Princess Chelsea - Everything Is Going To Be Alright [FLAC]/01. Everything Is Going To Be Alright.flac',
    '/path/to/music/(2022) Princess Chelsea - Everything Is Going To Be Alright [FLAC]/06. Forever Is A Charm.flac',
    '/path/to/music/Heathens (2016) [CD-FLAC] {7567866235}/01 - Heathens.flac',
    '/path/to/music/Tame Impala - 2025 - Deadbeat 24-96 FLAC/03. Tame Impala - Dracula.flac',
]

RU_API_TRACKS = [
    '/path/to/music/2018-11-20 - flac/10 Подсказки на битах.flac',
    '/path/to/music/2018-11-20 - flac/11 Fibonacci.flac',
    '/path/to/music/2018-11-20 - flac/08 Меломанов плейлисты.flac',
    '/path/to/music/2018-11-20 - flac/06 Сине-красные огни.flac',
    '/path/to/music/2018-11-20 - flac/04 Узурпаторов план.flac',
    '/path/to/music/Kizaru/Kizaru - Nikto Ne Nuzhen (feat. Pearly Pride).flac',
]

EN_LRC_TRACKS = [
    '/path/to/music/Melanie Martinez - K-12/Disc 1/11 - Melanie Martinez - Teacher\'s Pet.flac',
    '/path/to/music/Melanie Martinez - K-12/Disc 1/12 - Melanie Martinez - High School Sweethearts.flac',
    '/path/to/music/Melanie Martinez - K-12/Disc 1/13 - Melanie Martinez - Recess.flac',
]

def parse_track_info(path):
    """Extract artist and title from path."""
    fname = Path(path).stem
    # Try "NN - Artist - Title" format
    parts = fname.split(' - ')
    if len(parts) >= 3:
        return parts[1].strip(), ' - '.join(parts[2:]).strip()
    elif len(parts) == 2:
        return parts[0].strip(), parts[1].strip()
    # Fallback: use parent folder as artist
    parent = Path(path).parent.name
    return parent, fname

def backup_sidecar(audio_path):
    """Backup existing .lyrics.json if it exists."""
    sidecar = Path(audio_path).with_suffix('.lyrics.json')
    if sidecar.exists():
        ts = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
        backup = sidecar.with_suffix(f'.backup_{ts}.json')
        try:
            import shutil
            shutil.copy2(sidecar, backup)
            print(f"   📦 Backed up: {sidecar.name} → {backup.name}")
            return True
        except Exception as e:
            print(f"   ⚠️ Backup failed: {e}")
    return False

def check_existing_sidecar(audio_path):
    """Check if existing sidecar has word-level data."""
    sidecar = Path(audio_path).with_suffix('.lyrics.json')
    if not sidecar.exists():
        return None
    try:
        data = json.loads(sidecar.read_text())
        if isinstance(data, list):
            lines = data
        else:
            lines = data.get('lines', [])
        text_lines = [l for l in lines if l.get('text') and l.get('type') != 'vocal_cue']
        word_lines = [l for l in text_lines if l.get('words')]
        return {
            'total_lines': len(lines),
            'text_lines': len(text_lines),
            'word_lines': len(word_lines),
            'word_pct': round(100 * len(word_lines) / max(len(text_lines), 1)),
        }
    except:
        return None

def run_aligner(audio_path, dry_run=False, skip_backup=False):
    """Run aligner on a single track and return results."""
    if not os.path.exists(audio_path):
        return {"error": f"File not found: {audio_path}", "path": audio_path}

    artist, title = parse_track_info(audio_path)

    # Check for local .lrc
    lrc_path = Path(audio_path).with_suffix('.lrc')
    has_local_lrc = lrc_path.exists()

    cmd = [
        sys.executable, 'aligner.py',
        audio_path,
        '--artist', artist,
        '--title', title,
        '--engine', 'mlx'
    ]

    print(f"\n{'='*70}")
    print(f"Track: {Path(audio_path).name}")
    print(f"Artist: {artist} | Title: {title}")
    print(f"Local .lrc: {'✅ YES' if has_local_lrc else '❌ No'}")

    # Check existing sidecar
    existing = check_existing_sidecar(audio_path)
    if existing:
        print(f"Existing sidecar: {existing['text_lines']} lines, {existing['word_pct']}% word-synced")

    print(f"{'='*70}")

    if dry_run:
        print(f"[DRY RUN] Would run: {' '.join(cmd[:5])}...")
        return {"dry_run": True, "cmd": cmd, "has_local_lrc": has_local_lrc, "existing": existing}

    # Backup before running
    if not skip_backup:
        backup_sidecar(audio_path)

    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=300  # 5 min timeout
        )

        # Parse stderr for quality info
        stderr_lines = result.stderr.strip().split('\n')
        quality_info = []
        strategy_info = []
        for line in stderr_lines:
            if any(kw in line for kw in ['⚠️', '✅', '❌', 'quality', 'compressed', 'Mapped', 'sync points', 'LOCAL .lrc', 'API LRC', 'LRCLIB', 'Genius']):
                quality_info.append(line.strip())
            if any(kw in line for kw in ['TRUSTED', 'NOT trusted', 'Genius+LRC+Whisper', 'guided-whisper', 'lrc-only', 'blind']):
                strategy_info.append(line.strip())

        # Parse JSON output - find the JSON object/array in stdout
        try:
            stdout = result.stdout.strip()
            # Find the JSON start (either { or [)
            json_start = -1
            for i, c in enumerate(stdout):
                if c in '{[':
                    json_start = i
                    break

            if json_start == -1:
                print(f"❌ No JSON found in output")
                print(f"stdout: {stdout[:300]}")
                return {"error": "No JSON in output", "path": audio_path, "stderr": stderr_lines[-5:]}

            json_str = stdout[json_start:]
            output = json.loads(json_str)

            # Handle both formats: {"source": ..., "lines": [...]} or just [...]
            if isinstance(output, dict):
                lines = output.get('lines', [])
                source = output.get('source', 'unknown')
            else:
                lines = output
                source = 'unknown'

            text_lines = [l for l in lines if l.get('text') and l.get('type') != 'vocal_cue']
            word_lines = [l for l in text_lines if l.get('words')]
            total_words = sum(len(l.get('words', [])) for l in lines)

            stats = {
                "path": audio_path,
                "source": source,
                "has_local_lrc": has_local_lrc,
                "total_lines": len(lines),
                "text_lines": len(text_lines),
                "word_sync_lines": len(word_lines),
                "word_sync_pct": round(100 * len(word_lines) / max(len(text_lines), 1)),
                "total_words": total_words,
                "quality_info": quality_info[-5:],
                "strategy_info": strategy_info,
            }

            # Determine strategy case
            if has_local_lrc and source == 'genius-lrc-whisper':
                stats['case'] = 'CASE 1: Local .lrc (TRUSTED)'
            elif source == 'genius-lrc-whisper':
                stats['case'] = 'CASE 2.1: API LRC (VALIDATED)'
            elif source == 'guided-whisper':
                stats['case'] = 'CASE 2.2: API LRC (NOT validated) or no LRC'
            elif source == 'lrc-only':
                stats['case'] = 'CASE 2.3: LRC-only (no word-level)'
            elif source == 'blind-whisper':
                stats['case'] = 'CASE 3: Blind Whisper (no anchor)'
            else:
                stats['case'] = f'UNKNOWN: {source}'

            print(f"✅ Source: {source}")
            print(f"   Case: {stats['case']}")
            print(f"   Lines: {stats['text_lines']} | Word-synced: {stats['word_sync_lines']} ({stats['word_sync_pct']}%)")
            print(f"   Total words: {stats['total_words']}")
            for si in strategy_info[:3]:
                print(f"   {si}")
            for qi in quality_info[-3:]:
                print(f"   {qi}")

            return stats
        except json.JSONDecodeError as e:
            print(f"❌ JSON parse error: {e}")
            print(f"stdout: {result.stdout[:200]}")
            return {"error": f"JSON parse error: {e}", "path": audio_path, "stderr": stderr_lines[-5:]}

    except subprocess.TimeoutExpired:
        print(f"❌ Timeout (5 min)")
        return {"error": "timeout", "path": audio_path}
    except Exception as e:
        print(f"❌ Error: {e}")
        return {"error": str(e), "path": audio_path}

def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--dry-run', action='store_true', help='Just show what would be run')
    parser.add_argument('--quick', action='store_true', help='Test only first track of each category')
    parser.add_argument('--category', choices=['en-api', 'ru-api', 'en-lrc', 'all'], default='all')
    args = parser.parse_args()

    results = []

    if args.category in ['en-api', 'all']:
        print("\n" + "="*70)
        print("CATEGORY: EN with API lyrics")
        print("="*70)
        tracks = EN_API_TRACKS[:1] if args.quick else EN_API_TRACKS
        for t in tracks:
            results.append(run_aligner(t, dry_run=args.dry_run))

    if args.category in ['ru-api', 'all']:
        print("\n" + "="*70)
        print("CATEGORY: RU with API lyrics")
        print("="*70)
        tracks = RU_API_TRACKS[:1] if args.quick else RU_API_TRACKS
        for t in tracks:
            results.append(run_aligner(t, dry_run=args.dry_run))

    if args.category in ['en-lrc', 'all']:
        print("\n" + "="*70)
        print("CATEGORY: EN with local .lrc")
        print("="*70)
        tracks = EN_LRC_TRACKS[:1] if args.quick else EN_LRC_TRACKS
        for t in tracks:
            results.append(run_aligner(t, dry_run=args.dry_run))

    # Summary
    print("\n" + "="*70)
    print("SUMMARY")
    print("="*70)

    success = [r for r in results if 'word_sync_pct' in r]
    failed = [r for r in results if 'error' in r]

    print(f"Total: {len(results)} | Success: {len(success)} | Failed: {len(failed)}")

    if success:
        avg_word_pct = sum(r['word_sync_pct'] for r in success) / len(success)
        print(f"Average word-sync: {avg_word_pct:.1f}%")

        # Highlight any with low word sync
        low_sync = [r for r in success if r['word_sync_pct'] < 90]
        if low_sync:
            print(f"\n⚠️ Low word-sync tracks ({len(low_sync)}):")
            for r in low_sync:
                print(f"   {Path(r['path']).name}: {r['word_sync_pct']}%")

    if failed:
        print(f"\n❌ Failed tracks ({len(failed)}):")
        for r in failed:
            print(f"   {Path(r['path']).name}: {r['error']}")

if __name__ == '__main__':
    main()





