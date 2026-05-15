# Text Animation Systems in Chromic Engine

Chromic Engine has **two independent text rendering systems** that display lyrics and track info over the GPU visualizer. They serve different purposes but can conflict visually and compete for resources.

---

## 1. GPU Typography (`gpuTypography` / class `Fp`)

**Location:** `public/visualizer/main.js` (bundled from `audio-visualizer/`)  
**Rendering:** WebGL — troika-three-text SDF meshes on Three.js layer 1  
**What it shows:** Track **title** and **artist name** as two floating text lines over the shader scene

### How it works
- Uses troika-three-text (`ki` class) to render SDF (Signed Distance Field) text meshes
- Two meshes: `titleText` (larger, white) and `artistText` (smaller, blue-tinted)
- Positioned at fixed coordinates in front of the camera (`z = -1`)
- Has a glow backdrop mesh behind the text
- Opacity lerps via `targetOpacity` at 4% per frame
- Text reacts to audio RMS: `fillOpacity = opacity * (1 + rms * 0.3)`

### API
```js
gpuTypography.setTrack(title, artist)  // Set text (calls troika sync())
gpuTypography.setVisible(bool)         // Fade in/out
gpuTypography.update(rms)              // Per-frame update (called in render loop)
gpuTypography.addToScene(scene)        // Attach to Three.js scene
```

### Resource Cost
- **GPU memory:** ~2-4MB for SDF font atlas texture + glyph geometry buffers
- **Per-frame cost:** Minimal (opacity lerp + fillOpacity write)
- **Initialization:** troika `sync()` is async — spawns a web worker to generate SDF geometry. Takes 50-200ms depending on text length
- **Glow mesh:** Extra draw call with custom shader

### Issues
- The original `setUiVisible` in ThreeOrchestrator had a bug where it always passed `false` (minification issue), requiring PATCH 1
- `setTrack()` also calls `setScene(0)` which resets the current scene — we bypass this by setting text directly on the meshes
- Shows ONLY title/artist — no per-word animation, no lyrics sync

---

## 2. GPU Lyrics Renderer (`lyricsRenderer` / class `kp`)

**Location:** `public/visualizer/main.js` (bundled from `audio-visualizer/`)  
**Rendering:** WebGL — troika-three-text SDF meshes on Three.js layer 1  
**What it shows:** **Synced lyrics** with per-word fill animation, scrolling through 5 visible lines

### How it works
- Maintains a **slot pool** of 5 line pairs (textMesh + fillMesh) — a sliding window over the lyrics timeline
- `textMesh` = base text (dim, gray/white)
- `fillMesh` = highlight overlay (bright white) clipped via `clipRect` to reveal word-by-word
- Active line is larger (`fontSize: 0.065`) with glow outline; inactive lines are smaller (`fontSize: 0.055`)
- Scrolls vertically using `currentScrollY` lerp
- Uses `computeWordFillProgress()` to calculate per-word reveal based on `word.start`/`word.end` timestamps
- Word fill uses cubic easing: `progress = 1 - (1 - linear)^3.5`

### API
```js
lyricsRenderer.setTimeline(entries)    // Set lyrics [{type, text, start, end, words}]
lyricsRenderer.setVisible(bool)        // Fade in/out (only if timeline has entries)
lyricsRenderer.setCurrentTime(seconds) // Feed audio clock for interpolation  
lyricsRenderer.update(rms)             // Per-frame update (called in render loop)
```

### Resource Cost
- **GPU memory:** ~5-8MB for 10 text meshes (5 slots × 2 meshes each) + font atlas
- **Per-frame cost:** Moderate — slot assignment, scroll lerp, word progress calculation, clipRect updates
- **Initialization:** Each slot calls `sync()` when assigned new text — 10 async troika syncs on line changes

### Per-Word Animation Detail
```
For each active line with words:
  1. computeWordFillProgress(line, currentTime) → 0.0 to 1.0
  2. Map progress to clipRect x-coordinate: x = -0.7 + progress * 1.4
  3. fillMesh.clipRect = [-0.8, -∞, x, +∞]  
  4. fillMesh gets full opacity, textMesh gets dimmed opacity
  
Result: bright text sweeps left-to-right through each word as it's spoken
```

---

## 3. HTML Lyrics Engine (`LyricsEngine` / `LyricsEngine.js`)

**Location:** `public/modules/music/LyricsEngine.js`  
**Rendering:** DOM/CSS — HTML `<span>` elements with CSS `background-size` animation  
**What it shows:** Full scrollable lyrics panel with per-word fill, click-to-seek, translations

### How it works
- Renders lyrics as HTML lines in a scrollable panel (`#musicLyricsStage`)
- Each word is a `<span class="word">` with CSS gradient background for fill effect
- Per-word fill uses `--word-progress` CSS custom property animated via `requestAnimationFrame`
- Active line is highlighted, past lines are dimmed
- Auto-scrolls to keep active line centered
- Supports click-to-seek on any line or word

### Per-Word Animation Detail
```
For each word span in the active line:
  1. Calculate progress from word.start/word.end timestamps
  2. Set CSS --word-progress on the span
  3. CSS gradient: linear-gradient(90deg, highlight 0% var(--word-progress), dim var(--word-progress) 100%)
  
Result: each word fills with highlight color left-to-right as it's spoken
```

### Adaptive Quality (Low-Precision Mode)
- Monitors FPS over 60-frame rolling window
- If avg FPS < 25 for 5+ seconds → enters low-precision mode (skips word fill, line-level only)
- If avg FPS ≥ 30 for 2+ seconds → exits low-precision mode
- Reset on track change and after FLIP animation completes

### Resource Cost
- **CPU:** Moderate — DOM reads/writes every rAF frame for word progress + scroll
- **GPU (compositor):** Low — CSS properties trigger compositor-only updates
- **Memory:** Low — only DOM nodes, no WebGL resources

---

## Comparison

| Feature | GPU Typography | GPU Lyrics Renderer | HTML LyricsEngine |
|---------|---------------|--------------------|--------------------|
| **Shows** | Title + Artist | Synced lyrics (5 lines) | Full scrollable lyrics |
| **Per-word fill** | ❌ No | ✅ Yes (clipRect) | ✅ Yes (CSS gradient) |
| **Rendering** | WebGL (troika) | WebGL (troika) | DOM/CSS |
| **GPU cost** | Low | Medium | None (compositor) |
| **User interaction** | None | None | Click-to-seek, scroll |
| **Translations** | ❌ | ❌ | ✅ |
| **Adaptive quality** | ❌ | ❌ | ✅ (low-precision mode) |
| **Visible when** | No lyrics available | Lyrics timeline set | Overlay open (right panel) |

---

## Current Architecture (GPU text disabled)

```
┌─ Music Player Overlay ─────────────────────────────────┐
│                                                         │
│  ┌─ Left Panel ──────────┐  ┌─ Right Panel ──────────┐ │
│  │ Album Art              │  │ HTML LyricsEngine      │ │
│  │                        │  │ (scrollable, per-word)  │ │
│  │ ┌──────────────────┐   │  │                        │ │
│  │ │ GPU Visualizer    │   │  │ Line 1 (past, dim)    │ │
│  │ │ (shader scene)    │   │  │ Line 2 (active, fill) │ │
│  │ │                   │   │  │ Line 3 (upcoming)     │ │
│  │ │ (no GPU text -    │   │  │ ...                   │ │
│  │ │  disabled for     │   │  │                        │ │
│  │ │  performance)     │   │  │ [click to seek]       │ │
│  │ └──────────────────┘   │  └────────────────────────┘ │
│  └────────────────────────┘                             │
└─────────────────────────────────────────────────────────┘
```

## Decision: GPU Text Systems Disabled

**GPU Typography and GPU Lyrics Renderer are permanently disabled** (PATCH 1 + 1b in MusicPlayer.js).
The HTML LyricsEngine is the sole text renderer. Benefits:
- ✅ Per-word fill animation (the feature the user wants)
- ✅ Click-to-seek interaction
- ✅ Translation support
- ✅ Adaptive quality (low-precision fallback)
- ✅ Full scrollable lyrics (not just 5 lines)

The GPU text layers add visual noise over the shader scene, consume VRAM for troika SDF atlases, and the gpuTypography only shows title/artist (redundant with the overlay header). Disabling them saves ~8-12MB VRAM and eliminates troika sync() race conditions.


