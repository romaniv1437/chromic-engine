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

// Fast hash
float hash(vec3 p) {
    p = fract(p * vec3(123.34, 456.21, 789.53));
    p += dot(p, p.yzx + 45.32);
    return fract(p.x * p.y * p.z);
}

float hash2(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

// 2-octave noise for island shape
float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec3(1,0,0));
    float c = hash(i + vec3(0,1,0));
    float d = hash(i + vec3(1,1,0));
    float e = hash(i + vec3(0,0,1));
    float ff = hash(i + vec3(1,0,1));
    float g = hash(i + vec3(0,1,1));
    float h = hash(i + vec3(1,1,1));
    return mix(mix(mix(a,b,f.x), mix(c,d,f.x), f.y),
               mix(mix(e,ff,f.x), mix(g,h,f.x), f.y), f.z);
}

float islandNoise(vec3 p) {
    return noise(p) * 0.7 + noise(p * 2.1) * 0.3;
}

float map(vec3 p) {
    // Cell repetition
    float cellSize = 5.0;
    vec3 cellId = floor(p / cellSize);
    vec3 cellPos = mod(p, cellSize) - cellSize * 0.5;

    // Hash to delete 70% of cells (keep 30%)
    float keep = step(0.7, hash(cellId));
    if (keep < 0.5) return cellSize * 0.4; // Early exit: large empty space

    // Island blob SDF
    float radius = 0.8 + u_bass * 0.4;
    // Distort with low-octave noise
    float distortion = islandNoise(cellPos * 0.8 + cellId * 3.7) * 0.6;
    float island = length(cellPos) - radius - distortion;

    // Bass shake
    island += sin(cellPos.y * 3.0 + u_time * 2.0) * u_bass * 0.1;

    return island;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    // FOV punch
    float fov = 1.0 - u_bass * 0.2;
    vec3 rd = normalize(vec3(uv * fov, 1.2));

    // High-speed flight
    float baseSpeed = u_time * 4.0;
    vec3 ro = vec3(0.0, 0.0, baseSpeed);

    // Camera turbulence from RMS
    ro.x += sin(u_time * 3.7) * u_rms * 0.3;
    ro.y += cos(u_time * 2.9) * u_rms * 0.2;

    // Spiral path
    ro.x += sin(u_time * 0.4) * 1.5;
    ro.y += cos(u_time * 0.3) * 1.0;

    // Banking
    rd.xy *= rot(sin(u_time * 0.25) * 0.2);
    rd.xz *= rot(cos(u_time * 0.15) * 0.1);

    float t = 0.05;
    float d = 0.0;
    float glow = 0.0;

    // 60 steps - optimized with adaptive stepping
    for (int i = 0; i < 60; i++) {
        vec3 p = ro + rd * t;
        d = map(p);

        // Bioluminescent glow accumulation near surfaces
        glow += (0.015 + u_treble * 0.04) / (0.1 + d * d * 8.0);

        if (d < 0.01) break;
        if (t > 50.0) break;

        // Adaptive stepping: larger steps in void
        t += d * 0.8;
    }

    vec3 col = u_colors[0] * 0.05; // Dark void base

    if (d < 0.1 && t < 50.0) {
        vec3 p = ro + rd * t;
        vec3 cellPos = mod(p, 5.0) - 2.5;

        // Y-axis gradient shading (no real shadows)
        float yGrad = smoothstep(-1.0, 1.0, cellPos.y);

        // Surface color: dark bottom, bright top
        vec3 surface = mix(u_colors[1] * 0.2, u_colors[1], yGrad);

        // Core glow leaking from inside (brighter at edges/bottom)
        float coreGlow = smoothstep(0.8, 0.0, length(cellPos)) * (1.0 - yGrad);
        surface += u_colors[2] * coreGlow * (0.5 + u_rms * 2.0);

        // Edge factor
        float edge = smoothstep(0.1, 0.0, d);
        col = surface * edge;

        // Bass pulse on surface
        col += u_colors[2] * u_bass * 0.2 * edge;
    }

    // Volumetric glow (bioluminescent trails)
    col += glow * u_colors[2] * (0.4 + u_treble * 0.6);

    // Depth fog
    col = mix(col, u_colors[0] * 0.03, smoothstep(5.0, 50.0, t));


    // Vignette
    col *= 1.0 - 0.4 * dot(uv, uv);

    // Tone map
    col = smoothstep(-0.02, 1.1, col);
    col = pow(col, vec3(0.85));

        // --- DEBUG ---
    if (u_debug) { vec2 duv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (duv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; } else if (duv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; } else { gl_FragColor = vec4(u_colors[2], 1.0); return; } }
    // Bass indicator
    { vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) col = vec3(1.0); }
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));
    gl_FragColor = vec4(col, 1.0);
}

