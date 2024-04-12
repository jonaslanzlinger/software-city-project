import * as THREE from "three";
import { Color } from "../Color";
import { getMetaphorSelection } from "../data";

class Building extends THREE.Mesh {

   metaphorSelection = getMetaphorSelection();
   buildingData = [];

   constructor(buildingId, data) {

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

      this.buildingData.push(data);

      this.metaphorSelection = getMetaphorSelection();

      // COLOR
      this.baseColor = new Color({ h: 0, s: 0, l: 0.5 });
      this.setBaseColor = color => {
         this.baseColor.setColor(color);
         this.setFassadeColor(color);
         this.setRoofColor(color);

         // set colorPicker in modelTree to new color
         this.setColorPicker();
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

         // set colorPicker in modelTree to new color
         this.setColorPicker();
      }

      this.setColorPicker = () => {
         // here, set the color for the color picker in the model tree
         let colorPicker = document.getElementById(this.uuid).children[0];
         if (colorPicker !== null) {
            colorPicker.value = "#" + this.fassadeColor.getHexString();
         }
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

      // DIMENSION & HEIGHT
      this.recalculateDimension();
      this.recalculateHeight();
   }

   recalculateDimension() {
      if (this.metaphorSelection.dimension === undefined) {
         this.scale.x = 1;
         this.scale.z = 1;
      } else {
         let totalValue = 0;
         for (let entry of this.buildingData) {
            totalValue += parseFloat(entry[this.metaphorSelection.dimension]);
         }
         this.scale.x = totalValue;
         this.scale.z = totalValue;
      }
   }

   recalculateHeight() {
      if (this.metaphorSelection.height === undefined) {
         this.scale.y = 1;
         this.position.y = this.scale.y / 2;
      } else {
         let totalValue = 0;
         for (let entry of this.buildingData) {
            totalValue += parseFloat(entry[this.metaphorSelection.height]);
         }
         this.scale.y = totalValue;
         this.position.y = this.scale.y / 2;
      }
   }

   addDataEntry(data) {
      this.buildingData.push(data);
      this.recalculateDimension();
      this.recalculateHeight();
   }

   getTotalDimensionValue() {
      return this.scale.x;
   }

   getTotalHeightValue() {
      return this.scale.y;
   }

   getMinHeightValue() {
      let min = Infinity;
      for (let entry of this.buildingData) {
         let value = parseFloat(entry[this.metaphorSelection.height]);
         if (value <= min) {
            min = value;
         }
      }
      return min;
   }
}

export { Building }