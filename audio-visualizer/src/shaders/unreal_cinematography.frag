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
uniform float u_biomePhase; // smoothly advances on rhythm changes (from TS)

// Lyrics-driven uniforms
uniform float u_lyricsActive;   // 1.0 when a line is currently active
uniform float u_lyricsProgress; // 0..1 progress through current line
uniform float u_adlib;          // 1.0 when current word/line is adlib
uniform float u_wordIntensity;  // sung/whisper/spoken intensity
uniform float u_lineBreak;      // pulses 1.0 on line transitions

varying vec2 vUv;

#define MAX_STEPS 40
#define MAX_DIST 35.0
#define SURF_DIST 0.008
#define PI 3.14159265359
#define TAU 6.28318530718

// ─── Hash functions ─────────────────────────────────────────────────────────
mat2 rot(float a) { float s = sin(a), c = cos(a); return mat2(c, -s, s, c); }
float hash(float n) { return fract(sin(n) * 43758.5453); }
float hash2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hash33(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
             dot(p, vec3(269.5, 183.3, 246.1)),
             dot(p, vec3(113.5, 271.9, 124.6)));
    return fract(sin(p) * 43758.5453123);
}

float noise(vec3 p) {
    vec3 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float n = i.x + i.y * 57.0 + i.z * 113.0;
    return mix(mix(mix(hash(n), hash(n + 1.0), f.x),
                   mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),
               mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
                   mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
}

float fbm(vec3 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 3; i++) {
        v += a * noise(p);
        p = p * 2.1 + vec3(1.7, 1.2, 0.8);
        a *= 0.5;
    }
    return v;
}

float noise2D(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash2(i), b = hash2(i + vec2(1.0, 0.0));
    float c = hash2(i + vec2(0.0, 1.0)), d = hash2(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// ─── Album art sampling ─────────────────────────────────────────────────────
float albumLuma(vec2 uv) {
    return dot(texture2D(u_albumArt, fract(uv)).rgb, vec3(0.299, 0.587, 0.114));
}
vec3 albumColor(vec2 uv) {
    return texture2D(u_albumArt, fract(uv)).rgb;
}

// ─── Configuration object — seed-driven per session ─────────────────────────
struct Config {
    float cameraStyle;
    float biomeBlend;
    float foldCount;
    float twistRate;
    float colorShift;
    float architectScale;
    float organicRate;
    float crystalDensity;
};

Config getConfig() {
    Config c;
    float s = u_seed;
    c.cameraStyle = hash(s * 127.1);
    c.biomeBlend = 0.3 + hash(s * 311.7) * 0.7;
    c.foldCount = 3.0 + floor(hash(s * 74.7) * 5.0);
    c.twistRate = 0.05 + hash(s * 246.1) * 0.15;
    c.colorShift = hash(s * 183.3) * TAU;
    c.architectScale = 1.5 + hash(s * 124.6) * 2.0;
    c.organicRate = 0.3 + hash(s * 531.2) * 0.7;
    c.crystalDensity = 0.5 + hash(s * 97.3) * 0.5;
    return c;
}

// ─── Cinematic camera system ────────────────────────────────────────────────
vec3 camPos(float t, Config cfg) {
    float st = t * 0.08;
    float s = u_seed * TAU;

    // ALWAYS forward at constant speed
    float z = t * 0.5;

    // XY: small gentle sway that stays WITHIN the safe corridor (radius < 0.5)
    vec3 pos = vec3(
        sin(st * 0.7 + s) * 0.3 + sin(st * 0.3 + s * 2.1) * 0.15,
        cos(st * 0.5 + s * 0.7) * 0.25 + sin(st * 0.2 + s * 1.3) * 0.1,
        z
    );

    return pos;
}

vec3 cameraTarget(float t, Config cfg) {
    float st = t * 0.08;
    float s = u_seed * TAU;
    float z = t * 0.5;
    // Look ahead — always forward, slight lead on the path
    vec3 target = vec3(
        sin((st + 1.0) * 0.7 + s) * 0.3 + sin((st + 1.0) * 0.3 + s * 2.1) * 0.15,
        cos((st + 1.0) * 0.5 + s * 0.7) * 0.25 + sin((st + 1.0) * 0.2 + s * 1.3) * 0.1,
        z + 3.0
    );
    return target;
}

// ─── SDF Primitives ─────────────────────────────────────────────────────────
float sdBox(vec3 p, vec3 b) {
    vec3 d = abs(p) - b;
    return length(max(d, 0.0)) + min(max(d.x, max(d.y, d.z)), 0.0);
}
float sdSphere(vec3 p, float r) { return length(p) - r; }
float sdTorus(vec3 p, vec2 t) {
    vec2 q = vec2(length(p.xz) - t.x, p.y);
    return length(q) - t.y;
}
float sdOctahedron(vec3 p, float s) {
    p = abs(p);
    return (p.x + p.y + p.z - s) * 0.57735027;
}
float sdCappedCylinder(vec3 p, float h, float r) {
    vec2 d = abs(vec2(length(p.xz), p.y)) - vec2(r, h);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}
float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * 0.25;
}

// ─── Biome 1: Infinite Crystal Cathedral ────────────────────────────────────
float crystalCathedral(vec3 p, Config cfg) {
    float artVal = albumLuma(vec2(u_seed * 3.0, length(p) * 0.05));
    float artVal2 = albumLuma(vec2(p.z * 0.02, p.x * 0.02));
    float angle = PI / cfg.foldCount;

    for (int i = 0; i < 4; i++) {
        p.xy *= rot(angle + float(i) * 0.1 * artVal);
        p.xy = abs(p.xy);
        p.xz *= rot(angle * 0.7 + artVal2 * PI * 0.5 + u_time * 0.005 * cfg.organicRate);
        p.xz = abs(p.xz);
        float sc = 1.5 + artVal * 0.2;
        p = p * sc - vec3(1.5 + artVal * 0.3, 1.2, 1.8);
        p.yz *= rot(0.2 + artVal2 * 0.3);
    }

    float crystal = sdBox(p, vec3(0.8, 0.4, 1.6)) / 32.0;
    float beam = sdCappedCylinder(p.xzy, 3.0, 0.22) / 32.0;
    return min(crystal, beam);
}

// ─── Biome 2: Living Membrane ───────────────────────────────────────────────
float livingMembrane(vec3 p, Config cfg) {
    float artVal = albumLuma(vec2(p.x * 0.05 + u_time * 0.003, p.z * 0.05));
    float artVal2 = albumLuma(vec2(p.z * 0.03 + u_seed, p.y * 0.05));

    float twist = p.z * cfg.twistRate * 2.0 + artVal * 1.5;
    p.xy *= rot(twist);

    float r = length(p.xy);
    float a = atan(p.y, p.x);
    float breathe = 1.8 + sin(u_time * cfg.organicRate * 0.3 + p.z * 0.4) * 0.3 + artVal * 0.5;
    float starN = 3.0 + floor(artVal2 * 5.0);
    float modulation = 1.0 + sin(a * starN + p.z * 0.5 + u_time * 0.05) * 0.25;

    float membrane = abs(r - breathe * modulation) - 0.1;
    float veins = abs(sin(a * 8.0 + p.z * 3.0 + u_time * 0.1) * cos(p.z * 4.0 + a * 3.0)) - 0.04;
    float inner = abs(r - breathe * 0.3 * modulation) - 0.05;

    return smin(membrane, min(veins * 0.3 + 0.15, inner), 0.2);
}

// ─── Biome 3: Escher Architecture ──────────────────────────────────────────
float escherArchitecture(vec3 p, Config cfg) {
    float artVal = albumLuma(vec2(p.z * 0.003 + u_seed, u_seed * 2.0));

    float w = sin(u_time * 0.015 + p.z * 0.01) * PI;
    p.xz *= rot(w * 0.3);
    p.yz *= rot(w * 0.2 + artVal);

    float d = 1e10;
    float s = 1.0;
    vec3 q = p;

    for (int i = 0; i < 4; i++) {
        q = abs(q);
        if (q.x < q.y) q.xy = q.yx;
        if (q.x < q.z) q.xz = q.zx;
        if (q.y < q.z) q.yz = q.zy;

        float sc = cfg.architectScale + artVal * 0.3;
        vec3 offset = vec3(1.0 + artVal * 0.3, 1.0, 1.0 + (1.0 - artVal) * 0.3);
        q = q * sc - offset * (sc - 1.0);
        s *= sc;

        float cross1 = max(abs(q.x), abs(q.y));
        float cross2 = max(abs(q.y), abs(q.z));
        float cross3 = max(abs(q.x), abs(q.z));
        float beam = min(cross1, min(cross2, cross3)) / s - 0.4 / s;
        d = min(d, beam);
    }

    float platforms = sdBox(mod(p + 3.0, 6.0) - 3.0, vec3(2.0, 0.06, 2.0));
    return min(d, platforms * 0.5);
}

// ─── Biome 4: Spectral Void ────────────────────────────────────────────────
float spectralVoid(vec3 p, Config cfg) {
    // Use noise warp but cheaper (fewer octaves already in fbm)
    vec3 warp = vec3(noise(p * 0.4 + u_time * 0.008), noise(p * 0.4 + 100.0 + u_time * 0.006), noise(p * 0.4 + 200.0 + u_time * 0.01));
    p += warp * 1.5;

    float filament1 = abs(sin(p.x * 0.5 + p.z * 0.3 + u_time * 0.03) * cos(p.y * 0.4 + u_time * 0.025)) - 0.12;
    float filament2 = abs(sin(p.y * 0.6 + p.x * 0.2 + u_time * 0.025) * cos(p.z * 0.5 + u_time * 0.02)) - 0.1;

    float r = length(p);
    float shells = abs(sin(r * 0.8 - u_time * 0.06)) - 0.3;

    float artVal = albumLuma(vec2(atan(p.y, p.x) / TAU + 0.5, p.z * 0.01));
    float nodes = sdSphere(mod(p + 4.0, 8.0) - 4.0, 0.5 + artVal * 0.6);

    float d = min(filament1, filament2);
    d = smin(d, shells * 0.5, 0.5);
    d = smin(d, nodes * 0.3, 0.3);
    return d;
}

// ─── Biome 5: Tesseract Lattice ─────────────────────────────────────────────
float tesseractLattice(vec3 p, Config cfg) {
    float artVal = albumLuma(vec2(u_seed + p.z * 0.01, p.x * 0.01));

    // Very slow, subtle rotation — NOT sideways movement
    float t4 = u_time * 0.008 + u_seed * TAU;
    p.xz *= rot(t4 + artVal * 0.5);
    p.xy *= rot(t4 * 0.3);

    float cellSize = cfg.architectScale * 1.5;
    vec3 id = floor(p / cellSize);
    vec3 rp = mod(p, cellSize) - cellSize * 0.5;
    float h = hash(dot(id, vec3(127.1, 311.7, 74.7)));

    float box = sdBox(rp, vec3(0.7 + h * 0.3));
    float oct = sdOctahedron(rp, 0.9 + h * 0.4);
    float tor = sdTorus(rp, vec2(0.7 + h * 0.3, 0.15));

    float d = mix(box, oct, smoothstep(0.3, 0.7, h));
    d = mix(d, tor, smoothstep(0.6, 0.9, fract(h * 7.13)));

    // Connecting beams
    float beamX = sdCappedCylinder(rp.yzx, cellSize * 0.5, 0.04);
    float beamY = sdCappedCylinder(rp.xzy, cellSize * 0.5, 0.04);
    float beamZ = sdCappedCylinder(rp, cellSize * 0.5, 0.04);

    return min(d, min(beamX, min(beamY, beamZ)));
}

// ─── Master SDF ─────────────────────────────────────────────────────────────
float map(vec3 p) {
    Config cfg = getConfig();

    // Biome selector: driven by rhythm changes (u_biomePhase from TS)
    float selector = u_biomePhase + u_seed * 5.0;
    float blend = fract(selector);
    blend = smoothstep(0.0, 1.0, blend);
    int biomeA = int(mod(floor(selector), 5.0));
    int biomeB = int(mod(floor(selector) + 1.0, 5.0));

    // Use repeating space so geometry always surrounds the camera
    vec3 rp = mod(p + 4.0, 8.0) - 4.0;

    // Evaluate only 2 biomes (current + next)
    float dA = 1.0, dB = 1.0;

    if (biomeA == 0) dA = crystalCathedral(rp, cfg);
    else if (biomeA == 1) dA = livingMembrane(rp, cfg);
    else if (biomeA == 2) dA = escherArchitecture(rp, cfg);
    else if (biomeA == 3) dA = spectralVoid(rp, cfg);
    else dA = tesseractLattice(rp, cfg);

    if (biomeB == 0) dB = crystalCathedral(rp, cfg);
    else if (biomeB == 1) dB = livingMembrane(rp, cfg);
    else if (biomeB == 2) dB = escherArchitecture(rp, cfg);
    else if (biomeB == 3) dB = spectralVoid(rp, cfg);
    else dB = tesseractLattice(rp, cfg);

    float d = mix(dA, dB, blend);

    // Soft corridor: gently push geometry away from camera center
    // Not a hard cut — objects smoothly fade/move outward near the path
    float corridorDist = length(rp.xy);
    float corridorPush = smoothstep(1.5, 0.3, corridorDist) * 0.5;
    d += corridorPush;

    return d;
}

// ─── Normal ─────────────────────────────────────────────────────────────────
vec3 getNormal(vec3 p) {
    vec2 e = vec2(SURF_DIST * 2.0, 0.0);
    return normalize(vec3(map(p + e.xyy) - map(p - e.xyy), map(p + e.yxy) - map(p - e.yxy), map(p + e.yyx) - map(p - e.yyx)));
}

// ─── Ambient Occlusion ──────────────────────────────────────────────────────
float ao(vec3 p, vec3 n) {
    float occ = 0.0, sca = 1.0;
    for (int i = 0; i < 5; i++) {
        float h = 0.01 + 0.12 * float(i);
        occ += (h - map(p + h * n)) * sca;
        sca *= 0.7;
    }
    return clamp(1.0 - 3.0 * occ, 0.0, 1.0);
}

// ─── Soft shadows ───────────────────────────────────────────────────────────
float softShadow(vec3 ro, vec3 rd, float mint, float maxt, float k) {
    float res = 1.0, t = mint;
    for (int i = 0; i < 24; i++) {
        float h = map(ro + rd * t);
        res = min(res, k * h / t);
        t += clamp(h, 0.02, 0.5);
        if (res < 0.001 || t > maxt) break;
    }
    return clamp(res, 0.0, 1.0);
}

// ─── Iridescence ────────────────────────────────────────────────────────────
vec3 iridescence(float cosTheta, float thickness) {
    float offset = thickness * 2.0 + u_time * 0.01;
    return 0.5 + 0.5 * cos(TAU * (cosTheta * 1.5 + offset + vec3(0.0, 0.33, 0.67)));
}

// ─── Volumetric god rays ────────────────────────────────────────────────────
vec3 godRays(vec3 ro, vec3 rd, float tMax) {
    vec3 col = vec3(0.0);
    float dt = tMax / 16.0;
    float t = dt * hash2(gl_FragCoord.xy + u_time);
    for (int i = 0; i < 16; i++) {
        vec3 p = ro + rd * t;
        float density = max(0.0, 0.3 - map(p)) * 2.0;
        vec3 rayCol = mix(u_colors[0], u_colors[1], sin(t * 0.3 + u_time * 0.1) * 0.5 + 0.5);
        rayCol = mix(rayCol, u_colors[2], sin(t * 0.5 + u_time * 0.15) * 0.5 + 0.5);
        col += rayCol * density * dt * 0.3;
        t += dt;
        if (t > tMax) break;
    }
    return col;
}

// ─── Stars ──────────────────────────────────────────────────────────────────
vec3 stars(vec3 rd) {
    vec3 p = rd * 400.0;
    vec3 id = floor(p);
    vec3 fp = fract(p) - 0.5;
    vec3 h = hash33(id);
    float star = step(0.975, h.x) * pow(max(0.0, 1.0 - length(fp) * 3.0), 10.0);
    vec3 starCol = mix(vec3(0.8, 0.9, 1.0), u_colors[1], h.y);
    star *= 0.7 + 0.3 * sin(u_time * (2.0 + h.z * 4.0) + h.x * 100.0);
    return starCol * star * 3.0;
}

// ─── Chromatic dispersion ───────────────────────────────────────────────────
vec3 dispersion(vec3 rd, vec3 n, float ior) {
    vec3 r = refract(rd, n, 1.0 / ior);
    vec3 g = refract(rd, n, 1.0 / (ior + 0.01));
    vec3 b = refract(rd, n, 1.0 / (ior + 0.02));
    return vec3(dot(r, r), dot(g, g), dot(b, b));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - u_resolution * 0.5) / u_resolution.y;
    Config cfg = getConfig();

    float speed = 0.8;
    float T = u_time * speed + u_seed * 200.0;

    // ─── Camera ─────────────────────────────────────────────────────────────
    vec3 ro = camPos(T, cfg);
    vec3 target = cameraTarget(T, cfg);

    vec2 shake = vec2(sin(T * 7.0) * u_beat * 0.008, cos(T * 5.0) * u_beat * 0.006);
    float roll = sin(T * 0.015 + u_seed * 10.0) * 0.06;

    vec3 fwd = normalize(target - ro);
    vec3 worldUp = vec3(sin(roll), cos(roll), 0.0);
    vec3 right = normalize(cross(worldUp, fwd));
    vec3 up = cross(fwd, right);

    float fov = 1.0 + u_beat * 0.2 + u_energy * 0.1;
    vec3 rd = normalize((uv.x + shake.x) * right + (uv.y + shake.y) * up + fov * fwd);

    // ─── Raymarching ────────────────────────────────────────────────────────
    float t = 0.0, d = 0.0, glow = 0.0, minDist = 1e10;

    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * t;
        d = map(p);
        minDist = min(minDist, d);
        glow += 0.01 / (0.05 + d * d * 3.0);
        if (d < SURF_DIST || t > MAX_DIST) break;
        t += d * 0.95;
    }

    vec3 color = vec3(0.0);

    if (d < SURF_DIST * 2.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        // Album art surface
        vec2 artUV = fract(p.xz * 0.02 + n.xy * 0.1 + u_time * 0.002);
        vec3 albedo = albumColor(artUV);

        // Cinematic lighting (no shadow rays — too expensive)
        vec3 light1Dir = normalize(vec3(sin(T * 0.1), 0.8, cos(T * 0.07)));
        vec3 light2Dir = normalize(vec3(-sin(T * 0.08), -0.3, cos(T * 0.12)));

        float diff1 = max(dot(n, light1Dir), 0.0);
        float diff2 = max(dot(n, light2Dir), 0.0) * 0.4;
        float rim = pow(1.0 - max(dot(n, -rd), 0.0), 4.0);

        vec3 halfVec = normalize(light1Dir - rd);
        float spec = pow(max(dot(n, halfVec), 0.0), 80.0);
        float fresnel = pow(1.0 - abs(dot(n, -rd)), 3.0);

        vec3 irid = iridescence(dot(n, -rd), length(p) * 0.1 + cfg.colorShift);

        vec3 refl = reflect(rd, n);
        vec3 envColor = albumColor(fract(refl.xz * 0.05 + refl.y * 0.03 + u_time * 0.001)) * 0.8 + u_colors[1] * 0.2;

        color = albedo * (diff1 * 0.6 + diff2 * 0.2 + 0.15) * u_colors[0] * 2.0;
        color += u_colors[1] * spec * 0.5;
        color += envColor * fresnel * 0.4;
        color += u_colors[2] * rim * (0.3 + u_energy * 0.5);
        color += irid * fresnel * 0.2;

        // SSS
        float sss = max(0.0, dot(rd, light1Dir)) * 0.2;
        color += mix(u_colors[0], u_colors[2], 0.5) * sss * albedo;

        color += u_colors[2] * u_beat * 0.12 * (1.0 - fresnel);
        color += u_colors[1] * u_lyricsActive * u_lyricsProgress * 0.05;

        // Fog
        float fog = 1.0 - exp(-t * 0.05);
        color = mix(color, mix(u_colors[0] * 0.3, u_colors[1] * 0.2, fog), fog * 0.6);
    }

    // ─── Background ─────────────────────────────────────────────────────────
    vec3 bg = stars(rd);
    float nebula = fbm(rd * 3.0 + u_time * 0.01);
    bg += mix(u_colors[0], u_colors[2], nebula) * nebula * 0.15 * u_energy;
    bg += albumColor(fract(rd.xz * 0.04 + u_time * 0.001)) * 0.06 * pow(1.0 - abs(rd.y), 4.0);
    if (d >= SURF_DIST * 2.0) color = bg;

    // ─── Volumetric (cheap glow only, no god rays) ────────────────────────────
    vec3 glowColor = mix(u_colors[1], u_colors[2], sin(T * 0.3) * 0.5 + 0.5);
    color += glowColor * glow * (0.06 + u_rms * 0.08);
    color += mix(u_colors[0], u_colors[1], 0.5) * exp(-minDist * 5.0) * 0.3 * u_energy;

    // Beat effects
    color += u_colors[2] * u_beat * 0.06;
    if (u_beat > 0.2) {
        float speedLine = smoothstep(0.5, 1.0, length(uv));
        speedLine *= smoothstep(0.8, 1.0, abs(sin(atan(uv.y, uv.x) * 20.0 + T)));
        color += u_colors[1] * speedLine * u_beat * 0.15;
    }

    // Line break flash
    color += vec3(1.0) * u_lineBreak * 0.04;

    // Adlib shimmer
    if (u_adlib > 0.1) {
        float shimmer = sin(uv.x * 50.0 + u_time * 3.0) * sin(uv.y * 50.0 + u_time * 2.7);
        color += u_colors[2] * smoothstep(0.7, 1.0, shimmer) * u_adlib * 0.08;
    }

    // ─── Post ───────────────────────────────────────────────────────────────
    color *= 1.0 - dot(uv, uv) * 0.4;

    float caStr = length(uv) * 0.003 * (1.0 + u_beat * 2.0);
    color.r *= 1.0 + uv.x * caStr * 0.5;
    color.b *= 1.0 - uv.x * caStr * 0.5;

    // ACES tonemap
    color = color * (2.51 * color + 0.03) / (color * (2.43 * color + 0.59) + 0.14);

    // Color grading
    float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
    color = mix(mix(color, u_colors[0] * luma, 0.1), mix(color, u_colors[1] * luma + color, 0.05), smoothstep(0.3, 0.7, luma));

    // Film grain (stable — quantized time)
    color += (hash2(gl_FragCoord.xy + floor(u_time * 24.0) * 137.0) - 0.5) * 0.01;

    // ─── DEBUG OVERLAY (commented out) ────────────────────────────────────────
    /*
    if (vUv.y < 0.04) {
        Config dbgCfg = getConfig();
        float biomeTime = u_time * 0.025 + u_seed * 17.0;
        float selector = mod(biomeTime, 5.0);
        float blend = fract(selector);
        float biomeAid = mod(floor(selector), 5.0);
        float biomeBid = mod(floor(selector) + 1.0, 5.0);

        float x = vUv.x;
        vec3 dbg = vec3(0.0);

        // Bar 1 (0.0-0.15): Biome A ID (color-coded)
        if (x < 0.15) {
            dbg = vec3(biomeAid / 5.0, 1.0 - biomeAid / 5.0, fract(biomeAid * 0.4));
        }
        // Bar 2 (0.15-0.30): Biome B ID
        else if (x < 0.30) {
            dbg = vec3(biomeBid / 5.0, 1.0 - biomeBid / 5.0, fract(biomeBid * 0.4));
        }
        // Bar 3 (0.30-0.50): Blend factor (white = transitioning)
        else if (x < 0.50) {
            dbg = vec3(blend);
        }
        // Bar 4 (0.50-0.65): Ray distance (how far we traveled)
        else if (x < 0.65) {
            dbg = vec3(t / MAX_DIST, 0.0, 0.0);
        }
        // Bar 5 (0.65-0.80): Hit or miss (green=hit, red=miss)
        else if (x < 0.80) {
            dbg = d < SURF_DIST * 2.0 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
        }
        // Bar 6 (0.80-1.0): Camera Z position (cycling)
        else {
            float speed2 = 0.6 + u_energy * 0.4;
            float T2 = u_time * speed2 + u_seed * 200.0;
            dbg = vec3(fract(T2 * 0.01), fract(T2 * 0.005), u_energy);
        }
        color = dbg;
    }
    */

    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
