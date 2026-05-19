#!/usr/bin/env python3
"""Test adlib detection logic on sample lines from Сигналы."""
import re

_TRAILING_ADLIB_WORDS = {
    'yeah', 'yuh', 'yah', 'uh', 'ah', 'oh', 'ooh', 'woo',
    'hey', 'ayy', 'ay', 'aye', 'huh', 'hmm', 'mmm', 'ey', 'eh',
    'skrrt', 'brr', 'grr', 'sheesh', 'woah', 'whoa', 'yo', 'ayo',
    'man', 'baby', 'babe', 'dawg', 'bruh',
    'мэ', 'да', 'а', 'э', 'е', 'эй', 'ай', 'ой', 'оу', 'у',
    'йоу', 'бейби', 'ман', 'йо', 'вспомни',
    'да!', 'эй!', 'а!', 'е!',
}

test_lines = [
    {'text': 'Как это было в начале, мэ', 'words': [{'word': 'Как'}, {'word': 'это'}, {'word': 'было'}, {'word': 'в'}, {'word': 'начале,'}, {'word': 'мэ'}]},
    {'text': 'Как это было в начале, да', 'words': [{'word': 'Как'}, {'word': 'это'}, {'word': 'было'}, {'word': 'в'}, {'word': 'начале,'}, {'word': 'да'}]},
    {'text': 'Как это было в начале, вспомни', 'words': [{'word': 'Как'}, {'word': 'это'}, {'word': 'было'}, {'word': 'в'}, {'word': 'начале,'}, {'word': 'вспомни'}]},
    {'text': 'Как это было в начале, эй', 'words': [{'word': 'Как'}, {'word': 'это'}, {'word': 'было'}, {'word': 'в'}, {'word': 'начале,'}, {'word': 'эй'}]},
    {'text': 'Как это было в начале, а', 'words': [{'word': 'Как'}, {'word': 'это'}, {'word': 'было'}, {'word': 'в'}, {'word': 'начале,'}, {'word': 'а'}]},
    {'text': 'Качает кварталы, бейби', 'words': [{'word': 'Качает'}, {'word': 'кварталы,'}, {'word': 'бейби'}]},
    {'text': 'Качает кварталы, а', 'words': [{'word': 'Качает'}, {'word': 'кварталы,'}, {'word': 'а'}]},
    {'text': 'Качает кварталы, yeah, man', 'words': [{'word': 'Качает'}, {'word': 'кварталы,'}, {'word': 'yeah,'}, {'word': 'man'}]},
    {'text': 'Новая волна качает кварталы, е', 'words': [{'word': 'Новая'}, {'word': 'волна'}, {'word': 'качает'}, {'word': 'кварталы,'}, {'word': 'е'}]},
    {'text': 'Rasta Mafia посылает сигналы, да', 'words': [{'word': 'Rasta'}, {'word': 'Mafia'}, {'word': 'посылает'}, {'word': 'сигналы,'}, {'word': 'да'}]},
    {'text': 'Whoo, shit! (Okay, baby)', 'words': [{'word': 'Whoo,'}, {'word': 'shit!'}, {'word': '(Okay,'}, {'word': 'baby)'}]},
    {'text': 'Перестал вдохновлять, как это было в начале, мэ', 'words': [{'word': 'Перестал'}, {'word': 'вдохновлять,'}, {'word': 'как'}, {'word': 'это'}, {'word': 'было'}, {'word': 'в'}, {'word': 'начале,'}, {'word': 'мэ'}]},
    # Should NOT be tagged:
    {'text': 'Не было загонов, ведь мы просто мечтали', 'words': [{'word': 'Не'}, {'word': 'было'}, {'word': 'загонов,'}, {'word': 'ведь'}, {'word': 'мы'}, {'word': 'просто'}, {'word': 'мечтали'}]},
    {'text': 'Качает кварталы, качает кварталы', 'words': [{'word': 'Качает'}, {'word': 'кварталы,'}, {'word': 'качает'}, {'word': 'кварталы'}]},
    {'text': 'Как это было в начале', 'words': [{'word': 'Как'}, {'word': 'это'}, {'word': 'было'}, {'word': 'в'}, {'word': 'начале'}]},
]

for line in test_lines:
    words = line['words']
    # 1) Parenthesis-based detection
    in_paren = False
    for w in words:
        txt = w.get('word', '')
        if '(' in txt: in_paren = True
        if in_paren: w['adlib'] = True
        if ')' in txt: in_paren = False
    # 2) Trailing interjection — try each comma, use first where all trailing are adlibs
    if len(words) >= 2:
        for ci in range(len(words) - 1):
            if not words[ci].get('word', '').rstrip().endswith(','):
                continue
            trailing = words[ci + 1:]
            if len(trailing) > 3:
                continue
            all_adlib = all(
                w.get('word', '').strip().rstrip('.,!?;:').lower() in _TRAILING_ADLIB_WORDS
                for w in trailing
            )
            if all_adlib:
                for w in trailing:
                    w['adlib'] = True
                break

    adlibs = [w['word'] for w in words if w.get('adlib')]
    mark = '✅' if adlibs else '  '
    print(f'{mark} {line["text"]:55s} -> {adlibs if adlibs else "(none)"}')


