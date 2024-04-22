import * as THREE from "three";
import { Color } from "../../utils/Color";

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
      this.baseColor = new Color({ h: 0, s: 0, l: 0.4 });
      this.setBaseColor = color => {
         this.baseColor.setColor(color);

         this.children[0].material.color.setHSL(color.h, color.s, color.l);
      }

      this.highlightPlane = () => {
         let color = this.baseColor.getHsl();
         if (color.l >= 0.5) {
            color.l -= 0.3;
         } else {
            color.l += 0.3;
         }
         this.children[0].material.color.setHSL(color.h, color.s, color.l);
      }

      this.notHighlightPlane = () => {
         let color = this.baseColor.getHsl();
         this.children[0].material.color.setHSL(color.h, color.s, color.l);
      }
   }

   addChild(child) {
      this.add(child);
   }
}

export { Plane }