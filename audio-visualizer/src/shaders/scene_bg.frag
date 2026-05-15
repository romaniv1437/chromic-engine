// Subtle animated dark gradient background for 3D scenes
uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_color1;
uniform vec3 u_color2;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  // Subtle animated gradient
  float angle = u_time * 0.05;
  vec2 dir = vec2(cos(angle), sin(angle));
  float grad = dot(uv - 0.5, dir) + 0.5;
  grad = clamp(grad, 0.0, 1.0);

  vec3 col = mix(u_color1 * 0.3, u_color2 * 0.2, grad);

  // Vignette
  float vig = 1.0 - dot(uv - 0.5, uv - 0.5) * 1.5;
  col *= max(vig, 0.1);

  gl_FragColor = vec4(col, 1.0);
}

