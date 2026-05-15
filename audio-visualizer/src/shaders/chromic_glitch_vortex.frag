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

varying vec2 vUv;

#define PI 3.14159265359
#define MAX_STEPS 60
#define MAX_DIST 20.0
#define SURF_DIST 0.002

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

// ─── Hash functions ─────────────────────────────────────────────────────────
float hash21(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

vec3 hash33(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
             dot(p, vec3(269.5, 183.3, 246.1)),
             dot(p, vec3(113.5, 271.9, 124.6)));
    return fract(sin(p) * 43758.5453);
}

// ─── Discrete time hash per block ───────────────────────────────────────────
// Each block has its own "corrupted" time offset
float blockTime(vec3 blockId) {
    float h = hash21(blockId.xy + blockId.z * 17.3);
    // Bass increases temporal desync between blocks
    float timeDelay = h * u_bass * 2.0;
    return u_time - timeDelay;
}

// ─── SDF: glitched geometry per block ───────────────────────────────────────
float sdBox(vec3 p, vec3 b) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

// Camera path for safe zone calculation
vec2 camPath(float z) {
    float speed = u_time * 0.6 + u_energy * u_time * 0.15;
    return vec2(sin(speed * 0.2) * 2.5, cos(speed * 0.15) * 1.5);
}

float map(vec3 p) {
    // Block size — more spacing between elements
    float blockSize = 1.2 + u_mid * 0.4;

    // Quantize space into discrete blocks
    vec3 blockId = floor(p / blockSize);
    vec3 blockPos = fract(p / blockSize) - 0.5; // local coords [-0.5, 0.5]

    // Per-block properties from hash
    vec3 h = hash33(blockId);
    float bt = blockTime(blockId);

    // Some blocks are "dead" (entropy decay)
    float alive = step(0.3, h.x + u_energy * 0.3);

    // Geometry inside block — phase-shifted by block's own time
    vec3 q = blockPos;
    q.xy *= rot(bt * (h.y - 0.5) * 2.0);
    q.yz *= rot(bt * (h.z - 0.5) * 1.5);

    // Mix of box and sphere based on hash — slightly smaller geometry
    float boxD = sdBox(q, vec3(0.25 + h.y * 0.12));
    float sphereD = length(q) - (0.2 + h.z * 0.12);
    float d = mix(boxD, sphereD, h.x) * blockSize;

    // Inactive blocks pushed far away
    d = mix(10.0, d, alive);

    // "Corruption": subtle block shifts on strong beats only
    float glitchStrength = u_beat * 0.15 + u_treble * 0.05;
    vec3 glitchOff = (h - 0.5) * glitchStrength;
    // Re-evaluate with offset on strong beats
    if (u_beat > 0.3) {
        vec3 q2 = blockPos + glitchOff;
        q2.xy *= rot(bt * (h.y - 0.5) * 3.0);
        float gd = mix(sdBox(q2, vec3(0.2)), length(q2) - 0.18, h.x) * blockSize;
        d = mix(d, gd, u_beat);
    }

    // Safe zone: ensure minimum distance near origin of each block
    // This prevents camera from spawning inside geometry
    d = max(d, length(blockPos) * blockSize - blockSize * 0.48);

    return d;
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.001, -0.001);
    return normalize(
        e.xyy * map(p + e.xyy) +
        e.yyx * map(p + e.yyx) +
        e.yxy * map(p + e.yxy) +
        e.xxx * map(p + e.xxx)
    );
}

float glowAccum = 0.0;

float raymarch(vec3 ro, vec3 rd) {
    float t = 0.05; // Start slightly ahead to avoid spawning inside geometry
    glowAccum = 0.0;
    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);
        // Ensure d is never negative (stuck inside)
        d = max(d, 0.001);
        glowAccum += exp(-d * 5.0) * 0.01;
        if (d < SURF_DIST) return t;
        if (t > MAX_DIST) break;
        t += d * 0.9;
    }
    return -1.0;
}

// ─── Scanline / glitch overlay ──────────────────────────────────────────────
vec3 scanlineEffect(vec2 uv, vec3 col) {
    // Subtle scanlines
    float scan = sin(uv.y * u_resolution.y * 1.5) * 0.5 + 0.5;
    col *= 0.95 + 0.05 * scan;

    // Occasional horizontal shift (only on strong beats)
    float barY = fract(u_time * 0.5 + u_beat * 1.5);
    float bar = smoothstep(0.0, 0.03, abs(uv.y - barY + 0.5));
    float shift = (1.0 - bar) * u_beat * 0.02;
    col.r = mix(col.r, col.g, shift * 3.0);

    return col;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

    // Camera — smooth cinematic flight through the grid
    float speed = u_time * 0.6 + u_energy * u_time * 0.15;
    vec3 ro = vec3(sin(speed * 0.2) * 2.5, cos(speed * 0.15) * 1.5, speed);
    ro.x += sin(u_time * 0.8) * u_beat * 0.08;
    ro.y += cos(u_time * 0.7) * u_beat * 0.06;

    vec3 lookAt = ro + vec3(sin(u_time * 0.08) * 0.3, cos(u_time * 0.06) * 0.2, 3.0);
    vec3 fwd = normalize(lookAt - ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
    vec3 up = cross(fwd, right);

    // Gentle camera roll on beat
    float roll = u_beat * 0.04;
    vec2 ruv = uv;
    ruv = vec2(ruv.x * cos(roll) - ruv.y * sin(roll),
               ruv.x * sin(roll) + ruv.y * cos(roll));

    float fov = 1.0 + u_bass * 0.2;
    vec3 rd = normalize(ruv.x * right + ruv.y * up + fov * fwd);

    // Raymarch
    float t = raymarch(ro, rd);

    // Background: dark digital void
    vec3 bg = u_colors[0] * 0.04;
    // Grid pattern in background
    vec2 gridUv = fract(uv * 8.0 + u_time * 0.1);
    float grid = smoothstep(0.02, 0.0, min(gridUv.x, gridUv.y));
    bg += u_colors[1] * grid * 0.05;

    vec3 col = bg;

    if (t > 0.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        // Block ID for coloring
        float blockSize = 0.8 + u_mid * 0.5;
        vec3 blockId = floor(p / blockSize);
        vec3 h = hash33(blockId);

        // Per-block color from palette
        float colorIdx = fract(h.x + h.y * 0.5);
        vec3 surfColor;
        float seg = colorIdx * 2.0;
        if (seg < 1.0) {
            surfColor = mix(u_colors[0] * 2.0, u_colors[1], seg);
        } else {
            surfColor = mix(u_colors[1], u_colors[2], seg - 1.0);
        }

        // Flat-ish lighting (digital aesthetic)
        vec3 lightDir = normalize(vec3(0.5, 1.0, -0.5));
        float diff = max(dot(n, lightDir), 0.0);
        float spec = pow(max(dot(reflect(-lightDir, n), -rd), 0.0), 16.0);

        col = surfColor * (0.3 + diff * 0.6);
        col += spec * u_colors[2] * 0.5;

        // Edge highlight (block borders glow)
        vec3 localP = fract(p / blockSize);
        float edge = 1.0 - smoothstep(0.0, 0.08, min(min(localP.x, 1.0 - localP.x),
                                                        min(localP.y, 1.0 - localP.y)));
        col += u_colors[2] * edge * 0.4;

        // Fresnel
        float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
        col += u_colors[1] * fresnel * 0.3;
    }

    // Volumetric glow
    col += glowAccum * mix(u_colors[1], u_colors[2], 0.5) * (u_rms + 0.3);

    // Scanline + glitch overlay
    col = scanlineEffect(uv, col);

    // Beat flash (subtle)
    col += vec3(0.9, 1.0, 0.95) * u_beat * 0.08;

    // Vignette (harsh, digital)
    float vig = 1.0 - 0.5 * pow(length(uv), 2.5);
    col *= vig;

    // Tone map
    col = col / (col + vec3(1.0));
    col = pow(col, vec3(0.92));

    gl_FragColor = vec4(col, 1.0);
}

