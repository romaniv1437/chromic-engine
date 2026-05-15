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

float map(vec3 p) {
    // 1. Рух та викривлення
    p.xy *= rot(p.z * 0.1);
    p.x += sin(p.z * 0.4 + u_time) * 1.2;
    p.y += cos(p.z * 0.3 + u_time * 0.5) * 0.8;

    vec3 q = p;
    float zSize = 5.0;
    q.z = mod(q.z, zSize) - zSize * 0.5;

    float scale = 1.0;
    orbitTrap = vec3(10.0);

    // Динамічний ріст нод під трек
    vec3 nodeGrowth = vec3(
        0.8 + u_bass * 0.6,
        1.0 + u_rms * 0.4,
        1.2 + u_treble * 0.3
    );

    for (int i = 0; i < 5; i++) {
        q = abs(q) - nodeGrowth;

        float r2 = dot(q, q);
        float k = (1.85 + u_rms * 0.2) / clamp(r2, 0.15, 2.5);
        q *= k;
        scale *= k;

        q.xy *= rot(0.2 + u_time * 0.02 + float(i) * 0.1);
        orbitTrap = min(orbitTrap, abs(q));
    }

    float shapes = (length(q.xy) - 0.5) / scale;
    float cavern = -(length(p.xy) - (3.5 + u_bass));

    return max(shapes, cavern * 0.8);
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.01, -0.01);
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

    vec3 ro = vec3(0.0, 0.0, u_time * 7.0);
    vec3 rd = normalize(vec3(uv + (u_rms * 0.05 * sin(u_time)), 1.4));

    float t = 0.0, d = 0.0;
    for (int i = 0; i < 45; i++) {
        d = map(ro + rd * t);
        if (d < 0.003 || t > 35.0) break;
        t += d;
    }

    vec3 col = u_colors[0] * 0.05;

    if (t < 35.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        float diff = max(dot(n, vec3(0.5, 0.7, -0.5)), 0.0);
        float fres = pow(1.0 - max(dot(n, -rd), 0.0), 4.0);

        vec3 objCol = mix(u_colors[1], u_colors[2], fract(t * 0.1 + orbitTrap.y * 0.2));

        col = objCol * diff;
        col += fres * u_colors[1] * u_bass;

        // Гроза — спалахи під RMS
        float lightning = pow(u_rms, 3.0) * 2.0;
        col += u_colors[2] * lightning * exp(-d * 2.0);

        col *= exp(-t * 0.05);
    }

    // Туман
    col = mix(col, u_colors[0] * 0.1, smoothstep(5.0, 35.0, t));

    col = smoothstep(-0.1, 1.1, col);
    gl_FragColor = vec4(pow(col, vec3(0.8)), 1.0);
}
