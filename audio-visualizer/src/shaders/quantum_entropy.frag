precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform float u_beat;
uniform float u_energy;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];

varying vec2 vUv;

#define PI 3.14159265359
#define MAX_STEPS 64
#define MAX_DIST 12.0

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

// ─── Hash for jittered stepping ─────────────────────────────────────────────
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// ─── Wave function: superposition of orbital modes ──────────────────────────
// Each orbital is a standing wave with quantum numbers encoded in k_i
float waveFunction(vec3 p, float phase) {
    float psi = 0.0;

    // Orbital 1: s-orbital (spherical)
    float r = length(p);
    psi += sin(4.0 * r - phase * 2.0) * exp(-r * 0.8) * 1.5;

    // Orbital 2: p-orbital (dumbbell along Y)
    float py = p.y / (r + 0.01);
    psi += sin(6.0 * r - phase * 1.5) * py * exp(-r * 0.6);

    // Orbital 3: d-orbital (cloverleaf XZ)
    float dxz = p.x * p.z / (r * r + 0.01);
    psi += sin(5.0 * r - phase * 1.8) * dxz * 2.0 * exp(-r * 0.7);

    // Orbital 4: f-orbital (complex angular pattern)
    float fy = (5.0 * p.y * p.y * p.y - 3.0 * p.y * r * r) / (r * r * r + 0.01);
    psi += sin(3.0 * r - phase) * fy * 0.5 * exp(-r * 0.5);

    // Orbital 5: toroidal mode
    float ring = length(p.xz) - 1.5;
    psi += sin(8.0 * ring + p.y * 4.0 - phase * 3.0) * exp(-ring * ring * 2.0 - p.y * p.y * 0.5) * 0.8;

    return psi;
}

// ─── Probability density |Ψ|² ───────────────────────────────────────────────
float probabilityDensity(vec3 p, float beat) {
    // Beat triggers orbital shift — changes quantum numbers
    float phase = u_time * 1.5;

    // On beat: phase jump creates sudden orbital reconfiguration
    phase += beat * 5.0;

    // Bass warps space before evaluation
    p.xz *= rot(u_bass * 0.5);
    p.xy *= rot(u_time * 0.1);

    float psi = waveFunction(p, phase);

    // |Ψ|² = probability density
    return psi * psi;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

    // Camera orbiting origin
    float camDist = 6.0 - u_bass * 0.8;
    vec3 ro = vec3(
        sin(u_time * 0.15) * camDist,
        sin(u_time * 0.1) * 2.0,
        cos(u_time * 0.15) * camDist
    );
    ro.x += sin(u_time * 35.0) * u_beat * 0.2;
    ro.y += cos(u_time * 41.0) * u_beat * 0.15;

    vec3 lookAt = vec3(0.0);
    vec3 fwd = normalize(lookAt - ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
    vec3 up = cross(fwd, right);
    float fov = 1.0 + u_rms * 0.3;
    vec3 rd = normalize(uv.x * right + uv.y * up + fov * fwd);

    // ─── Volumetric ray marching with jittered steps ────────────────────────
    vec3 col = vec3(0.0);
    float jitter = hash(gl_FragCoord.xy + u_time) * 0.5;

    float stepSize = MAX_DIST / float(MAX_STEPS);
    float t = jitter * stepSize;
    float totalDensity = 0.0;

    // Temperature from RMS — controls glow intensity
    float temperature = 0.3 + u_rms * 2.0;

    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * t;

        float density = probabilityDensity(p, u_beat);

        if (density > 0.01) {
            // Color based on position in cloud
            float r = length(p);
            float colorT = fract(r * 0.3 + density * 0.5 + u_time * 0.05);

            // 3-color palette blend
            vec3 cloudColor;
            float seg = colorT * 2.0;
            if (seg < 1.0) {
                cloudColor = mix(u_colors[0], u_colors[1], seg);
            } else {
                cloudColor = mix(u_colors[1], u_colors[2], seg - 1.0);
            }

            // Emission: high density = bright glow
            float emission = density * temperature * stepSize;
            emission = min(emission, 0.15); // Clamp to prevent blowout

            // Energy shifts toward hotter colors
            cloudColor = mix(cloudColor, u_colors[2], u_energy * density * 0.5);

            col += cloudColor * emission * (1.0 - totalDensity);
            totalDensity += emission * 2.0;

            if (totalDensity > 0.95) break;
        }

        t += stepSize;
        if (t > MAX_DIST) break;
    }

    // Background: deep void
    vec3 bg = u_colors[0] * 0.03;
    bg += u_colors[2] * 0.015 * (1.0 - length(uv));
    col = mix(bg, col, min(totalDensity * 3.0, 1.0));

    // Ambient quantum glow (always visible even at low audio)
    float ambientGlow = exp(-length(uv) * 2.0) * 0.08;
    col += mix(u_colors[1], u_colors[2], 0.5) * ambientGlow;

    // Beat flash
    col += vec3(0.8, 0.9, 1.0) * u_beat * 0.2;

    // Vignette
    col *= 1.0 - 0.35 * dot(uv, uv);

    // Tone mapping
    col = col / (col + vec3(1.0));
    col = pow(col, vec3(0.9));

    gl_FragColor = vec4(col, 1.0);
}

