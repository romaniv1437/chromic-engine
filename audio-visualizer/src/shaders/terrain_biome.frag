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

// Fast hash without sin (lighter on GPU)
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

// Optimized noise
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

// Light FBM (4 octaves)
float fbm(vec2 p) {
    float val = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
        val += amp * noise(p);
        p *= 2.3;
        amp *= 0.45;
    }
    return val;
}

// Terrain map
float map(vec3 p) {
    float h = fbm(p.xz * 0.2) * 3.5;
    h += noise(p.xz * 0.5 + u_time * 0.1) * u_bass * 1.5;
    float waterLevel = 0.2 + sin(u_time * 0.5) * 0.1;
    return p.y - max(h, waterLevel);
}

// Fast normals (larger step, fixed Y for speed)
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

    // FOV punch on beats
    float fov = 1.0 - u_rms * 0.2;
    vec3 rd = normalize(vec3(uv * fov, 1.0));

    // Camera flies forward
    float travel = u_time * 3.0;
    vec3 ro = vec3(sin(u_time * 0.2) * 1.5, 3.5 + u_bass, travel);

    // Camera tilt
    float alpha = sin(u_time * 0.3) * 0.1;
    float s = sin(alpha), c = cos(alpha);
    rd.xy *= mat2(c, -s, s, c);

    float t = 0.1;
    float d = 0.0;

    // Optimized loop: 50 steps max
    for (int i = 0; i < 50; i++) {
        d = map(ro + rd * t);
        if (d < 0.02 || t > 40.0) break;
        t += d * 0.6;
    }

    vec3 col = vec3(0.0);
    vec3 lightDir = normalize(vec3(0.5, 0.8, -0.5));

    if (t < 40.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        float diff = max(dot(n, lightDir), 0.0);

        // Color by height
        float h = p.y;
        vec3 terrainCol = mix(u_colors[2], u_colors[1], smoothstep(0.3, 1.5, h));

        // Neon edge glow from treble
        float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
        terrainCol += u_colors[0] * fresnel * u_treble * 2.0;

        col = terrainCol * (diff + 0.2);
    }

    // Atmospheric fog with album color
    float fog = smoothstep(0.0, 40.0, t);
    vec3 fogCol = mix(u_colors[0] * 0.2, u_colors[1] * 0.1, uv.y + 0.5);
    col = mix(col, fogCol, fog);

    // Sun glow
    float sun = pow(max(dot(rd, lightDir), 0.0), 10.0);
    col += u_colors[1] * sun * u_bass;

    // Gamma
    col = pow(col, vec3(0.8));

        // --- DEBUG ---
    if (u_debug) { vec2 duv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (duv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; } else if (duv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; } else { gl_FragColor = vec4(u_colors[2], 1.0); return; } }
    // Bass indicator
    { vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) col = vec3(1.0); }
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));
    gl_FragColor = vec4(col, 1.0);
}


