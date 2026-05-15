import * as THREE from 'three';
import { AudioData } from '../audio/AudioAnalyzer';

export abstract class BaseScene {
  scene: THREE.Scene;
  camera: THREE.Camera;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  }

  abstract update(audio: AudioData, time: number): void;
  abstract dispose(): void;

  resize(w: number, h: number) {
    if (this.camera instanceof THREE.PerspectiveCamera) {
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }
  }
}

