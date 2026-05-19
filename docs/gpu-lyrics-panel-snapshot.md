# GPU Lyrics Panel (chromic-gpu-panel.js) — Architecture Snapshot

> File: `chromic-lyrics/chromic-gpu-panel.js`  
> Date: 2025-05-18

## Overview

Standalone Three.js + Troika Text SDF lyrics panel that overlays the visualizer container. Has its own WebGL context, EffectComposer with UnrealBloomPass. Toggled via `Ctrl+Shift+G`. This is the **reference implementation** — LyricsRenderer.ts ports its logic to the audio-visualizer's Three.js scene.

## Key Differences from LyricsRenderer.ts

| Feature | GPU Panel | LyricsRenderer |
|---------|-----------|----------------|
| Camera | Orthographic, world-space units (~6 tall) | NDC-based ortho (-1,1,1,-1) |
| Bloom | Own EffectComposer + UnrealBloomPass | Shared scene bloom via layers |
| Font | SFNS.ttf (variable) | SFNS-ExtraBold.ttf (static) |
| `sdfGlyphSize` | 64 | **128** (increased for crisp text) |
| Rendering | Own canvas, transparent overlay | Part of main visualizer scene |
| Blur states | `blur` property per state (not implemented in Troika) | Not supported |
| Paired states | Dedicated `pairAct/pairPast/pairFut` | Uses active/past/future |

## Design Tokens

| Token | Value | Notes |
|-------|-------|-------|
| `FONT` | `/chromic-lyrics/vendor/SFNS.ttf` | SF Pro variable font |
| `TARGET_FONT_PX` | `38` | Font size in pixels (converted to scene units) |
| `FS_AD_R` | `0.65` | Adlib font scale |
| `LINE_H` | `2.0` | Row height multiplier |
| `LINE_M_PX` | `56` | Line margin in pixels |
| `W_GAP_PX` | `8` | Word gap in pixels |
| `UNFILLED` | `0.5` | Base text opacity |
| `FILLED` | `1.0` | Filled text opacity |
| `FEATHER` | `0.15` | clipRect feather zone (15%) |
| `LERP` | `5.0` | Exponential lerp speed |

## Line States

| State | Opacity | Scale | Y-Offset | Blur |
|-------|---------|-------|----------|------|
| `active` | 1.0 | 1.04 | 0 | 0 |
| `past` | 0.5 | 0.97 | -0.25 | 1 |
| `pastFar` | 0.0 | 0.94 | -0.5 | 3 |
| `future1` | 0.75 | 0.99 | 0.03 | 0 |
| `future2` | 0.50 | 0.97 | 0.06 | 1.5 |
| `future3` | 0.25 | 0.95 | 0.10 | 3.5 |
| `future4` | 0.08 | 0.93 | 0.14 | 6 |
| `future5` | 0.0 | 0.91 | 0.18 | 8 |
| `future` | 0.0 | 0.88 | 0.35 | 8 |
| `adlibOn` | 0.6 | 0.92 | -0.15 | 0 |
| `adlibOff` | 0.35 | 0.90 | -0.1 | 0 |
| `adlibHid` | 0.0 | 0.88 | 0.1 | 0 |
| `pairAct` | 1.0 | 0.97 | 0 | 0 |
| `pairPast` | 0.0 | 0.96 | -0.25 | 2 |
| `pairFut` | 0.0 | 0.90 | 0.2 | 6 |

## Bloom Setup

```js
UnrealBloomPass(
  new THREE.Vector2(256, 256),
  0.35,   // strength
  0.6,    // radius
  0.85    // threshold
)
```

Uses `HalfFloatType` render target for HDR.

## Word Type Function

```js
function wt(w) {
  return w.stretch ? 'stretch' : w.sung ? 'sung' : w.spoken ? 'spoken' : w.whisper ? 'whisper' : 'normal';
}
```

**HARD RULE** (documented at top of file):
> Opacity & color are driven EXCLUSIVELY by Line State (past/active/future).  
> Word types NEVER modulate opacity or brightness — they only do scale, outline glow.  
> Every word in `past` looks identical in brightness. Every word in `future` looks identical.

## Mesh Architecture

Identical to LyricsRenderer:
- **Standard words**: 2 meshes (base + fill), clipRect sweep
- **Char-split sung/stretch**: per-character base+fill pairs, traveling Gaussian wave
- **Cue dots**: 3× CircleGeometry

## Key Features

### Camera Scroll
- `cameraY` smoothly follows active line + manual offset
- Manual scroll: mouse wheel, 3s decay timer, then exponential decay
- During scroll: all lines get `scroll`/`scrollAct` state

### Click-to-Seek
- NDC → world coordinate conversion
- Find closest word by position
- Trigger seek callback

### Track Metadata Display
- Artist + album text meshes above lyrics
- Album text gets blue glow (`0x7eb8ff`)
- Separate Troika Text meshes with own sync

### Adlib Handling
- Full adlib lines: per-word timed reveal
- Inline adlibs: two-tier layout, phrase-grouped reveal
- Adlib row positioned below main text with minimal gap

## What's NOT in GPU Panel (only in LyricsRenderer)

- Aspect ratio correction via `group.scale.x`
- `sdfGlyphSize = 128` (GPU panel still has 64)
- Integration with main scene bloom layers

## What's NOT in LyricsRenderer (only in GPU Panel)

- Blur states (not implementable in Troika)
- Own EffectComposer / WebGL context
- Panel toggle UI (`Ctrl+Shift+G`)

