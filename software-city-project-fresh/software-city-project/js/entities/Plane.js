import * as THREE from "three";

class Plane extends THREE.Group {
   constructor(nodeName) {
      super();
      const groupGeometry = new THREE.BoxGeometry();
      const groupMaterial = new THREE.MeshBasicMaterial({
         color: 0xadadad,
         polygonOffset: true,
         polygonOffsetFactor: 0.1,
         polygonOffsetUnits: 0.1,
      });

      const groupBox = new THREE.Mesh(groupGeometry, groupMaterial);

      let geo = new THREE.EdgesGeometry(groupBox.geometry);
      let mat = new THREE.LineBasicMaterial({
         color: 0x000000,
         opacity: 0.4,
         transparent: true,
      });
      let wireframe = new THREE.LineSegments(geo, mat);
      groupBox.add(wireframe);

      this.add(groupBox);

      // this.receiveShadow = true;
      this.nodeName = nodeName;
   }

   addChild(child) {
      this.add(child);
   }
}

export { Plane }