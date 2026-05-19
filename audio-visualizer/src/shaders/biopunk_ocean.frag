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

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
    float val = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 3; i++) {
        val += amp * noise(p);
        p *= 2.2;
        amp *= 0.45;
    }
    return val;
}

float map(vec3 p) {
    // Water level pulses with bass
    float waterLvl = 0.6 + u_bass * 0.3;

    // Terrain height
    float h = fbm(p.xz * 0.15) * 5.0;
    // Wind displacement from mid
    h += noise(p.xz * 0.8 + u_time * 0.3) * u_mid * 0.8;

    // Ocean waves below water level
    float waves = sin(p.x * 2.0 + u_time * 2.0) * cos(p.z * 1.5 + u_time * 1.5) * 0.08 * (1.0 + u_bass);

    float terrain = p.y - max(h, waterLvl + waves);
    return terrain;
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.1, 0.0);
    return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        0.2,
        map(p + e.yyx) - map(p - e.yyx)
    ));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    // FOV punch on bass kicks
    float fov = 1.0 - u_bass * 0.2;
    vec3 rd = normalize(vec3(uv * fov, 1.2));

    // Camera flight
    float travel = u_time * 2.5;
    vec3 ro = vec3(sin(u_time * 0.15) * 2.0, 4.0 + u_bass * 0.5, travel);

    // Banking roll
    rd.xy *= rot(sin(u_time * 0.2) * 0.2);
    rd.xz *= rot(cos(u_time * 0.12) * 0.08);

    float t = 0.1;
    float d = 0.0;

    // 64 steps max for M1 Pro 60fps
    for (int i = 0; i < 64; i++) {
        d = map(ro + rd * t);
        if (d < 0.02 || t > 45.0) break;
        t += d * 0.7;
    }

    vec3 col = vec3(0.0);
    float waterLvl = 0.6 + u_bass * 0.3;

    // Sun
    vec3 lightDir = normalize(vec3(0.4, 0.7, -0.5));

    if (t < 45.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);
        float h = fbm(p.xz * 0.15) * 5.0 + noise(p.xz * 0.8 + u_time * 0.3) * u_mid * 0.8;

        float diff = max(dot(n, lightDir), 0.0);
        float spec = pow(max(dot(reflect(-lightDir, n), -rd), 0.0), 32.0);

        // Biome blend factor (soft shoreline transition)
        float shoreMix = smoothstep(waterLvl - 0.3, waterLvl + 0.5, h);

        // === OCEAN ===
        vec3 oceanCol = u_colors[2] * 0.4;
        // Specular highlights on water
        oceanCol += spec * vec3(0.8, 0.9, 1.0) * 0.8;
        // Depth-based color
        oceanCol += u_colors[2] * 0.3 * (1.0 - smoothstep(0.0, waterLvl, h));
        // Bass pulse glow under water
        oceanCol += u_colors[2] * u_bass * 0.3 * sin(p.x * 4.0 + u_time * 3.0) * 0.5;

        // === JUNGLE ===
        vec3 jungleCol = u_colors[1] * (diff * 0.6 + 0.2);
        // Bioluminescent veins in valleys (triggered by RMS)
        float veinPattern = smoothstep(0.4, 0.0, abs(noise(p.xz * 3.0 + u_time * 0.5) - 0.5));
        vec3 bioGlow = u_colors[2] * veinPattern * u_rms * 3.0;
        jungleCol += bioGlow;
        // Canopy highlights
        float canopySpec = pow(max(dot(n, lightDir), 0.0), 8.0);
        jungleCol += u_colors[1] * canopySpec * 0.3;

        // Blend biomes
        col = mix(oceanCol, jungleCol, shoreMix);
    }

    // Exponential fog (atmosphere)
    float fog = smoothstep(0.0, 45.0, t);
    vec3 fogCol = u_colors[0] * 0.3;
    col = mix(col, fogCol, fog);

    // Horizon glow
    float horizon = smoothstep(0.05, -0.15, rd.y);
    col += u_colors[2] * horizon * 0.2 * (1.0 + u_treble);

    // Sun disk
    float sun = pow(max(dot(rd, lightDir), 0.0), 16.0);
    col += u_colors[0] * sun * 0.5;

    // Sky for missed rays
    if (t >= 45.0) {
        col = fogCol + u_colors[0] * 0.05 * smoothstep(-0.2, 0.5, rd.y);
        col += u_colors[2] * horizon * 0.3;
    }

    // Gamma
    col = pow(col, vec3(0.85));

        // --- DEBUG ---
    if (u_debug) { vec2 duv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (duv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; } else if (duv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; } else { gl_FragColor = vec4(u_colors[2], 1.0); return; } }
    // Bass indicator
    { vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) col = vec3(1.0); }
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));
    gl_FragColor = vec4(col, 1.0);
}

