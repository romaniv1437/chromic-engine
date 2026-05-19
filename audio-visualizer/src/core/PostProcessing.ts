import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { AudioData } from '../audio/AudioProcessor';

// Chromatic Aberration — RGB channel offset on beat
const ChromaticAberrationShader = {
  uniforms: {
    tDiffuse: { value: null },
    u_intensity: { value: 0.0 },
    u_resolution: { value: new THREE.Vector2(1, 1) },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float u_intensity;
    uniform vec2 u_resolution;
    varying vec2 vUv;
    void main() {
      if (u_intensity < 0.001) {
        gl_FragColor = texture2D(tDiffuse, vUv);
        return;
      }
      vec2 dir = (vUv - 0.5) * u_intensity * 0.02;
      float r = texture2D(tDiffuse, vUv + dir).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - dir).b;
      float a = texture2D(tDiffuse, vUv).a;
      gl_FragColor = vec4(r, g, b, a);
    }
  `,
};

// Separable Gaussian Blur — 21 samples per pass instead of 441
const SeparableBlurShader = {
  uniforms: {
    tDiffuse: { value: null },
    u_blur: { value: 0.0 },
    u_resolution: { value: new THREE.Vector2(1, 1) },
    u_direction: { value: new THREE.Vector2(1, 0) },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float u_blur;
    uniform vec2 u_resolution;
    uniform vec2 u_direction;
    varying vec2 vUv;
    void main() {
      if (u_blur < 0.01) {
        gl_FragColor = texture2D(tDiffuse, vUv);
        return;
      }
      vec2 texel = u_direction / u_resolution;
      vec4 color = vec4(0.0);
      float total = 0.0;
      float sigma = max(u_blur, 0.001);
      int samples = int(min(sigma * 3.0, 10.0));
      for (int i = -10; i <= 10; i++) {
        if (abs(i) > samples) continue;
        float w = exp(-float(i*i) / (2.0 * sigma * sigma));
        color += texture2D(tDiffuse, vUv + float(i) * texel) * w;
        total += w;
      }
      gl_FragColor = color / total;
    }
  `,
};

// Dim shader — darkens scene when UI is visible (text overlay readability)
const DimShader = {
  uniforms: {
    tDiffuse: { value: null },
    u_dim: { value: 0.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float u_dim;
    varying vec2 vUv;
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      gl_FragColor = vec4(color.rgb * (1.0 - u_dim), color.a);
    }
  `,
};

export class PostProcessing {
  composer: EffectComposer;
  private bloom: UnrealBloomPass;
  private chromaPass: ShaderPass;
  private uiVisibility = 0;
  private uiVisibilityTarget = 0;
  private chromaBeat = 0;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  _textRenderer: THREE.WebGLRenderer | null = null;

  constructor(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.composer = new EffectComposer(renderer);

    // Main scene render — layer 0 only (scene shaders like lava_flow — NO bloom)
    const mainPass = new RenderPass(scene, camera);
    mainPass.clear = true;
    this.composer.addPass(mainPass);

    // Patch main pass to only render layer 0 (scene geometry)
    const origMainRender = mainPass.render.bind(mainPass);
    mainPass.render = (r: any, wb: any, rb: any, dt: any, ma: any) => {
      const cam = mainPass.camera;
      const saved = cam.layers.mask;
      cam.layers.set(0);
      origMainRender(r, wb, rb, dt, ma);
      cam.layers.mask = saved;
    };

    // Lyrics text render pass — layer 1 on top of scene, BEFORE bloom
    const textPass = new RenderPass(scene, camera);
    textPass.clear = false;
    textPass.clearDepth = true;
    this.composer.addPass(textPass);

    const origTextRender = textPass.render.bind(textPass);
    textPass.render = (r: any, wb: any, rb: any, dt: any, ma: any) => {
      const cam = textPass.camera;
      const saved = cam.layers.mask;
      cam.layers.set(1);
      origTextRender(r, wb, rb, dt, ma);
      cam.layers.mask = saved;
    };

    // Bloom — applied AFTER text is composited, so only lyrics HDR colors glow
    // Scene shaders (layer 0) stay below threshold, lyrics push above with HDR boost
    const dpr = renderer.getPixelRatio();
    this.bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.4, 0.4, 1.0
    );
    this.composer.addPass(this.bloom);

    // Chromatic Aberration (spikes on beat)
    this.chromaPass = new ShaderPass(ChromaticAberrationShader);
    this.chromaPass.uniforms.u_resolution.value.set(window.innerWidth * dpr, window.innerHeight * dpr);
    this.composer.addPass(this.chromaPass);
  }

  /** Set a dedicated full-DPI renderer for crisp text overlay */
  setTextRenderer(r: THREE.WebGLRenderer) {
    this._textRenderer = r;
  }

  /**
   * Text is now rendered inside the composer pipeline (textPass before bloom).
   * This method is kept as no-op for API compatibility.
   */
  renderText() {
    // No-op — text rendered via textPass in composer pipeline so bloom applies to it
  }
  private _textDbgCount = 0;

  setUiVisibility(visible: boolean) {
    this.uiVisibilityTarget = visible ? 1 : 0;
  }

  setBlur(_enabled: boolean) {
    // Handled per-scene via material uniforms
  }

  setDim(_enabled: boolean, _opacity?: number) {
    // Handled per-scene via material uniforms
  }

  update(audio: AudioData) {
    // Bloom: constant params — not audio-reactive so it persists on pause
    // Stretch words trigger bloom via HDR color boost on layer 0
    // (threshold/strength stay fixed)

    // Chromatic aberration disabled — causes glitchy colors with bloom
    this.chromaPass.uniforms.u_intensity.value = 0;
  }

  setSize(w: number, h: number) {
    const dpr = this.renderer.getPixelRatio();
    const pw = w * dpr;
    const ph = h * dpr;
    this.composer.setSize(pw, ph);
    this.bloom.resolution.set(pw, ph);
    this.chromaPass.uniforms.u_resolution.value.set(pw, ph);
    if (this._textRenderer) {
      this._textRenderer.setSize(w, h, false);
    }
  }

  updateScene(scene: THREE.Scene, camera: THREE.Camera) {
    this.scene = scene;
    this.camera = camera;
    const mainPass = this.composer.passes[0] as RenderPass;
    mainPass.scene = scene;
    mainPass.camera = camera;
    const textPass = this.composer.passes[1] as RenderPass;
    textPass.scene = scene;
    textPass.camera = camera;
  }
}
