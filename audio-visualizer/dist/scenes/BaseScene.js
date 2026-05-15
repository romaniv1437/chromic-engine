import * as THREE from 'three';
export class BaseScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    }
    resize(w, h, dpr) {
        if (this.camera instanceof THREE.PerspectiveCamera) {
            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();
        }
    }
}
