precision highp float;
uniform sampler2D u_state;
uniform vec2 u_resolution;
uniform float u_bass;
uniform float u_treble;
uniform float u_time;
varying vec2 vUv;

void main() {
  vec2 texel = 1.0 / u_resolution;
  vec4 state = texture2D(u_state, vUv);
  float a = state.r;
  float b = state.g;

  // Laplacian (5-point stencil)
  float la = -a;
  float lb = -b;
  la += texture2D(u_state, vUv + vec2(texel.x, 0.0)).r * 0.2;
  la += texture2D(u_state, vUv - vec2(texel.x, 0.0)).r * 0.2;
  la += texture2D(u_state, vUv + vec2(0.0, texel.y)).r * 0.2;
  la += texture2D(u_state, vUv - vec2(0.0, texel.y)).r * 0.2;
  la += texture2D(u_state, vUv + texel).r * 0.05;
  la += texture2D(u_state, vUv - texel).r * 0.05;
  la += texture2D(u_state, vUv + vec2(texel.x, -texel.y)).r * 0.05;
  la += texture2D(u_state, vUv + vec2(-texel.x, texel.y)).r * 0.05;

  lb += texture2D(u_state, vUv + vec2(texel.x, 0.0)).g * 0.2;
  lb += texture2D(u_state, vUv - vec2(texel.x, 0.0)).g * 0.2;
  lb += texture2D(u_state, vUv + vec2(0.0, texel.y)).g * 0.2;
  lb += texture2D(u_state, vUv - vec2(0.0, texel.y)).g * 0.2;
  lb += texture2D(u_state, vUv + texel).g * 0.05;
  lb += texture2D(u_state, vUv - texel).g * 0.05;
  lb += texture2D(u_state, vUv + vec2(texel.x, -texel.y)).g * 0.05;
  lb += texture2D(u_state, vUv + vec2(-texel.x, texel.y)).g * 0.05;

  // Gray-Scott parameters modulated by audio
  float f = 0.037 + u_bass * 0.03;
  float k = 0.06 + u_treble * 0.02;
  float Da = 1.0;
  float Db = 0.5;

  float abb = a * b * b;
  float na = a + (Da * la - abb + f * (1.0 - a));
  float nb = b + (Db * lb + abb - (k + f) * b);

  gl_FragColor = vec4(clamp(na, 0.0, 1.0), clamp(nb, 0.0, 1.0), 0.0, 1.0);
}

