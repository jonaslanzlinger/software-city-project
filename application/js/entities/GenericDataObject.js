class GenericDataObject {
   constructor(data, metaphorSelection, factors) {
      this.buildingName = null;
      this.buildingGroupingPath = "";
      if (metaphorSelection.dimension !== undefined) {
         this.buildingScaleX = parseInt(data[metaphorSelection.dimension] * factors.dimension);
      } else {
         this.buildingScaleX = 1;
      }
      this.buildingScaleZ = this.buildingScaleX;
      if (metaphorSelection.height !== undefined) {
         this.buildingScaleY = parseInt(data[metaphorSelection.height] * factors.height);
      } else {
         this.buildingScaleY = 1;
      }
      this.buildingPositionY = this.buildingScaleY / 2;
      this.buildingData = data;
   }
}

export { GenericDataObject }