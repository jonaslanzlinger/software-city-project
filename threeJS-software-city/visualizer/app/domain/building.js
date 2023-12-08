import * as THREE from 'three';
import {normalizeToScale} from "./utils";

export class Building extends THREE.Mesh {
    constructor(buildingId, data) {

        const boxGeometry = new THREE.BoxGeometry();
        const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x00FF00 });
        super(boxGeometry, boxMaterial);

        // Initialize object
        this.buildingId = buildingId;
        // this.buildingName = data.className;

        // TODO
        // randomized groupId for testing
        this.buildingGroupId = Math.floor(Math.random() * 38);

        // this.buildingLength = null;
        // this.buildingWidth = null;
        this.buildingHeight = data.avgEyeFixationDuration;
        // this.buildingShape = null;

        if (this.buildingHeight > 700) {
            this.material.color.set(0xFF0000);
        }
        // this.buildingRelationships = data.relationships;
        // this.buildingData = data;

        this.position.y = normalizeToScale(data.avgEyeFixationDuration) / 2;

        // Height
        this.scale.y = normalizeToScale(data.avgEyeFixationDuration);

        // Shadows
        this.castShadow = true;
        this.receiveShadow = true;

    }

    getHeight() {
        return this.scale.y;
    }
}