# Chromic Waveform Canvas — Full Technical Snapshot

> **Date:** 2026-05-10 (v2 — Multi-Lane DAW Update)  
> **File:** `public/core/ChromicEditor.js` (WaveformPainter class)  
> **CSS:** `public/chromic.css`

---

## Architecture Overview

```
ChromicEditor (Flow Mode)
  │
  ├── _activateFlowMode()
  │     ├── Creates <div class="chromic-flow-waveform"> wrapper (120px)
  │     ├── Instantiates WaveformPainter(mediaElement)
  │     ├── Calls .init() → decodes audio → pre-computes peaks
  │     ├── Calls .mount(waveWrap) → creates <canvas>, calculates lanes
  │     └── Sets up callbacks:
  │           ├── onWordSelect(wordIdx)
  │           ├── onWordTimingChange(wordIdx, start, end)
  │           ├── onWordLaneChange(wordIdx, newLane)
  │           └── onWordSplit(wordIdx, splitTime)
  │
  ├── _flowLoadExistingWords()
  │     ├── Reads .lyric-word[data-start][data-end] from DOM → addWord()
  │     ├── Reads .lyrics-intro-dots[data-line-index] → addWord(isCue)
  │     └── addWord() auto-runs calculateLanes()
  │
  ├── _flowSelectWord(wordEl) — DOM → waveform sync
  │     ├── Sets _selectedWordIdx + _selectedWordIdxs
  │     ├── Auto-zooms to show word
  │     └── Seeks audio to word.start
  │
  └── _deactivateFlowMode()
        └── waveformPainter.destroy()
```

---

## Multi-Lane System (DAW-Style)

### Lane Layout (120px canvas height)

```
┌──────────────────────────────────────────┐
│ Lane 0: Main Vocals (Blue)         30px  │
├──────────────────────────────────────────┤
│ Lane 1: Ad-lib (Teal)              30px  │
├──────────────────────────────────────────┤
│ Lane 2: Backing (Green)            30px  │
├──────────────────────────────────────────┤
│ Lane 3: Cues/Metadata (Purple)     30px  │
└──────────────────────────────────────────┘
```

- **Dynamic lanes:** Only lanes with words are rendered. If all words are on Lane 0, full height is used.
- **Lane colors:** `LANE_COLORS[]` — Blue, Teal, Green, Purple
- **Lane labels:** Rendered at left edge ("Main", "Ad-lib", "Back", "Cue")
- **Lane separators:** Subtle white lines between active lanes

### `calculateLanes()` — Greedy Interval-Graph Assignment

```
1. Sort words by start time
2. For each word:
   - Cues → always Lane 3
   - Manually-set lane (_manualLane) → respected
   - Auto: pick lowest lane where word.start ≥ laneEnd[lane]
   - Fallback: stack on lane with earliest end time
3. Called after: addWord(), removeLastWord(), splitWord(), pointer up
```

### Lane Geometry

```javascript
_laneGeometry(lane, dpr) → { y, h }
// y = top offset, h = lane height (both in canvas pixels)
// Height = (canvasH - padding) / activeLaneCount

_activeLaneCount() → 1..4
// Returns max(lane) + 1 across all words
```

---

## WaveformPainter Class — Constructor

```javascript
class WaveformPainter {
  constructor(mediaElement) {
    this._media = mediaElement;
    this._peaks = null;               // Float32Array
    this._peakRate = 0;               // 200 peaks/sec
    this._canvas = null;
    this._ctx = null;
    this._raf = 0;
    this._zoom = 150;                 // px/sec (30–1200)
    this._savedWords = [];            // {start, end, text, lane, isCue, lineIndex, style}
    
    // Lane system
    this._laneCount = 4;
    this._canvasHeight = 120;         // px (increased from 80)
    this._lanePad = 2;               // px between lanes
    
    // Selection
    this._selectedWordIdx = -1;
    this._selectedWordIdxs = Set();   // Multi-selection (Shift+Click)
    this._hoveredWordIdx = -1;
    
    // Drag
    this._dragMode = null;            // 'left'|'right'|'move'|null
    this._dragStartX/Y = 0;
    this._dragOrigStart/End/Lane = 0;
    this._multiDragOrig = Map();      // originals for all selected words
    
    // Magnetic snapping
    this._snapThreshold = 0.005;      // 5ms
    this._lastSnap = null;            // time of active snap (for visual)
    
    // Callbacks
    this.onWordSelect = null;
    this.onWordTimingChange = null;
    this.onWordLaneChange = null;
    this.onWordSplit = null;
  }
}
```

---

## New Features

### 1. Magnetic Snapping (`_snapTime`)

When dragging word edges, they snap to:
- **Playhead position** (within 5ms)
- **All other word start/end edges** (within 5ms)
- Visual: yellow dashed vertical line appears at snap point
- Excludes the word being dragged from snap targets

```javascript
_snapTime(t, excludeIdx) → { time, snapped: boolean }
```

### 2. Split Tool (Ctrl/Cmd + Click)

Splits a word at the playhead position:
- Original word gets truncated (text + end time)
- New word inserted after with remaining text + time
- Text split proportionally by word count
- Lanes recalculated after split

```javascript
splitWord(wordIdx, splitTime) → newWordIdx
```

### 3. Multi-Selection (Shift + Click)

- `_selectedWordIdxs: Set` tracks all selected words
- Shift+Click toggles word in/out of selection
- All selected words move together during drag
- Badge shows "N selected" at bottom-left of canvas
- Single click (no Shift) resets to single selection

### 4. Vertical Drag (Lane Change)

- During 'move' drag, Y position determines target lane
- `_clientYToLane(clientY)` converts mouse Y to lane index
- Sets `word._manualLane` to persist user's choice
- Lanes recalculated on pointer up

---

## Render Pipeline (`_draw()`)

**Draw order:**

1. **Lane separators** — horizontal lines + lane labels (if >1 lane)
2. **Word blocks** — per-lane Y-offset rendering:
   - Fill rect in lane bounds
   - Border with state-based opacity
   - Edge handles (selected only)
   - Snap indicator (yellow dashed line)
   - Text label (centered in lane, truncated if narrow)
   - Time labels (selected, if block wide enough)
3. **Recording zone** — red overlay
4. **Waveform peaks** — green bars (reduced to 0.2 alpha, 0.7 height)
5. **Playhead** — red center line
6. **Time label** — at playhead
7. **Zoom indicator** — top-right
8. **Multi-select badge** — bottom-left ("N selected")

---

## Input Handling Changes

### `_hitTest(clientX, clientY)` — Lane-Aware

Now checks Y coordinate against each word's lane bounds:
```
For each word (reverse order):
  Compute lane Y bounds from _laneGeometry
  if cssY outside lane → skip
  if cssX within word X bounds → return hit
```

### `_onPointerDown` — New Modifiers

| Modifier | Action |
|----------|--------|
| None | Single select + start drag |
| Shift | Toggle multi-selection |
| Ctrl/Cmd | Split word at playhead |

### `_onPointerMove` — Enhanced Drag

- **Move mode:** All selected words move together (multi-drag)
- **Magnetic snapping** on start/end edges
- **Lane detection** from Y position during move
- **Edge resize:** Single word only, with snapping

---

## Data Structure (Backward Compatible)

```javascript
// Word object:
{
  text: string,
  start: number,      // seconds
  end: number,        // seconds
  lane: number,       // 0-3, default 0 (backward compat)
  isCue: boolean,
  lineIndex: number,
  style: string,
  _manualLane: number  // set when user drags between lanes
}
```

`.lyrics.json` format: `lane` property added per word. Missing = defaults to 0.

---

## CSS

```css
.chromic-flow-waveform {
  height: 120px;    /* increased from 80px for multi-lane */
  /* ...rest unchanged... */
}
```

---

## Key Constraints & Gotchas

1. **Lane geometry is dynamic:** `_activeLaneCount()` checks max lane in use. Single-lane tracks get full height.

2. **Cues always Lane 3:** `calculateLanes()` forces `isCue` words to last lane regardless of overlaps.

3. **Manual lanes persist:** `_manualLane` survives `calculateLanes()` — user's vertical drag choice is respected.

4. **Multi-drag originals:** `_multiDragOrig` Map stores original start/end/lane for each selected word at drag start. All words get same `dt` offset.

5. **Snap visual is per-frame:** `_lastSnap` is cleared on pointer up. Yellow dashed line only shows during active drag.

6. **Split text heuristic:** Splits text at word boundaries proportional to time split ratio. If only 1 word, second half gets "…".

7. **Canvas height:** 120px CSS / × DPR for canvas. ResizeObserver uses `_canvasHeight` for consistency.

8. **Backward compat:** All old code that sets `_selectedWordIdx` still works. `_selectedWordIdxs` is additive — `_draw()` checks both.

9. **Ripple Edit (Alt/Option):** Holding Alt during drag activates ripple mode. Right-edge drag pushes/pulls all following words; move drag shifts current + all following. `_rippleOrigPositions` Map captures originals at drag start for frame-accurate updates.

10. **Shift All / Close Gap buttons:** "Shift All" applies the currently selected word's delta to all words after it. "Close Gap" pulls the next word flush to the selected word's end, closing any silence gap.

11. **Collision prevention:** During ripple, words maintain minimum 20ms duration (`w.start + 0.02`). Lane recalculation runs after every ripple frame to prevent visual overlap.
