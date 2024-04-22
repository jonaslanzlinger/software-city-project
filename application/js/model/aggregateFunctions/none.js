import { getNormalizer } from "../../model/dataManagement/data.js";

/**
 * 
 * This method is used for calculating the "none" aggregate function.
 * 
 * Here, I want to loop through all buildings and data points of that building
 * and calculate the maxMetaphorValue for all metaphor values that lie within the range of the slider.
 * 
 * By doing this I calculate the maxMetaphorValue per building
 * and the lastMetaphorValue per building.
 * 
 * Then I want to show the ratio between the maxMetaphorValue and the lastMetaphorValue
 * as the respective metaphor.
 * 
 */

const aggregateFunctionNone = (treeOfBuildings, lowerRangeBounds, upperRangeBounds) => {

   let heightMetaphor = treeOfBuildings.list[0].metaphorSelection.height;
   let colorMetaphor = treeOfBuildings.list[0].metaphorSelection.color;
   //
   let maxHeightValue = 0;
   let maxColorValue = 0;
   //
   for (let building of treeOfBuildings.list) {
      let heightValue = 0;
      let colorValue = 0;
      for (let entry of building.buildingData) {
         if (parseInt(entry.timestamp) >= lowerRangeBounds && parseInt(entry.timestamp) <= upperRangeBounds) {
            heightValue = parseInt(entry[heightMetaphor]);
            colorValue = parseInt(entry[colorMetaphor]);
         }
      }
      if (heightValue > maxHeightValue) {
         maxHeightValue = heightValue;
      }
      if (colorValue > maxColorValue) {
         maxColorValue = colorValue;
      }
   }

   for (let building of treeOfBuildings.list) {
      let lastHeightValue = 0;
      let lastColorValue = 0;
      for (let entry of building.buildingData) {
         // here we collect the data for all entries that are within the range
         if (parseInt(entry.timestamp) >= lowerRangeBounds && parseInt(entry.timestamp) <= upperRangeBounds) {
            lastHeightValue = parseInt(entry[heightMetaphor]);
            lastColorValue = parseInt(entry[colorMetaphor]);
         }
      }

      // Visibility
      building.visible = lastHeightValue > 0;

      // Height
      building.scale.y = getNormalizer().normalizeHeight(lastHeightValue);
      building.position.y = building.scale.y / 2 + 0.1;
      building.currentHeightValue = lastHeightValue;

      // Color
      let luminance = lastColorValue / maxColorValue;
      let ratio = 1;
      building.setColorLuminance(luminance, ratio);
   }
}

export { aggregateFunctionNone };