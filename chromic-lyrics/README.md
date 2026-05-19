# ChromicLyrics — GPU SDF Text Engine

GPU-accelerated lyrics renderer using **Three.js** + **troika-three-text** (SDF text).
Renders the same `.lyrics.json` data as the DOM engine, but on a WebGL canvas.

## Why?

The DOM lyrics engine suffers from subpixel ghosting when `::after` overlays drift under compositing (opacity + translateY on parent containers). This eliminates that by rendering all text as **SDF geometry on the GPU** — one layer, zero ghosting, resolution-independent.

## Toggle

**Ctrl+Shift+G** — opens the GPU panel side-by-side with the DOM lyrics panel.

## Architecture

```
chromic-gpu-panel.js          → Mounts iframe, feeds lyrics + time via postMessage
gpu-lyrics-test.html          → Three.js scene, troika Text meshes, render loop
vendor/gpu-deps.bundle.js     → Bundled three.js + troika-three-text (esbuild)
vendor/NotoSans-Bold.ttf      → Open-source fallback font (OFL license)
vendor/SFNS.ttf               → macOS system font (local dev only, gitignored)
```

Data flow:
```
MusicPlayer.currentLyrics (.lyrics.json from aligner.py)
  → postMessage('chromic-gpu-lyrics', { lines })
  → iframe builds troika Text meshes

MusicPlayer.audioEngine.audioElement.currentTime
  → postMessage('chromic-gpu-time', { currentTime })  (every rAF)
  → iframe updates word fill, line states, camera scroll
```

## Animations (matching DOM `styles.css` exactly)

| Feature | DOM (CSS) | GPU (Three.js) |
|---------|-----------|----------------|
| **Word fill** | `::after` mask + `--progress` | Color lerp unfilled→filled per word |
| **Line states** | `.active` scale(1.05), `.future-N` progressive blur/dim | Group scale + opacity lerp per line |
| **Adlib** | `.adlib-phrase` opacity 0.7, fly-in translateY | Group opacity 0.7, lerped Y offset |
| **Stretch/Sung glow** | `text-shadow` + `scaleY` wave | `outlineWidth` + `scale.y` wave |
| **Past lines** | opacity 0.7, scale 0.98 | Same via group properties |
| **Future blur** | CSS `filter: blur()` progressive | Opacity fade (GPU has no per-mesh blur) |

## Fonts

### Distribution (default)

Ships with **Noto Sans Bold** (`vendor/NotoSans-Bold.ttf`) — covers Latin, Cyrillic, Greek.
Licensed under the [SIL Open Font License](https://scripts.sil.org/OFL).

### Local development — Apple San Francisco (recommended)

For full glyph coverage including CJK, emoji, and all scripts, extract the ExtraBold weight from the macOS system font:

```bash
# Requires: pip3 install fonttools
python3 -c "
from fontTools.ttLib import TTFont
from fontTools.varLib.mutator import instantiateVariableFont
font = TTFont('/System/Library/Fonts/SFNS.ttf')
instantiateVariableFont(font, {'wght': 800})
font.save('public/chromic-lyrics/vendor/SFNS-ExtraBold.ttf')
"
```

This extracts weight 800 (ExtraBold) as a static font file that troika-three-text can render with proper boldness.
The GPU engine auto-detects `SFNS-ExtraBold.ttf` and uses it when present.
Falls back to `NotoSans-Bold.ttf` if not found.

> **⚠️ Do not commit SFNS-ExtraBold.ttf** — Apple's font license does not permit redistribution.
> The file is already in `.gitignore`.

### Rebuilding the JS bundle

If you update three.js or troika-three-text versions:

```bash
npm install three@0.162.0 troika-three-text@0.52.4 esbuild
npx esbuild chromic-lyrics/gpu-deps-entry.js \
  --bundle --format=esm --minify \
  --outfile=public/chromic-lyrics/vendor/gpu-deps.bundle.js
```

## Files

| File | Purpose |
|------|---------|
| `gpu-lyrics-test.html` | GPU renderer — Three.js + troika, receives lyrics via postMessage |
| `chromic-gpu-panel.js` | Integration script — injects GPU iframe into Chromic shell |
| `gpu-deps-entry.js` | esbuild entry point for bundling three.js + troika |
| `convert-lyrics-to-gpu.js` | CLI tool — converts `.lyrics.json` → `.gpu-lyrics.json` (standalone use) |
| `vendor/gpu-deps.bundle.js` | Bundled three.js + troika-three-text |
| `vendor/NotoSans-Bold.ttf` | Open-source font (OFL) — Latin + Cyrillic |
| `vendor/SFNS.ttf` | macOS system font (gitignored, local dev only) |

