import * as THREE from "three";
import { Color } from "../Color";

class Plane extends THREE.Group {
   constructor(nodeName) {
      super();
      const groupGeometry = new THREE.BoxGeometry();
      const groupMaterial = new THREE.MeshBasicMaterial({
         color: new Color({ h: 0, s: 0, l: 0.4 }),
         polygonOffset: true,
         polygonOffsetFactor: 0.1,
         polygonOffsetUnits: 0.1,
      });

      const groupBox = new THREE.Mesh(groupGeometry, groupMaterial);

      let geo = new THREE.EdgesGeometry(groupBox.geometry);
      let mat = new THREE.LineBasicMaterial({
         color: new Color({ h: 0, s: 0, l: 0.1 }),
         transparent: true,
      });
      let wireframe = new THREE.LineSegments(geo, mat);
      groupBox.add(wireframe);

      this.add(groupBox);

      this.nodeName = nodeName;

      // Color
      this.highlightPlane = () => {
         this.children[0].material.color.setHSL(0, 0, 0.6);
      }

      this.notHighlightPlane = () => {
         this.children[0].material.color.setHSL(0, 0, 0.4);
      }

   }

   addChild(child) {
      this.add(child);
   }
}

export { Plane }