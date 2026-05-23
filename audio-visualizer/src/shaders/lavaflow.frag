uniform float u_time;
uniform float u_bass;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;
uniform float u_smoothing;
uniform float u_dim;

varying vec2 vUv;

vec3 hash3(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
             dot(p, vec3(269.5, 183.3, 246.1)),
             dot(p, vec3(113.5, 271.9, 124.6)));
    return fract(sin(p) * 43758.5453) * 2.0 - 1.0;
}

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise3d(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(dot(hash3(i + vec3(0,0,0)), f - vec3(0,0,0)),
                     dot(hash3(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
                 mix(dot(hash3(i + vec3(0,1,0)), f - vec3(0,1,0)),
                     dot(hash3(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
             mix(mix(dot(hash3(i + vec3(0,0,1)), f - vec3(0,0,1)),
                     dot(hash3(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
                 mix(dot(hash3(i + vec3(0,1,1)), f - vec3(0,1,1)),
                     dot(hash3(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y), u.z);
}

float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
        v += a * noise3d(p);
        p *= 2.1;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);

    // --- DEBUG ---
    if (u_debug) { vec2 duv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (duv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; } else if (duv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; } else { gl_FragColor = vec4(u_colors[2], 1.0); return; } }

    // AUDIO-DRIVEN DYNAMICS
    float time = u_time * 0.15;
    float bassMod = u_bass * 0.4;

    // Coordinates with reactive warping (breathing zoom on bass)
    vec3 coords = vec3(p * (1.8 - u_bass * 0.3), time);

    // TEXTURE GENERATION (Domain Warping — viscous magma)
    vec3 q = vec3(fbm(coords), fbm(coords + vec3(1.2, 4.3, 0.5)), 0.0);
    vec3 r = vec3(fbm(coords + q * 2.5 + vec3(5.7, 1.2, time)),
                  fbm(coords + q * 1.5 + vec3(2.3, 7.8, time)), 0.0);

    float n = fbm(coords + r * (2.0 + bassMod));
    float t = smoothstep(-0.7, 0.7, n);

    // --- DEEP PALETTE HIERARCHY ---
    // Generate darker/saturated variants from base colors for depth
    vec3 col0_dark = u_colors[0] * 0.3;  // Deep shadow / cooled rock
    vec3 col1_mid = u_colors[1] * 0.6;   // Warm magma in depths
    vec3 col1_hot = u_colors[1];          // Active lava flow
    vec3 col2_bright = u_colors[2];       // White-hot core

    // MULTI-LAYER BLENDING (4 stages for smooth gradients)
    vec3 finalCol = col0_dark;

    // Layer 1: Deep warmth
    finalCol = mix(finalCol, col1_mid, smoothstep(0.1, 0.4, t));

    // Layer 2: Active flow (bass-reactive — expands on drops)
    float flowMask = smoothstep(0.35 - bassMod * 0.2, 0.7, t);
    finalCol = mix(finalCol, col1_hot, flowMask);

    // Layer 3: White-hot core (RMS peaks rupture the surface)
    float heatMask = smoothstep(0.65 - u_rms * 0.25, 0.95, t);
    finalCol = mix(finalCol, col2_bright, heatMask);

    // --- TEXTURE DETAILING ---
    // Micro-grain for porous rock feel on cooled areas
    float grain = hash(uv * 500.0) * 0.08;
    finalCol -= (1.0 - flowMask) * grain;

    // Edge details: high-freq noise at flow/crust boundary (floating debris)
    float edgeDetails = noise3d(vec3(p * 40.0, time * 0.1));
    finalCol += (flowMask * (1.0 - heatMask)) * edgeDetails * 0.1;

    // AUDIO-REACTIVE RADIANCE (breathing glow from overall loudness)
    finalCol *= 0.9 + (u_rms * 0.4);

    // Vignette for depth/focus
    finalCol *= smoothstep(1.3, 0.4, length(p));

    // Final correction: saturation + gamma
    finalCol = pow(clamp(finalCol, 0.0, 1.0), vec3(0.9));

    // Dim (fade to black on pause/transition)
    finalCol *= (1.0 - u_dim);

    gl_FragColor = vec4(finalCol, 1.0);
}

