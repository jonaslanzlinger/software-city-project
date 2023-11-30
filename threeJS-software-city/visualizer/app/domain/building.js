import * as THREE from 'three';

export class Building extends THREE.Mesh {
    constructor(buildingId, data, x_pos, y_pos, z_pos, height) {

        const boxGeometry = new THREE.BoxGeometry();
        const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x00FF00 });
        super(boxGeometry, boxMaterial);


        "ch.unisg.tapas.auctionhouse.domain.ExecutorRegistry.ExecutorIdentifier"

        // Initialize object
        this.buildingId = buildingId;
        this.buildingName = data.className;
        this.buildingGroupId = null;
        this.buildingLength = null;
        this.buildingWidth = null;
        this.buildingHeight = data.avgEyeFixationDuration;
        this.buildingShape = null;

        if (this.buildingHeight > 700) {
            this.material.color.set(0xFF0000);
        }
        this.buildingRelationships = data.relationships;
        this.buildingData = data;

        // Position
        this.position.x = x_pos;
        this.position.y = y_pos;
        this.position.z = z_pos;

        // Height
        this.scale.y = height;

        // Shadows
        this.castShadow = true;
        this.receiveShadow = true;

    }

    getHeight() {
        return this.scale.y;
    }
}