import * as THREE from 'three';
import { JavaSourceCodeDataObject } from './JavaSourceCodeDataObject';
import { BPMNDataObject } from './BPMNDataObject';
import { GenericDataObject } from './GenericDataObject';

export class Building extends THREE.Mesh {
   constructor(buildingId, data, dataType, metaphorSelection) {
      let dataObject;
      switch (dataType) {
         case 'java-source-code':
            dataObject = new JavaSourceCodeDataObject(data, metaphorSelection);
            break;
         case 'bpmn':
            dataObject = new BPMNDataObject(data, metaphorSelection);
            break;
         default:
            dataObject = new GenericDataObject(data, metaphorSelection);
            break;
      }

      const boxGeometry = new THREE.BoxGeometry();
      const boxMaterial = new THREE.MeshPhongMaterial(dataObject.buildingColor);
      super(boxGeometry, boxMaterial);

      this.buildingId = buildingId;
      this.buildingName = dataObject.buildingName;
      this.buildingGroupingPath = dataObject.buildingGroupingPath;
      this.scale.x = dataObject.buildingScaleX;
      this.scale.z = dataObject.buildingScaleZ;
      this.position.y = dataObject.buildingPositionY;
      this.scale.y = dataObject.buildingScaleY;
      this.material.color.set(dataObject.buildingColor);
      this.buildingData = dataObject.buildingData;

      this.castShadow = true;
      this.receiveShadow = true;
   }

   getHeight() {
      return this.scale.y;
   }
}
