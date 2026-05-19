import * as THREE from 'three';
import { AudioData } from '../audio/AudioProcessor';

export abstract class BaseScene {
  scene: THREE.Scene;
  camera: THREE.Camera;
  protected _dimBlurMaterial: THREE.ShaderMaterial | null = null;
  protected _baseResolution: THREE.Vector2 | null = null;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  }

  abstract update(audio: AudioData, time: number): void;
  abstract dispose(): void;

  resize(w: number, h: number, dpr?: number) {
    if (this.camera instanceof THREE.PerspectiveCamera) {
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }
    // Update base resolution for blur calculations
    if (this._dimBlurMaterial?.uniforms.u_resolution) {
      const effectiveDpr = dpr || window.devicePixelRatio || 1;
      this._baseResolution = new THREE.Vector2(w * effectiveDpr, h * effectiveDpr);
    }
  }

  /**
   * Call in subclass constructor after creating the ShaderMaterial.
   * Injects u_dim and u_blur uniforms and wraps the fragment shader.
   */
  protected enableDimBlur(material: THREE.ShaderMaterial) {
    this._dimBlurMaterial = material;
    // Store base resolution for blur scaling
    if (material.uniforms.u_resolution) {
      const r = material.uniforms.u_resolution.value;
      this._baseResolution = new THREE.Vector2(r.x, r.y);
    }
    // Add uniforms to material
    material.uniforms.u_dim = { value: 0 };
    material.uniforms.u_blur = { value: 0 };
    // Inject dim at end of fragment shader
    let frag = material.fragmentShader;
    frag = frag.replace(/\n\s*gl_FragColor\.rgb \*= \(1\.0 - u_dim\);/g, '');
    const lastBrace = frag.lastIndexOf('}');
    material.fragmentShader =
      'uniform float u_dim;\nuniform float u_blur;\n' +
      frag.substring(0, lastBrace) +
      '\n  gl_FragColor.rgb *= (1.0 - u_dim);\n}';
    material.needsUpdate = true;
  }

  /** Dim the shader scene (0 = normal, 1 = black) */
  setDim(amount: number) {
    if (this._dimBlurMaterial) {
      this._dimBlurMaterial.uniforms.u_dim.value = amount;
      return;
    }
    // Fallback: find any ShaderMaterial in the scene and inject u_dim
    this.scene.traverse((obj: any) => {
      const mat = obj.material;
      if (mat && mat.isShaderMaterial && mat.fragmentShader) {
        if (!mat.uniforms.u_dim) {
          // Inject u_dim uniform and modify fragment shader
          mat.uniforms.u_dim = { value: amount };
          let frag = mat.fragmentShader;
          if (!frag.includes('u_dim')) {
            const lastBrace = frag.lastIndexOf('}');
            mat.fragmentShader =
              'uniform float u_dim;\n' +
              frag.substring(0, lastBrace) +
              '\n  gl_FragColor.rgb *= (1.0 - u_dim);\n}';
            mat.needsUpdate = true;
          }
        } else {
          mat.uniforms.u_dim.value = amount;
        }
      }
    });
  }

  /** Blur the shader scene (0 = sharp, 1 = max blur) — reduces effective resolution */
  setBlur(amount: number) {
    if (this._dimBlurMaterial) {
      this._dimBlurMaterial.uniforms.u_blur.value = amount;
      // Reduce u_resolution to create natural shader defocus
      if (this._dimBlurMaterial.uniforms.u_resolution && this._baseResolution) {
        const scale = Math.max(0.05, 1.0 - amount * 0.85);
        this._dimBlurMaterial.uniforms.u_resolution.value.set(
          this._baseResolution.x * scale,
          this._baseResolution.y * scale
        );
      }
    }
  }
}
