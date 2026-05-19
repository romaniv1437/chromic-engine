# LyricsRenderer (Troika Text) — Architecture Snapshot

> File: `audio-visualizer/src/core/LyricsRenderer.ts`  
> Date: 2025-05-18

## Overview

Three.js-based lyrics renderer using **Troika-three-text** SDF text meshes inside an OrthographicCamera(-1,1,1,-1) viewport. Renders lyrics as a scrolling list of word-level meshes with fill-sweep animation, bloom effects, and click-to-seek.

## Design Tokens

| Token | Value | Notes |
|-------|-------|-------|
| `FONT` | `/chromic-lyrics/vendor/SFNS-ExtraBold.ttf` | SF Pro ExtraBold |
| `FONT_SIZE` | `0.09` | ~9% of viewport height in NDC |
| `FS_AD_RATIO` | `0.65` | Adlib font scale factor |
| `LINE_HEIGHT` | `0.14` | Vertical spacing between lines |
| `WORD_GAP` | `0.018` | Horizontal gap between words |
| `UNFILLED` | `0.5` | Base opacity for unfilled text |
| `FILLED` | `1.0` | Opacity for filled text |
| `FEATHER` | `0.15` | ±15% feather zone in clipRect fill sweep |
| `sdfGlyphSize` | `128` | SDF texture resolution per glyph (increased from 64 for crisp text) |
| `TEXT_LEFT` | `0.0` | Left edge of text area in NDC |
| `TEXT_MAX_WIDTH` | `0.9` | Max line width before wrapping |
| `ACTIVE_LINE_Y` | `0.5` | Active line position (25% from top in NDC) |

## Line States

Controls opacity, scale, and Y-offset for each line relative to active:

| State | Opacity | Scale | Y-Offset |
|-------|---------|-------|----------|
| `active` | 1.0 | 1.04 | 0 |
| `past` | 0.5 | 0.97 | -0.08 |
| `pastFar` | 0.0 | 0.94 | -0.17 |
| `future1` | 0.75 | 0.99 | 0.01 |
| `future2` | 0.50 | 0.97 | 0.02 |
| `future3` | 0.25 | 0.95 | 0.033 |
| `future4` | 0.08 | 0.93 | 0.047 |
| `future5` | 0.0 | 0.91 | 0.06 |
| `future` | 0.0 | 0.88 | 0.12 |
| `adlibOn` | 0.6 | 0.92 | -0.05 |
| `adlibOff` | 0.35 | 0.90 | -0.033 |
| `adlibHid` | 0.0 | 0.88 | 0.033 |
| `scroll` | 0.7 | 1.0 | 0 |
| `scrollAct` | 1.0 | 1.0 | 0 |

## Word Types

Determined by `wordType(w)` function from lyrics JSON flags:

| Type | Condition | Fill Animation | Past/Future Appearance |
|------|-----------|----------------|----------------------|
| `normal` | no flags | Standard clipRect sweep | Same as all words — driven by **line state only** |
| `spoken` | `w.spoken` | Standard clipRect sweep | Same as all words — driven by **line state only** |
| `whisper` | `w.whisper` | Standard clipRect sweep | Same as all words — driven by **line state only** |
| `sung` | `w.sung` | **Char-split** traveling wave (if >1 char) | Same as all words — driven by **line state only** |
| `stretch` | `w.stretch` | **Char-split** traveling wave (if >1 char) | Same as all words — driven by **line state only** |

**KEY RULE**: Word types affect ONLY the fill animation (wave, bloom). Past/future words look identical regardless of type — opacity and brightness are driven exclusively by line state.

## Mesh Architecture

### Per-Word: 2-Mesh System (base + fill)
- **base**: Full text, `clipRect = null`, opacity = `UNFILLED * lineOp`
- **fill**: Full text, `clipRect` sweeps left→right, opacity = `FILLED * lineOp`
- Both meshes overlap at same position — fill reveals on top of base

### Char-Split Words (sung/stretch with >1 char)
- Each character becomes its own base+fill mesh pair
- Enables per-character **traveling wave** animation:
  - Gaussian wave center moves through chars over word duration
  - `scaleY = 1 + 0.14 * wave`, `scaleX = 1 + 0.05 * wave`
  - Pin baseline (grow upward)
  - HDR bloom boost (`color = boost, boost, boost` where `boost = 1.0 + 4.0 * wave²`)
  - Char enabled on layer 0 during wave for bloom pass
- Fill sweep: cumulative `clipRect` per-character aligned with word progress

### Single-Char Sung/Stretch + Normal/Spoken/Whisper
- Standard 2-mesh word (no char-split)
- Sung/stretch gets whole-word wave: `scaleY = 1 + 0.14 * wave`, with bloom

### Cue Dots
- 3× `CircleGeometry` meshes (base + fill)
- Sequential scale fill: `fill.scale = (p, p, 1)`
- 1.3× base scale boost when filling

## Fill Animation — ClipRect Sweep

```
clipRect = [-0.01, -10, clipX + feather, 10]
```

- `clipX = wordWidth * progress`
- `feather = wordWidth * 0.15`
- Progress 0 → `clipRect = [-10, -10, -10, 10]` (fully clipped = invisible fill)
- Progress 1 → `clipRect = [-10, -10, 100, 10]` (fully revealed)

For **paired () lines**: line-level sweep instead of per-word timing.

## Bloom / HDR Glow

- Only active line words with wave > 0.005 get bloom
- `fill.color = new THREE.Color(boost, boost, boost)` where `boost = 1.0 + 4.0 * glow²`
- Fill enabled on layer 0 for bloom pass; disabled otherwise
- Past/future words: **never** get bloom, always `color = 0xffffff`, layer 0 disabled

## Scroll System

- `scrollY` interpolates toward active line position + manual offset
- Manual scroll via `handleWheel()`: offsets `manualScrollOffset`, starts 3s decay timer
- After decay timer: offset exponentially decays to 0
- During manual scroll: all lines get `scroll`/`scrollAct` state (uniform visibility)

## Aspect Ratio

- `group.scale.x = aspectX` where `aspectX = h/w`
- Click coordinates divided by `aspectX` to convert NDC → layout space

## Adlib Handling

### Full Adlib Lines (`line.adlib = true`)
- Per-word timed reveal: 0.35s pre-roll fade-in, fade-out after end
- Lower opacity (0.3–0.4 × lineOp)

### Inline Adlibs (mixed line with adlib + non-adlib words)
- Two-tier layout: main words on top row, adlib words on row below
- Phrase-grouped: consecutive adlib words grouped, revealed together
- 0.3s pre-roll fade-in, max opacity 0.45 × lineOp

## Material Setup

All Troika meshes patched after sync:
- `transparent = true`
- `depthWrite = false`
- `depthTest = false`
- `onBeforeRender` hook re-patches if Troika regenerates material

## Click-to-Seek

- Raycast via NDC coordinates, adjusted for `aspectX`
- Finds closest word by position (within `fs * 1.5` Y tolerance)
- `_clickFlash = 1.0` on hit, decays with `fSnap`
- Calls registered `_onSeek(time)` callback

## Seek Detection

- Detects time jumps `|dt| > 0.3s backward or > 2.0s forward`
- On seek: resets all word progress, clip rects, scales, glow

