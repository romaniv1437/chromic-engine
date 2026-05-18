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
    // 1. Динамічне викривлення тунелю
    p.xy *= rot(p.z * 0.1);
    p.x += sin(p.z * 0.4) * 0.5;

    vec3 q = p;
    float zStep = 10.0;
    q.z = mod(p.z, zStep) - zStep * 0.5;

    float scale = 1.0;
    orbitTrap = vec3(10.0);

    // Clamp audio for stability
    float safeBass = min(u_bass, 0.85);
    float safeMid = min(u_mid, 0.85);

    for (int i = 0; i < 6; i++) {
        q = abs(q) - vec3(0.8 + safeBass * 0.5, 1.0 + safeMid * 0.2, 1.2);

        float r2 = dot(q, q);
        float k = (1.6 + safeBass * 0.4) / clamp(r2, 0.15, 1.8);
        q *= k;
        scale *= k;

        q.xy *= rot(0.5 + u_time * 0.05);
        orbitTrap = min(orbitTrap, abs(q));
    }

    // Порожниста оболонка — можна залітати всередину
    float fractal = (abs(length(q.xy) - 0.5) - 0.1) / scale;

    // Стіни тунелю
    float tunnel = -(length(p.xy) - (4.0 + safeBass * 2.0));

    return max(fractal, tunnel * 0.5);
}

float getAO(vec3 p, vec3 n) {
    float occ = 0.0;
    float sca = 1.0;
    for (int i = 0; i < 4; i++) {
        float hr = 0.05 + 0.1 * float(i);
        float d = map(p + n * hr);
        occ += -(d - hr) * sca;
        sca *= 0.85;
    }
    return clamp(1.0 - 3.0 * occ, 0.0, 1.0);
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.005, -0.005);
    return normalize(e.xyy * map(p + e.xyy) + e.yyx * map(p + e.yyx) + e.yxy * map(p + e.yxy) + e.xxx * map(p + e.xxx));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    if (u_debug) {
        if (uv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; }
        else if (uv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; }
        else { gl_FragColor = vec4(u_colors[2], 1.0); return; }
    }

    float speed = u_time * 6.0 + min(u_rms, 0.8) * 3.0;
    vec3 ro = vec3(0.0, 0.0, speed);
    vec3 rd = normalize(vec3(uv, 1.2));

    // Похитування камери
    ro.x += sin(u_time * 0.5) * 0.5;
    ro.y += cos(u_time * 0.3) * 0.5;

    float t = 0.0, d = 0.0;
    for (int i = 0; i < 55; i++) {
        d = map(ro + rd * t);
        if (abs(d) < 0.001 || t > 40.0) break;
        t += d * 0.65;
    }

    vec3 skyCol = u_colors[0] * 0.05;
    vec3 col = skyCol;

    if (t < 40.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);
        float ao = getAO(p, n);

        vec3 baseCol = mix(u_colors[1], u_colors[2], fract(orbitTrap.y * 0.3 + u_time * 0.1));

        float diff = max(dot(n, normalize(vec3(0.5, 1.0, -0.5))), 0.0);
        float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);

        col = baseCol * (diff + 0.3);
        col += rim * u_colors[1] * (min(u_bass, 0.85) + 0.5);
        col *= ao;

        // Підсвітка зсередини
        col += u_colors[2] * exp(-abs(d) * 50.0) * min(u_rms, 0.8);
    }

    // Туман
    col = mix(col, skyCol, smoothstep(10.0, 40.0, t));

    // Центральне світло
    col += u_colors[1] * 0.2 * exp(-length(uv) * 3.0) * (min(u_bass, 0.85) + 0.5);

    col = smoothstep(-0.1, 1.1, col);
    gl_FragColor = vec4(pow(col, vec3(0.6)), 1.0);
}
