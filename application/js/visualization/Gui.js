import * as dat from "dat.gui";
import * as THREE from "three";
import { addGui } from "../data";
import { hexToRgb, rgbToHsl } from "../utils";
import { Color } from "../Color";

class Gui extends dat.GUI {

   constructor(group, listTreeOfBuildings) {
      super();

      this.optionsThresholds = {
         height: 0,
         color: "#00ff00",
         apply: function () {
            for (let treeOfBuildings of listTreeOfBuildings) {
               treeOfBuildings.list.forEach(building => {
                  if (building.originalScaleY >= this.height) {
                     building.setBaseColor(rgbToHsl(hexToRgb(this.color)));
                  }
               });
            }
         },
      };
      this.optionsHeightMetaphor = {
         scale: 100,
         normalize: 100,
      };

      let thresholdsFolder = this.addFolder("Thresholds");
      thresholdsFolder
         .add(this.optionsThresholds, "height", 0, listTreeOfBuildings[0].getHighestBuilding())
         .name("Height");
      thresholdsFolder.addColor(this.optionsThresholds, "color").name("Color");
      thresholdsFolder.add(this.optionsThresholds, "apply").name("Apply!");
      thresholdsFolder.open();

      let metaphorsFolder = this.addFolder("Metaphors");
      metaphorsFolder.open();

      let heightMetaphorFolder = metaphorsFolder.addFolder("Height");
      heightMetaphorFolder
         .add(this.optionsHeightMetaphor, "scale", 1, 200)
         .name("Scale (%)")
         .onChange(e => {
            let valueScale = e / 100 / (listTreeOfBuildings[0].getHighestBuilding() / 100);
            let valueNormalize = this.optionsHeightMetaphor.normalize / 100;
            this.calculateHeightMetaphor(valueScale, valueNormalize, listTreeOfBuildings[0]);
         });

      heightMetaphorFolder
         .add(this.optionsHeightMetaphor, "normalize", 0, 200)
         .name("Normalize (%)")
         .onChange(e => {
            let valueScale =
               this.optionsHeightMetaphor.scale /
               100 /
               (treeOfBuildings.getHighestBuilding() / 100);
            let valueNormalize = e / 100;
            this.calculateHeightMetaphor(valueScale, valueNormalize, listTreeOfBuildings[0]);
         });
      heightMetaphorFolder.open();

      // append this gui to the list of guis in the dataStore
      addGui(this);
   }

   calculateHeightMetaphor(valueScale, valueNormalize, treeOfBuildings) {
      let heightMean = treeOfBuildings.getHeightMean() * valueScale;
      treeOfBuildings.list.forEach(building => {
         let buildingHeight = building.originalScaleY * valueScale;
         if (buildingHeight > heightMean) {
            building.scale.y = heightMean + Math.pow(buildingHeight - heightMean, valueNormalize);
            building.scale.y = Math.pow(buildingHeight, valueNormalize);
         } else {
            building.scale.y = heightMean - Math.pow(heightMean - buildingHeight, valueNormalize);
            building.scale.y = Math.pow(buildingHeight, valueNormalize);
         }
         building.position.y = building.scale.y / 2 + 0.1;
      });
   }
}

export { Gui }