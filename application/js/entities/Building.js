import * as THREE from "three";

class Building extends THREE.Mesh {
   constructor(buildingId, data, dataType, metaphorSelection, factors) {

      const boxGeometry = new THREE.BoxGeometry();
      const boxMaterial = new THREE.MeshBasicMaterial({
         color: new THREE.Color("hsl(0, 100%, 50%)"),
         polygonOffset: true,
         polygonOffsetFactor: 0.1,
         polygonOffsetUnits: 0.1,
      });
      const rooftopMaterial = new THREE.MeshBasicMaterial({
         color: new THREE.Color("hsl(0, 100%, 50%)"),
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
         color: new THREE.Color("hsl(0, 0%, 10%)"),
         transparent: true,
      });
      let wireframe = new THREE.LineSegments(geo, mat);
      this.add(wireframe);

      this.buildingId = buildingId;
      this.buildingName = data.groupingPath.split(";").pop();
      this.buildingGroupingPath = data.groupingPath;
      this.scale.x = metaphorSelection.dimension === undefined ? 1 : data[metaphorSelection.dimension] * factors.dimension;
      this.scale.z = this.scale.x;
      this.originalScaleY = metaphorSelection.height === undefined ? 1 : data[metaphorSelection.height] * factors.height;
      this.scale.y = this.originalScaleY;
      this.position.y = this.scale.y / 2;
      this.buildingData = [];
      this.buildingData.push(data);

      this.metaphorSelection = metaphorSelection;

      this.buildingBaseColor = new THREE.Color("hsl(0, 0%, 30%)");
      this.setBuildingBaseColor = color => {
         this.buildingBaseColor = color;
         this.setBuildingColor(color);
      };
      this.setBuildingRoofColor = color => {
         this.buildingRoofColor = color;
         this.material[2].color.set(color);
      }
      this.buildingColor = new THREE.Color("hsl(0, 0%, 30%)");
      this.setBuildingColor = color => {
         this.buildingColor = color;
         this.material[0].color.set(color);
         this.material[1].color.set(color);
         this.material[3].color.set(color);
         this.material[4].color.set(color);
         this.material[5].color.set(color);
      };
   }

   getHeight() {
      return this.scale.y;
   }
}

export { Building }