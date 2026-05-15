precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;

varying vec2 vUv;
vec3 orbitTrap;

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float smax(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(a, b, h) + k * h * (1.0 - h);
}

float map(vec3 p) {
    // 1. Динамічна траєкторія
    float pathX = sin(p.z * 0.4 + u_time) * 1.2;
    float pathY = cos(p.z * 0.3 + u_time * 0.5) * 0.8;
    p.x += pathX;
    p.y += pathY;

    p.xy *= rot(p.z * 0.1);

    vec3 q = p;
    float zSize = 4.0;
    q.z = mod(q.z, zSize) - zSize * 0.5;

    float scale = 1.0;
    orbitTrap = vec3(10.0);

    vec3 nodeGrowth = vec3(
        0.5 + u_bass * 0.8,
        0.7 + u_rms * 0.5,
        0.9 + u_treble * 0.4
    );

    for (int i = 0; i < 6; i++) {
        q = abs(q) - nodeGrowth;

        if (q.x < q.y) q.xy = q.yx;
        if (q.x < q.z) q.xz = q.zx;
        if (q.y < q.z) q.yz = q.zy;

        float r2 = dot(q, q);
        float k = (1.7 + u_rms * 0.25) / clamp(r2, 0.1, 2.0);
        q *= k;
        scale *= k;

        q.xy *= rot(0.3 + u_time * 0.01);
        orbitTrap = min(orbitTrap, abs(q));
    }

    float shapes = (length(q.xz) - 0.2) / abs(scale);

    // Вужча печера — ноди заповнюють центр
    float cavernRadius = 1.8 - u_bass * 0.5;
    float cavern = -(length(p.xy) - cavernRadius);

    // smax для м'ясистого переходу
    return smax(shapes, cavern, 0.5);
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.005, -0.005);
    return normalize(e.xyy * map(p + e.xyy) + e.yyx * map(p + e.yyx) + e.yxy * map(p + e.yxy) + e.xxx * map(p + e.xxx));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    if (u_debug) {
        if (uv.y > 0.9) {
            if (uv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; }
            if (uv.x < 0.3)  { gl_FragColor = vec4(u_colors[1], 1.0); return; }
            gl_FragColor = vec4(u_colors[2], 1.0); return;
        }
    }

    vec3 ro = vec3(0.0, 0.0, u_time * 6.0);
    vec3 rd = normalize(vec3(uv, 1.2));

    float t = 0.0, d = 0.0;
    for (int i = 0; i < 50; i++) {
        d = map(ro + rd * t);
        if (d < 0.002 || t > 25.0) break;
        t += d * 0.7;
    }

    vec3 col = u_colors[0] * 0.03;

    if (t < 25.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        float diff = max(dot(n, vec3(0.4, 0.6, -0.4)), 0.0);
        float fres = pow(1.0 - max(dot(n, -rd), 0.0), 4.0);

        vec3 objCol = mix(u_colors[1], u_colors[2], fract(orbitTrap.z * 0.4 + t * 0.1));

        col = objCol * (diff + 0.1);
        col += fres * u_colors[1] * u_bass;

        // Гроза всередині маси
        float glow = exp(-d * 30.0) * u_rms;
        col += u_colors[2] * glow * 1.5;

        col *= exp(-t * 0.08);
    }

    col = mix(col, u_colors[0] * 0.05, smoothstep(5.0, 25.0, t));

    col = smoothstep(-0.1, 1.1, col);
    gl_FragColor = vec4(pow(col, vec3(0.85)), 1.0);
}
