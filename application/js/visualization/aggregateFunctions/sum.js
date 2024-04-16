const aggregateFunctionSum = (treeOfBuildings, lowerRangeBounds, upperRangeBounds) => {






   // Color
   building.visible = heightCumulativeOccurences > 0;
   if (checkboxAggregated.checked) {
      luminance = (colorCumulativeValue / colorMaxTotalValue);
      ratio = 0.8;
   } else {
      luminance = (colorCumulativeValue / colorMaxValue);
      ratio = 0.8;
   }
   building.setColorLuminance(luminance, ratio);

   // Height
   building.scale.y = getNormalizer().normalizeHeight(heightCumulativeValue);
   building.position.y = building.scale.y / 2 + 0.1;
   building.currentHeightValue = heightCumulativeValue;
}

export { aggregateFunctionSum };