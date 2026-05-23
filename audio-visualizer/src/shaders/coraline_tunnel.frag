precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform float u_beat;
uniform float u_energy;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform sampler2D u_albumArt;
uniform float u_seed;

varying vec2 vUv;

#define PI 3.14159265
#define TAU 6.28318530718
#define MAX_STEPS 30
#define MAX_DIST 26.0
#define SURF_DIST 0.0035

mat2 rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

float hash(float n) { return fract(sin(n) * 43758.5453123); }
float hash2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float n = i.x + i.y * 57.0 + i.z * 113.0;
  float a = hash(n + 0.0);
  float b = hash(n + 1.0);
  float c = hash(n + 57.0);
  float d = hash(n + 58.0);
  float e = hash(n + 113.0);
  float f1 = hash(n + 114.0);
  float g = hash(n + 170.0);
  float h = hash(n + 171.0);
  return mix(mix(mix(a, b, f.x), mix(c, d, f.x), f.y), mix(mix(e, f1, f.x), mix(g, h, f.x), f.y), f.z);
}

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 2; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec3(1.7, 1.3, 0.9);
    a *= 0.5;
  }
  return v;
}

float waxTexture(vec2 uv) {
  // Crayon-like short strokes + grainy wax buildup.
  vec2 p = uv * 1.18;
  p.x += sin(p.y * 2.4) * 0.24;
  float g0 = hash2(floor(p * 18.0));
  float g1 = hash2(floor((p + vec2(0.73, 1.41)) * 30.0));
  float strokeA = abs(fract(p.x * 7.2 + g0 * 2.3) - 0.5);
  float strokeB = abs(fract((p.x * 5.1 - p.y * 2.3) + g1 * 3.0) - 0.5);
  float strokeC = abs(fract((p.y * 4.8 + p.x * 1.6) + g0 * 2.7) - 0.5);
  float strokes = smoothstep(0.48, 0.09, min(min(strokeA, strokeB), strokeC));
  float grain = mix(g0, g1, 0.45);
  float wax = mix(0.62, 1.38, strokes) * mix(0.8, 1.18, grain);
  return clamp(wax, 0.5, 1.6);
}

vec2 tubeCascadeOffset(float z) {
  float ringCoord = z / 1.05;
  float groupCoord = ringCoord / 4.0;
  float g0 = floor(groupCoord);
  float gBlend = smoothstep(0.18, 0.82, fract(groupCoord));

  // Blend adjacent groups to remove hard jumps when crossing group boundaries.
  float phase0 = z * 0.13 - u_time * (0.96 + u_bass * 0.16) + g0 * 1.12;
  float phase1 = z * 0.13 - u_time * (0.96 + u_bass * 0.16) + (g0 + 1.0) * 1.12;
  float cascade0 = 0.5 + 0.5 * sin(z * 0.23 - u_time * (1.34 + u_mid * 0.12) + g0 * 0.84);
  float cascade1 = 0.5 + 0.5 * sin(z * 0.23 - u_time * (1.34 + u_mid * 0.12) + (g0 + 1.0) * 0.84);
  float groupPhase = mix(phase0, phase1, gBlend);
  float cascade = mix(cascade0, cascade1, gBlend);

  float groupAmp = (0.055 + u_energy * 0.022 + u_bass * 0.008) * (0.72 + 0.28 * cascade);
  vec2 groupOffset = vec2(
    sin(groupPhase) + 0.32 * sin(groupPhase * 1.67 + 1.1),
    cos(groupPhase * 1.08 + 1.2) + 0.27 * cos(groupPhase * 1.53 - 0.7)
  ) * groupAmp;

  // Secondary tube wobble keeps the tunnel feeling alive in both axes.
  float tubeAmp = 0.03 + u_bass * 0.016 + u_energy * 0.006;
  vec2 tubeOffset = vec2(
    sin(z * 0.10 - u_time * 0.76),
    cos(z * 0.09 - u_time * 0.69 + 1.7)
  ) * tubeAmp;

  return groupOffset + tubeOffset;
}

float map(vec3 p) {
  float z = p.z + u_time * (0.56 + u_bass * 0.03);
  vec2 pxy = p.xy;
  pxy *= rot(z * 0.045 + sin(z * 0.07) * 0.03);
  pxy -= tubeCascadeOffset(z);

  float r = length(pxy);
  float a = atan(pxy.y, pxy.x);

  // Domain warping breaks hard radial symmetry and creates cloth-like flow.
  vec3 warpP = vec3(a * 1.9, z * 0.36, r * 0.9);
  float w1 = fbm(warpP + vec3(0.0, 2.0, 1.0));
  float w2 = fbm(warpP * 1.85 + vec3(4.7, 0.6, 2.2));

  float aWarp = a + (w1 - 0.5) * 1.35 + (w2 - 0.5) * 0.5;
  float zWarp = z + (w2 - 0.5) * 2.1;

  // Connected bio layers: mostly full wall with only thin seams.
  float segLen = 1.05;
  float segPhase = abs(mod(zWarp + segLen * 0.5, segLen) - segLen * 0.5) / (segLen * 0.5);
  float segBody = 1.0 - smoothstep(0.66, 0.97, segPhase);

  float petals = abs(sin(aWarp * 1.28 + zWarp * 0.13 + w1 * 1.4));
  float petalBody = smoothstep(0.2, 0.88, petals);
  float tipProtrusion = smoothstep(0.62, 0.96, segPhase) * smoothstep(0.52, 0.95, petalBody);

  float folds = abs(sin(aWarp * 2.35 + zWarp * 0.30)) * 0.34;
  folds += abs(sin(aWarp * 1.05 - zWarp * 0.19 + w1 * 2.2)) * 0.16;
  float wrinkles = (fbm(vec3(aWarp * 2.2, zWarp * 0.25, r * 0.8)) - 0.5) * 0.22;
  float micro = (noise(vec3(aWarp * 10.0, zWarp * 0.9, r * 3.0)) - 0.5) * (0.03 + u_treble * 0.02);

  float radius = 1.95 + u_rms * 0.04;
  float wallR = radius + folds + wrinkles + micro + segBody * 0.12 + petalBody * 0.08 + tipProtrusion * 0.1;

  // Thin crack-like seam lines, not large holes.
  float seam = smoothstep(0.93, 1.0, segPhase);
  wallR -= seam * 0.06;

  return abs(r - wallR) - 0.16;
}

vec3 getNormal(vec3 p) {
  vec2 e = vec2(0.0025, -0.0025);
  return normalize(
    e.xyy * map(p + e.xyy) +
    e.yyx * map(p + e.yyx) +
    e.yxy * map(p + e.yxy) +
    e.xxx * map(p + e.xxx)
  );
}

float ao(vec3 p, vec3 n) {
  float occ = 0.0;
  float sca = 1.0;
  for (int i = 0; i < 3; i++) {
    float h = 0.03 + 0.11 * float(i);
    float d = map(p + n * h);
    occ += (h - d) * sca;
    sca *= 0.62;
  }
  return clamp(1.0 - 3.2 * occ, 0.0, 1.0);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - u_resolution * 0.5) / u_resolution.y;

  float T = u_time * (0.70 + u_bass * 0.02) + u_seed * 50.0;
  vec3 ro = vec3(0.0, 0.0, T * 1.2);
  vec3 target = vec3(0.0, 0.0, ro.z + 3.8);

  ro.xy += vec2(sin(u_time * 0.21), cos(u_time * 0.18)) * 0.018;

  vec3 fwd = normalize(target - ro);
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
  vec3 up = cross(fwd, right);
  vec3 rd = normalize(uv.x * right + uv.y * up + 1.0 * fwd);

  float t = 0.0;
  float d = 0.0;
  float glow = 0.0;

  for (int i = 0; i < MAX_STEPS; i++) {
    vec3 p = ro + rd * t;
    d = map(p);
    glow += 0.0032 / (0.05 + d * d * 2.1);
    if (d < SURF_DIST || t > MAX_DIST) break;
    t += d * 0.9;
  }

  vec3 colorBg = vec3(8.0, 8.0, 30.0) / 255.0;
  vec3 colorPri = vec3(28.0, 96.0, 212.0) / 255.0;
  vec3 colorAcc = vec3(120.0, 44.0, 148.0) / 255.0;

  vec3 color = colorBg * 0.12;

  if (d < SURF_DIST * 2.0) {
    vec3 p = ro + rd * t;
    vec3 n = getNormal(p);

    float z = p.z + u_time * (0.56 + u_bass * 0.03);
    vec2 pxy = p.xy;
    pxy *= rot(z * 0.045 + sin(z * 0.07) * 0.03);
    pxy -= tubeCascadeOffset(z);
    float a = atan(pxy.y, pxy.x);
    float r = length(pxy);

    vec3 warpP = vec3(a * 1.9, z * 0.36, r * 0.9);
    float w1 = fbm(warpP + vec3(0.0, 2.0, 1.0));
    float w2 = fbm(warpP * 1.85 + vec3(4.7, 0.6, 2.2));
    float aWarp = a + (w1 - 0.5) * 1.35 + (w2 - 0.5) * 0.5;
    float zWarp = z + (w2 - 0.5) * 2.1;

    float segLen = 1.05;
    float ringId = floor((zWarp + segLen * 0.5) / segLen);
    float segPhase = abs(mod(zWarp + segLen * 0.5, segLen) - segLen * 0.5) / (segLen * 0.5);
    float segBody = 1.0 - smoothstep(0.66, 0.97, segPhase);
    float petals = abs(sin(aWarp * 1.28 + zWarp * 0.13 + w1 * 1.4));
    float petalBody = smoothstep(0.2, 0.88, petals);

    float tipCore = smoothstep(0.78, 0.98, segPhase) * smoothstep(0.50, 0.92, petalBody);
    float tipFeather = smoothstep(0.52, 0.82, segPhase) * (1.0 - smoothstep(0.82, 0.98, segPhase));
    tipFeather *= smoothstep(0.40, 0.90, petalBody);
    float tipMask = tipCore;
    float seamMask = smoothstep(0.92, 1.0, segPhase);
    float ringPartMask = petalBody * segBody * (1.0 - seamMask);

    float ringHueShift = 0.5 + 0.5 * sin(ringId * 0.63 + zWarp * 0.08);
    vec3 ringGlowColor = mix(colorPri, colorAcc, 0.25 + 0.45 * ringHueShift);

    // Keep wall hue balanced to avoid a rotating dark spiral band.
    vec3 wall = mix(colorAcc, colorPri, 0.54 + (petalBody - 0.5) * 0.12);

    vec3 lightDir = normalize(vec3(-0.23, 0.19, 1.0));
    float diff = max(dot(n, lightDir), 0.0);
    float spec = pow(max(dot(reflect(-lightDir, n), -rd), 0.0), 36.0);
    float occ = ao(p, n);

    color = colorBg * 0.08;
    color += wall * diff * 0.86;

    // Deep black valleys and black tips give the bio-organic impression.
    color = mix(color, vec3(0.0), seamMask * 0.42);
    color = mix(color, vec3(0.0), tipCore * 0.9);

    // Feather from black tip into the lit ring body color.
    color += ringGlowColor * tipFeather * (0.2 + u_mid * 0.08 + u_energy * 0.08);

    color += mix(colorPri, colorAcc, 0.4) * spec * (0.28 + u_treble * 0.07);

    // Broader body tint so ring chunks feel lit, not only sharp edge spots.
    float bodyTint = 0.16 + u_mid * 0.22 + u_energy * 0.18;
    color += mix(colorPri, colorAcc, 0.48) * ringPartMask * bodyTint;

    float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.8);
    float ridgeMask = smoothstep(0.45, 0.92, petalBody) * (1.0 - seamMask);

    // Keep tips black, but make the whole ring chunk below tips emit color for bloom.
    float nonTipBody = ringPartMask * (1.0 - tipMask * 0.95);
    float belowTipBand = smoothstep(0.52, 0.73, segPhase) * (1.0 - smoothstep(0.74, 0.90, segPhase));
    belowTipBand *= petalBody * (1.0 - seamMask) * (1.0 - tipMask);

    // Audio now scales intensity globally instead of turning random spots on/off.
    float pulse = 0.82 + u_bass * 0.6 + u_mid * 0.34 + u_beat * 0.7 + u_energy * 0.5;

    // Wax-pencil texture in bloom color (painted, not smooth).
    float waxRaw = waxTexture(vec2(aWarp * 0.95 + ringId * 0.07, zWarp * 0.34 + u_time * 0.05));
    float wax = mix(1.0, pow(waxRaw, 1.25), 0.95);

    // Spread bloom across fabric body to avoid isolated hotspots.
    float bloomSpread = smoothstep(0.22, 0.92, ringPartMask) * (1.0 - seamMask) * (1.0 - tipCore * 0.9);
    float hdrBody = bloomSpread * (0.6 + 0.42 * pulse) * wax;
    float hdrBelowTip = belowTipBand * (0.9 + u_bass * 0.42 + u_beat * 0.42 + u_energy * 0.24) * wax;
    float hdrRim = rim * ridgeMask * belowTipBand * (0.2 + u_treble * 0.1) * mix(0.82, 1.12, wax);
    vec3 hdrEdges = ringGlowColor * (hdrBody + hdrBelowTip + hdrRim);
    color += hdrEdges;

    color *= occ;

    float fog = 1.0 - exp(-t * 0.07);
    color = mix(color, colorBg * 0.07, fog);
  } else {
    float center = exp(-length(uv) * 5.8);
    color = colorBg * (0.08 + center * 0.14);
  }

  color += mix(colorPri, colorAcc, 0.5) * glow * (0.012 + u_rms * 0.01);

  color *= 1.0 - dot(uv, uv) * 0.33;

  // Filmic tone mapping after HDR highlights.
  color = color * (2.51 * color + 0.03) / (color * (2.43 * color + 0.59) + 0.14);
  color += (hash2(gl_FragCoord.xy + floor(u_time * 24.0) * 131.0) - 0.5) * 0.006;

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}

