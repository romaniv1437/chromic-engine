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

// Оптимізовані ліміти
#define MAX_STEPS 90
#define MAX_DIST 50.0
#define SURF_DIST 0.0015

// Швидкий поворот
mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float hash11(float p) {
    return fract(sin(p * 127.1) * 43758.5453);
}

vec2 path(float z) {
    return vec2(sin(z * 0.15) * 2.5, cos(z * 0.1) * 1.5);
}

float smax(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (a - b) / k, 0.0, 1.0);
    return mix(b, a, h) + k * h * (1.0 - h);
}

// Оптимізована 4D проекція
vec3 rot4d(vec3 p, float w, float angle) {
    float s = sin(angle), c = cos(angle);
    float nx = p.x * c - w * s;
    float nw = p.x * s + w * c;
    return vec3(nx, p.y + nw * 0.3, p.z);
}

float map(vec3 p) {
    vec2 p_offset = path(p.z);
    vec3 q = p;
    q.xy -= p_offset;

    // Safe audio values — generous minimums keep geometry alive without sound
    float _bass = max(u_bass, 0.35);
    float _mid = max(u_mid, 0.25);
    float _treble = max(u_treble, 0.15);
    float _rms = max(u_rms, 0.2);
    float _beat = u_beat;
    float _energy = max(u_energy, 0.3);

    float tunnel = length(q.xy) - (1.8 + _bass * 0.3 + _beat * 0.15);

    // Визначаємо біом один раз
    float cellSize = 8.0;
    float cellId = floor(p.z / cellSize);
    float genome = hash11(cellId);

    float discreteShift = hash11(floor(u_time * 2.2) + cellId) * 6.28;
    float w = u_time * 0.2 + _bass * 0.8;

    q = rot4d(q, w, u_time * 0.15 + genome * 3.14);
    q.xy *= rot(p.z * 0.1 + u_time * 0.15 + genome * 2.0);

    // KIFS - Fractal Core — shape reacts MORE to audio
    float s = 1.0;
    vec3 foldOff = mix(vec3(1.0), vec3(1.4, 0.8, 1.2), genome) + vec3(_bass * 0.2, _mid * 0.15, _treble * 0.1);
    float rAngle = mix(0.35, 0.65, genome) + _treble * 0.1 + _bass * 0.08;
    mat2 rMat = rot(rAngle + discreteShift * 0.1);
    float iterScale = mix(1.5, 1.8, genome) + _bass * 0.1 + _rms * 0.08;

    for (int i = 0; i < 5; i++) {
        q = abs(q) - foldOff;

        // Branchless sort
        if (q.x < q.y) q.xy = q.yx;
        if (q.x < q.z) q.xz = q.zx;

        q.xy *= rMat;
        q *= iterScale;
        s *= iterScale;
    }

    float shape = mix((length(q) - 0.6 - _rms * 0.2), ((abs(q.x) + abs(q.y) + abs(q.z)) * 0.577 - 0.8 - _beat * 0.15), genome) / s;

    // Columns — always active
    float columns = 1e5;
    {
        vec3 colQ = p;
        colQ.xy -= p_offset;
        float colGrid = max(abs(mod(colQ.x, 1.5) - 0.75), abs(mod(colQ.y, 1.5) - 0.75)) - 0.08;
        columns = max(colGrid, -(length(colQ.xy) - 1.2 - (_beat * 2.0 + _rms * 1.5)));
    }

    return smax(min(shape, columns), -tunnel, 0.8);
}

// Швидкі нормалі (менше викликів map)
vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.005, 0.0);
    return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx)
    ));
}

vec3 pal(float t) {
    return 0.5 + 0.5 * cos(6.28 * (t + vec3(0.0, 0.3, 0.6) + u_time * 0.08));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.y, u_resolution.x);

    // Audio with safe base levels (generous minimums — looks great without sound)
    float bass = max(u_bass, 0.35);
    float mid = max(u_mid, 0.25);
    float treble = max(u_treble, 0.15);
    float rms = max(u_rms, 0.2);
    float energy = max(u_energy, 0.3);
    float beat = u_beat;

    // Constant smooth speed — no beat jitter
    float speed = 3.5;
    float z = u_time * speed;
    vec3 ro = vec3(path(z), z);
    vec3 lookAt = vec3(path(z + 2.0), z + 2.0);

    vec3 fwd = normalize(lookAt - ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
    vec3 up = cross(fwd, right);

    // Minimal camera sway — smooth cinematic
    vec3 rd = normalize(uv.x * right + uv.y * up + 1.1 * fwd);
    rd.xy *= rot(sin(u_time * 0.15) * 0.06);

    float t = 0.0, d, glow = 0.0;
    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * t;
        d = map(p);
        glow += exp(-max(d, 0.0) * 3.5) * (0.025 + rms * 0.03);
        if (d < SURF_DIST || t > MAX_DIST) break;
        t += d * 0.8;
    }

    vec3 col = u_colors[0] * 0.08 + vec3(0.01); // Visible base even with dark palette
    if (t < MAX_DIST) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);
        float genome = hash11(floor(p.z / 8.0));

        float fres = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
        vec3 refr = pal(fres + p.z * 0.05 + genome);

        col = vec3(0.03) + refr * fres * 2.5;
        col += mix(u_colors[1], u_colors[2], genome) * (glow * 0.5 + 0.15);

        // Sharp spec
        col += pow(max(dot(reflect(rd, n), fwd), 0.0), 32.0) * u_colors[0] * (1.0 + bass);
        col *= exp(-0.025 * t);
    }

    col += pal(u_time * 0.1) * glow * (0.35 + beat * 0.3);
    col = smoothstep(-0.05, 1.1, col * 1.2);
    col *= 1.0 - length(uv) * 0.5; // Vignette

    gl_FragColor = vec4(col, 1.0);
}