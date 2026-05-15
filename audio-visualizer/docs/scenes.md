# Scene Catalog

> Visual guide to all 17 shader scenes

---

## Fullscreen Raymarched Scenes

### 0 — Lava Flow
**File**: `lavaflow.frag`  
**Technique**: FBM with double domain warping  
**Visual**: Flowing molten lava surface with heat distortion  
**Best For**: Ambient, slow tracks

### 1 — Julia Set 4D
**File**: `julia.frag`  
**Technique**: Quaternion Julia set raymarching  
**Visual**: Organic 3D fractal that morphs with bass  
**Best For**: Electronic, rhythmic tracks

### 5 — Hyperbolic Tiling
**File**: `hyperbolic.frag`  
**Technique**: Poincaré disk {7,3} tessellation  
**Visual**: Infinite hyperbolic plane with pulsing tiles  
**Best For**: Geometric, minimal music

### 7 — Fractal Infinity
**File**: `fractal_infinity.frag`  
**Technique**: KIFS tunnel with volumetric glow  
**Visual**: Infinite corridor of kaleidoscopic fractals  
**Best For**: Progressive, building tracks

### 8 — Terrain Biome
**File**: `terrain_biome.frag`  
**Technique**: FBM raymarched heightmap  
**Visual**: Fly over procedural landscape  
**Best For**: Cinematic, orchestral

### 9 — Biopunk Ocean
**File**: `biopunk_ocean.frag`  
**Technique**: Dual-biome with bioluminescence  
**Visual**: Deep ocean with glowing vein patterns  
**Best For**: Bass-heavy, dark tracks

### 10 — Void Archipelago
**File**: `void_archipelago.frag`  
**Technique**: Cellular blobs in void  
**Visual**: Floating islands in infinite space  
**Best For**: Spacious, ambient dub

### 11 — Saturn Discs
**File**: `saturn_discs.frag`  
**Technique**: Domain-repeated spheres + thin film  
**Visual**: Floating rainbow spheres  
**Best For**: Upbeat, colorful tracks

### 12 — Soap Bubbles
**File**: `soap_bubble.frag`  
**Technique**: Animated SDFs + iridescence  
**Visual**: Large realistic soap bubbles  
**Best For**: Gentle, acoustic tracks

### 13 — Fractal Unfold
**File**: `fractal_unfold.frag`  
**Technique**: IFS with orbit trap coloring  
**Visual**: Fractal that "explodes" on bass drops  
**Best For**: Drop-heavy EDM

### 14 — Infinite Cavern
**File**: `infinite_cavern.frag`  
**Technique**: Hollow Mandelbox shells + AO  
**Visual**: Flying through infinite fractal cave  
**Best For**: Dark, atmospheric tracks

### 15 — Spongy Tunnel
**File**: `spongy_tunnel.frag`  
**Technique**: Sphere fold + domain repetition  
**Visual**: Porous organic tunnel  
**Best For**: Rhythmic, textural tracks

### 16 — Fractal Optic Fibre
**File**: `fractal_optic_fibre.frag`  
**Technique**: Mandelbox fold + smax organic blend  
**Visual**: Dense fibrous mass with inner glow  
**Best For**: Intense, complex tracks

### 17 — Mood Fractal ⚗️
**File**: `mood_fractal.frag`  
**Technique**: IFS Kaleidoscopic folds + Mandelbulb hybrid raymarching  
**Visual**: 3D crystalline fractal that morphs topology with track energy  
**Audio Mapping**:
- Bass → space warping + camera proximity
- Mid → iteration count (smooth blobs → sharp crystals)
- Treble → specular sparkle + volumetric glow
- Beat detection → camera shake + white flash
- Energy accumulator → palette shift toward complementary colors  
**Best For**: Any track — adapts from ambient to aggressive

### 18 — Aethelgard ⚗️
**File**: `aethelgard.frag`  
**Technique**: Entropy-driven voxel-branching with 4D hashing, cosine gradient palettes, multi-biome SDF blending, event horizon gravitational lensing  
**Visual**: Infinite non-repeating tunnel through Mandelbox cities, Apollonian voids, Menger spires, and hyper-lattices — each voxel sector a unique universe  
**Audio Mapping**:
- Bass → Mandelbox scale collapse + corridor width + event horizon activation (>0.6)
- Mid → Menger cross-section complexity
- Treble → Hyper-lattice filaments + nano-fibre cosmic grass + sparkle particles
- RMS → Apollonian density + volumetric nebula + FOV hyper-jump
- Beat → Camera banking + chromatic aberration + flash
- Energy → Biome mutation rate (4D time hash)  
**Key Innovations**:
- 4D entropy hash (position + time) guarantees no repetition
- Cosine gradient palette generates infinite hues from 3 anchor colors
- Event horizon: gravitational ray deflection on heavy bass drops
- Smooth biome interpolation (not hard cuts) between physics laws  
**Best For**: Any track — infinite procedural journey

---

## GPGPU Simulation Scenes

### 2 — Lorenz Attractor
**Files**: `lorenz_sim.frag`, `lorenz_render.vert/frag`  
**Technique**: ODE solver on GPU texture → point cloud  
**Visual**: 65K particles tracing chaotic attractor  
**Best For**: Experimental, glitch music

### 4 — Reaction-Diffusion
**File**: `reaction_diff.frag`  
**Technique**: Gray-Scott ping-pong simulation  
**Visual**: Organic cellular patterns  
**Best For**: Ambient, evolving tracks

### 6 — Living Canvas
**Files**: `living_canvas.frag`, `fluid_velocity.frag`  
**Technique**: Album art + fluid advection + Voronoi  
**Visual**: Album art melts and reforms  
**Best For**: Any track (uses album art)

---

## 3D Mesh Scenes

### 3 — Riemann Sphere
**Files**: `riemann.vert`, `riemann.frag`  
**Technique**: Vertex displacement from frequency texture  
**Visual**: Sphere deforming to audio spectrum  
**Best For**: Vocal, dynamic tracks

---

## Scene Selection Guidelines

| Energy Level | Recommended Scenes |
|-------------|-------------------|
| Low (ambient) | 0, 5, 8, 10, 12 |
| Medium (groove) | 1, 3, 7, 9, 15 |
| High (intense) | 13, 14, 16, 2, 17 |
| Any (adaptive) | 6, 4, 11, 17 |

