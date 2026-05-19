precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform float u_beat;        // Beat pulse (decays exponentially)
uniform float u_energy;      // Accumulated energy/aggression
uniform vec2 u_resolution;
uniform vec3 u_colors[3];

varying vec2 vUv;

// ─── Constants ───────────────────────────────────────────────────────────────
#define MAX_STEPS 60
#define MAX_DIST 20.0
#define SURF_DIST 0.003
#define PI 3.14159265359

// ─── Rotation matrix ─────────────────────────────────────────────────────────
mat2 rot2(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

// ─── Palette interpolation (smooth cosine gradient) ──────────────────────────
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}

vec3 getMoodColor(float t, float moodShift) {
  // Base colors from album palette
  vec3 c0 = u_colors[0];
  vec3 c1 = u_colors[1];
  vec3 c2 = u_colors[2];

  // When energy is high, shift toward complementary colors
  vec3 comp0 = vec3(1.0) - c0;
  vec3 comp1 = vec3(1.0) - c1;

  c0 = mix(c0, comp0, moodShift * 0.4);
  c1 = mix(c1, comp1, moodShift * 0.3);

  // Smooth 3-color blend
  float seg = t * 2.0;
  if (seg < 1.0) return mix(c0, c1, seg);
  return mix(c1, c2, seg - 1.0);
}

// ─── IFS Fractal SDF (Sensitive & Compact) ───────────────────────────────────
float fractalSDF(vec3 pos) {
  vec3 p = pos;

  // Low threshold warp but high sensitivity to bass hits
  float bassWarp = 0.1 + u_bass * 1.5;
  p.xz *= rot2(u_time * 0.2 + bassWarp * 0.5 * sin(p.y * 0.5));

  float scale = 1.0;
  float totalScale = 1.0;

  // Capped iterations: 4-5 range keeps fractal always visible
  float maxIter = 4.0 + min(u_energy, 0.3) * 3.0;

  // Offset "breathes" with mid frequencies
  vec3 offset = vec3(
    1.0 + u_bass * 0.3,
    0.9 + u_mid * 0.4,
    1.1 + u_treble * 0.3
  );

  for (int i = 0; i < 5; i++) {
    if (float(i) >= maxIter) break;

    p = abs(p);
    if (p.x < p.y) p.xy = p.yx;
    if (p.x < p.z) p.xz = p.zx;
    if (p.y < p.z) p.yz = p.zy;

    float rotAngle = u_time * 0.1 + u_treble * 0.4 + float(i) * 0.1;
    p.xy *= rot2(rotAngle * 0.2);

    scale = 1.6 + u_mid * 0.4;
    p = p * scale - offset * (scale - 1.0);
    totalScale *= scale;
  }

  // Always-visible base radius (never drops below 1.5)
  float baseRadius = 1.5 + u_rms * 0.8;
  float d = (length(p) - baseRadius) / totalScale;

  // Shell always present — ensures fractal is visible even at zero audio
  float r = length(pos);
  float shellRadius = 1.2 + u_bass * 0.4;
  d = min(d, r - shellRadius);

  // Bulge only on strong bass
  if (u_bass > 0.2) {
    float power = 2.0 + u_energy * 4.0;
    float bulge = pow(r, power) * 0.015 * u_bass;
    d = min(d, r - shellRadius - 0.1 + bulge);
  }

  return d;
}

// ─── Scene SDF ───────────────────────────────────────────────────────────────
float map(vec3 p) {
  // Reduced shakeOffset so object doesn't fly out of frame on drops
  vec3 shakeOffset = vec3(
    sin(u_time * 40.0) * u_beat * 0.1,
    cos(u_time * 45.0) * u_beat * 0.08,
    sin(u_time * 35.0) * u_beat * 0.05
  );
  p += shakeOffset;

  p.xz *= rot2(u_time * 0.1);
  p.xy *= rot2(u_time * 0.05 + u_bass * 0.15);

  return fractalSDF(p);
}

// ─── Normal estimation ───────────────────────────────────────────────────────
vec3 getNormal(vec3 p) {
  float d = map(p);
  vec2 e = vec2(0.001, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - d,
    map(p + e.yxy) - d,
    map(p + e.yyx) - d
  ));
}

// ─── Cheap AO (1 sample) ─────────────────────────────────────────────────────
float calcAO(vec3 pos, vec3 nor) {
  return clamp(map(pos + nor * 0.15) / 0.15, 0.0, 1.0);
}

// ─── Glow accumulation (during raymarch — sparkle effect) ────────────────────
float glowAccum = 0.0;

// ─── Raymarch ────────────────────────────────────────────────────────────────
float raymarch(vec3 ro, vec3 rd) {
  float t = 0.0;
  glowAccum = 0.0;

  for (int i = 0; i < MAX_STEPS; i++) {
    vec3 p = ro + rd * t;
    float d = map(p);

    // Accumulate glow from near-misses (sparkle/air effect)
    glowAccum += exp(-d * 8.0) * 0.015;

    if (d < SURF_DIST) return t;
    if (t > MAX_DIST) break;

    t += d * 0.8; // Slightly conservative step for stability
  }
  return -1.0;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

  // Camera setup with beat-reactive shake
  vec3 ro = vec3(0.0, 0.0, 4.5 - u_bass * 0.8); // Bass pulls camera closer
  ro.x += sin(u_time * 37.0) * u_beat * 0.2;
  ro.y += cos(u_time * 43.0) * u_beat * 0.15;

  // Slight orbit based on time
  ro.xz *= rot2(sin(u_time * 0.1) * 0.3);
  ro.yz *= rot2(cos(u_time * 0.07) * 0.2);

  vec3 lookAt = vec3(0.0);
  vec3 forward = normalize(lookAt - ro);
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), forward));
  vec3 up = cross(forward, right);

  // FOV warps with bass (fisheye on drops)
  float fov = 1.0 + u_bass * 0.3;
  vec3 rd = normalize(uv.x * right + uv.y * up + fov * forward);

  // Raymarch
  float t = raymarch(ro, rd);

  // Background — deep void with mood coloring
  vec3 bgColor = u_colors[0] * 0.05;
  bgColor += u_colors[2] * 0.03 * (1.0 - length(uv));

  vec3 col = bgColor;

  if (t > 0.0) {
    vec3 p = ro + rd * t;
    vec3 n = getNormal(p);

    // Lighting
    vec3 lightDir = normalize(vec3(1.0, 2.0, 3.0));
    lightDir.xz *= rot2(u_time * 0.2);

    float diff = max(dot(n, lightDir), 0.0);
    float spec = pow(max(dot(reflect(-lightDir, n), -rd), 0.0), 16.0 + u_treble * 48.0);
    float ao = calcAO(p, n);

    // Color based on normal orientation + depth (mood-reactive)
    float colorMix = dot(n, vec3(0.0, 1.0, 0.0)) * 0.5 + 0.5;
    colorMix += length(p) * 0.1;
    float moodShift = u_energy * u_mid; // High energy + high mid = color conflict
    vec3 surfColor = getMoodColor(fract(colorMix), moodShift);

    // Compose lighting
    col = surfColor * (0.15 + diff * 0.7) * ao;
    col += spec * u_colors[2] * (0.3 + u_treble * 0.7); // Treble = specular sparkle

    // Rim light (edge glow driven by RMS)
    float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
    col += rim * u_colors[1] * (0.2 + u_rms * 0.8);
  }

  // Add volumetric glow (treble/sparkle drives intensity)
  float glowIntensity = u_treble * 1.5 + u_rms * 0.5;
  vec3 glowColor = mix(u_colors[1], u_colors[2], 0.5);
  col += glowAccum * glowColor * glowIntensity;

  // Beat flash (white burst on kick)
  col += vec3(1.0) * u_beat * 0.3;

  // Vignette
  float vig = 1.0 - 0.4 * dot(uv, uv);
  col *= vig;

  // Tone mapping (ACES-ish)
  col = col / (col + vec3(1.0));
  col = pow(col, vec3(0.9)); // Slight gamma for richness

  gl_FragColor = vec4(col, 1.0);
}

