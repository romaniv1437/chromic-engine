precision highp float;
uniform float u_time;
uniform float u_rms;
uniform float u_mid;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;
varying vec2 vUv;

mat2 rot2(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

// --- Organic value noise + fbm for the living liquid core ---
float hash21(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 34.5);
    return fract(p.x * p.y);
}

float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash21(i + vec2(0.0, 0.0));
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
        v += amp * vnoise(p);
        p = rot2(0.6) * p * 2.02;
        amp *= 0.5;
    }
    return v;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;

    if (u_debug) {
        vec2 duv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
        if (duv.x < -0.3) {
            gl_FragColor = vec4(u_colors[0], 1.0);
            return;
        } else if (duv.x < 0.3) {
            gl_FragColor = vec4(u_colors[1], 1.0);
            return;
        } else {
            gl_FragColor = vec4(u_colors[2], 1.0);
            return;
        }
    }

    // Smooth audio response to avoid jitter.
    float smoothRms = u_rms * u_rms;
    float smoothMid = u_mid * u_mid;

    // Analog-like camera drift and breathing movement.
    vec2 drift = vec2(
        sin(u_time * 0.17) + 0.45 * sin(u_time * 0.07 + 1.9),
        cos(u_time * 0.13 + 0.8) + 0.45 * cos(u_time * 0.05)
    ) * 0.06;
    uv += drift;

    float breathing = 1.32 + sin(u_time * 0.22) * 0.05 + sin(u_time * 0.55 + 1.2) * 0.02;
    float audioPulse = sin(u_time * 2.1) * smoothRms * 0.05;
    uv *= (breathing + audioPulse + u_rms * 0.04);

    float swirl = sin(u_time * 0.11) * 0.18 + smoothMid * 0.06;
    uv = rot2(swirl) * uv;

    float r = length(uv);
    if (r > 0.995) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }

    float n = 7.0;
    float angleStep = 6.2831853 / n;
    float geoR = 1.0 / cos(3.1415926 / n);
    vec2 center = vec2(geoR, 0.0);
    float invR2 = geoR * geoR - 1.0;
    float sqrtInv = sqrt(invR2);

    vec2 z = uv;
    float edgeDist = 1.0;
    float secondEdge = 1.0;
    float internalWaves = 0.0;
    float reflCount = 0.0;
    float veinFlow = 0.0;

    for (int i = 0; i < 16; i++) {
        float a = floor(atan(z.y, z.x) / angleStep + 0.5) * angleStep;
        z = rot2(-a) * z;

        vec2 diff = z - center;
        float d = dot(diff, diff);

        if (d < invR2) {
            z = center + diff * invR2 / d;
            reflCount += 1.0;
        } else {
            break;
        }

        // Track nearest AND second-nearest edges so more lines stay visible.
        float edgeLocal = abs(length(diff) - sqrtInv);
        if (edgeLocal < edgeDist) {
            secondEdge = edgeDist;
            edgeDist = edgeLocal;
        } else if (edgeLocal < secondEdge) {
            secondEdge = edgeLocal;
        }

        float radial = length(z);
        // Multiple natural line families travelling outward.
        float waveA = sin(radial * 18.0 - u_time * 1.4 + float(i) * 0.30) * 0.5 + 0.5;
        float waveB = sin(radial * 33.0 - u_time * 0.8 + float(i) * 0.55) * 0.5 + 0.5;
        float mask = smoothstep(0.72, 0.05, radial);
        internalWaves += mix(waveA, waveB, 0.5) * mask;

        // Thin flowing "veins" — extra line detail across the tiling.
        float vein = smoothstep(0.045, 0.0, abs(fract(radial * 4.0 - u_time * 0.25) - 0.5) * 0.5);
        veinFlow += vein * mask;
    }

    internalWaves /= 16.0;
    veinFlow /= 16.0;

    // ---------------------------------------------------------------
    // LIVING LIQUID CORE — smooth filled circle, no circus banding.
    // Domain-warped fbm gives a slow, organic, album-cover liquid feel.
    // ---------------------------------------------------------------
    vec2 cuv = uv * 2.1;
    float tFlow = u_time * 0.10;
    vec2 warp = vec2(
        fbm(cuv + vec2(0.0, tFlow)),
        fbm(cuv + vec2(5.2, -tFlow * 0.8))
    );
    float liquid = fbm(cuv * 1.4 + warp * 1.8 + vec2(tFlow * 0.6, -tFlow * 0.4));
    liquid = smoothstep(0.25, 0.85, liquid);

    // Soft circular falloff so the core reads as a filled smooth disc.
    float coreMask = smoothstep(0.95, 0.18, r);
    coreMask = pow(coreMask, 1.4);

    // Blend the palette smoothly through the liquid (no hard mid color).
    vec3 liquidCol = mix(u_colors[0], u_colors[1], smoothstep(0.0, 0.6, liquid));
    liquidCol = mix(liquidCol, u_colors[2], smoothstep(0.45, 1.0, liquid));
    vec3 core = liquidCol * coreMask * (0.55 + smoothMid * 0.7 + smoothRms * 0.5);

    // ---------------------------------------------------------------
    // TILING STRUCTURE — keep visible lines, but soft & natural.
    // ---------------------------------------------------------------
    vec3 bg = mix(u_colors[0], u_colors[1], 0.18) * 0.16;
    vec3 baseCol = bg + core;

    // Primary + secondary edges => more visible lines.
    float edge1 = smoothstep(0.016, 0.0, edgeDist);
    float edge2 = smoothstep(0.020, 0.0, secondEdge) * 0.5;
    float edges = edge1 + edge2;
    vec3 edgeCol = mix(u_colors[1], u_colors[2], 0.45) * edges * (0.5 + smoothMid * 1.0);

    vec3 glowA = mix(u_colors[1], u_colors[2], 0.55);
    vec3 veinCol = mix(u_colors[2], u_colors[1], 0.3);
    vec3 innerGlow = glowA * internalWaves * (0.22 + smoothMid * 0.7);
    innerGlow += veinCol * veinFlow * (0.14 + smoothRms * 0.5);

    vec3 col = baseCol + edgeCol + innerGlow;

    // Soft rim + gentle vignette for depth.
    col += mix(u_colors[1], u_colors[2], 0.6) * smoothstep(0.84, 1.0, r) * (0.2 + smoothRms * 0.3);
    col *= smoothstep(1.25, 0.14, r);

    // Mild tonemap and gamma for stable visibility.
    col = col / (1.0 + col * 0.8);
    col = pow(clamp(col, 0.0, 1.0), vec3(0.9));

    gl_FragColor = vec4(col, 1.0);
}