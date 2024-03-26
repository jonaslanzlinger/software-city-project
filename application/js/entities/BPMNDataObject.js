class BPMNDataObject {
   constructor(data, metaphorSelection, factors) {
      this.buildingName = data.tabName_element;
      this.buildingGroupingPath = data.tabName_element;
      if (metaphorSelection.dimension !== undefined) {
         this.buildingScaleX = data[metaphorSelection.dimension] * factors.dimension;
      } else {
         this.buildingScaleX = 1;
      }
      this.buildingScaleZ = this.buildingScaleX;
      if (metaphorSelection.height !== undefined) {
         this.buildingScaleY = data[metaphorSelection.height] * factors.height;
      } else {
         this.buildingScaleY = 1;
      }
      this.buildingPositionY = this.buildingScaleY / 2;
      this.buildingData = [];
      this.buildingData.push(data);
   }
}

export { BPMNDataObject }