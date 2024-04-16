import { getNormalizer } from "../../data.js";

/**
 * 
 * This method is used for calculating the "integral-curve" aggregate function.
 * 
 * Here, I want to loop through all buildings and data points of that building
 * and calculate the integral curve for all metaphor values that lie within the range of the slider.
 * 
 * By doing this I calculate the maxMetaphorIntegralCurve per building
 * and the metaphorIntegralCurve per building.
 * 
 * Then I want to show the ratio between the maxMetaphorIntegralCurve and the metaphorIntegralCurve
 * as the respective metaphor.
 * 
 */


// TODO IMPORTANT!!! This is now still doing the same as the "sum" aggregate function.
const aggregateFunctionIntegralCurve = (treeOfBuildings, lowerRangeBounds, upperRangeBounds) => {

   let heightMetaphor = treeOfBuildings.list[0].metaphorSelection.height;
   let colorMetaphor = treeOfBuildings.list[0].metaphorSelection.color;
   //
   let maxHeightIntegralCurve = 0;
   let maxColorIntegralCurve = 0;
   //
   for (let building of treeOfBuildings.list) {
      let heightIntegralCurve = 0;
      let colorIntegralCurve = 0;
      for (let entry of building.buildingData) {
         if (parseInt(entry.timestamp) >= lowerRangeBounds && parseInt(entry.timestamp) <= upperRangeBounds) {
            heightIntegralCurve += parseInt(entry[heightMetaphor]);
            colorIntegralCurve += parseInt(entry[colorMetaphor]);
         }
      }
      if (heightIntegralCurve > maxHeightIntegralCurve) {
         maxHeightIntegralCurve = heightIntegralCurve;
      }
      if (colorIntegralCurve > maxColorIntegralCurve) {
         maxColorIntegralCurve = colorIntegralCurve;
      }
   }

   for (let building of treeOfBuildings.list) {
      let heightIntegralCurve = 0;
      let colorIntegralCurve = 0;
      for (let entry of building.buildingData) {
         // here we collect the data for all entries that are within the range
         if (parseInt(entry.timestamp) >= lowerRangeBounds && parseInt(entry.timestamp) <= upperRangeBounds) {
            heightIntegralCurve += parseInt(entry[heightMetaphor]);
            colorIntegralCurve += parseInt(entry[colorMetaphor]);
         }
      }

      // Visibility
      building.visible = heightIntegralCurve > 0;

      // Height
      building.scale.y = getNormalizer().normalizeHeight(heightIntegralCurve);
      building.position.y = building.scale.y / 2 + 0.1;
      building.currentHeightValue = heightIntegralCurve;

      // Color
      let luminance = colorIntegralCurve / maxColorIntegralCurve;
      let ratio = 1;
      building.setColorLuminance(luminance, ratio);
   }
}

export { aggregateFunctionIntegralCurve };