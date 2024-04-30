import * as dat from "dat.gui";
import { addGui, getNormalizer } from "../model/dataManagement/data";
import { hexToRgb, rgbToHsl } from "../utils/utils";

class Gui extends dat.GUI {

   constructor(listTreeOfBuildings) {
      super();

      this.optionsThresholds = {
         height: 0,
         color: "#00ff00",
         apply: function () {
            for (let treeOfBuildings of listTreeOfBuildings) {
               treeOfBuildings.list.forEach(building => {
                  if (building.scale.y >= this.height) {
                     building.setBaseColor(rgbToHsl(hexToRgb(this.color)));
                  }
               });
            }
         },
      };

      let thresholdsFolder = this.addFolder("Thresholds");
      thresholdsFolder
         .add(this.optionsThresholds, "height", 0, getNormalizer().heightRange.max)
         .name("Height");
      thresholdsFolder.addColor(this.optionsThresholds, "color").name("Color");
      thresholdsFolder.add(this.optionsThresholds, "apply").name("Apply!");
      thresholdsFolder.open();

      let metaphorsFolder = this.addFolder("Metaphors");
      metaphorsFolder.open();

      // //////////////////////////
      // Height Metaphor
      // //////////////////////////

      this.optionsHeightMetaphor = {
         scale: 1.0,
         normalize: 0.0,
      };

      let heightMetaphorFolder = metaphorsFolder.addFolder("Height");
      heightMetaphorFolder
         .add(this.optionsHeightMetaphor, "scale", 0.0, 10.0)
         .name("Scale")
         .onChange(value => {
            getNormalizer().setGuiScaleValue(value);
            getNormalizer().setCurrentHeightValueMean(listTreeOfBuildings[0].getCurrentHeightValueMean());
            listTreeOfBuildings[0].list.forEach(building => {
               building.scale.y = getNormalizer().normalizeHeight(building.currentHeightValue);
               building.position.y = building.scale.y / 2 + 0.1;
            });
         });

      heightMetaphorFolder
         .add(this.optionsHeightMetaphor, "normalize", -1.0, 1.0)
         .name("Normalize")
         .onChange(value => {
            getNormalizer().setGuiNormalizeValue(value);
            getNormalizer().setCurrentHeightValueMean(listTreeOfBuildings[0].getCurrentHeightValueMean());
            listTreeOfBuildings[0].list.forEach(building => {
               building.scale.y = getNormalizer().normalizeHeight(building.currentHeightValue);
               building.position.y = building.scale.y / 2 + 0.1;
            });
         });
      heightMetaphorFolder.open();

      // append this gui to the list of guis in the dataStore
      addGui(this);
   }
}

export { Gui }