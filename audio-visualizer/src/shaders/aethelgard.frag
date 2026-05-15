/**
 * AETHELGARD UNIFIED COSMIC ENGINE: ULTIMATE ENTROPY v2026.05
 * Optimized: 40 steps, 3 iter biomes, no per-step ray bend, 6 biomes
 * 4D entropy seeding, cosine gradient palettes, multi-biome blending,
 * volumetric light accumulation
 */

precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform float u_beat;
uniform float u_energy;

varying vec2 vUv;

#define MAX_STEPS 40
#define SURF_DIST 0.008
#define VOXEL_SIZE 20.0
#define PI 3.14159265359

// ─── Math Utils ──────────────────────────────────────────────────────────────

mat2 rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

float hash41(vec4 p4) {
  p4 = fract(p4 * vec4(.1031, .11369, .13787, .09987));
  p4 += dot(p4, p4.wzxy + 19.19);
  return fract((p4.x + p4.y) * (p4.z + p4.w));
}

float smax(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (a - b) / k, 0.0, 1.0);
  return mix(b, a, h) + k * h * (1.0 - h);
}

// ─── Cosine Gradient Palette ─────────────────────────────────────────────────

vec3 getCosPalette(float t, vec3 base, vec3 mid, vec3 accent) {
  vec3 a = (base + mid) * 0.5;
  vec3 b = (accent - base) * 0.5 + 0.3;
  return a + b * cos(2.0 * PI * (vec3(1.0) * t + vec3(0.0, 0.33, 0.67)));
}

// ─── Biomes (6 types, 3 iterations each) ────────────────────────────────────

float de_mandelbox(vec3 p, float audio) {
  vec4 q = vec4(p, 1.0);
  float scale = 2.4 + audio * 1.5;
  for (int i = 0; i < 3; i++) {
    q.xyz = clamp(q.xyz, -1.0, 1.0) * 2.0 - q.xyz;
    float r2 = dot(q.xyz, q.xyz);
    q *= clamp(max(0.25 / r2, 0.25), 0.0, 1.0);
    q = q * scale + vec4(p, 0.0);
  }
  return length(q.xyz) / abs(q.w);
}

float de_apollonian(vec3 p, float audio) {
  float s = 1.0;
  for (int i = 0; i < 3; i++) {
    p = -1.0 + 2.0 * fract(0.5 + 0.5 * p);
    float r2 = dot(p, p);
    float k = (1.15 + audio * 0.5) / r2;
    p *= k;
    s *= k;
  }
  return 0.3 * abs(p.y) / s;
}

float de_menger(vec3 p, float audio) {
  float d = length(max(abs(p) - 1.0, 0.0));
  float s = 1.0;
  for (int i = 0; i < 3; i++) {
    vec3 a = mod(p * s, 2.0) - 1.0;
    s *= 3.0;
    vec3 v = 1.0 - 3.0 * abs(a);
    d = max(d, max(v.x, max(v.y, v.z)) / s);
  }
  return d - audio * 0.1;
}

float de_lattice(vec3 p, float audio) {
  p = abs(mod(p, 4.0) - 2.0);
  float thickness = 0.08 + audio * 0.2;
  return min(length(p.xy), length(p.yz)) - thickness;
}

float de_sierpinski(vec3 p, float audio) {
  float scale = 1.0;
  float offset = 1.0 + audio * 0.3;
  for (int i = 0; i < 3; i++) {
    if (p.x + p.y < 0.0) p.xy = -p.yx;
    if (p.x + p.z < 0.0) p.xz = -p.zx;
    if (p.y + p.z < 0.0) p.yz = -p.zy;
    p = p * 2.0 - offset;
    scale *= 2.0;
  }
  return length(p) / scale - 0.01;
}

float de_kaleido(vec3 p, float audio) {
  float scale = 1.0;
  float angle = PI / (3.0 + audio * 3.0);
  for (int i = 0; i < 3; i++) {
    p = abs(p);
    p.xy *= rot(angle);
    p.xz *= rot(angle * 0.7);
    p -= vec3(1.0, 0.8, 1.2);
    p *= 1.4;
    scale *= 1.4;
  }
  return (length(p.xz) - 0.2) / scale;
}

// ─── Master Map ──────────────────────────────────────────────────────────────

vec4 map(vec3 p) {
  float tunnelSpeed = u_time * 0.1;
  vec3 q = p;
  q.xy -= vec2(sin(p.z * 0.15 + tunnelSpeed) * 3.5, cos(p.z * 0.1 + tunnelSpeed * 1.2) * 2.5);

  vec3 cell = floor(q / VOXEL_SIZE);
  vec3 localP = mod(q, VOXEL_SIZE) - VOXEL_SIZE * 0.5;

  // Slow, smooth time component to prevent sudden biome switches
  float timeSlice = floor(u_time * 0.02);
  float timeFract = smoothstep(0.0, 1.0, fract(u_time * 0.02));
  float entropy = hash41(vec4(cell, timeSlice));
  float entropyNext = hash41(vec4(cell, timeSlice + 1.0));
  float entropy2 = hash41(vec4(cell + 73.0, timeSlice));

  // Wider smooth biome blending at cell boundaries
  vec3 cellFract = smoothstep(0.0, 0.3, fract(q / VOXEL_SIZE)) * smoothstep(1.0, 0.7, fract(q / VOXEL_SIZE));
  float blendEdge = min(cellFract.x, min(cellFract.y, cellFract.z));

  // Clamp audio inputs to prevent overdriven geometry
  float safeBass = min(u_bass, 0.8);
  float safeMid = min(u_mid, 0.8);
  float safeTreble = min(u_treble, 0.8);
  float safeRms = min(u_rms, 0.7);

  // Current cell biome - blend between current and next time slice
  int biomeId = int(entropy * 6.0);
  int biomeIdNext = int(entropyNext * 6.0);

  float d1;
  if (biomeId == 0) d1 = de_mandelbox(localP * 0.4, safeBass);
  else if (biomeId == 1) d1 = de_apollonian(localP * 0.5, safeRms * 0.6);
  else if (biomeId == 2) d1 = de_menger(localP * 0.35, safeMid);
  else if (biomeId == 3) d1 = de_lattice(localP, safeTreble);
  else if (biomeId == 4) d1 = de_sierpinski(localP * 0.3, safeBass);
  else d1 = de_kaleido(localP * 0.25, safeTreble);

  float d2;
  if (biomeIdNext == 0) d2 = de_mandelbox(localP * 0.4, safeBass);
  else if (biomeIdNext == 1) d2 = de_apollonian(localP * 0.5, safeRms * 0.6);
  else if (biomeIdNext == 2) d2 = de_menger(localP * 0.35, safeMid);
  else if (biomeIdNext == 3) d2 = de_lattice(localP, safeTreble);
  else if (biomeIdNext == 4) d2 = de_sierpinski(localP * 0.3, safeBass);
  else d2 = de_kaleido(localP * 0.25, safeTreble);

  // Smooth temporal crossfade between biomes
  float d = mix(d1, d2, timeFract);

  // At edges, fade geometry out smoothly (dissolve into dust)
  d = mix(d, d * 0.8, 1.0 - blendEdge);

  // Wide corridor
  d = smax(d, -(length(q.xy) - (6.0 + safeBass * 3.0)), 1.5);

  return vec4(d, mix(entropy, entropyNext, timeFract), entropy2, length(localP));
}

// ─── Main ────────────────────────────────────────────────────────────────────

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
  vec3 ro = vec3(sin(u_time * 0.4) * 2.0, 0.0, u_time * 6.0);
  vec3 rd = normalize(vec3(uv, 1.2));
  rd.xy *= rot(sin(u_time * 0.2) * 0.3);

  // Event horizon (apply ONCE, not per step)
  float ehStrength = smoothstep(0.6, 1.0, u_bass) * 0.4;
  rd = normalize(rd + vec3(0.0, 0.0, 1.0) * ehStrength * 0.1);

  float t = 0.0, glow = 0.0;
  vec4 sceneData;

  for (int i = 0; i < MAX_STEPS; i++) {
    vec3 p = ro + rd * t;
    sceneData = map(p);
    glow += exp(-sceneData.x * 2.0) * 0.08;
    if (sceneData.x < SURF_DIST || t > 80.0) break;
    t += sceneData.x;
  }

  vec3 finalCol = u_colors[0] * 0.02;
  if (t < 80.0) {
    vec3 baseCol = getCosPalette(sceneData.y + t * 0.02 + sceneData.z * 2.0, u_colors[0], u_colors[1], u_colors[2]);
    float fog = exp(-t * 0.018);
    finalCol = baseCol * fog * 1.6;
    finalCol += u_colors[2] * pow(1.0 - fog, 3.0) * (0.5 + u_bass * 0.6);
    finalCol += u_colors[2] * pow(fog, 5.0) * u_treble * 1.5;
  }

  finalCol += getCosPalette(u_time * 0.02, u_colors[0], u_colors[1], u_colors[2]) * glow * 0.08;
  finalCol += u_colors[2] * u_beat * 0.04;
  finalCol = mix(finalCol, u_colors[0] * 0.03, smoothstep(40.0, 80.0, t));

  gl_FragColor = vec4(pow(finalCol / (1.0 + finalCol), vec3(0.85)), 1.0);
}

