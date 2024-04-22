import { getNormalizer } from "../../model/dataManagement/data.js";

/**
 * 
 * This method is used for calculating the "sum" aggregate function.
 * 
 * Here, I want to loop through all buildings and data points of that building
 * and sum up all metaphor values that lie within the range of the slider.
 * 
 * By doing this I calculate the maxMetaphorSum per building
 * and the metaphorSum per building.
 * 
 * Then I want to show the ratio between the maxMetaphorSum and the metaphorSum
 * as the respective metaphor.
 * 
 */

const aggregateFunctionSum = (treeOfBuildings, lowerRangeBounds, upperRangeBounds) => {

   let heightMetaphor = treeOfBuildings.list[0].metaphorSelection.height;
   let colorMetaphor = treeOfBuildings.list[0].metaphorSelection.color;
   //
   let maxHeightSum = 0;
   let maxColorSum = 0;
   //
   for (let building of treeOfBuildings.list) {
      let heightSum = 0;
      let colorSum = 0;
      for (let entry of building.buildingData) {
         if (parseInt(entry.timestamp) >= lowerRangeBounds && parseInt(entry.timestamp) <= upperRangeBounds) {
            heightSum += parseInt(entry[heightMetaphor]);
            colorSum += parseInt(entry[colorMetaphor]);
         }
      }
      if (heightSum > maxHeightSum) {
         maxHeightSum = heightSum;
      }
      if (colorSum > maxColorSum) {
         maxColorSum = colorSum;
      }
   }

   for (let building of treeOfBuildings.list) {
      let heightSum = 0;
      let colorSum = 0;
      for (let entry of building.buildingData) {
         // here we collect the data for all entries that are within the range
         if (parseInt(entry.timestamp) >= lowerRangeBounds && parseInt(entry.timestamp) <= upperRangeBounds) {
            heightSum += parseInt(entry[heightMetaphor]);
            colorSum += parseInt(entry[colorMetaphor]);
         }
      }

      // Visibility
      building.visible = heightSum > 0;

      // Height
      building.scale.y = getNormalizer().normalizeHeight(heightSum);
      building.position.y = building.scale.y / 2 + 0.1;
      building.currentHeightValue = heightSum;

      // Color
      let luminance = colorSum / maxColorSum;
      let ratio = 1;
      building.setColorLuminance(luminance, ratio);
   }
}

export { aggregateFunctionSum };