precision highp float;
uniform float u_time;
uniform float u_rms;
uniform float u_mid;
uniform vec2 u_resolution;
varying vec2 vUv;

// Complex division
vec2 cdiv(vec2 a, vec2 b) {
  float d = dot(b, b);
  return vec2(a.x*b.x + a.y*b.y, a.y*b.x - a.x*b.y) / d;
}

// Hyperbolic distance
float hdist(vec2 a, vec2 b) {
  vec2 diff = a - b;
  float num = length(diff);
  float denom = length(vec2(1.0) - a * b);
  return log((1.0 + num/denom) / (1.0 - num/denom + 0.001));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;

  // Zoom into hyperbolic space driven by rms
  float zoom = 1.0 + u_rms * 2.0 + sin(u_time * 0.2) * 0.3;
  uv *= zoom;

  // Check if inside Poincaré disk
  float r = length(uv);
  if (r > 0.99) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // Hyperbolic tiling - {7,3} tessellation approximation
  float angle = atan(uv.y, uv.x);
  float n = 7.0; // heptagonal tiling

  // Repeated Möbius reflections
  vec2 z = uv;
  float edgeDist = 1.0;

  for (int i = 0; i < 12; i++) {
    // Rotate to fundamental domain
    float a = floor(atan(z.y, z.x) / (6.2832 / n) + 0.5) * (6.2832 / n);
    float cs = cos(-a), sn = sin(-a);
    z = vec2(z.x * cs - z.y * sn, z.x * sn + z.y * cs);

    // Inversion in geodesic circle
    float geoR = 1.0 / cos(3.14159 / n);
    vec2 center = vec2(geoR, 0.0);
    vec2 diff = z - center;
    float d = dot(diff, diff);
    float invR2 = geoR * geoR - 1.0;

    if (d < invR2) {
      z = center + diff * invR2 / d;
    } else {
      break;
    }

    edgeDist = min(edgeDist, abs(length(diff) - sqrt(invR2)));
  }

  // Coloring
  float tile = mod(floor(atan(z.y, z.x) * n / 6.2832), 2.0);
  vec3 col = mix(vec3(0.05, 0.05, 0.2), vec3(0.1, 0.0, 0.3), tile);

  // Edge glow modulated by mid frequencies
  float edge = smoothstep(0.02, 0.0, edgeDist);
  col += vec3(0.3, 0.6, 1.0) * edge * (0.5 + u_mid * 2.0);

  // Disk boundary glow
  col += vec3(0.1, 0.2, 0.5) * smoothstep(0.9, 1.0, r);

  gl_FragColor = vec4(col, 1.0);
}

