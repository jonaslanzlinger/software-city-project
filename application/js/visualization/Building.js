import * as THREE from "three";
import { Color } from "../Color";

class Building extends THREE.Mesh {
   constructor(buildingId, data, dataType, metaphorSelection, factors) {

      const boxGeometry = new THREE.BoxGeometry();
      const boxMaterial = new THREE.MeshBasicMaterial({
         color: new Color({ h: 0, s: 0, l: 0.5 }),
         polygonOffset: true,
         polygonOffsetFactor: 0.1,
         polygonOffsetUnits: 0.1,
      });
      const rooftopMaterial = new THREE.MeshBasicMaterial({
         color: new Color({ h: 0, s: 0, l: 0.5 }),
      });

      // set different materials for the rooftop side
      const materials = [
         boxMaterial,
         boxMaterial,
         rooftopMaterial,
         boxMaterial,
         boxMaterial,
         boxMaterial,
      ];

      super(boxGeometry, materials);

      // here, we add the border of the box
      let geo = new THREE.EdgesGeometry(this.geometry);
      let mat = new THREE.LineBasicMaterial({
         color: new Color({ h: 0, s: 0, l: 0.1 }),
         transparent: true,
      });
      let wireframe = new THREE.LineSegments(geo, mat);
      this.add(wireframe);

      this.buildingId = buildingId;
      this.buildingName = data.groupingPath.split(";").pop();
      this.buildingGroupingPath = data.groupingPath;
      this.scale.x = metaphorSelection.dimension === undefined ? 1 : data[metaphorSelection.dimension] * factors.dimension;
      this.scale.z = this.scale.x;

      this.buildingData = [];
      this.buildingData.push(data);

      this.metaphorSelection = metaphorSelection;

      // COLOR
      this.baseColor = new Color({ h: 0, s: 0, l: 0.5 });
      this.setBaseColor = color => {
         this.baseColor.setColor(color);
         this.setFassadeColor(color);
         this.setRoofColor(color);
      }

      this.colorLuminance = this.baseColor.getLuminance();
      this.setColorLuminance = (luminance, ratio) => {
         this.colorLuminance = luminance;
         let color = this.baseColor.getHsl();
         color.l = luminance;
         this.setFassadeColor(color);
         let roofColor = this.baseColor.getHsl();
         roofColor.l = luminance * ratio;
         this.setRoofColor(roofColor);
      }

      this.fassadeColor = new Color({ h: 0, s: 0, l: 0.5 });
      this.setFassadeColor = color => {
         this.fassadeColor.setColor(color);
         this.material[0].color.setHSL(color.h, color.s, color.l);
         this.material[1].color.setHSL(color.h, color.s, color.l);
         this.material[3].color.setHSL(color.h, color.s, color.l);
         this.material[4].color.setHSL(color.h, color.s, color.l);
         this.material[5].color.setHSL(color.h, color.s, color.l);
      }

      this.roofColor = new Color({ h: 0, s: 0, l: 0.5 });
      this.setRoofColor = color => {
         this.roofColor.setColor(color);
         this.material[2].color.setHSL(color.h, color.s, color.l);
      }

      this.highlightBuilding = () => {
         let fassade = this.fassadeColor.getHsl();
         if (fassade.l >= 0.5) {
            this.material[0].color.setHSL(fassade.h, fassade.s, fassade.l - 0.3);
            this.material[1].color.setHSL(fassade.h, fassade.s, fassade.l - 0.3);
            this.material[3].color.setHSL(fassade.h, fassade.s, fassade.l - 0.3);
            this.material[4].color.setHSL(fassade.h, fassade.s, fassade.l - 0.3);
            this.material[5].color.setHSL(fassade.h, fassade.s, fassade.l - 0.3);
         } else {
            this.material[0].color.setHSL(fassade.h, fassade.s, fassade.l + 0.3);
            this.material[1].color.setHSL(fassade.h, fassade.s, fassade.l + 0.3);
            this.material[3].color.setHSL(fassade.h, fassade.s, fassade.l + 0.3);
            this.material[4].color.setHSL(fassade.h, fassade.s, fassade.l + 0.3);
            this.material[5].color.setHSL(fassade.h, fassade.s, fassade.l + 0.3);
         }

         let roof = this.roofColor.getHsl();
         if (roof.l >= 0.5) {
            this.material[2].color.setHSL(roof.h, roof.s, roof.l - 0.3);
         } else {
            this.material[2].color.setHSL(roof.h, roof.s, roof.l + 0.3);
         }
      }

      this.notHighlightBuilding = () => {
         let fassade = this.fassadeColor.getHsl();
         let roof = this.roofColor.getHsl();
         this.material[0].color.setHSL(fassade.h, fassade.s, fassade.l);
         this.material[1].color.setHSL(fassade.h, fassade.s, fassade.l);
         this.material[2].color.setHSL(roof.h, roof.s, roof.l);
         this.material[3].color.setHSL(fassade.h, fassade.s, fassade.l);
         this.material[4].color.setHSL(fassade.h, fassade.s, fassade.l);
         this.material[5].color.setHSL(fassade.h, fassade.s, fassade.l);
      }

      // HEIGHT
      this.originalScaleY = metaphorSelection.height === undefined ? 1 : data[metaphorSelection.height] * factors.height;
      this.scale.y = this.originalScaleY;
      this.position.y = this.scale.y / 2;
   }
}

export { Building }