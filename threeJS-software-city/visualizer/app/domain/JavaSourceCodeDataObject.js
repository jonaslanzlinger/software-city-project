export class JavaSourceCodeDataObject {
   constructor(data, metaphorSelection) {
      this.buildingName = data.className;
      this.buildingGroupingPath = data.className;
      if (metaphorSelection.dimension !== undefined) {
         this.buildingScaleX = parseInt(data[metaphorSelection.dimension]);
      } else {
         this.buildingScaleX = 1;
      }
      this.buildingScaleZ = this.buildingScaleX;
      if (metaphorSelection.height !== undefined) {
         this.buildingScaleY = parseInt(data[metaphorSelection.height]);
      } else {
         this.buildingScaleY = 1;
      }
      this.buildingPositionY = this.buildingScaleY / 2;

      // set a default building color (this can be adjustable with the GUI in the top right corner)
      this.buildingColor = 0xb5cb99;
      this.buildingData = [];
      this.buildingData.push(data);
   }
}
