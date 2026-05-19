#!/usr/bin/env python3
"""Quick batch test: run aligner on all 8 tracks and report."""
import subprocess, json, os, sys, shutil
from pathlib import Path
from datetime import datetime

VENV_PYTHON = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'venv', 'bin', 'python3')

TRACKS = [
    # Local .lrc tracks (Melanie Martinez)
    "/path/to/music/Melanie Martinez - K-12/Disc 1/09 - Melanie Martinez - Orange Juice.flac",
    "/path/to/music/Melanie Martinez - K-12/Disc 1/12 - Melanie Martinez - High School Sweethearts.flac",
    "/path/to/music/Melanie Martinez - K-12/Disc 1/05 - Melanie Martinez - Nurse's Office.flac",
    # EN API tracks
    "/path/to/music/Blood Was Never Thick As Water (2021)/03. Why Do We Get High.flac",
    "/path/to/music/GATOR (2023)/01. Death gotta be easy (cause life is hard).flac",
    "/path/to/music/Blood Was Never Thick As Water (2021)/01. Dying Slowly.flac",
    # RU API tracks (Detsl aka Le Truk)
    "/path/to/music/2018-11-20 - flac/11 Fibonacci.flac",
    "/path/to/music/2018-11-20 - flac/04 Узурпаторов план.flac",
]

def get_metadata(audio_path):
    """Read artist/title from file metadata via ffprobe."""
    try:
        r = subprocess.run(
            ['ffprobe', '-v', 'quiet', '-print_format', 'json', '-show_format', audio_path],
            capture_output=True, text=True, timeout=10
        )
        d = json.loads(r.stdout)
        tags = d.get('format', {}).get('tags', {})
        artist = tags.get('ARTIST', '') or tags.get('artist', '') or tags.get('album_artist', '')
        title = tags.get('TITLE', '') or tags.get('title', '')
        return artist, title
    except Exception:
        # Fallback: parse from filename
        fname = Path(audio_path).stem
        parts = fname.split(' - ')
        if len(parts) >= 3:
            return parts[1].strip(), ' - '.join(parts[2:]).strip()
        elif len(parts) == 2:
            return parts[0].strip(), parts[1].strip()
        return Path(audio_path).parent.name, fname

def backup_sidecar(audio_path):
    sidecar = Path(audio_path).with_suffix('.lyrics.json')
    if sidecar.exists():
        ts = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup = sidecar.parent / f"{sidecar.stem}.backup_{ts}.json"
        try:
            shutil.copy2(sidecar, backup)
            print(f"  📦 Backed up {sidecar.name}")
        except:
            pass

def run_one(audio_path, artist, title):
    if not os.path.exists(audio_path):
        print(f"  ❌ NOT FOUND")
        return {"error": "not found", "path": audio_path}

    lrc_path = Path(audio_path).with_suffix('.lrc')
    has_lrc = lrc_path.exists()

    backup_sidecar(audio_path)

    aligner = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'aligner.py')
    cmd = [VENV_PYTHON, aligner, audio_path, '--artist', artist, '--title', title, '--engine', 'mlx']

    print(f"\n{'='*70}")
    print(f"🎵 {Path(audio_path).name}")
    print(f"   Artist: {artist} | Title: {title} | LRC: {'YES' if has_lrc else 'NO'}")
    sys.stdout.flush()

    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
    except subprocess.TimeoutExpired:
        print(f"  ❌ TIMEOUT")
        return {"error": "timeout", "path": audio_path}

    # Print key stderr lines
    for line in r.stderr.split('\n'):
        if any(k in line for k in ['✅', '❌', '⚠️', 'TRUSTED', 'NOT trusted', 'sync points', 'Found', 'Mapped', 'Done', 'Source']):
            print(f"   {line.strip()}")

    # Parse JSON from stdout
    stdout = r.stdout.strip()
    json_start = -1
    for i, c in enumerate(stdout):
        if c in '{[':
            try:
                output = json.loads(stdout[i:])
                json_start = i
                break
            except:
                continue
    if json_start < 0:
        print(f"  ❌ No JSON output")
        print(f"  stderr tail: {r.stderr[-200:]}")
        return {"error": "no json", "path": audio_path}

    lines = output.get('lines', output) if isinstance(output, dict) else output
    source = output.get('source', '?') if isinstance(output, dict) else '?'
    text_lines = [l for l in lines if l.get('text') and l.get('type') != 'vocal_cue']
    word_lines = [l for l in text_lines if l.get('words')]
    pct = round(100 * len(word_lines) / max(len(text_lines), 1))
    total_words = sum(len(l.get('words', [])) for l in lines)

    print(f"  ✅ Source: {source} | Lines: {len(text_lines)} | Word-synced: {len(word_lines)} ({pct}%) | Words: {total_words}")

    # Save sidecar
    try:
        sidecar = Path(audio_path).with_suffix('.lyrics.json')
        sidecar.write_text(json.dumps(output, ensure_ascii=False, indent=2))
        print(f"  💾 Saved {sidecar.name}")
    except Exception as e:
        print(f"  ⚠️ Could not save sidecar: {e}")

    return {"path": audio_path, "name": Path(audio_path).name, "source": source, "has_lrc": has_lrc,
            "text_lines": len(text_lines), "word_lines": len(word_lines), "word_pct": pct, "total_words": total_words}

def main():
    results = []
    for path in TRACKS:
        artist, title = get_metadata(path)
        results.append(run_one(path, artist, title))

    print(f"\n{'='*70}")
    print("SUMMARY")
    print(f"{'='*70}")
    ok = [r for r in results if 'word_pct' in r]
    fail = [r for r in results if 'error' in r]
    print(f"Total: {len(results)} | OK: {len(ok)} | Failed: {len(fail)}")
    if ok:
        avg = sum(r['word_pct'] for r in ok) / len(ok)
        print(f"Average word-sync: {avg:.0f}%")
        for r in ok:
            lrc = "LRC" if r['has_lrc'] else "API"
            flag = "✅" if r['word_pct'] >= 95 else "⚠️" if r['word_pct'] >= 80 else "❌"
            print(f"  {flag} {r['word_pct']:3d}% | {r['source']:22s} | {lrc:3s} | {r['name']}")
    for r in fail:
        print(f"  ❌ {r['error']}: {r.get('path','?')}")

if __name__ == '__main__':
    main()

