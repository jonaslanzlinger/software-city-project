import * as THREE from 'three';

class LightSettings {

   constructor() {
      this.ambientLight = new THREE.AmbientLight(0xffffff, 1.0);

      this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
      this.directionalLight.position.set(50, 50, 50);

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

export { LightSettings }