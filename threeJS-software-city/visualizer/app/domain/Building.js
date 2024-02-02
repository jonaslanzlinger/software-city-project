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
      const boxMaterial = new THREE.MeshPhongMaterial({
         color: dataObject.buildingColor,
         // polygonOffset: true,
         // polygonOffsetFactor: 0.1,
         // polygonOffsetUnits: 0.1,
      });
      const rooftopMaterial = new THREE.MeshPhongMaterial({
         color: 0xffffff,
      });

      // set different materials for the rooftop side
      const materials = [
         boxMaterial,
         boxMaterial,
         rooftopMaterial,
         boxMaterial,
         boxMaterial,
         boxMaterial,
      ];

      super(boxGeometry, materials);

      // here, we add the border of the box
      let geo = new THREE.EdgesGeometry(this.geometry);
      let mat = new THREE.LineBasicMaterial({
         color: 0x000000,
         opacity: 0.4,
         transparent: true,
      });
      let wireframe = new THREE.LineSegments(geo, mat);
      this.add(wireframe);

      this.buildingId = buildingId;
      this.buildingName = dataObject.buildingName;
      this.buildingGroupingPath = dataObject.buildingGroupingPath;
      this.scale.x = dataObject.buildingScaleX;
      this.scale.z = dataObject.buildingScaleZ;
      this.position.y = dataObject.buildingPositionY;
      this.originalScaleY = dataObject.buildingScaleY;
      this.scale.y = dataObject.buildingScaleY;
      // TODO ???
      // this.material.color.set(dataObject.buildingColor);
      this.buildingData = dataObject.buildingData;

      this.castShadow = true;
      this.receiveShadow = true;
   }

   getHeight() {
      return this.scale.y;
   }
}
