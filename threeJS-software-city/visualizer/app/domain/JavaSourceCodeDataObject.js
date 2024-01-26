export class JavaSourceCodeDataObject {
   constructor(data, metaphorSelection) {
      this.buildingName = data.className;
      this.buildingGroupingPath = data.className;
      if (metaphorSelection.dimension !== undefined) {
         this.buildingScaleX = parseInt(data[metaphorSelection.dimension]) / 10;
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
      this.buildingColor = 0xb5cb99;
      if (data[metaphorSelection.color] > 3) {
         this.buildingColor = 0xff0000;
      }
      this.buildingData = data;
   }
}
