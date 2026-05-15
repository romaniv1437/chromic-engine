# Performance & Optimization

> Targeting 120 FPS on Chromic Silicon M1 Pro

---

## GPU Budget

At 120 FPS, each frame gets **8.3ms** of GPU time. With overhead:
- **Target per-shader time**: ≤ 6ms
- **Post-processing**: ≤ 1.5ms
- **Swap/present**: ~0.8ms

---

## Raymarching Optimization Patterns

### 1. Step Count Limits

| Complexity | Steps | Use Case |
|-----------|-------|----------|
| 40–45 | Simple tunnels, fast fly-through |
| 50–55 | Standard fractals with AO |
| 60–70 | Detailed scenes (quality mode) |

### 2. Adaptive Step Size

```glsl
t += d * 0.7; // Conservative: prevents overshoot into thin geometry
t += d * 0.85; // Balanced
t += d;        // Full steps: fastest but may miss thin structures
```

### 3. Early Termination Distance

```glsl
if (t > 25.0) break;  // Close scenes (caverns)
if (t > 35.0) break;  // Medium range
if (t > 45.0) break;  // Deep views (tunnels)
```

Shorter cutoff = faster, but needs fog to hide the boundary.

### 4. Hit Threshold

```glsl
if (d < 0.002) break; // Standard quality
if (d < 0.005) break; // Performance mode
if (d < 0.0005) break; // Ultra detail (expensive!)
```

---

## Normal Calculation Cost

`getNormal()` calls `map()` **4 times**. Total `map()` calls per pixel:

| Without AO | With AO (4 samples) |
|-----------|---------------------|
| Steps + 4 normals = ~50+4 = 54 | Steps + 4 normals + 4 AO = ~50+4+4×map = 70 |

**Optimization**: Skip normals for distant pixels:
```glsl
if (t > farThreshold) {
    // Use distance-based coloring only, no normals
    col = fogColor;
}
```

---

## Normal Epsilon Size

```glsl
vec2 e = vec2(0.001, -0.001); // Ultra precise (slow)
vec2 e = vec2(0.005, -0.005); // Balanced
vec2 e = vec2(0.01, -0.01);   // Rough but fast
```

Larger epsilon = fewer visual artifacts but softer normals.

---

## Register Pressure

GPU has limited registers. Avoid:
- ❌ `if` statements inside fractal loops (divergent execution)
- ❌ Many `float` locals inside `map()`
- ❌ Complex function calls inside loops

Instead:
- ✅ Pre-compute constants outside loops
- ✅ Use vectorized operations (`dot`, `length`)
- ✅ Keep loop body minimal

---

## Fog as Performance Tool

Fog hides the max-distance boundary:
```glsl
float fog = smoothstep(nearFog, maxDist * 0.95, t);
col = mix(col, fogColor, fog);
```

This allows reducing `maxDist` without visible artifacts.

---

## M1 Pro Specific Notes

1. **Unified Memory**: No CPU→GPU transfer penalty for uniform updates
2. **Tile-Based Rendering**: Fragment shaders benefit from spatial coherence
3. **Half-precision**: Metal compiler may auto-promote, keep math simple
4. **Thermal Throttling**: At sustained load, GPU clocks drop ~15% after 5 minutes

### Thermal Budget Guidelines

| Shader Load | Fan Behavior | Action |
|------------|--------------|--------|
| 45 steps, 5 iter | Silent | ✅ Optimal |
| 55 steps, 6 iter, AO | Low fan | ⚠️ Acceptable |
| 70 steps, 8 iter, AO | High fan | ❌ Reduce complexity |

---

## Resolution Scaling Impact

| Scale | Pixels (1080p) | Relative Cost |
|-------|---------------|---------------|
| 0.5× | 518,400 | 25% |
| 0.75× | 1,166,400 | 56% |
| 1.0× | 2,073,600 | 100% |
| 1.5× | 4,665,600 | 225% |

Raymarching cost is **linear with pixel count**. Halving resolution = 4× faster.

---

## Checklist for New Shaders

- [ ] ≤ 55 ray steps for default quality
- [ ] `map()` function has ≤ 6 fractal iterations
- [ ] No `if` branching inside fractal loop
- [ ] Normal epsilon ≥ 0.005
- [ ] AO uses ≤ 4 samples
- [ ] Max distance ≤ 35.0
- [ ] Fog starts at 60% of max distance
- [ ] Test with audio playing (uniforms at max values)
- [ ] Verify no NaN/Inf from edge cases (`u_bass = 1.0`, `u_rms = 1.0`)

