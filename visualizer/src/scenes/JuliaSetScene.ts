import * as THREE from 'three';
import { BaseScene } from './BaseScene';
import { AudioData } from '../audio/AudioAnalyzer';
import vertShader from '../shaders/fullscreen.vert';
import fragShader from '../shaders/julia.frag';

export class JuliaSetScene extends BaseScene {
  private material: THREE.ShaderMaterial;

  constructor() {
    super();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertShader,
      fragmentShader: fragShader,
      uniforms: {
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_treble: { value: 0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);
    this.scene.add(quad);
  }

  update(audio: AudioData, time: number) {
    this.material.uniforms.u_time.value = time;
    this.material.uniforms.u_bass.value = audio.bass;
    this.material.uniforms.u_treble.value = audio.treble;
  }

  resize(w: number, h: number) {
    this.material.uniforms.u_resolution.value.set(w, h);
  }

  dispose() {
    this.material.dispose();
  }
}

