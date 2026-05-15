# Shader Math Reference

> Mathematical foundations for each GLSL shader in the visualizer

---

## Common Utilities

### Rotation Matrix
```glsl
mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}
```
2D rotation by angle `a` radians. Used in every fractal shader for space twisting.

### Signed Distance Fields (SDF)
All raymarched shaders use the pattern:
```glsl
for (int i = 0; i < N; i++) {
    d = map(ro + rd * t);
    if (d < ε) break;
    t += d * step_factor;
}
```
Where `map()` returns the shortest distance to any surface.

### Smooth Min/Max
```glsl
float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);
    return mix(b, a, h) - k*h*(1.0-h);
}
```
Organic blending between two SDFs with radius `k`.

---

## Fractal Shaders

### `infinite_cavern.frag` — Hollow Shell Diver

**Technique**: Iterated Function System with hollow shells

**Mathematical Core**:
$$P_{n+1} = |P_n| - \text{offset}$$
$$P_{n+1} = P_{n+1} \times \frac{k}{\text{clamp}(|P_{n+1}|^2, r_{min}, r_{max})}$$

The `abs()` creates octahedral symmetry. The sphere fold (`k/r²`) inverts space, creating self-similar structures at every scale.

**Key Innovation**: `abs(length(q.xy) - 0.5) - 0.1` makes geometry hollow — camera flies *through* fractal shells.

**Audio Mapping**:
- `u_bass` → shell expansion (larger offsets)
- `u_treble` → sphere fold aggressiveness (sharper details)
- `u_rms` → camera speed boost

---

### `spongy_tunnel.frag` — Sphere Fold Sponge

**Technique**: Sphere Fold + Domain Repetition

**Mathematical Core**:
$$q = |q| - \vec{v}_{\text{growth}}$$
$$k = \frac{1.85}{clamp(q \cdot q, 0.15, 2.5)}$$
$$q = q \times k$$

The repeated `abs() - offset` creates Menger Sponge-like porosity. `mod(q.z, zSize)` repeats the pattern infinitely along Z.

**Audio Mapping**:
- `u_bass × 0.6` → X-axis node growth
- `u_rms × 0.4` → Y-axis node growth  
- `u_treble × 0.3` → Z-axis node growth

---

### `fractal_optic_fibre.frag` — Organic Fibre

**Technique**: Mandelbox Fold + smax blending

**Mathematical Core**:
$$q = |q| - \vec{v}_{\text{growth}}$$
$$\text{sort}(q.x, q.y, q.z) \quad \text{// Mandelbox axis sorting}$$
$$k = \frac{1.7}{clamp(q \cdot q, 0.1, 2.0)}$$

The axis sorting (`if q.x < q.y: swap`) creates ordered, crystalline porosity. Combined with `smax(fractal, -cavern, 0.5)` for organic "protrusion" into the tunnel.

**Audio Mapping**:
- `u_bass × 0.8` → node protrusion depth
- `u_rms × 0.25` → sphere fold instability
- `u_rms` → glow intensity inside mass

---

### `fractal_infinity.frag` — KIFS Tunnel

**Technique**: Kaleidoscopic Iterated Function System

**Space Folding Formula**:
$$P_{n+1} = \text{rot}(|P_n| - \text{offset}) \times \text{scale}$$

Each iteration mirrors, offsets, and scales. After N iterations, dividing by accumulated `scale` gives the SDF.

**Audio Mapping**:
- `u_bass` → `explodeForce` (separates symmetry planes)
- `u_treble` → iteration count / detail level

---

### `fractal_unfold.frag` — IFS Explosion

**Technique**: Standard IFS with orbit trap coloring

The "unfolding" effect comes from bass-driven offset that physically separates the fractal's folding planes, creating visual explosion on beat drops.

---

### `mood_fractal.frag` — Sentient Mood Engine

**Technique**: IFS Kaleidoscopic folds + Mandelbulb hybrid with beat detection

**Mathematical Core**:
$$P_{n+1} = |P_n| \quad \text{(mirror fold)}$$
$$\text{if } P_x < P_y: \text{swap} \quad \text{(conditional fold)}$$
$$P_{n+1} = P_n \times \text{scale} - \text{offset} \times (\text{scale} - 1)$$

Dynamic iteration count: `maxIter = 4.0 + energy * 5.0` — quiet = 4 smooth folds, loud = 9 crystalline folds.

**Beat Detection** (in TypeScript scene class):
- Track 20-frame bass history
- Spike > 1.4× average + 150ms cooldown → `u_beat = 1.0`
- Exponential decay: `beat *= 0.88` per frame

**Audio Mapping**:
- `u_bass` → space warping (pre-fold stretch)
- `u_mid` → IFS scale factor (fractal density)
- `u_treble` → per-iteration rotation speed + specular power
- `u_beat` → camera shake + white flash
- `u_energy` → fractal power + complement palette shift

---

### `aethelgard.frag` — Unified Cosmic Engine (Entropy Edition)

**Technique**: 4D entropy-seeded voxel branching with multi-biome SDF blending

**Voxel Topology**:
$$\text{cell} = \lfloor q / \text{VOXEL\_SIZE} \rfloor$$
$$\text{entropy} = \text{hash41}(\text{cell}, \lfloor t \times 0.05 \rfloor)$$

The 4D hash (3D position + slow time) ensures no repetition across infinite travel.

**Multi-Biome Blending** (smooth, not hard cuts):
$$d = \text{mix}(\text{mix}(d_\text{mandelbox}, d_\text{apollonian}, S_{0.2}), \text{mix}(d_\text{menger}, d_\text{lattice}, S_{0.7}), S_{0.5})$$

Where $S_k = \text{smoothstep}(k-0.05, k+0.05, \text{entropy})$.

**Cosine Gradient Palette**:
$$\text{color}(t) = a + b \cdot \cos(2\pi(c \cdot t + d))$$

Where $a, b, c, d$ are derived from `u_colors[3]` anchor points.

**Event Horizon** (bass > 0.6):
$$\text{deflection} = \frac{\text{strength}}{|\vec{p} - \vec{s}|^2 + 1}$$
$$\vec{rd'} = \text{normalize}(\vec{rd} + \hat{d}_\text{singularity} \times \text{deflection})$$

Gravitational lensing warps ray direction toward singularity ahead on path.

**Biome SDFs**:
- Mandelbox: Box fold + sphere fold, scale driven by bass
- Apollonian: Iterative space inversion, density from RMS
- Menger: Modular cross-section carving, complexity from mid
- Lattice: Domain-repeated cylinders, thickness from treble

**Audio Mapping**:
- `u_bass` → Mandelbox scale + corridor width + event horizon
- `u_mid` → Menger complexity
- `u_treble` → Lattice filaments + nano-fibres + sparkles
- `u_rms` → Apollonian density + volumetric glow + FOV zoom
- `u_beat` → Camera roll + chromatic aberration

---

## Fluid & Simulation Shaders

### `lavaflow.frag` — FBM Lava

**Technique**: Fractional Brownian Motion with domain warping

$$\text{FBM}(p) = \sum_{i=0}^{N} \frac{\text{noise}(p \times 2^i)}{2^i}$$

Double domain warping:
$$p' = p + \text{FBM}(p + t)$$
$$\text{result} = \text{FBM}(p' + \text{FBM}(p'))$$

**Audio Mapping**:
- `u_bass` → warp amplitude
- `u_time` → flow speed
- Palette: 3-color gradient from background to lava

---

### `reaction_diff.frag` — Gray-Scott Model

**Technique**: Reaction-Diffusion via ping-pong texture

$$\frac{\partial u}{\partial t} = D_u \nabla^2 u - uv^2 + f(1-u)$$
$$\frac{\partial v}{\partial t} = D_v \nabla^2 v + uv^2 - (f+k)v$$

Laplacian computed via 9-point stencil on texture samples.

**Audio Mapping**:
- `u_bass × 0.03` → feed rate `f` (pattern density)
- `u_treble × 0.02` → kill rate `k` (pattern sharpness)

---

### `fluid_velocity.frag` — Navier-Stokes Lite

**Technique**: Simplified incompressible flow

1. Self-advection: sample velocity at `pos - velocity * dt`
2. Pressure gradient subtraction
3. Bass-driven velocity injection at center

---

### `living_canvas.frag` — Album Art Advection

**Technique**: Velocity field advection + Voronoi shatter

1. Sample album art texture
2. Compute velocity field (fluid_velocity)
3. Advect pixels along velocity
4. Apply Voronoi pattern for "shatter" effect
5. Chromatic aberration on edges
6. Frame feedback for trails

---

## Geometric Shaders

### `julia.frag` — 4D Quaternion Julia Set

**Technique**: Quaternion iteration raymarched

$$q_{n+1} = q_n^2 + c$$

Where $q$ is a quaternion $(x, y, z, w)$ and $c$ is the Julia parameter.

**Audio Mapping**:
- `u_bass` → modulates `c` parameter (changes fractal shape)
- Ray origin moves with time for fly-through

---

### `hyperbolic.frag` — Poincaré Disk {7,3}

**Technique**: Hyperbolic geometry via Möbius inversions

Renders a `{7,3}` tessellation (7-sided polygons, 3 meeting at each vertex) in the Poincaré disk model of hyperbolic space.

Each tile boundary is a geodesic (circle arc). Rendering inverts the point through each geodesic circle until it lands in the fundamental domain.

**Audio Mapping**:
- `u_bass` → tile pulsation
- `u_treble` → edge glow

---

### `riemann.vert` / `riemann.frag` — Möbius Sphere

**Technique**: Vertex displacement from frequency texture

Vertex shader samples a `DataTexture` (256×1, audio spectrum) at the vertex's angular position, displacing it radially.

Fragment shader applies Blinn-Phong lighting with Fresnel rim.

---

### `terrain_biome.frag` — FBM Terrain

**Technique**: Raymarched heightmap

$$h(x,z) = \text{FBM}(x, z) \times \text{amplitude}$$

Camera flies over procedural terrain. Height sampled via FBM noise.

**Audio Mapping**:
- `u_treble` → Fresnel edge glow intensity
- `u_bass` → terrain amplitude

---

### `biopunk_ocean.frag` — Dual Biome

**Technique**: Two-layer terrain (ocean + jungle canopy)

Bioluminescent vein patterns driven by RMS create "living" surface.

---

### `void_archipelago.frag` — Cellular Blobs

**Technique**: Domain repetition + hash-based density

$$\text{cell} = \text{floor}(p / \text{size})$$
$$\text{active} = \text{hash}(\text{cell}) > 0.7$$

Only 30% of cells contain geometry, creating floating "islands" in void.

---

### `saturn_discs.frag` — Thin Film Spheres

**Technique**: Domain-repeated hollow spheres

Thin-film interference for rainbow colors:
$$\text{color} = \text{cos}(\vec{c} + \text{thickness} \times \text{viewAngle})$$

---

### `soap_bubble.frag` — Iridescent Spheres

**Technique**: 6 animated sphere SDFs

- Fresnel reflectance at grazing angles
- Thin-film iridescence (optical path difference)
- Ray continuation through transparent surfaces

---

## Utility Shaders

### `fullscreen.vert`
Passthrough vertex shader for fullscreen quad:
```glsl
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
```

### `scene_bg.frag`
Animated rotating gradient with soft vignette. Used as fallback background.

---

## Tetrahedral Normals (Performance Pattern)

All raymarched shaders use the 4-sample tetrahedral normal estimation:
```glsl
vec3 getNormal(vec3 p) {
    vec2 e = vec2(ε, -ε);
    return normalize(
        e.xyy * map(p + e.xyy) +
        e.yyx * map(p + e.yyx) +
        e.yxy * map(p + e.yxy) +
        e.xxx * map(p + e.xxx)
    );
}
```
Only 4 `map()` calls instead of 6 (central differences). Critical for 120 FPS target.

---

## Ambient Occlusion Pattern

```glsl
float getAO(vec3 p, vec3 n) {
    float occ = 0.0, sca = 1.0;
    for (int i = 0; i < 4; i++) {
        float hr = 0.05 + 0.1 * float(i);
        float d = map(p + n * hr);
        occ += -(d - hr) * sca;
        sca *= 0.85;
    }
    return clamp(1.0 - K * occ, 0.0, 1.0);
}
```
Approximates how "enclosed" a point is by sampling along the normal. Higher `K` = deeper shadows in crevices.

---

## The Beyond Collection

### `chromic_birefringence.frag` — Crystalline Birefringence

**Technique**: Raymarched anisotropic crystals with dual-refraction optics

**Mathematical Core** — For each ray hitting a crystal surface, two refracted rays are computed based on a dynamic optical axis $\vec{A}$:
$$\vec{rd}_o = \text{refract}(\vec{rd}, \vec{n}, \eta_o)$$
$$\vec{rd}_e = \text{refract}(\vec{rd}, \vec{n}, \eta_e(\theta))$$

Where $\eta_e(\theta) = \text{mix}(\eta_e, \eta_o, \cos^2\theta)$ and $\theta$ is the angle between the ray and the optical axis. Each refracted ray is traced independently, producing split "ordinary" and "extraordinary" images recombined based on surface-axis alignment.

**Thin-Film Iridescence** (Gasoline Slick):
$$\text{color} = 0.5 + 0.5 \cdot \cos(2\pi \cdot 2d\cos\theta + \vec{\phi})$$

Where $d$ = film thickness (driven by `u_mid`) and $\theta$ = view angle.

**Audio Mapping**:
- `u_bass` → optical axis rotation angle (changes birefringent split direction)
- `u_treble` → $\Delta\eta$ chromatic split intensity (more treble = stronger color separation)
- `u_mid` → thin-film thickness (iridescence pattern)
- `u_rms` → inner void size + rim glow

---

### `quantum_entropy.frag` — Probability Density Cloud

**Technique**: Volumetric accumulation of superposed wave functions (no SDF)

**Mathematical Core** — Probability density from superposed orbital modes:
$$\Psi(p) = \sum_{i=1}^{5} \frac{\sin(k_i \cdot |p| + \phi_i)}{|p - \text{orbital}_i|^2} \cdot Y_l^m(\hat{p}) \cdot e^{-\alpha_i |p|}$$

Where $Y_l^m$ are spherical harmonic analogues (s, p, d, f, toroidal modes). Rendered color is proportional to $|\Psi(p)|^2$.

**Jittered Step Marching**: Hash-based per-pixel jitter eliminates banding in volumetric accumulation at minimal cost.

**Audio Mapping**:
- `u_rms` → cloud "temperature" (emission brightness)
- `u_beat` → orbital phase jump (instantly reconfigures quantum numbers)
- `u_bass` → pre-evaluation space rotation
- `u_energy` → hot color shift toward accent palette

---

### `chromic_glitch_vortex.frag` — Entropy Decay

**Technique**: Time-desynchronized voxel blocks with digital corruption overlay

**Mathematical Core** — Discrete time hash per spatial block:
$$t' = t - \text{hash}(\lfloor p / \text{size} \rfloor) \times u\_bass$$

Each block has independent rotation, geometry type (box/sphere mix via hash), and alive/dead state. Beat triggers spatial displacement via per-block random offsets.

**Scanline Overlay**: Horizontal scanlines + glitch bars that shift on beat create CRT/digital decay aesthetic.

**Audio Mapping**:
- `u_bass` → temporal desync between blocks (more bass = more time delay spread)
- `u_mid` → block size
- `u_beat` → spatial glitch displacement + camera roll
- `u_treble` → glitch strength modifier
- `u_energy` → alive block threshold (more blocks appear at high energy)

---

## CPU Animation Systems

### `KineticRibbonSystem.ts` — Instanced Flowing Ribbons

**Technique**: 200 GPU-instanced thin planes animated via custom vertex shader

Each ribbon follows a Bézier-like orbital path:
$$\text{pos}(t) = (\sin(\omega_1 t + \phi) \cdot r_1, \cos(\omega_2 t + \phi) \cdot r_2, \sin(\omega_3 t + \phi) \cdot r_3)$$

With turbulence noise added proportional to energy.

**Audio Mapping**:
- `u_bass` → compression toward center (ribbons squeeze inward on kicks)
- `u_energy` → turbulence amplitude (chaos increases with loudness)
- `u_beat` → additional turbulence spike
- `u_rms` → ribbon emission glow

---

## Post-Processing

### Chromatic Aberration Pass

**Technique**: RGB channel offset in screen space, proportional to distance from center

$$r = \text{tex}(uv + d \cdot I), \quad g = \text{tex}(uv), \quad b = \text{tex}(uv - d \cdot I)$$

Where $d = (uv - 0.5)$ and $I$ = intensity (spikes on bass > 0.5, decays at 0.92× per frame).
