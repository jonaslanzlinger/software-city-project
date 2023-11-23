import * as THREE from 'three';

export class Plane {

    constructor(longSide, shortSide, citySpread) {
        this.planeGeometry = new THREE.PlaneGeometry(longSide * citySpread * 8, shortSide * citySpread * 8);
        this.planeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
        this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
        this.plane.rotation.x = Math.PI / 2;
        this.plane.rotation.z = Math.PI / 2;
        this.plane.receiveShadow = true;
    }

    getPlane() {
        return this.plane;
    }
}