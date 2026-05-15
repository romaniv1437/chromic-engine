# Architecture & Systems

Technical deep-dive into Chromic Engine's internal structure.

---

## Frontend (Zero Frameworks)

Everything is vanilla JavaScript ES modules — no React, no Vue, no build step required for development.

```
public/
├── app.js                    # Bootstrap, routing, theme management
├── core/
│   ├── AudioEngine.js        # Web Audio API pipeline + SharedArrayBuffer FFT
│   ├── AudioSharedBuffer.js  # Zero-copy FFT via SharedArrayBuffer
│   ├── ColorEngine.js        # Album art palette extraction + accent theming
│   ├── MotionController.js   # ScrollGuardian + performance manager
│   ├── MotionEffects.js      # Spring physics, tilt3D, magnetic hover
│   ├── ImagePool.js          # Scroll-adaptive image loading with LRU cache
│   ├── ChromicEditor.js      # Pro-mode lyrics/metadata editor
│   ├── AIBridge.js           # AI provider abstraction (OpenAI, Groq, Ollama)
│   ├── FocusManager.js       # Spatial keyboard navigation
│   ├── GPUPreWarm.js         # WebGL context pre-initialization
│   ├── Persistence.js        # State snapshot to localStorage
│   ├── State.js              # Reactive state store
│   ├── TabTransition.js      # View transition animations
│   ├── ZenMode.js            # Distraction-free mode
│   ├── VizWorkerBridge.js    # Visualizer web worker communication
│   └── PerformanceCore.js    # Frame budget monitoring
├── modules/
│   ├── music/
│   │   ├── MusicPlayer.js    # Main player: playback, queue, overlay, settings
│   │   ├── MusicAlbumView.js # Album grid + detail view + track tables
│   │   ├── LyricsEngine.js   # Word-level synced lyrics rendering + auto-scroll
│   │   ├── Visualizer.js     # CPU canvas visualizer (15 presets)
│   │   ├── GlobalPlayerVisualizer.js  # Aurora glow on player bar
│   │   └── lyrics-worker.js  # Off-thread timeline processing
│   └── SpotlightSearch.js    # Cmd+K global fuzzy search
├── ui/
│   ├── controls.js           # Modal, button, form components
│   └── ProgressBar.js        # Draggable progress bar
└── visualizer/
    └── main.js               # WebGL2 GPU visualizer (19 shader scenes)
```

## Backend (Node.js + Express)

```
index.js                      # Express server: API routes, SQLite, media serving
├── SQLite (better-sqlite3)   # Metadata cache, playback progress, lyrics, settings
├── sharp                     # Image processing (thumbnails, WebP conversion)
├── music-metadata            # Audio file tag extraction (ID3, Vorbis, etc.)
├── fluent-ffmpeg             # Audio/video transcoding
└── multer                    # File upload handling
```

## Desktop (Electron)

```
electron/
├── main.js                   # Electron main process + auto-updater
├── menu.js                   # Application menu
└── preload.js                # Context bridge
```

> **Note:** A Tauri (Rust) port was explored but is **deprecated** — Tauri's Web Audio API support is incomplete (no `SharedArrayBuffer`, no `OfflineAudioContext`), making real-time FFT, gapless playback, and the GPU visualizer pipeline non-functional. Electron remains the production runtime.

---

## Key Performance Systems

| System | Purpose |
|--------|---------|
| **ScrollGuardian** | Zero-layout-thrash motion controller; manages `will-change` and `content-visibility` |
| **Chromic ImagePool** | Scroll-velocity-adaptive image loading; fast scroll = instant `src`, idle = `img.decode()` with LRU cache (300 entries) |
| **Spring Physics** | All animations use stiffness/damping/mass springs — fully interruptible, GPU-only layers (`transform` + `opacity`) |
| **GPU Pre-Warm** | WebGL2 context initialized at boot for instant visualizer start |
| **SharedArrayBuffer FFT** | Audio frequency data shared between threads without copying |
| **Lyrics Web Worker** | Timeline building and search normalization off the main thread |

---

## GPU Visualizer Scenes (WebGL2)

19 real-time audio-reactive shader scenes:

Lava Flow, Living Canvas, Riemann Sphere, Julia Set 4D, Fractal Infinity, Mood Fractal, Aethelgard, Fractal Unfold, Infinite Cavern, Spongy Tunnel, Fractal Optic Fibre, Lorenz Attractor, Reaction-Diffusion, Hyperbolic Tiling, Terrain Biome, Biopunk Ocean, Void Archipelago, Saturn Discs, Soap Bubbles

## CPU Canvas Presets (15)

Classic Bars, Oscilloscope, MilkDrop Nebula, Starfield Warp, RGB Magic Bubbles, Pulsing Ring, Vaporwave Grid, Spectrum Fire, Digital Rain, Plasma Flow, RGB Glitch, VHS Retro, Musical Symphony, Soap Bubbles

---

## CJK Semantic Grouping Engine

The aligner (`lyrics-engine/aligner.py`) implements intelligent CJK character grouping:

1. Characters are split individually for Whisper alignment
2. After timing is obtained, adjacent characters are merged back into original Genius word groups
3. Each merged word retains a `_chars` array with per-character sub-timing for smooth highlight animation
4. Grouping respects source text word boundaries (whitespace splits in Genius lyrics)

---

## Lyrics Pipeline

```
Audio File → Whisper (word timestamps) ─┐
                                         ├─→ Aligner → .lyrics.json (word-level)
Genius/LRCLIB (text + line timing) ─────┘
```

Priority order for lyrics source:
1. Local `.lrc` sidecar file
2. Embedded metadata lyrics
3. LRCLIB API (synced)
4. Genius API (text only, needs Whisper for timing)

---

## Themes

Seven built-in color themes: Light Retro, Chromic Silver, Aqua Glass, Vault Red, Sunset Neon, Midnight Retro, Chromic Metal (visionOS-inspired frosted glass).

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Album grid (8000+ items) | 60 FPS scroll, <200MB RAM |
| Image loading | Pre-fetched 1500px ahead of viewport |
| Spring animations | 120 FPS, GPU-only layers |
| Audio latency | <10ms (Web Audio API) |
| Visualizer | 120 FPS WebGL2 (configurable cap) |
| Lyrics sync | Sub-millisecond word-level accuracy |
