precision highp float;
uniform sampler2D u_positions;
uniform float u_time;
uniform float u_bass;
uniform float u_treble;
uniform vec2 u_resolution;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec3 pos = texture2D(u_positions, uv).xyz;

  // Lorenz system parameters
  float sigma = 10.0;
  float rho = 28.0 + u_bass * 20.0;
  float beta = 8.0 / 3.0;

  float dt = 0.001 + u_treble * 0.005;

  float dx = sigma * (pos.y - pos.x);
  float dy = pos.x * (rho - pos.z) - pos.y;
  float dz = pos.x * pos.y - beta * pos.z;

  pos += vec3(dx, dy, dz) * dt;

  gl_FragColor = vec4(pos, 1.0);
}

