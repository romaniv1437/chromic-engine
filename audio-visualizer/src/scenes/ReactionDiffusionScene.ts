import * as THREE from 'three';
import { BaseScene } from './BaseScene';
import { AudioData } from '../audio/AudioProcessor';
import fullscreenVert from '../shaders/fullscreen.vert';
import rdFrag from '../shaders/reaction_diff.frag';

const RD_SIZE = 512;

export class ReactionDiffusionScene extends BaseScene {
  private renderer: THREE.WebGLRenderer;
  private rt1: THREE.WebGLRenderTarget;
  private rt2: THREE.WebGLRenderTarget;
  private simScene: THREE.Scene;
  private simCamera: THREE.OrthographicCamera;
  private simMaterial: THREE.ShaderMaterial;
  private displayMaterial: THREE.MeshBasicMaterial;
  private flip = false;

  constructor(renderer: THREE.WebGLRenderer) {
    super();
    this.renderer = renderer;
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const rtOpts: THREE.RenderTargetOptions = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, type: THREE.FloatType };
    this.rt1 = new THREE.WebGLRenderTarget(RD_SIZE, RD_SIZE, rtOpts);
    this.rt2 = new THREE.WebGLRenderTarget(RD_SIZE, RD_SIZE, rtOpts);

    // Init state: A=1 everywhere, B=1 in center seed
    const data = new Float32Array(RD_SIZE * RD_SIZE * 4);
    for (let i = 0; i < RD_SIZE * RD_SIZE; i++) {
      const x = (i % RD_SIZE) / RD_SIZE - 0.5;
      const y = Math.floor(i / RD_SIZE) / RD_SIZE - 0.5;
      data[i * 4] = 1.0; // A
      data[i * 4 + 1] = (Math.abs(x) < 0.05 && Math.abs(y) < 0.05) ? 1.0 : 0.0; // B
      data[i * 4 + 2] = 0;
      data[i * 4 + 3] = 1;
    }
    const initTex = new THREE.DataTexture(data, RD_SIZE, RD_SIZE, THREE.RGBAFormat, THREE.FloatType);
    initTex.needsUpdate = true;

    this.simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.simScene = new THREE.Scene();
    this.simMaterial = new THREE.ShaderMaterial({
      vertexShader: fullscreenVert,
      fragmentShader: rdFrag,
      uniforms: {
        u_state: { value: initTex },
        u_resolution: { value: new THREE.Vector2(RD_SIZE, RD_SIZE) },
        u_bass: { value: 0 },
        u_treble: { value: 0 },
        u_time: { value: 0 },
      },
    });
    this.simScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.simMaterial));

    // Initial render
    renderer.setRenderTarget(this.rt1);
    renderer.render(this.simScene, this.simCamera);
    renderer.setRenderTarget(null);

    // Display quad
    this.displayMaterial = new THREE.MeshBasicMaterial({ map: this.rt1.texture });
    this.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.displayMaterial));
  }

  update(audio: AudioData, time: number) {
    // Run multiple simulation steps per frame
    for (let i = 0; i < 8; i++) {
      const src = this.flip ? this.rt2 : this.rt1;
      const dst = this.flip ? this.rt1 : this.rt2;
      this.simMaterial.uniforms.u_state.value = src.texture;
      this.simMaterial.uniforms.u_bass.value = audio.bass;
      this.simMaterial.uniforms.u_treble.value = audio.treble;
      this.simMaterial.uniforms.u_time.value = time;
      this.renderer.setRenderTarget(dst);
      this.renderer.render(this.simScene, this.simCamera);
      this.flip = !this.flip;
    }
    this.renderer.setRenderTarget(null);
    this.displayMaterial.map = (this.flip ? this.rt2 : this.rt1).texture;
    this.displayMaterial.needsUpdate = true;
  }

  dispose() {
    this.rt1.dispose();
    this.rt2.dispose();
    this.simMaterial.dispose();
    this.displayMaterial.dispose();
  }
}

