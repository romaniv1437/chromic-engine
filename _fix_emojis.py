#!/usr/bin/env python3
import sys

f = 'public/core/ChromicEditor.js'
with open(f, 'r') as fh:
    content = fh.read()

replacements = [
    ('\U0001f3b5 Embedded Reference', 'Embedded Reference'),
    ('\U0001f3b5 Source: embedded', 'Source: embedded'),
    ('\U0001f3b5 Viewing embedded', 'Viewing embedded'),
    ('\U0001f504 Source: generated', 'Source: generated'),
    ('\U0001f4c4 Source: .lrc', 'Source: .lrc'),
    ('\U0001f4be Save', 'Save'),
    ('\u2705 Saved', 'Saved'),
    ('\u274c Error', 'Error'),
    ('\U0001f504 Re-aligning', 'Re-aligning'),
    ('\U0001f504 Aligner started', 'Aligner started'),
    ('\u26a0\ufe0f Server unreachable', 'Server unreachable'),
    ('\u274c Re-align', 'Re-align'),
    ('\U0001f50d VALIDATING', 'VALIDATING'),
    ('\U0001f4be Saving lyrics', 'Saving lyrics'),
    ('\U0001f6e1\ufe0f Repair Required', 'Repair Required'),
    ('\u26a0\ufe0f Validation Warnings', 'Validation Warnings'),
    ('\U0001f527 Fixed', 'Fixed'),
    ('\U0001f527 Auto-Fix', 'Auto-Fix'),
    ('\U0001f4c2 Loaded backup', 'Loaded backup'),
    ('\U0001f3b5 Embedded (original', 'Embedded (original'),
    ('\u26a0\ufe0f ${', '${'),
]

for old, new in replacements:
    content = content.replace(old, new)

with open(f, 'w') as fh:
    fh.write(content)
print(f'Done - {f}')

f2 = 'public/ui/AIActivityHub.js'
with open(f2, 'r') as fh:
    c2 = fh.read()
c2 = c2.replace('\U0001f3a8 Mood Colors', 'Mood Colors')
c2 = c2.replace('\U0001f3a8 Extracting mood', 'Extracting mood')
with open(f2, 'w') as fh:
    fh.write(c2)
print(f'Done - {f2}')

