import * as THREE from 'three';

export class Plane extends THREE.Group {
   constructor(nodeName) {
      super();
      const groupGeometry = new THREE.BoxGeometry();
      const groupMaterial = new THREE.MeshPhongMaterial({ color: 0x979979 });

      const groupBox = new THREE.Mesh(groupGeometry, groupMaterial);

      // here, we add the border of the box
      let geo = new THREE.EdgesGeometry(groupBox.geometry);
      let mat = new THREE.LineBasicMaterial({
         color: 0x000000,
         opacity: 0.2,
         transparent: true,
      });
      let wireframe = new THREE.LineSegments(geo, mat);
      groupBox.add(wireframe);

      this.add(groupBox);

      this.receiveShadow = true;
      this.nodeName = nodeName;
   }

   addChild(child) {
      this.add(child);
   }
}
