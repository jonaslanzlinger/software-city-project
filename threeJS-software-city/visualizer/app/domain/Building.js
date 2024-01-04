import * as THREE from 'three';
import { JavaSourceCodeDataObject } from './JavaSourceCodeDataObject';
import { BPMNDataObject } from './BPMNDataobject';

export class Building extends THREE.Mesh {
   constructor(buildingId, data, dataType) {
      let dataObject;
      switch (dataType) {
         case 'java-source-code':
            dataObject = new JavaSourceCodeDataObject(data);
            break;
         case 'bpmn':
            dataObject = new BPMNDataObject(data);
            break;
         default:
            dataObject = new JavaSourceCodeDataObject(data);
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
      this.buildingData = dataObject;

      this.castShadow = true;
      this.receiveShadow = true;
   }

   getHeight() {
      return this.scale.y;
   }
}
