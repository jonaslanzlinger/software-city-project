import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class VisualControls {

    constructor(renderer, longSide, shortSide, citySpread) {

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.8,
            1000
        );


        // Visual Controls
        this.orbit = new OrbitControls(this.camera, renderer.domElement);
        this.camera.position.set(
            shortSide * citySpread * 2,
            longSide * Math.max(2, citySpread),
            longSide * citySpread * 2);
        this.orbit.target = new THREE.Vector3(shortSide * citySpread / 2, 0, longSide * citySpread / 2);
        this.orbit.update();

    }

    getCamera() {
        return this.camera;
    }

}