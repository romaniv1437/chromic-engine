#!/usr/bin/env python3
import json, os, time

paths = [
    '/path/to/project/media/music/2018-11-20 - flac/01 Сигналы.lyrics.json',
    '/path/to/music/2018-11-20 - flac/01 Сигналы.lyrics.json',
]
for p in paths:
    if os.path.exists(p):
        mtime = os.path.getmtime(p)
        print(f'Found: {p}')
        print(f'  Modified: {time.ctime(mtime)}')
        d = json.load(open(p))
        lines = d if isinstance(d, list) else d.get('lines', [])
        total_adlib = sum(1 for l in lines for w in l.get('words',[]) if w.get('adlib'))
        total_spoken = sum(1 for l in lines for w in l.get('words',[]) if w.get('spoken'))
        total_words = sum(len(l.get('words',[])) for l in lines)
        print(f'  Lines: {len(lines)}, Words: {total_words}, Adlib: {total_adlib}, Spoken: {total_spoken}')
        # Show lines with parens or trailing interjections
        for l in lines[:15]:
            if '(' in l.get('text','') or l.get('text','').endswith(', мэ') or l.get('text','').endswith(', да'):
                ws = [(w.get('word',''), 'A' if w.get('adlib') else '') for w in l.get('words',[])]
                print(f'    {l.get("text","")[:55]:55s} {ws}')

