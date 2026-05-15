uniform sampler2D u_positions;
uniform float u_bass;
attribute vec2 a_ref;
varying vec3 vColor;

void main() {
  vec3 pos = texture2D(u_positions, a_ref).xyz;
  // Scale down
  pos *= 0.03 * (1.0 + u_bass * 0.5);
  vColor = normalize(abs(pos)) * 0.8 + 0.2;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 1.5;
}

