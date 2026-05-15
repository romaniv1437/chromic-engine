import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
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
      gl_FragColor = vec4(r, g, b, 1.0);
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
export class PostProcessing {
    constructor(renderer, scene, camera) {
        this.textRenderPass = null;
        this.uiVisibility = 0;
        this.uiVisibilityTarget = 0;
        this.chromaBeat = 0;
        this.composer = new EffectComposer(renderer);
        // Main scene render (layer 0 only - excludes text)
        const mainPass = new RenderPass(scene, camera);
        mainPass.clear = true;
        this.composer.addPass(mainPass);
        this.bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        this.composer.addPass(this.bloom);
        // Chromatic Aberration (spikes on beat)
        this.chromaPass = new ShaderPass(ChromaticAberrationShader);
        this.chromaPass.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
        this.composer.addPass(this.chromaPass);
        // Separable blur: horizontal + vertical (42 samples total vs 441)
        this.blurPassH = new ShaderPass(SeparableBlurShader);
        this.blurPassH.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
        this.blurPassH.uniforms.u_direction.value.set(1, 0);
        this.composer.addPass(this.blurPassH);
        this.blurPassV = new ShaderPass(SeparableBlurShader);
        this.blurPassV.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
        this.blurPassV.uniforms.u_direction.value.set(0, 1);
        this.composer.addPass(this.blurPassV);
        // Text render pass (layer 1 - rendered AFTER blur, stays sharp)
        this.textRenderPass = new RenderPass(scene, camera);
        this.textRenderPass.clear = false;
        this.textRenderPass.clearDepth = true;
        this.composer.addPass(this.textRenderPass);
    }
    setUiVisibility(visible) {
        this.uiVisibilityTarget = visible ? 1 : 0;
    }
    update(audio) {
        this.bloom.threshold = 0.2 - audio.rms * 0.2;
        this.bloom.strength = 1.0 + audio.rms * 2.0;
        // Chromatic aberration: spike on bass hits, decay
        if (audio.bass > 0.5)
            this.chromaBeat = Math.max(this.chromaBeat, audio.bass);
        this.chromaBeat *= 0.92;
        this.chromaPass.uniforms.u_intensity.value = this.chromaBeat;
        // Lerp blur
        this.uiVisibility += (this.uiVisibilityTarget - this.uiVisibility) * 0.05;
        const blurValue = this.uiVisibility * 5.0;
        this.blurPassH.uniforms.u_blur.value = blurValue;
        this.blurPassV.uniforms.u_blur.value = blurValue;
    }
    setSize(w, h) {
        this.composer.setSize(w, h);
        this.chromaPass.uniforms.u_resolution.value.set(w, h);
        this.blurPassH.uniforms.u_resolution.value.set(w, h);
        this.blurPassV.uniforms.u_resolution.value.set(w, h);
    }
    updateScene(scene, camera) {
        const mainPass = this.composer.passes[0];
        mainPass.scene = scene;
        mainPass.camera = camera;
        if (this.textRenderPass) {
            this.textRenderPass.scene = scene;
            this.textRenderPass.camera = camera;
        }
    }
}
