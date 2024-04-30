class Normalizer {

   dimensionRange = { min: 1, max: 8.0 };
   heightRange = { min: 1, max: 30.0 };

   maxDimensionBuilding = 0;
   minDimensionBuilding = 0;
   maxHeightBuilding = 0;
   minHeightBuilding = 0;

   guiScaleValue = 1;
   guiNormalizeValue = 0;
   currentHeightValueMean = 0;

   constructor(treeOfBuildings) {
      this.maxDimensionBuilding = treeOfBuildings.getMaxDimensionBuilding();
      this.minDimensionBuilding = treeOfBuildings.getMinDimensionBuilding();
      this.maxHeightBuilding = treeOfBuildings.getMaxHeightBuilding();
      this.minHeightBuilding = treeOfBuildings.getMinHeightBuilding();
   }

   setGuiScaleValue(value) {
      this.guiScaleValue = value;
   }

   setGuiNormalizeValue(value) {
      this.guiNormalizeValue = value;
   }

   normalizeDimensions(treeOfBuildings) {
      treeOfBuildings.list.forEach(building => {
         let percent = 0.5;
         // if there is only one building present, set the dimensions to 1/4 of the max value
         if (this.minDimensionBuilding !== this.maxDimensionBuilding) {
            percent = (building.getTotalDimensionValue() - this.minDimensionBuilding) / (this.maxDimensionBuilding - this.minDimensionBuilding);
         }
         let normalizedValue = (this.dimensionRange.max - this.dimensionRange.min) * percent + this.dimensionRange.min;
         building.scale.x = normalizedValue;
         building.scale.z = normalizedValue;
      });
   }

   // TODO
   normalizeHeight(height) {
      let percent = 0.25;
      // if there is only one building present, set the height to 1/4 of the max value
      if (this.minDimensionBuilding !== this.maxDimensionBuilding) {
         percent = (height - this.minHeightBuilding) / (this.maxHeightBuilding - this.minHeightBuilding);
         if (this.guiNormalizeValue < 0) {
            percent = Math.pow(percent, 1 + this.guiNormalizeValue);
         } else if (this.guiNormalizeValue > 0) {
            percent = Math.pow(percent, Math.abs(1 / this.guiNormalizeValue));
         }
      }
      let normalizedHeight = this.heightRange.min + ((this.heightRange.max - this.heightRange.min) * percent * this.guiScaleValue);
      return normalizedHeight;
   }

   setCurrentHeightValueMean(value) {
      this.currentHeightValueMean = value;
   }

   getCurrentHeightValueMean() {
      return this.currentHeightValueMean;
   }
}

export { Normalizer }