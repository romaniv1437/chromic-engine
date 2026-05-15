import * as THREE from 'three';
import { Text } from 'troika-three-text';
export class GpuTypography {
    constructor(camera) {
        this.camera = camera;
        this.opacity = 0;
        this.targetOpacity = 0;
        this.group = new THREE.Group();
        // Put text on layer 1 so it renders after blur (stays sharp)
        this.group.layers.set(1);
        // Title text
        this.titleText = new Text();
        this.titleText.fontSize = 0.12;
        this.titleText.color = 0xffffff;
        this.titleText.anchorX = 'center';
        this.titleText.anchorY = 'middle';
        this.titleText.position.set(0, 0.08, -1);
        this.titleText.fillOpacity = 0;
        this.titleText.outlineWidth = 0.004;
        this.titleText.outlineColor = 0x88ccff;
        this.titleText.outlineOpacity = 0.6;
        this.titleText.text = '';
        this.titleText.sync();
        this.group.add(this.titleText);
        // Artist text
        this.artistText = new Text();
        this.artistText.fontSize = 0.07;
        this.artistText.color = 0xaaddff;
        this.artistText.anchorX = 'center';
        this.artistText.anchorY = 'middle';
        this.artistText.position.set(0, -0.05, -1);
        this.artistText.fillOpacity = 0;
        this.artistText.outlineWidth = 0.002;
        this.artistText.outlineColor = 0x6699cc;
        this.artistText.outlineOpacity = 0.4;
        this.artistText.text = '';
        this.artistText.sync();
        this.group.add(this.artistText);
        // Background glow plane
        const glowGeo = new THREE.PlaneGeometry(1.6, 0.5);
        const glowMat = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            uniforms: {
                u_opacity: { value: 0 },
                u_color: { value: new THREE.Color(0x1a2a4a) },
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float u_opacity;
        uniform vec3 u_color;
        varying vec2 vUv;
        void main() {
          vec2 center = vUv - 0.5;
          float dist = length(center * vec2(1.0, 2.0));
          float alpha = smoothstep(0.5, 0.0, dist) * u_opacity * 0.6;
          gl_FragColor = vec4(u_color, alpha);
        }
      `,
        });
        this.glowMesh = new THREE.Mesh(glowGeo, glowMat);
        this.glowMesh.position.set(0, 0, -1.01);
        this.group.add(this.glowMesh);
    }
    setTrack(title, artist) {
        this.titleText.text = title;
        this.artistText.text = artist;
        this.titleText.sync();
        this.artistText.sync();
    }
    setVisible(visible) {
        this.targetOpacity = visible ? 1 : 0;
    }
    update(rms) {
        // Lerp opacity
        this.opacity += (this.targetOpacity - this.opacity) * 0.04;
        // Audio-reactive modulation
        const audioMod = 1 + rms * 0.3;
        this.titleText.fillOpacity = this.opacity * audioMod;
        this.titleText.outlineWidth = 0.004 + rms * 0.002;
        this.artistText.fillOpacity = this.opacity * 0.85 * audioMod;
        // Glow
        const mat = this.glowMesh.material;
        mat.uniforms.u_opacity.value = this.opacity;
    }
    addToScene(scene) {
        scene.add(this.group);
    }
    removeFromScene(scene) {
        scene.remove(this.group);
    }
    dispose() {
        this.titleText.dispose();
        this.artistText.dispose();
        this.glowMesh.geometry.dispose();
        this.glowMesh.material.dispose();
    }
}
