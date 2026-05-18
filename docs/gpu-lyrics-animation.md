# GPU Lyrics Animation System

> **Engine:** `chromic-gpu-panel.js`  
> **Renderer:** Three.js + Troika `Text` meshes on transparent WebGL canvas  
> **Toggle:** `Ctrl+Shift+G`

---

## Architecture

Each word has **2 Troika Text meshes** layered in a `THREE.Group`:

1. **Base mesh** — white text at low opacity (`UNFILLED = 0.25`) — the dim unfilled word
2. **Fill mesh** — white text at full opacity (`FILLED = 1.0`) — the bright filled word, clipped left→right via `clipRect`

Vocal cue dots use `THREE.CircleGeometry` meshes instead of Text.

**Font:** SF NS ExtraBold (`SFNS-ExtraBold.ttf`, weight 800) for all scripts including CJK — no fallback font needed.

**Scene:** Orthographic camera, transparent background, CSS mask for top/bottom viewport fade.

---

## Design Tokens

| Token | Value | Purpose |
|-------|-------|---------|
| `UNFILLED` | 0.25 | Base mesh opacity (grey dim) |
| `FILLED` | 1.0 | Fill mesh opacity (bright white) |
| `FEATHER` | 0.35 | Fill clipRect extends past progress for soft SDF fade |
| `TARGET_FONT_PX` | 38 | Font size in pixels (converted to scene units) |
| `FS_AD_R` | 0.82 | Adlib font size ratio |
| `LINE_H` | 2.0 | Line height multiplier |
| `LINE_M_PX` | 56 | Line margin in pixels |
| `W_GAP_PX` | 8 | Word gap in pixels |
| `LERP` | 5.0 | Animation interpolation speed |

---

## Line States

| State | Opacity | Scale | Y Offset |
|-------|---------|-------|----------|
| **Active** | 1.0 | 1.04 | 0 |
| **Past** | 0.7 | 0.98 | -0.08 |
| **Past far (>5)** | 0.3 | 0.96 | -0.1 |
| **Future-1** | 0.65 | 0.98 | +0.10 |
| **Future-2** | 0.35 | 0.95 | +0.18 |
| **Future-3** | 0.15 | 0.93 | +0.24 |
| **Future-4** | 0.08 | 0.91 | +0.28 |
| **Future (>4)** | 0.06 | 0.90 | +0.30 |

**Interpolation:** Exponential lerp (`1 - exp(-LERP * dt)`) — frame-rate independent smooth transitions.

Line opacity/scale/offset are interpolated per frame: `current += (target - current) * lerpFactor`.

---

## Per-Word Fill Animation

### Fill Mechanism (All Word Types)

**clipRect sweep:** The fill mesh uses Troika's `clipRect` property to reveal text left→right.

```js
const clipX = wordWidth * progress;
const feather = wordWidth * FEATHER; // 0.35 = soft SDF fade
fill.clipRect = [-0.01, -10, clipX + feather, 10];
```

- **Progress** `_p`: `(currentTime - word.start) / (word.end - word.start)`, clamped 0–1
- **Feather:** clipRect extends 35% of word width past the fill point — Troika's SDF rendering creates a naturally soft edge
- **Past:** `clipRect = [-10, -10, 100, 10]` (fully revealed)
- **Future:** `clipRect = [-10, -10, -10, 10]` (fully hidden)

### Base/Fill Opacity

```js
baseOpacity = UNFILLED * lineOpacity;  // 0.25 × line state
fillOpacity = FILLED * lineOpacity;    // 1.0 × line state
```

Click flash: `fillOpacity += 0.5 * clickFlash` (brief brightness boost on click-to-seek).

---

## Word Types

### 🎤 Sung / Stretch (`stretch: true` or `sung: true`)

**Vertical wave (scaleY):**
- Traveling Gaussian wave peaks at fill position, with sigma = 0.25
- `scaleY = 1 + 0.12 × wave` — grows upward from baseline
- Breathing pulse during hold: `+= sin(t×4 + wi×0.7) × 0.03 × wave`
- Slight horizontal squeeze: `scaleX = 1 - 0.02 × wave`

**Wave lifecycle:**
| Phase | Wave Target | Decay |
|-------|-------------|-------|
| Filling | `sin(progress × π)` × Gaussian | Fast lerp |
| Filled (hold) | 0 (decays) | Slow lerp, 0.2 residual glow |
| Past/Future | 0 | Slow lerp |

**Baseline pinning:** Y position compensates for scale growth so text breathes **upward** from baseline, not expanding both directions:
```js
yCompensation = (scaleY - 1) * fontSize * 0.5;
position.y = baseLayoutY + yCompensation;
```

### 🔇 Whisper (`whisper: true`)

**Subtle vertical float:**
```js
whisperFloat = sin(time × WHISPER_FREQ + wordIndex × 1.3) × WHISPER_FLOAT;
// WHISPER_FREQ = 2.0, WHISPER_FLOAT = 0.015
```

- **No opacity change** — brightness matches other words exactly
- **No scale change** — only position oscillation
- Float is added to Y position alongside baseline pinning
- Active when filling, filled, or past; decays (×0.95) when not active
- Each word has a phase offset (`wi × 1.3`) so adjacent whisper words undulate

### 🗣️ Spoken (`spoken: true`)

**Snappy elastic scale bump:**
```js
// While filling: snap to SPOKEN_SNAP_SC (1.04)
spokenSnap += (SPOKEN_SNAP_SC - spokenSnap) * fSnap;  // fSnap = fast lerp

// After fill: immediately snap back to 1.0
spokenSnap += (1.0 - spokenSnap) * fSnap;
```

- **Uniform scale** — both scaleX and scaleY = spokenSnap (no directional wave)
- **Zero glow, zero wave** — punchy, not melodic
- **Sharp clip edge** — no feathered fill, just crisp fill sweep

### 📢 Adlib (`adlib: true`)

**Two-tier layout:**
- Main vocals positioned normally (left-aligned, wrapping)
- Adlib words in a separate row below main vocals, centered horizontally
- Font size: `FS × 0.82` (smaller than main)

**Fly-in animation:**
```js
// flyOffset goes 0.08 → 0 as reveal progresses
flyOffset = (1 - adReveal) * 0.08;
position.y = adBaseY - flyOffset;
```

| Phase | Reveal Target | Opacity |
|-------|---------------|---------|
| Hidden (future) | 0.0 | 0.0 |
| Incoming (~400ms before) | 0.6 | 0.3 × lineOp |
| Active (filling) | 1.0 | 0.7 × lineOp |
| Past (filled) | 1.0 | 0.5 × lineOp |

**Fill:** Same clipRect sweep as normal words, but with adlib-specific opacity modulation.

### Normal Words (no type flags)

**Gentle scale bump while filling:**
```js
if (isFilling && !adlib && !stretch && !spoken && !whisper) {
  scaleX = 1.015;
  scaleY = 1.015;
}
```

Minimal, barely perceptible — just enough life to feel responsive.

---

## Vocal Cue Dots

**Geometry:** `THREE.CircleGeometry(7px radius, 32 segments)` — matches DOM's 14px circles.

**Two meshes per dot:**
1. **Base:** white, opacity 0.1 (dim background circle)
2. **Fill:** white, opacity 1.0, starts at `scale(0, 0)` — scales up as dot fills

**Fill animation:**
```js
// During fill: scale grows
fill.scale.set(progress, progress, 1);

// Active dot: scale boost 1.3× with glow
if (isFilling) baseOpacity = 0.3;  // slightly brighter base

// Past: full size, slightly dimmer
```

**Layout:** Same x-position as text words (left edge), sequential horizontal spacing with 15px gap.

---

## Camera & Scrolling

### Auto-Follow
- Camera Y targets the active line's `_baseY` position
- Lerp: exponential `1 - exp(-3.5 × dt)` — smooth, frame-rate independent

### Manual Scroll Override
- Mouse wheel: `manualScrollOffset -= deltaY × 0.005`
- Natural scroll direction (macOS convention)
- 3-second hold after last wheel event, then offset decays (×0.95 per frame)

### Scroll Mode Detection
- During active scroll: all lines snap to uniform `opacity: 0.7`, `scale: 1.0`, no offset
- Active line gets `opacity: 1.0`

---

## Track Metadata

**Artist name:** Troika Text mesh, white, positioned above all lyrics, follows camera so it stays at viewport top.

**Album name:** Troika Text mesh in `#7eb8ff` (soft blue), with pulsing outline glow:
```js
outlineWidth: 0.008
outlineOpacity: 0.4 + sin(t × 1.5) × 0.15  // gentle pulse
outlineColor: 0x7eb8ff
```

---

## Click-to-Seek

**Raycaster:** Click on canvas → project to scene Y → find closest line → find closest word → seek to `word.start`.

Each mesh stores `userData: { startTime, lineIndex, entry }` for reverse lookup.

**Click flash:** On seek, the clicked word gets `_clickFlash = 1.0` which decays exponentially, boosting fill brightness briefly.

---

## Key Differences from DOM

| Feature | DOM | GPU |
|---------|-----|-----|
| **Fill mechanism** | CSS `mask-image` gradient on `::after` | Troika `clipRect` with SDF feather |
| **Sung/stretch wave** | Per-character `scaleY` via CSS vars | Whole-word `scaleY` with Gaussian envelope |
| **Whisper** | CSS `drop-shadow` filter | Vertical float position oscillation |
| **Spoken** | No special animation | Elastic uniform scale bump |
| **Adlib layout** | CSS absolute positioning | Scene-space Y offset with centered row |
| **Scrolling** | DOM `scrollTop` manipulation | Orthographic camera Y translation |
| **Blur/fade** | CSS `filter: blur()` per line | Opacity only (no GPU blur) |
| **Font** | System font stack | SF ExtraBold (800) for all scripts including CJK |
| **Rendering** | HTML/CSS reflow | WebGL draw calls, SDF text |

