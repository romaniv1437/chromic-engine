# Pro Mode — Word-Level Lyrics Editing (Current Snapshot)

> Snapshot date: 2026-05-08
> File: `public/core/ChromicEditor.js` (1234 lines)

---

## 1. Activation

| Action | Shortcut |
|--------|----------|
| Toggle Pro Mode | `⌘/Ctrl + Shift + M` |

On activation:
- `document.body` gets `.chromic-pro-active` class
- All `.lyrics-line` and `.lyrics-translation` elements get `contenteditable="true"` + `.chromic-editable`
- A floating **PRO MODE** badge with speed slider appears (top-right)
- Audio source auto-detected (`#globalAudio` or first `<audio>`)
- `input` event listener attached to track all text changes
- LyricsEngine auto-scroll is **disabled** while pro mode is active (no layout fighting)
- FocusManager keyboard handling is **disabled** (no accidental Backspace/Escape navigation)

---

## 2. Word Selection & Navigation

### Mouse
- **Click a word** → selects it (`.chromic-edit-active`), shows timestamp panel + HUD
- **Click a vocal cue (• • •)** → selects for conversion

### Keyboard (when NOT editing text in contenteditable)

| Key | Action |
|-----|--------|
| `←` / `→` | Select prev/next word (flat list across all lines, wraps) |
| `↑` / `↓` | Jump to same word index in prev/next line (clamped) |
| `Tab` / `Shift+Tab` | Same as ←/→ (select adjacent word) |

Selected word gets:
- `.chromic-edit-active` class (green highlight)
- Floating **Word HUD** above it showing `start → end` timestamps
- Floating **Timestamp Panel** near it (positioned below word)

---

## 3. The Timestamp Panel

Appears whenever a word is selected. Contains:

```
┌─────────────────────────────────────┐
│ "кубак,"   Line 1 · Word 2      ✕  │
├─────────────────────────────────────┤
│ Start (s) [31.62  ]                 │
│ End (s)   [32.18  ]                 │
│ Style     [normal ▾]               │
├─────────────────────────────────────┤
│ [ Set Start  ] Set End  ✓ Apply  Cancel │
├─────────────────────────────────────┤
│ + Cue Before  + Cue After  ✕ Remove Line │
└─────────────────────────────────────┘
```

### Panel Actions

| Button | Action |
|--------|--------|
| `[ Set Start` | Sets word start to current `audio.currentTime` |
| `] Set End` | Sets word end to current `audio.currentTime` |
| `✓ Apply` | Saves start/end/style to `_editedLines` Map, closes panel |
| `Cancel` / `✕` | Closes panel without saving |
| `+ Cue Before/After` | Inserts a vocal_cue element adjacent to the line |
| `✕ Remove Line` | Deletes the active element entirely (with FLIP animation + BE sync) |

### Panel Input (not auto-focused)
- Panel inputs do NOT steal focus — user must click into them
- When focus is inside the panel, first `Escape` blurs the input; second `Escape` closes panel

---

## 4. Text Editing Flow

### Current behavior:
1. Click a word → word selected, timestamp panel appears
2. To edit text: click into the line (contenteditable) — cursor enters text
3. Type normally — `_onInput` handler tracks changes in `_editedLines` Map
4. `Backspace` on a selected word (not editing): places cursor at end of word + deletes one char
5. While cursor is in contenteditable (`isEditing=true`):
   - Arrow keys work as normal text cursor movement
   - `Escape` is ignored (won't close panel or exit pro mode)
   - Only `Shift+Click` on another line will seek audio

### Known issue:
- When editing text inside a `<span class="lyric-word">`, editing changes the span's `textContent` but the span boundaries themselves don't restructure. Deleting across word boundaries merges words into one span.

---

## 5. Timestamp Calibration (Live)

| Key | Action |
|-----|--------|
| `[` | Set **start** timestamp of selected word/line to current audio time |
| `]` | Set **end** timestamp of selected word/line to current audio time |

Visual feedback: 2px box-shadow (green for start, orange for end) flashes for 600ms.
HUD updates in real-time.

---

## 6. Vocal Styles

When a word is selected (not editing text):

| Key | Style |
|-----|-------|
| `1` | normal |
| `2` | stretch |
| `3` | ad-lib |
| `4` | spoken |
| `5` | whisper |

Applied via `data-style` attribute and `.chromic-style-{name}` class on the word span.

---

## 7. Playback Speed (Sniper Mode)

| Action | Control |
|--------|---------|
| `Alt+S` | Cycle: 1.0x → 0.75x → 0.5x → 0.25x |
| Badge slider | Drag to any speed (magnetic snap at 0.25/0.5/0.75/1.0) |

Sets `audio.playbackRate` for precise timestamp work.

---

## 8. Structural Operations

| Shortcut | Action |
|----------|--------|
| `⌘+Enter` | Convert vocal_cue (• • •) to line (prompts for text) |
| `⌘+Backspace` | Convert line to vocal_cue |
| `⌘+Shift+Backspace` | Delete element entirely (BE sync + FLIP animation) |
| `Shift+Enter` | Insert new editable line below active (auto time-gap) |
| `Shift+Click` on line | Seek audio to that line's start time |

---

## 9. Dirty State & Saving

### Change tracking:
- `_editedLines` Map stores all changes: `lineIndex → { text, startSec, endSec, style }`
- Translation edits stored as `translation:{lineIndex}` keys
- Contenteditable `input` events auto-tracked
- Badge shows `PRO MODE •` when dirty

### On exit (⌘+Shift+M or Escape without edits):
- If clean → immediate deactivate
- If dirty → **Confirm Modal** appears with options:

| Button | Action |
|--------|--------|
| **Sync to Server** | `PATCH /api/metadata/update` (timeline) + `PATCH /api/lyrics/translation/save` (translations) |
| **Export JSON File** | Downloads `{trackname}.json` |
| **Copy JSON to Clipboard** | Clipboard write |
| **Discard Changes** | Clears `_editedLines`, deactivates |
| **Cancel** | Stays in pro mode |

---

## 10. Export Formats

### JSON (`⌘+S`)
```json
{
  "exportedAt": "2026-05-08T17:33:05.185Z",
  "engine": "ChromicEditor v2.0",
  "mediaType": "audio",
  "editCount": 3,
  "trackPath": "music/Album/Artist - Title.mp3",
  "lines": [
    {
      "index": 0,
      "text": "Line text...",
      "startSec": 0.84,
      "endSec": 30.5,
      "words": [
        { "text": "Word", "index": 0, "start": 0.84, "end": 1.56, "style": "stretch" }
      ],
      "translation": "Translated text..."
    }
  ]
}
```

### LRC (`⌘+Shift+S`)
Standard timestamped lyrics format:
```
[00:00.84]Line text here
[00:30.50]Next line...
```

Filename derived from actual track path (e.g., `Artist - Title.json`, `Artist - Title.lrc`).

---

## 11. CSS Visibility (`.chromic-pro-active`)

When pro mode is active, CSS overrides ensure lyrics text is visible for editing:
- All `.lyrics-line` and `.lyric-word`: forced to `rgba(255,255,255,0.85)`, no gradient fills
- Selected word: full white + green highlight bg + outline
- Focused line: white text + green caret + bright outline
- Translation lines: visible at 0.7 opacity, cyan caret when editing

---

## 12. Integration Points

| System | How it interacts |
|--------|-----------------|
| **MusicPlayer overlay** | Panel buttons excluded from overlay click interception; Escape deferred to ChromicEditor |
| **FocusManager** | All keyboard handling skipped when `.chromic-pro-active` is on body |
| **LyricsEngine** | Auto-scroll (`_lerpScrollTo`) and `resyncScroll` disabled during pro mode |
| **Floating host** | All panels/badges/modals append to `#musicOverlayHost` when overlay is active, else `document.body` |

---

## 13. Data Flow Summary

```
User clicks word
  → _onClick selects word, shows panel + HUD
  → User presses [ or ] to calibrate timestamps
  → User types in contenteditable to edit text
  → _onInput tracks changes in _editedLines Map
  → _markDirty() updates badge
  → On exit: confirm modal → sync/export/discard
  → Sync: PATCH /api/metadata/update + /api/lyrics/translation/save
```

## 14. Flow Mode — Live Word Tapper

> Added: 2026-05-08

### Activation
| Action | Shortcut |
|--------|----------|
| Toggle Flow Mode | `⌘/Ctrl + Shift + F` |

Flow Mode is a sub-mode of Pro Mode for rapid word-level timestamp capture.

### Workflow
1. **Type** a word in the bottom input bar
2. **Hold Space** — captures `start_ms` from `audio.currentTime`
3. **Release Space** — captures `end_ms`, word is sent to backend
4. Input clears, ready for next word
5. **Ctrl+Z** — undo last tapped word

### Auto-Grouping
Backend auto-groups words into lines:
- If gap between previous word's end and current word's start < 1.5s → same line
- If gap ≥ 1.5s → new line created

### Backend Endpoints
| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/lyrics/flow-word` | Atomic word upsert into timeline |
| `POST` | `/api/lyrics/flow-undo` | Remove last tapped word |

### UI Elements
- Fixed bottom bar with: indicator dot, text input, word count, undo button
- Recording indicator turns red during Space hold
- Input border turns red during tapping

### Integration
- `chromic:flow-word` CustomEvent dispatched after each word (for LyricsEngine live update)
- Undo stack: up to 50 entries
- Enter key: submit word without timing (uses current time)
