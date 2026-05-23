# Chromic Engine — Portfolio Project Summary

## One-Liner
**A high-fidelity desktop music player with AI-powered word-level lyrics synchronization, a custom Whisper LoRA fine-tuned on personal music, and 25+ real-time GPU shader visualizers — all built from scratch.**

---

## What I Built

### 🎵 Music Player (Electron + Vanilla JS)
- Zero-framework architecture — 8,000+ album library at 60 FPS scroll
- Gapless playback, queue management, drag-reorder, Media Session API
- 7 themes, Spotlight search (Cmd+K), Zen Mode
- **Performance-first**: promoted layers, will-change management, scroll guardian

### 🤖 AI Lyrics Engine (Python + Whisper)
- **Custom alignment pipeline**: Whisper ASR → fuzzy match (rapidfuzz) → official Genius lyrics
- **Word-level timestamps** with sub-50ms accuracy for karaoke-style highlighting
- **Multi-language**: auto-detects English, Russian, Japanese, Ukrainian, Chinese, etc.
- **Fine-tuned LoRA model** — trained on manually Gold-curated dataset of my own music library
  - Built a Gold annotation workflow (Flow Mode editor with waveform + hotkey calibration)
  - Created training data using HuggingFace dataset builder
  - Trained Whisper LoRA specifically for my library's genres/artists/languages
- **Cascading strategy**: Local `.lrc` → LRCLIB API → syncedlyrics CLI → Whisper AI (local GPU)
- Handles: polyphony (4 lanes), ad-libs, vocal stretches, instrumental cues, backing vocals

### 🎨 GPU Visualizer (Three.js + GLSL)
- **25+ unique raymarched shader scenes** — each a hand-written GLSL fragment shader
- Scenes include: fractal biomes (Menger/Apollonian/KIFS), infinite tunnels, 4D hyperplane rotations, fluid simulations, soap bubbles, crystalline drift, biome warp, spectral dispersion
- **Audio-reactive**: bass/mid/treble/RMS drive every shader uniform
- **Cinematography Engine**: post-processing chain randomized per track using seeded PRNG
  - Effects: Afterimage, Film grain, Glitch, Halftone, Kaleido, RGB shift, Mirror, Bleach bypass, Sepia, Focus blur
  - Same track = different VFX every play (seed from timestamp + audio duration)
- **Album art integration**: used as texture source AND displacement map in raymarched scenes
- Kinetic ribbon system (200 instanced flowing ribbons)
- Post-processing: UnrealBloom, chromatic aberration, Gaussian blur, text layering

### ✍️ Lyrics Renderer (Troika Text + Three.js)
- GPU-accelerated karaoke word-fill with per-character animation
- Spring-physics auto-scroll with chained parallax lag
- Click-to-seek on any word
- Beat-reactive glow, wave propagation, stretch animations
- Pro editing mode (Flow Mode) with waveform timeline

---

## Technical Highlights

| Area | Stack | Key Achievement |
|------|-------|-----------------|
| **Frontend** | Vanilla JS, CSS, DOM | 120 FPS with 8K+ items, zero framework overhead |
| **Renderer** | Three.js, GLSL, WebGL2 | 25 raymarched shaders at 60 FPS on M1 |
| **AI/ML** | Python, Whisper, MLX, LoRA | Custom fine-tuned model for personal music library |
| **Audio** | Web Audio API, FFT | Real-time frequency analysis → shader uniforms |
| **Desktop** | Electron, Node.js | Gapless audio, native menus, auto-updates |
| **Data** | SQLite, JSON sidecars | Persistent lyrics cache, playlist state |

---

## What Makes This Unique

1. **End-to-end ML pipeline**: I didn't just use Whisper — I built a complete training workflow (data annotation → Gold validation → LoRA fine-tuning → deployment) specifically for my music library.

2. **Production GLSL shaders**: Not using shader libraries — each scene is a hand-crafted 200-400 line raymarcher with unique fractal geometry, volumetric lighting, and spectral effects.

3. **No frameworks**: The 8,775-line music player is pure vanilla JS with manual DOM management, custom spring physics, and GPU-promoted compositor layers — achieving frame rates that React/Vue cannot match for this use case.

4. **The Cinematography Engine**: A procedural system that generates unique post-processing effect combinations per play session using seeded deterministic randomness — ensuring the same track never looks the same twice.

5. **Multilingual lyrics alignment**: Handles CJK character grouping, Cyrillic phonetics, romanization, and cross-language fuzzy matching — not just English.

---

## Metrics

- **25+ GPU scenes** (each unique GLSL raymarcher)
- **14 post-processing effects** in the cinematography pool
- **Sub-50ms** word-level timestamp accuracy
- **120 FPS** render loop with lyrics + visualizer + audio analysis
- **13 languages** supported for real-time translation
- **8,000+ albums** rendered at full scroll performance
- **4-lane polyphony** editing for multi-voice tracks

---

## Links

- **GitHub**: github.com/romaniv1437/chromic-engine
- **Lyrics Engine**: github.com/romaniv1437/auto-lyric-aligner
- **Demo Videos**: See README.md for embedded recordings

