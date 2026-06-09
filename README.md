# Chromic Engine

**High-Fidelity Music Player & Neural Lyrics Alignment Engine**

A performance-obsessed desktop music player built with Electron + vanilla JS. Zero frameworks, zero compromises. 120 FPS visualizer, word-level lyrics sync, local AI alignment.

---

## Visual Showcase

### AI Alignment — Tame Impala

https://github.com/user-attachments/assets/fab627d9-7f64-4e58-8233-7d5fe028a073

> Local Whisper transcription with word-level alignment. Every word syncs to sub-millisecond accuracy.

### AI Alignment — Japanese (CJK Grouping)

https://github.com/user-attachments/assets/9b716ce3-19ca-48b7-9afa-8216de3f9913

> CJK characters are intelligently grouped into semantic phrases for natural highlight animation.

### Flow Mode — Pro Lyrics Editor

https://github.com/user-attachments/assets/cd1dce07-e9bf-4f2e-b296-d4d66cb296cc

> Word-level timeline editing with hotkey calibration, seek-to-line, and LRC/JSON export.

### Troika Three.js - Bloom effect (unrealbloompass)

https://github.com/user-attachments/assets/93406b27-b946-494a-99fa-d98e3a1bd0bd

---

## Features

| Category | Highlights |
|----------|-----------|
| **Playback** | Gapless audio, queue, shuffle, repeat, drag-reorder, Media Session API |
| **Library** | Album grid, disc-grouped tracks, smart metadata parsing, 8000+ album scroll at 60 FPS |
| **Visuals** | 19 GPU WebGL2 shader scenes + 15 CPU canvas presets, all audio-reactive at 120 FPS |
| **Lyrics** | Word-level sync, auto-scroll with spring physics, real-time translation (13 langs), de-censoring |
| **AI** | Local Whisper alignment (MLX/faster-whisper/WhisperX), Genius+LRCLIB fetching, mood colors |
| **Editor** | Pro-mode with `[`/`]` hotkey calibration, Flow tapping, instant LRC/JSON export |
| **UX** | 7 themes, Spotlight search (Cmd+K), Zen Mode, auto-updates |

---

## Quick Start

### Install the App

Download from [Releases](https://github.com/romaniv1437/chromic-engine/releases):

- **macOS:** `.dmg` — drag to Applications, then `xattr -cr "/Applications/Chromic Engine.app"`
- **Windows:** `.exe` installer — click "More info" then "Run anyway" if prompted
- **Linux:** `.AppImage` or `.deb`

### Development

```bash
npm install
npm run electron
```

Requirements: Node.js 18+, FFmpeg, Python 3.10+ (for AI lyrics). See [AI Setup](docs/AI_SETUP.md) for details.

---

## Documentation

- **[Architecture](docs/ARCHITECTURE.md)** — Module graph, performance systems, pipeline design
- **[AI Setup](docs/AI_SETUP.md)** — Whisper engine installation and troubleshooting
- **[Shortcuts](docs/SHORTCUTS.md)** — All keyboard shortcuts
- **[Lyrics Pipeline](docs/ai-lyrics-pipeline.md)** — How lyrics sourcing works
- **[Themes](docs/themes-design-system.md)** — Theme system design
- **[Waveform Canvas](docs/waveform-canvas.md)** — Audio visualization internals

---


*Chromic Engine — engineered for visual fidelity and precision at every frame.*
