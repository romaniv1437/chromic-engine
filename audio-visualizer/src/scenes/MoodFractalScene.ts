import * as THREE from 'three';
import { BaseScene } from './BaseScene';
import { AudioData } from '../audio/AudioProcessor';
import vertShader from '../shaders/fullscreen.vert';
import fragShader from '../shaders/mood_fractal.frag';

/**
 * MoodFractalScene — A 3D Raymarching IFS/Mandelbulb fractal driven by
 * psychoacoustic mood analysis. Bass warps space, mid controls complexity,
 * treble adds sparkle, and beat detection creates camera shake impulses.
 */
export class MoodFractalScene extends BaseScene {
  private material: THREE.ShaderMaterial;

  // ── Beat Detection State ──
  private bassHistory: number[] = [];
  private lastBeatTime = 0;
  private currentBeat = 0;       // Decaying beat impulse (0-1)
  private currentEnergy = 0;     // Smoothed energy/aggression accumulator

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
            new THREE.Color(0x0a1628),
            new THREE.Color(0x1a6b4e),
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

    // ── Beat Detection ──
    // Track bass history (last ~20 frames) to detect spikes
    this.bassHistory.push(bass);
    if (this.bassHistory.length > 20) this.bassHistory.shift();

    const avgBass = this.bassHistory.reduce((a, b) => a + b, 0) / this.bassHistory.length;
    const now = performance.now();

    // Beat = bass spike above 1.4x average, with 150ms cooldown
    if (bass > avgBass * 1.4 && bass > 0.35 && now - this.lastBeatTime > 150) {
      this.currentBeat = 1.0;
      this.lastBeatTime = now;
    }

    // Exponential decay of beat pulse
    this.currentBeat *= 0.88;
    if (this.currentBeat < 0.01) this.currentBeat = 0;

    // ── Energy/Aggression Accumulator ──
    // High bass + high mid = aggressive (drops), fast decay so it resets between sections
    const instantEnergy = (bass * 0.5 + mid * 0.3 + treble * 0.2) * 2.0;
    // Asymmetric: fast rise (0.08), very fast decay (0.92) — resets naturally in quiet parts
    if (instantEnergy > this.currentEnergy) {
      this.currentEnergy = this.currentEnergy * 0.92 + instantEnergy * 0.08;
    } else {
      this.currentEnergy = this.currentEnergy * 0.985 + instantEnergy * 0.015;
    }
    // If audio is essentially silent (track change), decay rapidly
    if (rms < 0.01) {
      this.currentEnergy *= 0.9;
    }
    this.currentEnergy = Math.min(this.currentEnergy, 1.0);

    // ── Push to GPU ──
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

