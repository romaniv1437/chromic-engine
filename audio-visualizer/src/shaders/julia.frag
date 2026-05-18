precision highp float;
uniform float u_time;
uniform float u_bass;
uniform float u_treble;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
varying vec2 vUv;

// Quaternion multiplication
vec4 qMul(vec4 a, vec4 b) {
  return vec4(
    a.x*b.x - a.y*b.y - a.z*b.z - a.w*b.w,
    a.x*b.y + a.y*b.x + a.z*b.w - a.w*b.z,
    a.x*b.z - a.y*b.w + a.z*b.x + a.w*b.y,
    a.x*b.w + a.y*b.z - a.z*b.y + a.w*b.x
  );
}

float julia4D(vec3 p, vec4 c) {
  vec4 z = vec4(p, 0.0);
  float md2 = 1.0;
  float mz2 = dot(z, z);

  for (int i = 0; i < 8; i++) {
    md2 *= 4.0 * mz2;
    z = qMul(z, z) + c;
    mz2 = dot(z, z);
    if (mz2 > 4.0) break;
  }

  return 0.25 * sqrt(mz2 / md2) * log(mz2);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;

  // Camera
  vec3 ro = vec3(0.0, 0.0, 2.5);
  vec3 rd = normalize(vec3(uv, -1.5));

  // Audio-reactive Julia constant
  vec4 c = vec4(
    -0.2 + u_bass * 0.6 * sin(u_time * 0.3),
    0.6 + u_bass * 0.3 * cos(u_time * 0.2),
    0.2 + u_bass * 0.2 * sin(u_time * 0.5),
    -0.5 + u_bass * 0.4
  );

  // Raymarching
  float t = 0.0;
  vec3 col = vec3(0.0);

  for (int i = 0; i < 64; i++) {
    vec3 p = ro + rd * t;
    float d = julia4D(p, c);
    if (d < 0.002) {
      // Palette-driven lighting
      float glow = 1.0 - float(i) / 64.0;
      float colorIdx = glow * 2.0;
      vec3 baseCol = colorIdx < 1.0 ? mix(u_colors[0], u_colors[1], colorIdx) : mix(u_colors[1], u_colors[2], colorIdx - 1.0);
      col = baseCol * (0.4 + glow * 0.8);
      break;
    }
    t += d * 0.8;
    if (t > 10.0) break;
  }

  // Treble adds glow accumulation using palette
  col += u_colors[2] * u_treble * 0.3;

  // Background color from palette
  vec3 bg = u_colors[0] * 0.15 + u_colors[2] * 0.05 * (1.0 - length(uv));
  float hit = step(0.01, length(col));
  col = mix(bg, col, hit);

  gl_FragColor = vec4(col, 1.0);
}

