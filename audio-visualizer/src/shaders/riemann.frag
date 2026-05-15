uniform float u_time;
uniform float u_treble;
uniform vec3 u_colors[3];
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 light = normalize(vec3(1.0, 1.0, 2.0));
  float diff = max(dot(vNormal, light), 0.0);
  vec3 viewDir = normalize(-vPosition);
  vec3 reflectDir = reflect(-light, vNormal);
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);

  // Palette-driven coloring based on normal orientation
  float normMix = dot(vNormal, vec3(0.0, 1.0, 0.0)) * 0.5 + 0.5;
  vec3 baseCol = normMix < 0.5 ? mix(u_colors[0], u_colors[1], normMix * 2.0) : mix(u_colors[1], u_colors[2], (normMix - 0.5) * 2.0);
  vec3 col = baseCol * (0.3 + diff * 0.7) + u_colors[2] * spec * (0.5 + u_treble);
  col += u_colors[0] * 0.08;
  gl_FragColor = vec4(col, 1.0);
}

