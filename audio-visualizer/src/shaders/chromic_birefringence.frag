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

#define MAX_STEPS 80
#define MAX_DIST 25.0
#define SURF_DIST 0.001
#define PI 3.14159265359

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

// ─── Crystal SDF: faceted gemstone cluster ──────────────────────────────────
float sdOctahedron(vec3 p, float s) {
    p = abs(p);
    return (p.x + p.y + p.z - s) * 0.57735027;
}

float sdBox(vec3 p, vec3 b) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
}

float map(vec3 p) {
    // Slow tumble
    p.xz *= rot(u_time * 0.15 + u_bass * 0.3);
    p.xy *= rot(u_time * 0.1);

    float scene = 1e5;

    // Main crystal cluster — 5 intersecting octahedra
    for (int i = 0; i < 5; i++) {
        float fi = float(i);
        vec3 off = vec3(
            sin(fi * 1.2 + u_time * 0.1) * 0.8,
            cos(fi * 0.9 + u_time * 0.08) * 0.6,
            sin(fi * 1.7) * 0.5
        );
        float size = 1.2 + fi * 0.15 + u_bass * 0.3;
        float oct = sdOctahedron(p - off, size);
        // Facet cuts
        float cut = sdBox(p - off, vec3(size * 0.7));
        float crystal = max(oct, -cut * 0.5);
        scene = smin(scene, crystal, 0.3);
    }

    // Inner void (hollow crystal)
    float inner = sdOctahedron(p, 0.6 + u_rms * 0.3);
    scene = max(scene, -inner);

    return scene;
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.001, -0.001);
    return normalize(
        e.xyy * map(p + e.xyy) +
        e.yyx * map(p + e.yyx) +
        e.yxy * map(p + e.yxy) +
        e.xxx * map(p + e.xxx)
    );
}

float calcAO(vec3 p, vec3 n) {
    float occ = 0.0, sca = 1.0;
    for (int i = 0; i < 4; i++) {
        float hr = 0.05 + 0.1 * float(i);
        float d = map(p + n * hr);
        occ += -(d - hr) * sca;
        sca *= 0.85;
    }
    return clamp(1.0 - 3.0 * occ, 0.0, 1.0);
}

// ─── Optical axis — bass rotates it ─────────────────────────────────────────
vec3 opticalAxis(float t) {
    float angle = t * 0.2 + u_bass * PI;
    return normalize(vec3(sin(angle), cos(angle * 0.7), sin(angle * 0.3 + 0.5)));
}

// ─── Birefringent refraction ────────────────────────────────────────────────
// Returns two refracted ray directions (ordinary + extraordinary)
void birefract(vec3 rd, vec3 n, vec3 axis, float eta_o, float eta_e,
               out vec3 rd_o, out vec3 rd_e) {
    rd_o = refract(rd, n, eta_o);
    // Extraordinary ray: eta depends on angle between ray and optical axis
    float cosTheta = abs(dot(rd, axis));
    float eta_eff = mix(eta_e, eta_o, cosTheta * cosTheta);
    rd_e = refract(rd, n, eta_eff);
    // Slight axis-dependent deflection for extraordinary ray
    rd_e = normalize(rd_e + axis * (eta_e - eta_o) * 0.15);
}

// ─── Thin-film iridescence (gasoline slick) ─────────────────────────────────
vec3 thinFilm(float cosTheta, float thickness) {
    float delta = 2.0 * thickness * cosTheta;
    return 0.5 + 0.5 * cos(2.0 * PI * delta + vec3(0.0, 2.094, 4.188));
}

float glowAccum = 0.0;

float raymarch(vec3 ro, vec3 rd) {
    float t = 0.0;
    glowAccum = 0.0;
    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);
        glowAccum += exp(-d * 6.0) * 0.012;
        if (d < SURF_DIST) return t;
        if (t > MAX_DIST) break;
        t += d * 0.85;
    }
    return -1.0;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

    // Camera
    vec3 ro = vec3(0.0, 0.0, 5.0 - u_bass * 0.5);
    ro.x += sin(u_time * 31.0) * u_beat * 0.15;
    ro.y += cos(u_time * 37.0) * u_beat * 0.1;
    ro.xz *= rot(sin(u_time * 0.08) * 0.4);
    ro.yz *= rot(cos(u_time * 0.06) * 0.25);

    vec3 lookAt = vec3(0.0);
    vec3 fwd = normalize(lookAt - ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
    vec3 up = cross(fwd, right);
    float fov = 1.2 + u_bass * 0.2;
    vec3 rd = normalize(uv.x * right + uv.y * up + fov * fwd);

    // Background
    vec3 bgColor = u_colors[0] * 0.03 + u_colors[2] * 0.02 * (1.0 - length(uv));
    vec3 col = bgColor;

    float t = raymarch(ro, rd);

    if (t > 0.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);
        float ao = calcAO(p, n);

        vec3 axis = opticalAxis(u_time);

        // Birefringent indices — treble drives chromatic split
        float eta_o = 0.65;
        float delta_eta = 0.08 + u_treble * 0.15;
        float eta_e = eta_o + delta_eta;

        vec3 rd_o, rd_e;
        birefract(rd, n, axis, eta_o, eta_e, rd_o, rd_e);

        // Trace ordinary ray color
        vec3 col_o = vec3(0.0);
        if (length(rd_o) > 0.5) {
            float t_o = raymarch(p + n * 0.02, rd_o);
            if (t_o > 0.0) {
                vec3 p2 = p + n * 0.02 + rd_o * t_o;
                vec3 n2 = getNormal(p2);
                float diff = max(dot(n2, normalize(vec3(1.0, 2.0, 3.0))), 0.0);
                col_o = u_colors[1] * diff * 0.8;
            } else {
                col_o = u_colors[1] * 0.15;
            }
        }

        // Trace extraordinary ray color
        vec3 col_e = vec3(0.0);
        if (length(rd_e) > 0.5) {
            float t_e = raymarch(p + n * 0.02, rd_e);
            if (t_e > 0.0) {
                vec3 p3 = p + n * 0.02 + rd_e * t_e;
                vec3 n3 = getNormal(p3);
                float diff = max(dot(n3, normalize(vec3(-1.0, 1.5, 2.0))), 0.0);
                col_e = u_colors[2] * diff * 0.8;
            } else {
                col_e = u_colors[2] * 0.15;
            }
        }

        // Combine ordinary + extraordinary with split visualization
        float splitFactor = 0.5 + 0.3 * dot(n, axis);
        vec3 refractedCol = mix(col_o, col_e, splitFactor);

        // Surface lighting
        vec3 lightDir = normalize(vec3(1.0, 2.0, 3.0));
        lightDir.xz *= rot(u_time * 0.25);
        float diff = max(dot(n, lightDir), 0.0);
        float spec = pow(max(dot(reflect(-lightDir, n), -rd), 0.0), 32.0 + u_treble * 64.0);

        // Thin-film iridescence on surface
        float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 4.0);
        float filmThickness = 1.5 + u_mid * 2.0 + length(p) * 0.3;
        vec3 film = thinFilm(max(dot(n, -rd), 0.0), filmThickness);
        vec3 filmColor = mix(u_colors[1], u_colors[2], film);

        // Compose
        col = refractedCol * 0.4;
        col += diff * mix(u_colors[1], filmColor, 0.5) * 0.5 * ao;
        col += spec * u_colors[2] * (0.5 + u_treble * 1.0);
        col += fresnel * filmColor * 0.6;

        // Rim glow
        col += pow(fresnel, 3.0) * u_colors[2] * (0.3 + u_rms * 0.7);
    }

    // Volumetric glow
    vec3 glowColor = mix(u_colors[1], u_colors[2], 0.6);
    col += glowAccum * glowColor * (u_treble * 1.5 + u_rms * 0.5);

    // Beat flash
    col += vec3(1.0) * u_beat * 0.25;

    // Vignette
    col *= 1.0 - 0.4 * dot(uv, uv);

    // ACES tone mapping
    col = col / (col + vec3(1.0));
    col = pow(col, vec3(0.9));

    gl_FragColor = vec4(col, 1.0);
}

