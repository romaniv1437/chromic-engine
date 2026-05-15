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
    float explodeForce = 0.5 + pow(u_bass, 3.0) * 3.5;
    float twist = u_time * 0.2 + u_treble * 2.0;

    orbitTrap = vec3(100.0);
    float scale = 1.0;

    for (int i = 0; i < 8; i++) {
        p.xyz = abs(p.xyz);
        p -= vec3(1.2, 0.8, 1.0) * explodeForce * (0.2 + float(i) * 0.05);
        p.xy *= rot(twist + float(i) * 0.1);
        p.yz *= rot(twist * 0.7 - u_mid * float(i) * 0.2);
        p *= 1.35;
        scale *= 1.35;
        orbitTrap = min(orbitTrap, abs(p));
    }

    float d = (abs(p.x) + abs(p.y) + abs(p.z) - 2.0) / scale;
    return d;
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.001, 0.0);
    return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx)
    ));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    if (u_debug) {
        if (uv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; }
        else if (uv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; }
        else { gl_FragColor = vec4(u_colors[2], 1.0); return; }
    }

    vec3 ro = vec3(0.0, 0.0, -8.0 + u_bass * 1.5);
    ro.xy *= rot(u_bass * 0.1 * sin(u_time * 10.0));

    vec3 rd = normalize(vec3(uv, 1.5));

    float t = 0.0;
    float d = 0.0;
    vec3 p;

    vec3 col = u_colors[0] * 0.05;

    for (int i = 0; i < 80; i++) {
        p = ro + rd * t;
        d = map(p);
        if (d < 0.001 || t > 25.0) break;
        t += d;
    }

    if (d < 0.001) {
        vec3 n = getNormal(p);

        vec3 lightPos = vec3(2.0 * sin(u_time), 3.0, -4.0);
        vec3 l = normalize(lightPos - p);
        float diff = max(dot(n, l), 0.0);

        vec3 coreGlow = vec3(0.0);
        coreGlow += exp(-orbitTrap.x * 2.0) * u_colors[1];
        coreGlow += exp(-orbitTrap.y * 3.0) * u_colors[2];
        coreGlow *= 1.0 + u_bass * 2.0;

        vec3 baseMaterial = mix(u_colors[0], u_colors[1], diff * 0.3);
        col = baseMaterial + coreGlow * 0.8;
    }

    col += u_colors[2] * (0.05 / (0.1 + t * t * 0.005)) * u_mid;

    // Bass indicator
    vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
    if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) col = vec3(1.0);

    col *= 1.0 - 0.5 * length(uv);
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));

    gl_FragColor = vec4(col, 1.0);
}

