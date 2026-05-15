// Advect album art texture using velocity field + Voronoi shatter + chromatic aberration
// Palette-driven: u_colors from album cover extraction or audio-reactive mode
precision highp float;
uniform sampler2D u_albumArt;
uniform sampler2D u_velocity;
uniform sampler2D u_prevFrame;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_bass;
uniform float u_treble;
uniform float u_rms;
uniform float u_healRate;
uniform vec3 u_colors[3];

varying vec2 vUv;

// Voronoi
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

float voronoi(vec2 p, float scale) {
  vec2 n = floor(p * scale);
  vec2 f = fract(p * scale);
  float md = 8.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = hash2(n + g);
      o = 0.5 + 0.5 * sin(u_time * 0.5 + 6.2831 * o);
      vec2 r = g + o - f;
      float d = dot(r, r);
      md = min(md, d);
    }
  }
  return sqrt(md);
}

// Map grayscale luminance to palette gradient
vec3 paletteMap(float lum, vec3 c0, vec3 c1, vec3 c2) {
  // 3-stop gradient: dark->mid->bright using palette colors
  if (lum < 0.5) {
    return mix(c0, c1, lum * 2.0);
  }
  return mix(c1, c2, (lum - 0.5) * 2.0);
}

void main() {
  vec2 texel = 1.0 / u_resolution;

  // Read velocity and advect
  vec2 vel = texture2D(u_velocity, vUv).xy;
  vec2 advectedUv = vUv - vel * texel * 2.0;

  // Chromatic aberration based on RMS
  float aberration = u_rms * 0.008;
  vec2 dir = normalize(vUv - 0.5) * aberration;
  float r = texture2D(u_albumArt, advectedUv + dir).r;
  float g = texture2D(u_albumArt, advectedUv).g;
  float b = texture2D(u_albumArt, advectedUv - dir).b;
  vec3 advectedColor = vec3(r, g, b);

  // Original album art for healing
  vec3 original = texture2D(u_albumArt, vUv).rgb;

  // Self-healing: lerp back to original
  vec3 color = mix(advectedColor, original, u_healRate);

  // Apply palette tinting — blend album art luminance through palette gradient
  float lum = dot(color, vec3(0.2126, 0.7152, 0.0722));
  vec3 paletteTinted = paletteMap(lum, u_colors[0], u_colors[1], u_colors[2]);
  // Mix: keep album art structure but shift hues toward palette
  // Stronger tinting on bass hits, subtle baseline
  float tintStrength = 0.3 + u_bass * 0.35;
  color = mix(color, paletteTinted, tintStrength);

  // Voronoi shatter on treble
  float vor = voronoi(vUv, 6.0 + u_treble * 4.0);
  float shatterEdge = smoothstep(0.02, 0.05, vor);
  // Treble makes cells visible as refractive edges
  vec3 shatterColor = mix(color * 1.3, color, shatterEdge);
  color = mix(color, shatterColor, u_treble * 0.7);

  // Edge glow from voronoi — uses palette accent color
  float edgeGlow = smoothstep(0.05, 0.01, vor) * u_treble;
  color += u_colors[2] * edgeGlow * 1.5;

  // Feedback: blend with previous frame (trailing)
  vec3 prev = texture2D(u_prevFrame, vUv * 1.005).rgb; // slight zoom for trail
  color = mix(color, prev, 0.15);

  // Bass pulse: radial glow using palette base+mid blend
  float bassGlow = u_bass * 0.15;
  float radial = 1.0 - length(vUv - 0.5) * 1.4;
  color += mix(u_colors[0], u_colors[1], 0.5) * bassGlow * max(radial, 0.0);

  // Accent sparkle on high energy
  float energy = u_rms * u_treble;
  color += u_colors[2] * energy * 0.2 * smoothstep(0.4, 0.8, vor);

  gl_FragColor = vec4(color, 1.0);
}
