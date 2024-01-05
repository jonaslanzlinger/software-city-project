import { normalizeHeightToScale, normalizeWidthToScale } from './Utils';

export class BPMNDataObject {
   constructor(data) {
      this.buildingName = data.className;
      this.buildingGroupingPath = data.filename;
      if (data.linesOfCode !== undefined) {
         this.buildingScaleX = normalizeWidthToScale(
            parseInt(data.linesOfCode)
         );
      } else {
         this.buildingScaleX = 1;
      }
      this.buildingScaleZ = this.buildingScaleX;
      this.buildingScaleY = normalizeHeightToScale(data.avgEyeFixationDuration);
      this.buildingScaleY = 2;
      this.buildingPositionY = this.buildingScaleY / 2;
      this.buildingPositionY = 1;
      this.buildingColor = 0xb5cb99;
      if (this.buildingScaleY > 3) {
         this.buildingColor = 0xff0000;
      }

      this.buildingData = data;
   }
}
