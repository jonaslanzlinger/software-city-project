import * as THREE from 'three';

export class Building {
    constructor(buildingId, data, x_pos, y_pos, z_pos, height) {

        // Initialize object
        this.buildingId = buildingId;
        this.data = data;

        // Box
        const boxGeometry = new THREE.BoxGeometry();
        const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x00FF00 });
        this.box = new THREE.Mesh(boxGeometry, boxMaterial);

        // Position
        this.box.position.x = x_pos;
        this.box.position.y = y_pos;
        this.box.position.z = z_pos;

        // Height
        this.box.scale.y = height;

        // Shadows
        this.box.castShadow = true;
        this.box.receiveShadow = true;

        this.box.data = data;

    }

    getHeight() {
        return this.box.scale.y;
    }
}