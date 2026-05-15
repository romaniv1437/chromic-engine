# Chromic Engine

**High-Fidelity Music Player & Neural Lyrics Alignment Engine**

A performance-obsessed desktop music player built with Electron + vanilla JS. Zero frameworks, zero compromises. 120 FPS visualizer, word-level lyrics sync, local AI alignment.

---

## Visual Showcase

### AI Alignment — Tame Impala

https://github.com/user-attachments/assets/d2eda623-ad97-49a4-b44f-d85c62a750ed

> Local Whisper transcription with word-level alignment. Every word syncs to sub-millisecond accuracy.

### AI Alignment — Japanese (CJK Grouping)

https://github.com/user-attachments/assets/be2cdf69-77e2-4ef1-b218-9eb769de9608

> CJK characters are intelligently grouped into semantic phrases for natural highlight animation.

### Flow Mode — Pro Lyrics Editor

https://github.com/user-attachments/assets/8e68b9e8-2dae-4b5b-8919-1c1292d02481

> Word-level timeline editing with hotkey calibration, seek-to-line, and LRC/JSON export.

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
npm run install-all
npm run dev
```

Requirements: Node.js 18+, FFmpeg, Python 3.10+ (for AI lyrics)

---

## Documentation

- **[Architecture](docs/ARCHITECTURE.md)** — Module graph, performance systems, pipeline design
- **[AI Setup](docs/AI_SETUP.md)** — Whisper engine installation and troubleshooting
- **[Shortcuts](docs/SHORTCUTS.md)** — All keyboard shortcuts
- **[Lyrics Pipeline](docs/ai-lyrics-pipeline.md)** — How lyrics sourcing works
- **[Themes](docs/themes-design-system.md)** — Theme system design
- **[Waveform Canvas](docs/waveform-canvas.md)** — Audio visualization internals

---

## License

MIT

---

*Chromic Engine — engineered for visual fidelity and precision at every frame.*
