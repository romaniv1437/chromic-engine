# 🎵 MyMedia Math-Visualizer — Technical Documentation

> GPU-accelerated, audio-reactive WebGL visualizer built with Three.js + GLSL

## Quick Links

- [[architecture|Architecture Overview]]
- [[scenes|Scene Catalog]]
- [[shaders|Shader Math Reference]]
- [[audio-mapping|Audio-to-Geometry Mapping]]
- [[integration|Player Integration Guide]]
- [[performance|Performance & Optimization]]

---

## Project Overview

**Stack**: Vite + TypeScript + Three.js + GLSL (via `vite-plugin-glsl`)

**Build Output**: ES module library → `../public/visualizer/main.js`

**Entry Point**: `ThreeOrchestrator` class — manages render loop, 17 scenes, audio processing, post-processing, and GPU typography.

### Core Principles

1. **Deterministic Chaos** — The world appears random but follows mathematical functions bound to `u_time` and audio frequencies
2. **Cellular Morphing** — Each region of infinite space has a unique mathematical descriptor that evolves with the music
3. **Audio-to-Geometry Mapping** — Sound frequencies physically transform 3D mathematical structures in real-time

### Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Rendering | Three.js + WebGL2 | Scene graph, shader compilation |
| Shaders | GLSL ES 3.0 | Raymarching, SDF, fractal math |
| Audio | Web Audio API (AnalyserNode) | FFT frequency extraction |
| Typography | troika-three-text | GPU-rendered overlay text |
| Post-FX | three/examples EffectComposer | Bloom, blur |
| Build | Vite | HMR, GLSL import, lib mode |

---

## File Structure

```
audio-visualizer/
├── src/
│   ├── main.ts                    # Library entry, exports ThreeOrchestrator
│   ├── audio/
│   │   └── AudioProcessor.ts      # FFT → bass/mid/treble/rms
│   ├── core/
│   │   ├── ThreeOrchestrator.ts   # Master controller
│   │   ├── PostProcessing.ts      # Bloom + blur pipeline
│   │   └── GpuTypography.ts       # troika text overlay
│   ├── scenes/
│   │   ├── BaseScene.ts           # Abstract base class
│   │   ├── JuliaSetScene.ts       # 4D quaternion Julia
│   │   ├── LorenzScene.ts         # GPGPU attractor
│   │   ├── RiemannScene.ts        # Möbius sphere
│   │   ├── ReactionDiffusionScene.ts
│   │   ├── HyperbolicScene.ts     # Poincaré disk
│   │   ├── LavaFlowScene.ts       # FBM fluid
│   │   ├── LivingCanvasScene.ts   # Album art advection
│   │   ├── FractalInfinityScene.ts
│   │   ├── TerrainBiomeScene.ts
│   │   ├── BiopunkOceanScene.ts
│   │   ├── VoidArchipelagoScene.ts
│   │   ├── SaturnDiscsScene.ts
│   │   ├── SoapBubbleScene.ts
│   │   ├── FractalUnfoldScene.ts
│   │   ├── InfiniteCavernScene.ts
│   │   ├── SpongyTunnelScene.ts
│   │   └── FractalOpticFibreScene.ts
│   └── shaders/
│       ├── fullscreen.vert         # UV passthrough
│       ├── scene_bg.frag           # Gradient background
│       ├── julia.frag              # Quaternion Julia set
│       ├── lorenz_sim.frag         # Lorenz ODE solver
│       ├── lorenz_render.frag/vert # Point cloud renderer
│       ├── riemann.frag/vert       # Möbius displacement
│       ├── reaction_diff.frag      # Gray-Scott RD
│       ├── hyperbolic.frag         # {7,3} Poincaré
│       ├── lavaflow.frag           # FBM lava
│       ├── living_canvas.frag      # Advection + album
│       ├── fluid_velocity.frag     # Navier-Stokes velocity
│       ├── fractal_infinity.frag   # KIFS tunnel
│       ├── terrain_biome.frag      # FBM terrain
│       ├── biopunk_ocean.frag      # Dual biome
│       ├── void_archipelago.frag   # Cellular blobs
│       ├── saturn_discs.frag       # Hollow spheres
│       ├── soap_bubble.frag        # Iridescence
│       ├── fractal_unfold.frag     # IFS explosion
│       ├── infinite_cavern.frag    # Mandelbox tunnel
│       ├── spongy_tunnel.frag      # Sphere fold sponge
│       └── fractal_optic_fibre.frag # Organic fibre
├── docs/                           # This documentation
├── package.json
├── vite.config.ts
└── tsconfig.json
```

