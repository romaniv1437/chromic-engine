precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform float u_beat;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];

varying vec2 vUv;

#define MAX_STEPS 90
#define MAX_DIST 40.0
#define SURF_DIST 0.002 // Трохи збільшив для стабільності на гранях

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

// ─── SAFE PATH ─────────────────────────────────────────────────────────────
// Точна траєкторія польоту камери
vec2 path(float z) {
    return vec2(sin(z * 0.15) * 2.0, cos(z * 0.1) * 1.5);
}

// ─── MENGER FRACTAL LOGIC ──────────────────────────────────────────────────
float map(vec3 p) {
    // 1. Абсолютний центр тунелю в поточній точці простору
    vec2 center = path(p.z);

    // 2. БЕЗПЕЧНИЙ ТУНЕЛЬ (Бульдозер). Радіус 1.5 = захист від врізання
    float tube = length(p.xy - center) - 1.5;

    // 3. Формуємо фрактал
    vec3 q = p;
    q.xy -= center; // Відцентровуємо простір по траєкторії камери
    q.xy *= rot(q.z * 0.05); // Легке закручування тунелю

    // Domain repetition (Нескінченна губка)
    q = mod(q, 8.0) - 4.0;

    float scale = 1.0;
    float d = 1e5;

    // Рекурсивне згортання (Menger Fold)
    // Бас тепер впливає ТІЛЬКИ на розмір "пор" фракталу, а не на швидкість простору
    for (int i = 0; i < 4; i++) {
        q = abs(q) - (1.0 + u_bass * 0.3); // Фрактал "дихає" на басах

        if (q.x < q.y) q.xy = q.yx;
        if (q.x < q.z) q.xz = q.zx;
        if (q.y < q.z) q.yz = q.zy;

        float s = 2.4 + u_mid * 0.2;
        q = q * s - 2.0 * (s - 1.0);
        scale *= s;

        // Формула коробок Менгера
        float box = (max(abs(q.x), max(abs(q.y), abs(q.z))) - 2.5) / scale;
        d = min(d, box);
    }

    // 4. НАЙГОЛОВНІШЕ: Вирізаємо безпечний тунель із фракталу
    return max(d, -tube);
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.002, 0.0);
    return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx)
    ));
}

vec3 thinFilm(float cosTheta) {
    return 0.5 + 0.5 * cos(6.28 * (cosTheta + vec3(0.0, 0.33, 0.67) + u_time * 0.2));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.y, u_resolution.x);

    // ─── STABLE CAMERA ───────────────────────────────────────────────────────
    // Швидкість тепер стабільна, летимо тільки вперед
    float time = u_time * 2.5;

    vec3 ro = vec3(path(time), time); // Камера летить чітко по безпечній лінії
    vec3 lookAt = vec3(path(time + 1.0), time + 1.0);

    // Динамічний FOV на басах для відчуття швидкості
    vec3 fwd = normalize(lookAt - ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
    vec3 up = cross(fwd, right);
    float fov = 0.8 + u_bass * 0.2;
    vec3 rd = normalize(uv.x * right + uv.y * up + fov * fwd);

    // Нахил камери (Banking)
    rd.xy *= rot(sin(u_time * 0.5) * 0.2);

    float t = 0.0;
    float glow = 0.0;

    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);
        // Акумуляція неонового світла всередині пор
        glow += exp(-d * 4.0) * (0.015 + u_rms * 0.03);

        if (d < SURF_DIST || t > MAX_DIST) break;
        t += d * 0.7; // 0.7 - безпечний крок для фракталів
    }

    vec3 col = u_colors[0] * 0.02; // Фон - глибокий космос

    if (t < MAX_DIST) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        // Iridescence (Бензин) + Fresnel
        float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 4.5);
        vec3 iri = thinFilm(fresnel);

        // Birefringence - фальшиве розщеплення на гранях
        vec3 rd_o = refract(rd, n, 0.8);
        vec3 rd_e = refract(rd, n, 0.85 + u_treble * 0.2);

        // Світло від внутрішньої геометрії
        vec3 lightCol = mix(u_colors[1], u_colors[2], sin(p.z * 0.1) * 0.5 + 0.5);

        // Obsidian Glass Shader
        col = vec3(0.01); // Темна база
        col += iri * fresnel * 2.0; // Соковиті краї
        col += lightCol * glow * 0.7; // Сяйво

        float spec = pow(max(dot(reflect(rd, n), normalize(vec3(0.0, 1.0, 1.0))), 0.0), 32.0);
        col += spec * u_colors[2] * (1.0 + u_bass);

        // Туман (відрізаємо геометрію вдалині)
        col *= exp(-0.06 * t);
    }

    // Загальний волюметричний Glow
    col += mix(u_colors[1], u_colors[2], 0.5) * glow * 0.3;

    // Спалахи на бітах
    col += vec3(1.0) * u_beat * 0.15;

    // Rich Contrast (АСЕS tone map)
    col = pow(col, vec3(0.85)) * 1.2;

    gl_FragColor = vec4(col, 1.0);
}