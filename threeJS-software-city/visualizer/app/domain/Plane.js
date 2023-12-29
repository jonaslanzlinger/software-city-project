import * as THREE from 'three';

export class Plane extends THREE.Group {
    constructor(nodeName) {
        super();
        const groupGeometry = new THREE.BoxGeometry();
        const groupMaterial = new THREE.MeshPhongMaterial({ color: 0xFCE09B });
        const groupBox = new THREE.Mesh(groupGeometry, groupMaterial);
        this.add(groupBox);
        this.receiveShadow = true;
        this.nodeName = nodeName;
    }

    addChild(child){
        this.add(child);
    }
}