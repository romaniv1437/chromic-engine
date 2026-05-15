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

#define MAX_STEPS 55
#define MAX_DIST 45.0
#define SURF_DIST 0.005

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float hash11(float p) {
    return fract(sin(p * 127.1) * 43758.5453);
}

// Camera path — gentle spiral
vec2 path(float z) {
    return vec2(sin(z * 0.12) * 2.0, cos(z * 0.08) * 1.2);
}

// ─── BIOME 1: Menger Sponge ────────────────────────────────────────────────
float de_menger(vec3 p, float audio) {
    float d = length(max(abs(p) - 1.0, 0.0));
    float s = 1.0;
    for (int i = 0; i < 3; i++) {
        vec3 a = mod(p * s, 2.0) - 1.0;
        s *= 3.0;
        vec3 v = 1.0 - 3.0 * abs(a);
        d = max(d, max(v.x, max(v.y, v.z)) / s);
    }
    return d - audio * 0.05;
}

// ─── BIOME 2: KIFS Crystal ─────────────────────────────────────────────────
float de_kifs(vec3 p, float audio) {
    float s = 1.0;
    for (int i = 0; i < 3; i++) {
        p = abs(p) - vec3(1.2, 0.8, 1.0);
        p.xy *= rot(0.5 + audio * 0.1);
        p.yz *= rot(0.3);
        float sc = 1.7;
        p *= sc;
        s *= sc;
    }
    return (length(p) - 0.6) / s;
}

// ─── BIOME 3: Apollonian Gasket ─────────────────────────────────────────────
float de_apollonian(vec3 p, float audio) {
    float s = 1.0;
    for (int i = 0; i < 3; i++) {
        p = -1.0 + 2.0 * fract(0.5 + 0.5 * p);
        float r2 = dot(p, p);
        float k = (1.15 + audio * 0.3) / r2;
        p *= k;
        s *= k;
    }
    return 0.25 * abs(p.y) / s;
}

// ─── BIOME 4: Sierpinski Tetrahedron ────────────────────────────────────────
float de_sierpinski(vec3 p, float audio) {
    float scale = 1.0;
    float offset = 1.0 + audio * 0.2;
    for (int i = 0; i < 3; i++) {
        if (p.x + p.y < 0.0) p.xy = -p.yx;
        if (p.x + p.z < 0.0) p.xz = -p.zx;
        if (p.y + p.z < 0.0) p.yz = -p.zy;
        p = p * 2.0 - offset;
        scale *= 2.0;
    }
    return length(p) / scale - 0.01;
}

// Smooth max for tunnel carving
float smax(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (a - b) / k, 0.0, 1.0);
    return mix(b, a, h) + k * h * (1.0 - h);
}

float map(vec3 p) {
    vec2 center = path(p.z);
    vec3 q = p;
    q.xy -= center;

    // Distance from camera path center — safe corridor
    float distFromCenter = length(q.xy);

    // Biome cell — changes every 20 units along Z
    float cellSize = 20.0;
    // Use mod on the Z coordinate BEFORE floor to keep values bounded
    float wrappedZ = mod(p.z, cellSize * 50.0); // wraps every 1000 units
    float cellId = floor(wrappedZ / cellSize);
    float cellFract = fract(wrappedZ / cellSize);
    float genome = hash11(mod(cellId, 47.0)); // prime mod for better distribution
    float genomeNext = hash11(mod(cellId + 1.0, 47.0));

    // Local space for fractal — wrap Z to keep in bounded range
    vec3 lp = q;
    lp.z = mod(q.z, cellSize) - cellSize * 0.5; // local Z always in [-10, 10]
    lp.xy *= rot(wrappedZ * 0.04 + u_time * 0.08);

    // Audio-reactive parameters (clamped for stability)
    float bass = min(u_bass, 0.8);
    float treble = min(u_treble, 0.8);

    // Evaluate current biome fractal
    float d1;
    int biome = int(genome * 4.0);
    if (biome == 0) d1 = de_menger(lp * 0.35, bass);
    else if (biome == 1) d1 = de_kifs(lp * 0.3, treble);
    else if (biome == 2) d1 = de_apollonian(lp * 0.4, u_rms * 0.4);
    else d1 = de_sierpinski(lp * 0.3, bass);

    // Evaluate next biome fractal for crossfade
    float d2;
    int biomeNext = int(genomeNext * 4.0);
    if (biomeNext == 0) d2 = de_menger(lp * 0.35, bass);
    else if (biomeNext == 1) d2 = de_kifs(lp * 0.3, treble);
    else if (biomeNext == 2) d2 = de_apollonian(lp * 0.4, u_rms * 0.4);
    else d2 = de_sierpinski(lp * 0.3, bass);

    // Smooth biome crossfade at boundaries
    float fadeIn = smoothstep(0.0, 0.12, cellFract);
    float fadeOut = smoothstep(1.0, 0.88, cellFract);
    float biomePresence = fadeIn * fadeOut;

    float blend = smoothstep(0.75, 1.0, cellFract);
    float d = mix(d1, d2, blend);

    // Fade geometry at biome transitions
    d = mix(2.0, d, biomePresence);

    // Carve safe tunnel — camera always has clear corridor
    float tunnel = distFromCenter - (2.0 + bass * 0.4);
    d = max(d, -tunnel);

    return d;
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.006, 0.0);
    return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx)
    ));
}

// Thin film iridescence
vec3 thinFilm(float cosTheta) {
    return 0.5 + 0.5 * cos(6.28 * (cosTheta + vec3(0.0, 0.33, 0.67) + u_time * 0.15));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.y, u_resolution.x);

    // Smooth camera flight along path — moderate speed
    float speed = u_time * 2.0;
    vec3 ro = vec3(path(speed), speed);
    vec3 lookAt = vec3(path(speed + 2.0), speed + 2.0);

    vec3 fwd = normalize(lookAt - ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
    vec3 up = cross(fwd, right);

    float fov = 1.0 + u_bass * 0.15;
    vec3 rd = normalize(uv.x * right + uv.y * up + fov * fwd);
    // Gentle camera roll
    rd.xy *= rot(sin(u_time * 0.25) * 0.12);

    float t = 0.1, d;
    float glow = 0.0;

    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * t;
        d = map(p);
        glow += exp(-max(d, 0.0) * 3.5) * (0.015 + u_rms * 0.04);
        if (d < SURF_DIST || t > MAX_DIST) break;
        t += d * 0.8;
    }

    vec3 col = u_colors[0] * 0.015;

    vec3 c1 = (length(u_colors[1]) > 0.01) ? u_colors[1] : vec3(0.2, 0.5, 1.0);
    vec3 c2 = (length(u_colors[2]) > 0.01) ? u_colors[2] : vec3(1.0, 0.3, 0.6);

    if (t < MAX_DIST) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        // Biome-aware coloring
        float cellId = floor(mod(p.z, 1000.0) / 20.0);
        float genome = hash11(mod(cellId, 47.0));

        // Fresnel + iridescence
        float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 4.0);
        vec3 iri = thinFilm(fresnel + genome);

        // Biome color shift
        vec3 surfColor = mix(c1, c2, genome);

        // Obsidian glass material
        col = vec3(0.01);
        col += iri * fresnel * 2.0;
        col += surfColor * glow * 0.5;

        // Specular
        float spec = pow(max(dot(reflect(rd, n), fwd), 0.0), 40.0);
        col += spec * c2 * (1.0 + u_bass * 0.8);

        // Depth fog
        col *= exp(-0.04 * t);
    }

    // Volumetric glow
    col += mix(c1, c2, 0.5) * glow * (0.25 + u_beat * 0.4);

    // Beat flash
    col += c2 * pow(u_beat, 3.0) * 0.12;

    // Post-processing
    col = col / (col + vec3(1.0)); // Tone map
    col = pow(col, vec3(0.85));
    col *= 1.0 - 0.4 * dot(uv, uv); // Vignette

    gl_FragColor = vec4(col, 1.0);
}