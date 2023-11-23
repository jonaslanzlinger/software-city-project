import * as THREE from 'three';

export class LightSettings {

    constructor(longSide, shortSide, citySpread) {

        // Ambient Light
        this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.8);

        // Directional Light
        this.directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.6);
        this.directionalLight.position.set(
            shortSide * citySpread * 2,
            longSide * Math.max(2, citySpread),
            longSide * citySpread * 2);
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.camera.left = longSide;
        this.directionalLight.shadow.camera.right = -longSide;
        this.directionalLight.shadow.camera.top = longSide;
        this.directionalLight.shadow.camera.bottom = -longSide;
        this.directionalLight.shadow.mapSize.width = 4096;
        this.directionalLight.shadow.mapSize.height = 4096;

        // Light Helpers
        this.directionalLightHelper = new THREE.DirectionalLightHelper(this.directionalLight, 1);
        this.directionalLightShadowHelper = new THREE.CameraHelper(this.directionalLight.shadow.camera);

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