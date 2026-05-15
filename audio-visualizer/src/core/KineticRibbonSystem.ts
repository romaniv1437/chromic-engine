import * as THREE from 'three';
import { AudioData } from '../audio/AudioProcessor';

/**
 * KineticRibbonSystem — 200 instanced flowing ribbons that orbit
 * and weave around the camera. Bass compresses them toward center,
 * energy increases chaos/velocity. Uses InstancedMesh for GPU efficiency.
 */

const RIBBON_COUNT = 200;
const RIBBON_SEGMENTS = 12;

// Ribbon vertex shader — each instance is a thin quad strip segment
const ribbonVertexShader = `
  attribute vec3 instanceOffset;
  attribute float instancePhase;
  attribute float instanceSpeed;
  attribute vec3 instanceColor;

  uniform float u_time;
  uniform float u_bass;
  uniform float u_energy;
  uniform float u_beat;

  varying vec3 vColor;
  varying float vAlpha;
  varying vec3 vNormal;

  void main() {
    vColor = instanceColor;

    // Ribbon animation: Bézier-like path from sin/cos composition
    float t = u_time * instanceSpeed + instancePhase;
    float bassCompress = 1.0 - u_bass * 0.4;

    // Orbital path
    vec3 pathPos = vec3(
      sin(t * 0.7 + instancePhase * 3.0) * (2.0 + sin(t * 0.3) * 1.5) * bassCompress,
      cos(t * 0.5 + instancePhase * 2.0) * (1.5 + cos(t * 0.4) * 1.0) * bassCompress,
      sin(t * 0.9 + instancePhase) * (2.5 + sin(t * 0.2) * 1.0) * bassCompress
    );

    // Turbulence on high energy
    float turb = u_energy * 0.5 + u_beat * 0.8;
    pathPos += vec3(
      sin(t * 5.0 + instancePhase * 10.0),
      cos(t * 4.3 + instancePhase * 8.0),
      sin(t * 3.7 + instancePhase * 12.0)
    ) * turb * 0.3;

    vec3 displaced = position + instanceOffset + pathPos;

    // Fade edges
    float segmentT = (position.y + 0.5); // 0..1 along ribbon length
    vAlpha = smoothstep(0.0, 0.1, segmentT) * smoothstep(1.0, 0.9, segmentT);
    vAlpha *= 0.6 + u_energy * 0.4;

    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const ribbonFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  varying vec3 vNormal;

  uniform vec3 u_accentColor;
  uniform float u_rms;

  void main() {
    // Soft lighting
    vec3 light = normalize(vec3(0.5, 1.0, 0.3));
    float diff = max(dot(vNormal, light), 0.0) * 0.5 + 0.5;

    vec3 col = vColor * diff;

    // RMS glow
    col += u_accentColor * u_rms * 0.3;

    // Slight emissive
    col += vColor * 0.1;

    gl_FragColor = vec4(col, vAlpha);
  }
`;

export class KineticRibbonSystem {
  private mesh: THREE.InstancedMesh;
  private material: THREE.ShaderMaterial;
  private offsets: Float32Array;
  private phases: Float32Array;
  private speeds: Float32Array;
  private dummy = new THREE.Object3D();

  constructor() {
    // Each ribbon is a thin plane segment
    const geo = new THREE.PlaneGeometry(0.02, 0.3, 1, RIBBON_SEGMENTS);

    this.material = new THREE.ShaderMaterial({
      vertexShader: ribbonVertexShader,
      fragmentShader: ribbonFragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_energy: { value: 0 },
        u_beat: { value: 0 },
        u_rms: { value: 0 },
        u_accentColor: { value: new THREE.Color(0x00d4ff) },
      },
    });

    this.mesh = new THREE.InstancedMesh(geo, this.material, RIBBON_COUNT);
    this.mesh.frustumCulled = false;
    this.mesh.layers.set(0);

    // Instance attributes
    this.offsets = new Float32Array(RIBBON_COUNT * 3);
    this.phases = new Float32Array(RIBBON_COUNT);
    this.speeds = new Float32Array(RIBBON_COUNT);

    const colors = new Float32Array(RIBBON_COUNT * 3);

    for (let i = 0; i < RIBBON_COUNT; i++) {
      // Random spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 3.0;

      this.offsets[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      this.offsets[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      this.offsets[i * 3 + 2] = r * Math.cos(phi);

      this.phases[i] = Math.random() * Math.PI * 2;
      this.speeds[i] = 0.3 + Math.random() * 0.7;

      // Color: cool tones (will be overridden by palette)
      const hue = 0.5 + Math.random() * 0.3;
      const c = new THREE.Color().setHSL(hue, 0.7, 0.5);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      // Set instance matrix (identity — positioning done in shader)
      this.dummy.position.set(0, 0, 0);
      this.dummy.updateMatrix();
      this.mesh.setMatrixAt(i, this.dummy.matrix);
    }

    // Add instance attributes
    geo.setAttribute('instanceOffset', new THREE.InstancedBufferAttribute(this.offsets, 3));
    geo.setAttribute('instancePhase', new THREE.InstancedBufferAttribute(this.phases, 1));
    geo.setAttribute('instanceSpeed', new THREE.InstancedBufferAttribute(this.speeds, 1));
    geo.setAttribute('instanceColor', new THREE.InstancedBufferAttribute(colors, 3));
  }

  addToScene(scene: THREE.Scene) {
    scene.add(this.mesh);
  }

  removeFromScene(scene: THREE.Scene) {
    scene.remove(this.mesh);
  }

  setAccentColor(color: THREE.Color) {
    this.material.uniforms.u_accentColor.value = color;
  }

  update(audio: AudioData, time: number) {
    this.material.uniforms.u_time.value = time;
    this.material.uniforms.u_bass.value = audio.bass;
    this.material.uniforms.u_rms.value = audio.rms;

    // Compute energy on CPU side
    const energy = (audio.bass * 0.5 + audio.mid * 0.3 + audio.treble * 0.2) * 2.0;
    this.material.uniforms.u_energy.value = Math.min(energy, 1.0);

    // Beat detection (simple threshold)
    this.material.uniforms.u_beat.value = audio.bass > 0.6 ? 1.0 : this.material.uniforms.u_beat.value * 0.9;
  }

  setVisible(v: boolean) {
    this.mesh.visible = v;
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.material.dispose();
  }
}

