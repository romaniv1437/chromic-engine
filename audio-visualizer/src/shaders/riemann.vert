uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform sampler2D u_freqData;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normal;
  vec3 pos = position;

  // Möbius-inspired deformation driven by audio
  float theta = atan(pos.y, pos.x);
  float phi = acos(pos.z / length(pos));

  // Sample frequency based on vertex angle
  float freq = texture2D(u_freqData, vec2(theta / 6.2832 + 0.5, 0.5)).r;

  // Displacement
  float disp = freq * u_bass * 0.5 + sin(phi * 8.0 + u_time * 2.0) * u_mid * 0.2;
  pos += normal * disp;

  vPosition = pos;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

