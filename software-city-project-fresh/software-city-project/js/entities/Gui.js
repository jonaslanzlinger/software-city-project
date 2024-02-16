import * as dat from "dat.gui";

class Gui {
   constructor(group, treeOfBuildings) {
      this.gui = new dat.GUI();
      this.optionsThresholds = {
         height: 0,
         color: 0x000000,
         apply: function () {
            let height = this.height;
            let color = this.color;
            treeOfBuildings.list.forEach(building => {
               if (building.originalScaleY >= height) {
                  building.material[0].color.set(color);
                  building.material[1].color.set(color);
                  building.material[2].color.set(color);
                  building.material[3].color.set(color);
                  building.material[4].color.set(color);
                  building.material[5].color.set(color);
               }
            });
         },
      };
      this.optionsHeightMetaphor = {
         scale: 100,
         normalize: 100,
      };

      let thresholdsFolder = this.gui.addFolder("Thresholds");
      thresholdsFolder
         .add(this.optionsThresholds, "height", 0, treeOfBuildings.getHighestBuilding())
         .name("Building Height");
      thresholdsFolder.addColor(this.optionsThresholds, "color").name("Color");
      thresholdsFolder.add(this.optionsThresholds, "apply").name("Apply!");
      thresholdsFolder.open();

      let metaphorsFolder = this.gui.addFolder("Metaphors");
      metaphorsFolder.open();

      let heightMetaphorFolder = metaphorsFolder.addFolder("Height");
      heightMetaphorFolder
         .add(this.optionsHeightMetaphor, "scale", 1, 200)
         .name("Scale (%)")
         .onChange(e => {
            let valueScale = e / 100 / (treeOfBuildings.getHighestBuilding() / 100);
            let valueNormalize = this.optionsHeightMetaphor.normalize / 100;
            this.calculateHeightMetaphor(valueScale, valueNormalize, treeOfBuildings);
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
            this.calculateHeightMetaphor(valueScale, valueNormalize, treeOfBuildings);
         });
      heightMetaphorFolder.open();
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