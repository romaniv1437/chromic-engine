import * as THREE from 'three';
import { BaseScene } from './BaseScene';
import { AudioData } from '../audio/AudioProcessor';
import fullscreenVert from '../shaders/fullscreen.vert';
import fluidVelFrag from '../shaders/fluid_velocity.frag';
import canvasFrag from '../shaders/living_canvas.frag';

const SIM_SIZE = 256;

export class LivingCanvasScene extends BaseScene {
  private renderer: THREE.WebGLRenderer;
  private velRT1: THREE.WebGLRenderTarget;
  private velRT2: THREE.WebGLRenderTarget;
  private frameRT1: THREE.WebGLRenderTarget;
  private frameRT2: THREE.WebGLRenderTarget;
  private velMaterial: THREE.ShaderMaterial;
  private canvasMaterial: THREE.ShaderMaterial;
  private simScene: THREE.Scene;
  private simCamera: THREE.OrthographicCamera;
  private flip = false;
  private albumTexture: THREE.Texture;
  private defaultTexture: THREE.DataTexture;

  constructor(renderer: THREE.WebGLRenderer) {
    super();
    this.renderer = renderer;
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Create default gradient texture
    const size = 128;
    const data = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        const u = x / size, v = y / size;
        data[i] = Math.floor((0.1 + u * 0.2) * 255);
        data[i + 1] = Math.floor((0.05 + v * 0.15) * 255);
        data[i + 2] = Math.floor((0.2 + (u + v) * 0.15) * 255);
        data[i + 3] = 255;
      }
    }
    this.defaultTexture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    this.defaultTexture.needsUpdate = true;
    this.albumTexture = this.defaultTexture;

    // Render targets for velocity ping-pong
    const rtOpts: THREE.RenderTargetOptions = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
    };
    this.velRT1 = new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, rtOpts);
    this.velRT2 = new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, rtOpts);

    // Frame feedback targets (full res)
    const w = window.innerWidth, h = window.innerHeight;
    const frameOpts: THREE.RenderTargetOptions = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.UnsignedByteType,
    };
    this.frameRT1 = new THREE.WebGLRenderTarget(w, h, frameOpts);
    this.frameRT2 = new THREE.WebGLRenderTarget(w, h, frameOpts);

    // Sim scene for GPGPU
    this.simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.simScene = new THREE.Scene();

    // Velocity material
    this.velMaterial = new THREE.ShaderMaterial({
      vertexShader: fullscreenVert,
      fragmentShader: fluidVelFrag,
      uniforms: {
        u_velocity: { value: null },
        u_pressure: { value: null },
        u_resolution: { value: new THREE.Vector2(SIM_SIZE, SIM_SIZE) },
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_dissipation: { value: 0.97 },
      },
    });
    const simQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.velMaterial);
    this.simScene.add(simQuad);

    // Main display material
    this.canvasMaterial = new THREE.ShaderMaterial({
      vertexShader: fullscreenVert,
      fragmentShader: canvasFrag,
      uniforms: {
        u_albumArt: { value: this.albumTexture },
        u_velocity: { value: this.velRT1.texture },
        u_prevFrame: { value: this.frameRT1.texture },
        u_resolution: { value: new THREE.Vector2(w, h) },
        u_time: { value: 0 },
        u_bass: { value: 0 },
        u_treble: { value: 0 },
        u_rms: { value: 0 },
        u_healRate: { value: 0.02 },
        u_colors: {
          value: [
            new THREE.Color(0x1a0533),
            new THREE.Color(0x4a1942),
            new THREE.Color(0x3388ff),
          ],
        },
      },
    });
    const displayQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.canvasMaterial);
    this.scene.add(displayQuad);

    if((globalThis as any).__DEBUG__)console.log('[LivingCanvas] Scene initialized');
  }

  setAlbumArt(imageUrl: string) {
    const loader = new THREE.TextureLoader();
    loader.load(imageUrl, (tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      this.albumTexture = tex;
      this.canvasMaterial.uniforms.u_albumArt.value = tex;
      if((globalThis as any).__DEBUG__)console.log('[LivingCanvas] Album art loaded:', imageUrl);
    }, undefined, () => {
      console.warn('[LivingCanvas] Failed to load album art, using default');
    });
  }

  setAlbumTexture(texture: THREE.Texture) {
    this.albumTexture = texture;
    this.canvasMaterial.uniforms.u_albumArt.value = texture;
  }

  setPalette(colors: [THREE.Color, THREE.Color, THREE.Color]) {
    this.canvasMaterial.uniforms.u_colors.value = colors;
  }

  update(audio: AudioData, time: number) {
    // Update velocity simulation
    const srcVel = this.flip ? this.velRT2 : this.velRT1;
    const dstVel = this.flip ? this.velRT1 : this.velRT2;

    this.velMaterial.uniforms.u_velocity.value = srcVel.texture;
    this.velMaterial.uniforms.u_pressure.value = srcVel.texture; // simplified
    this.velMaterial.uniforms.u_time.value = time;
    this.velMaterial.uniforms.u_bass.value = audio.bass;

    this.renderer.setRenderTarget(dstVel);
    this.renderer.render(this.simScene, this.simCamera);
    this.renderer.setRenderTarget(null);

    // Update display uniforms
    this.canvasMaterial.uniforms.u_velocity.value = dstVel.texture;
    this.canvasMaterial.uniforms.u_time.value = time;
    this.canvasMaterial.uniforms.u_bass.value = audio.bass;
    this.canvasMaterial.uniforms.u_treble.value = audio.treble;
    this.canvasMaterial.uniforms.u_rms.value = audio.rms;

    // Feedback: use previous frame
    const srcFrame = this.flip ? this.frameRT2 : this.frameRT1;
    const dstFrame = this.flip ? this.frameRT1 : this.frameRT2;
    this.canvasMaterial.uniforms.u_prevFrame.value = srcFrame.texture;

    // Render to feedback target
    this.renderer.setRenderTarget(dstFrame);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(null);

    // The main scene render will happen via post-processing composer
    this.flip = !this.flip;
  }

  resize(w: number, h: number, dpr?: number) {
    const effectiveDpr = dpr || window.devicePixelRatio || 1;
    this.canvasMaterial.uniforms.u_resolution.value.set(w * effectiveDpr, h * effectiveDpr);
    // Resize frame buffers
    this.frameRT1.setSize(w, h);
    this.frameRT2.setSize(w, h);
  }

  dispose() {
    this.velRT1.dispose();
    this.velRT2.dispose();
    this.frameRT1.dispose();
    this.frameRT2.dispose();
    this.velMaterial.dispose();
    this.canvasMaterial.dispose();
    if (this.albumTexture !== this.defaultTexture) {
      this.albumTexture.dispose();
    }
    this.defaultTexture.dispose();
  }
}

