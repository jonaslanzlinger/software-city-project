import * as THREE from 'three';
import {normalizeHeightToScale} from "./Utils";
import {normalizeWidthToScale} from "./Utils";

export class Building extends THREE.Mesh {
    constructor(buildingId, data) {
        const boxGeometry = new THREE.BoxGeometry();
        const boxMaterial = new THREE.MeshPhongMaterial({ color: 0xB5CB99 });
        super(boxGeometry, boxMaterial);

        this.buildingId = buildingId;
        this.nodeName = data.className;

        if(data.linesOfCode !== undefined){
            let width = normalizeWidthToScale(parseInt(data.linesOfCode));
            this.buildingWidth = width;
            this.buildingLength = width;
            this.scale.x = width;
            this.scale.z = width;
        }

        this.buildingHeight = data.avgEyeFixationDuration;
        // this.buildingShape = null;

        if (this.buildingHeight > 700) {
            this.material.color.set(0xFF0000);
        }
        // this.buildingRelationships = data.relationships;
        this.buildingData = data;

        this.position.y = normalizeHeightToScale(data.avgEyeFixationDuration) / 2;

        // Height
        this.scale.y = normalizeHeightToScale(data.avgEyeFixationDuration);

        // Shadows
        this.castShadow = true;
        this.receiveShadow = true;

    }

    getHeight() {
        return this.scale.y;
    }
}