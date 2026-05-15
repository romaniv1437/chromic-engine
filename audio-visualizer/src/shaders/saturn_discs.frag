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

// Thin-film interference rainbow
vec3 soapRainbow(float f) {
    vec3 shift = vec3(0.0, 0.15, 0.3);
    return 0.5 + 0.5 * cos(6.28318 * (f + shift + u_time * 0.1));
}

// Infinite bubbles via domain repetition
float map(vec3 p) {
    float t = u_time * 0.2;

    // Float entire volume upward
    p.y -= t * 2.0;
    p.x += sin(p.y * 0.5 + t) * 0.5;

    // Clone space into 3x3x3 cells
    vec3 id = floor((p + 1.5) / 3.0);
    p = mod(p + 1.5, 3.0) - 1.5;

    // Per-cell random offset
    float h = fract(sin(dot(id, vec3(12.989, 78.233, 45.164))) * 43758.5453);
    p += (h - 0.5) * 1.5;

    // Size varies per cell + bass
    float size = (0.2 + h * 0.5) + u_bass * 0.2;

    // Thin hollow wall
    float d = abs(length(p) - size) - 0.005;

    // Wobble from treble
    d -= sin(p.x * 5.0 + u_time) * cos(p.y * 5.0) * 0.02 * u_treble;

    return d;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    // Deep background from album colors
    vec3 col = u_colors[0] * 0.1 * (1.0 - length(uv));

    vec3 ro = vec3(0.0, 0.0, -5.0);
    vec3 rd = normalize(vec3(uv, 1.5));

    // Camera rotation
    ro.xz *= rot(u_time * 0.1);
    rd.xz *= rot(u_time * 0.1);

    float t = 0.0;
    float bubbleAccum = 0.0;

    for (int i = 0; i < 50; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);

        // Soap fog: accumulate glow near surfaces
        float glow = smoothstep(0.5, 0.0, d);
        bubbleAccum += pow(glow, 4.0) * 0.15;

        if (d < 0.001) {
            // Hit bubble wall
            vec2 e = vec2(0.01, 0.0);
            vec3 n = normalize(vec3(
                map(p + e.xyy) - map(p - e.xyy),
                map(p + e.yxy) - map(p - e.yxy),
                map(p + e.yyx) - map(p - e.yyx)
            ));

            float f = pow(1.0 - max(dot(n, -rd), 0.0), 2.0);
            vec3 irid = soapRainbow(f + t * 0.1);

            // Additive blending (no gel, pure light)
            col += irid * f * 0.6;
            col += pow(f, 10.0) * 0.4;

            // Ray continues through (transparency!)
            d = 0.05;
        }

        if (t > 15.0) break;
        t += max(d, 0.02);
    }

    // Add accumulated soap fog
    col += soapRainbow(u_time * 0.05) * bubbleAccum * (0.5 + u_rms);

    // Color grading
    col *= 1.2;
    col = pow(col, vec3(0.8));
    col = mix(col, u_colors[1], u_bass * 0.1);

        // --- DEBUG ---
    if (u_debug) { vec2 duv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (duv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; } else if (duv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; } else { gl_FragColor = vec4(u_colors[2], 1.0); return; } }
    // Bass indicator
    { vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) col = vec3(1.0); }
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));
    gl_FragColor = vec4(col, 1.0);
}


