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

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float map(vec3 p) {
    float scene = 1e5;
    for (int i = 0; i < 6; i++) {
        float fi = float(i);
        vec3 center = vec3(
            sin(u_time * 0.3 + fi * 1.5) * 2.5,
            mod(u_time * (0.5 + fi * 0.1) + fi * 2.0, 12.0) - 6.0,
            cos(u_time * 0.2 + fi) * 1.5
        );
        float size = 0.5 + fi * 0.1 + u_bass * 0.2;
        // Only outer sphere (no abs = no saturn rings)
        float b = length(p - center) - size;
        // Surface wobble from treble
        b -= sin(p.x * 8.0 + u_time) * 0.02 * u_treble;
        scene = min(scene, b);
    }
    return scene;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    // --- DEBUG MODE ---
    if (u_debug) {
        if (uv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; }
        else if (uv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; }
        else { gl_FragColor = vec4(u_colors[2], 1.0); return; }
    }

    vec3 ro = vec3(0.0, 0.0, -7.0);
    vec3 rd = normalize(vec3(uv, 1.5));

    // Dark background from palette
    vec3 col = u_colors[0] * 0.02;

    float t = 0.0;
    for (int i = 0; i < 64; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);

        if (d < 0.001) {
            vec3 e = vec3(0.01, 0.0, 0.0);
            vec3 n = normalize(vec3(
                map(p + e.xyy) - map(p - e.xyy),
                map(p + e.yxy) - map(p - e.yxy),
                map(p + e.yyx) - map(p - e.yyx)
            ));

            // Fresnel for soap film
            float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);

            // Thin-film iridescence
            vec3 irid = 0.5 + 0.5 * cos(6.283 * (fresnel + vec3(0.0, 0.1, 0.2) + u_time * 0.1));

            // Blend with album colors
            vec3 albumTone = mix(u_colors[1], u_colors[2], fresnel);
            irid = mix(irid, albumTone, 0.4);

            // Rim light + specular
            col += irid * fresnel * 1.5;
            col += pow(fresnel, 20.0) * 2.0 * u_colors[2];

            // Refraction: bend ray through bubble for volume
            rd = refract(rd, n, 0.95);
            t += 0.2;
        }

        t += d;
        if (t > 20.0) break;
    }

    // Bass glow
    col += u_colors[1] * pow(u_bass, 3.0) * 0.1;

    // Bass indicator (bottom-right)
    vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
    if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) { col = vec3(1.0); }

    // Clamp + Gamma correction
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));

    gl_FragColor = vec4(col, 1.0);
}
