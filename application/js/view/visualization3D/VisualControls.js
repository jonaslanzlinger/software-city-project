import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class VisualControls {
   constructor(renderer) {
      this.camera = new THREE.PerspectiveCamera(
         75,
         window.innerWidth / window.innerHeight,
         0.8,
         1000);
      this.orbit = new OrbitControls(this.camera, renderer.domElement);
      this.camera.position.set(20, 20, 20);
      this.orbit.update();
   }

   getCamera() {
      return this.camera;
   }
}

export { VisualControls }