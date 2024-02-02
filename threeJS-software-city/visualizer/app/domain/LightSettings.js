import * as THREE from 'three';

export class LightSettings {
   constructor(x, y, z) {
      this.ambientLight = new THREE.AmbientLight(0xc5c5c5, 0.7);

      this.directionalLight = new THREE.DirectionalLight(0xbfbfbf, 0.9);
      this.directionalLight.position.set(x, y, z);

      this.directionalLightHelper = new THREE.DirectionalLightHelper(this.directionalLight, 1);
   }

   getAmbientLight() {
      return this.ambientLight;
   }

   getDirectionalLight() {
      return this.directionalLight;
   }

   getDirectionalLightHelper() {
      return this.directionalLightHelper;
   }
}
