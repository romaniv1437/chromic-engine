#!/usr/bin/env python3
import json
import os
import re
import subprocess

ROOT = '/path/to/project'
ALBUM_DIR = os.path.join(ROOT, 'media/music/2018-11-20 - flac')
WANTED_TRACK_PREFIXES = {'03', '05', '06', '09', '10'}
OUT_PATH = os.path.join(ROOT, 'data/decl_smoke_report.json')


def collect_sidecar_metrics():
    result = []
    for name in sorted(os.listdir(ALBUM_DIR)):
        if not name.endswith('.lyrics.json'):
            continue
        match = re.match(r'^(\d\d) ', name)
        if not match or match.group(1) not in WANTED_TRACK_PREFIXES:
            continue

        sidecar_path = os.path.join(ALBUM_DIR, name)
        with open(sidecar_path, 'r', encoding='utf-8') as fh:
            data = json.load(fh)

        lines = data if isinstance(data, list) else data.get('lines', [])
        text_lines = [line for line in lines if line.get('type') != 'vocal_cue']
        word_count = sum(len(line.get('words', [])) for line in text_lines)
        lines_with_words = sum(1 for line in text_lines if line.get('words'))

        nonmono = 0
        prev_time = -1.0
        for line in text_lines:
            words = line.get('words') or []
            ts = words[0].get('start', line.get('time', 0)) if words else line.get('time', 0)
            if ts < prev_time - 0.5:
                nonmono += 1
            prev_time = ts

        result.append({
            'name': name,
            'text_lines': len(text_lines),
            'word_count': word_count,
            'lines_with_words': lines_with_words,
            'nonmonotonic': nonmono,
        })

    return result


def run_training_smoke():
    cmd = [
        'python3',
        os.path.join(ROOT, 'lyrics-engine', 'smoke_test_training.py'),
        '--music_dir',
        ALBUM_DIR,
    ]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    return {
        'exit': proc.returncode,
        'stdout_tail': proc.stdout[-3000:],
        'stderr_tail': proc.stderr[-1200:],
    }


def run_aligner_smoke():
    aligner_path = os.path.join(ROOT, 'lyrics-engine', 'aligner.py')
    wanted_audio_prefixes = {'03', '10'}
    tracks = []
    for name in sorted(os.listdir(ALBUM_DIR)):
        if not name.endswith('.flac'):
            continue
        match = re.match(r'^(\d\d) ', name)
        if not match or match.group(1) not in wanted_audio_prefixes:
            continue
        title = os.path.splitext(name)[0]
        tracks.append((name, '', title))

    report = []
    for filename, artist, title in tracks:
        audio_path = os.path.join(ALBUM_DIR, filename)
        cmd = [
            'python3',
            aligner_path,
            audio_path,
            '--artist',
            artist,
            '--title',
            title,
            '--model',
            'tiny',
            '--engine',
            'faster',
        ]
        proc = subprocess.run(cmd, capture_output=True, text=True)
        item = {
            'track': filename,
            'exit': proc.returncode,
            'stdout_len': len(proc.stdout or ''),
            'stderr_tail': (proc.stderr or '')[-1500:],
        }
        if (proc.stdout or '').lstrip().startswith('{'):
            try:
                data = json.loads(proc.stdout)
                lines = data.get('lines', [])
                text_lines = [line for line in lines if line.get('type') != 'vocal_cue']
                item['source'] = data.get('source')
                item['text_lines'] = len(text_lines)
                item['word_count'] = sum(len(line.get('words', [])) for line in text_lines)
            except Exception as exc:
                item['parse_error'] = str(exc)
        report.append(item)
    return report


def main():
    report = {
        'sidecars': collect_sidecar_metrics(),
        'training_smoke': run_training_smoke(),
        'aligner_smoke': run_aligner_smoke(),
    }

    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with open(OUT_PATH, 'w', encoding='utf-8') as fh:
        json.dump(report, fh, ensure_ascii=False, indent=2)

    print(OUT_PATH)


if __name__ == '__main__':
    main()



