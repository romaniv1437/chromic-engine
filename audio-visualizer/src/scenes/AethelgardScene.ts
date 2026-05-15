import * as THREE from 'three';
import { BaseScene } from './BaseScene';
import { AudioData } from '../audio/AudioProcessor';
import vertShader from '../shaders/fullscreen.vert';
import fragShader from '../shaders/aethelgard.frag';

/**
 * AethelgardScene — The Unified Cosmic Engine.
 * Voxel-branching raymarch through 4 fractal biomes:
 * Mandelbox City, Apollonian Void, Menger Spire, Hyper-Lattice.
 * Infinite tunnel path with volumetric light accumulation.
 */
export class AethelgardScene extends BaseScene {
  private material: THREE.ShaderMaterial;
  private bassHistory: number[] = [];
  private lastBeatTime = 0;
  private currentBeat = 0;
  private currentEnergy = 0;

  constructor() {
    super();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertShader,
      fragmentShader: fragShader,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_beat: { value: 0 },
        u_energy: { value: 0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_colors: {
          value: [
            new THREE.Color(0x020810),
            new THREE.Color(0x1a4a6b),
            new THREE.Color(0x00d4ff),
          ],
        },
      },
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);
    this.scene.add(quad);
  }

  setPalette(colors: [THREE.Color, THREE.Color, THREE.Color]) {
    this.material.uniforms.u_colors.value = colors;
  }

  update(audio: AudioData, time: number) {
    const { bass, mid, treble, rms } = audio;

    // Beat detection
    this.bassHistory.push(bass);
    if (this.bassHistory.length > 20) this.bassHistory.shift();
    const avgBass = this.bassHistory.reduce((a, b) => a + b, 0) / this.bassHistory.length;
    const now = performance.now();
    if (bass > avgBass * 1.4 && bass > 0.35 && now - this.lastBeatTime > 150) {
      this.currentBeat = 1.0;
      this.lastBeatTime = now;
    }
    this.currentBeat *= 0.9;
    if (this.currentBeat < 0.01) this.currentBeat = 0;

    // Energy accumulator
    const instant = (bass * 0.4 + mid * 0.35 + treble * 0.25) * 2.0;
    this.currentEnergy = this.currentEnergy * 0.96 + instant * 0.04;
    this.currentEnergy = Math.min(this.currentEnergy, 1.0);

    this.material.uniforms.u_time.value = time;
    this.material.uniforms.u_bass.value = bass;
    this.material.uniforms.u_mid.value = mid;
    this.material.uniforms.u_treble.value = treble;
    this.material.uniforms.u_rms.value = rms;
    this.material.uniforms.u_beat.value = this.currentBeat;
    this.material.uniforms.u_energy.value = this.currentEnergy;
  }

  resize(w: number, h: number, dpr?: number) {
    const effectiveDpr = dpr || window.devicePixelRatio || 1;
    this.material.uniforms.u_resolution.value.set(w * effectiveDpr, h * effectiveDpr);
  }

  dispose() {
    this.material.dispose();
  }
}

