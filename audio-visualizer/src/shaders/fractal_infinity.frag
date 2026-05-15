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

// Smooth minimum for organic blending
float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
}

float fractalSDF(vec3 p) {
    // Slow rotation of entire fractal world
    p.xy *= rot(u_time * 0.05);

    // Infinite tunnel with variations
    float cellSize = 8.0;
    vec3 p_mod = p;
    p_mod.z = mod(p.z, cellSize) - cellSize * 0.5;

    // Tunnel shape morphs with bass
    float tunnel = length(p_mod.xy) - (1.2 + u_bass * 0.8 + sin(p.z * 0.5) * 0.4);

    float scale = 1.8 + u_mid * 0.4;

    // KIFS (Iterated Function System)
    for (int i = 0; i < 7; i++) {
        p_mod = abs(p_mod) - vec3(0.8, 1.2, 0.6);

        p_mod.xy *= rot(0.5 + u_bass * 0.1 + float(i) * 0.2);
        p_mod.yz *= rot(0.3 + u_treble * 0.1);

        // Kaleidoscopic mirroring
        if (p_mod.x < p_mod.y) p_mod.xy = p_mod.yx;
        if (p_mod.x < p_mod.z) p_mod.xz = p_mod.zx;

        p_mod = p_mod * scale - vec3(1.0, 2.0, 1.0) * (scale - 1.0);
    }

    float fractal = (length(p_mod) - 1.5) / pow(scale, 7.0);

    // Blend fractal and tunnel for a magic void fly-through
    return smin(fractal, -tunnel, 0.5);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    // FOV punch on beats (hyperspace zoom effect)
    float fov = 1.0 - u_rms * 0.3;
    vec3 rd = normalize(vec3(uv * fov, 1.2));

    // Stable base speed + micro-kick from bass (no jitter from u_rms)
    float baseSpeed = u_time * 3.5;
    float kick = smoothstep(0.5, 1.0, u_bass) * 0.2;
    vec3 ro = vec3(0.0, 0.0, baseSpeed + kick);

    // Spiral camera motion
    ro.x += sin(u_time * 0.7) * 0.5;
    ro.y += cos(u_time * 0.5) * 0.5;

    // Dynamic camera tilt
    rd.xy *= rot(sin(u_time * 0.3) * 0.2 + u_rms * 0.1);
    rd.xz *= rot(cos(u_time * 0.2) * 0.1);

    float t = 0.05;
    float glow = 0.0;
    float d = 0.0;

    // Optimized marching
    for (int i = 0; i < 80; i++) {
        vec3 p = ro + rd * t;
        d = fractalSDF(p);

        // Glow brighter on treble
        glow += (0.02 + u_treble * 0.05) / (0.1 + d * d * 15.0);

        if (d < 0.002 || t > 30.0) break;
        t += d * 0.75;
    }

    vec3 col = vec3(0.0);

    // Background color gradient
    vec3 bgCol = mix(u_colors[0], u_colors[2], sin(u_time * 0.2) * 0.5 + 0.5);

    if (d < 0.1) {
        float edge = smoothstep(0.1, 0.0, d);
        // Magic depth-based material color
        vec3 material = mix(u_colors[1], u_colors[2], fract(t * 0.1 + u_time * 0.1));
        col = material * edge;

        // Light pulse waves on walls from bass
        col += u_colors[0] * (1.0 - fract(t * 0.5 - u_time * 2.0)) * u_bass;
    }

    // Volumetric glow
    col += glow * mix(u_colors[1], u_colors[0], u_rms);

    // Cosmic fog
    col = mix(col, bgCol * 0.05, smoothstep(5.0, 30.0, t));

    // Vignette & edge distortion
    float mask = 1.0 - length(uv * 0.8);
    col *= mask;

    // Tone mapping & saturation
    col = smoothstep(-0.05, 1.05, col);
    col = pow(col, vec3(0.8));

        // --- DEBUG ---
    if (u_debug) { vec2 duv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (duv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; } else if (duv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; } else { gl_FragColor = vec4(u_colors[2], 1.0); return; } }
    // Bass indicator
    { vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) col = vec3(1.0); }
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));
    gl_FragColor = vec4(col, 1.0);
}

