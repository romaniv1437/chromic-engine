// GPGPU Fluid velocity simulation
precision highp float;
uniform sampler2D u_velocity;
uniform sampler2D u_pressure;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_bass;
uniform float u_dissipation;

varying vec2 vUv;

void main() {
  vec2 texel = 1.0 / u_resolution;
  vec2 vel = texture2D(u_velocity, vUv).xy;

  // Advect velocity field
  vec2 prevPos = vUv - vel * texel * 1.0;
  vec2 advected = texture2D(u_velocity, prevPos).xy;

  // Pressure gradient subtraction (simple projection)
  float pL = texture2D(u_pressure, vUv - vec2(texel.x, 0.0)).x;
  float pR = texture2D(u_pressure, vUv + vec2(texel.x, 0.0)).x;
  float pB = texture2D(u_pressure, vUv - vec2(0.0, texel.y)).x;
  float pT = texture2D(u_pressure, vUv + vec2(0.0, texel.y)).x;
  advected -= 0.5 * vec2(pR - pL, pT - pB);

  // Bass-driven injection points
  float angle1 = u_time * 1.7;
  float angle2 = u_time * 2.3 + 3.14;
  vec2 injectPos1 = vec2(0.5 + 0.3 * cos(angle1), 0.5 + 0.3 * sin(angle1));
  vec2 injectPos2 = vec2(0.5 + 0.2 * cos(angle2), 0.5 + 0.2 * sin(angle2));

  float dist1 = length(vUv - injectPos1);
  float dist2 = length(vUv - injectPos2);
  float inject1 = smoothstep(0.08, 0.0, dist1) * u_bass * 3.0;
  float inject2 = smoothstep(0.08, 0.0, dist2) * u_bass * 3.0;

  vec2 force1 = vec2(cos(u_time * 3.0), sin(u_time * 2.0)) * inject1;
  vec2 force2 = vec2(sin(u_time * 2.5), cos(u_time * 1.8)) * inject2;

  advected += force1 + force2;

  // Dissipation
  advected *= u_dissipation;

  gl_FragColor = vec4(advected, 0.0, 1.0);
}

