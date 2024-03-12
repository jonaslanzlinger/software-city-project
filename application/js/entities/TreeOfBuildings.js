import { Building } from "./Building";
import { Plane } from "./Plane";
import { Mesh } from "three";
import pack from "bin-pack";
import { colors } from "../colors";

class TreeOfBuildings {
   constructor(timestamp) {
      this.list = [];
      this.baseNode = new Plane("project_base_node");
      this.buildingId = 1;
      this.timestamp = timestamp;
   }

   getNextBuildingId() {
      if (this.list.some(building => building.buildingId === this.buildingId)) {
         this.buildingId++;
      }
      return this.buildingId;
   }

   addBuilding(data, dataType, metaphorSelection, factors) {
      let newBuilding = new Building(this.getNextBuildingId(), data, dataType, metaphorSelection, factors);
      for (let building of this.list) {
         if (
            building.buildingGroupingPath + building.buildingName ===
            newBuilding.buildingGroupingPath + newBuilding.buildingName
         ) {
            building.buildingData.push(newBuilding.buildingData[0]);
            return;
         }
      }
      this.list.push(newBuilding);
   }

   buildTreeStructure() {
      // here, we build the actual N-ary tree structure
      for (let i = 0; i < this.list.length; i++) {
         let building = this.list[i];
         let packagePathList = building.buildingGroupingPath.split(".");
         let prevNode = this.baseNode;
         let nodeName = "";
         for (let j = 0; j < packagePathList.length; j++) {
            nodeName = nodeName + "." + packagePathList[j];
            nodeName = nodeName.replace(/^\.+/, "");
            // create new node if node is not yet included OR node is a leaf
            if (
               this.getNodeByKey(this.baseNode, nodeName) === null ||
               j === packagePathList.length - 1
            ) {
               if (j === packagePathList.length - 1) {
                  prevNode.addChild(building);
               } else {
                  let newPlane = new Plane(nodeName);
                  prevNode.addChild(newPlane);
                  prevNode = newPlane;
               }
            }
            prevNode = this.getNodeByKey(this.baseNode, nodeName);
         }
      }
   }

   buildTreeStructureWithList(listOfVisibleBuildings) {
      // here, we build the actual N-ary tree structure
      for (let i = 0; i < listOfVisibleBuildings.length; i++) {
         let building = listOfVisibleBuildings[i];
         let packagePathList = building.buildingGroupingPath.split(".");
         let prevNode = this.baseNode;
         let nodeName = "";
         for (let j = 0; j < packagePathList.length; j++) {
            nodeName = nodeName + "." + packagePathList[j];
            nodeName = nodeName.replace(/^\.+/, "");
            // create new node if node is not yet included OR node is a leaf
            if (
               this.getNodeByKey(this.baseNode, nodeName) === null ||
               j === packagePathList.length - 1
            ) {
               if (j === packagePathList.length - 1) {
                  prevNode.addChild(building);
               } else {
                  let newPlane = new Plane(nodeName);
                  prevNode.addChild(newPlane);
                  prevNode = newPlane;
               }
            }
            prevNode = this.getNodeByKey(this.baseNode, nodeName);
         }
      }
   }

   getNodeByKey(node, key) {
      if (node == null) {
         return null;
      }
      if (node.nodeName === key) {
         return node;
      }
      for (let i = 0; i < node.children.length; i++) {
         let foundNode = this.getNodeByKey(node.children[i], key);
         if (foundNode != null) {
            return foundNode;
         }
      }
      return null;
   }

   getHighestBuilding() {
      let max = 0;
      this.list.forEach(building => {
         if (building.originalScaleY >= max) {
            max = building.originalScaleY;
         }
      });
      return max;
   }

   getHeightMean() {
      let sum = 0;
      for (let building of this.list) {
         sum += building.originalScaleY;
      }
      return sum / this.list.length;
   }

   putOnScreen(node) {
      let children = [];
      for (let child of node.children) {
         if (child instanceof Building) {
            children.push(child);
         }
         if (child instanceof Mesh) {
            continue;
         }
         let foundChild = this.putOnScreen(child);
         children.push(foundChild);
      }

      // Bin Packing Algorithm in the method 'pack'
      var bins = [];
      for (let child of children) {
         if (child instanceof Building) {
            bins.push({
               uuid: child.uuid,
               width: child.scale.x,
               height: child.scale.z,
            });
         } else {
            bins.push({
               uuid: child.uuid,
               width: child.children[0].scale.x,
               height: child.children[0].scale.z,
            });
         }
      }

      // console.log(bins);
      pack(bins, { inPlace: true });

      let maxX = 0;
      let maxZ = 0;
      // map back on the objects again
      for (let bin of bins) {
         for (let child of children) {
            if (child instanceof Building) {
               if (bin.uuid === child.uuid) {
                  child.position.x = bin.x + bin.width / 2;
                  child.position.z = bin.y + bin.height / 2;
               }
            } else {
               if (bin.uuid === child.uuid) {
                  child.position.x = bin.x + bin.width / 2;
                  child.position.z = bin.y + bin.height / 2;
               }
            }
            if (bin.x + bin.width >= maxX) {
               maxX = bin.x + bin.width;
            }
            if (bin.y + bin.height >= maxZ) {
               maxZ = bin.y + bin.height;
            }
         }
      }

      node.children[0].scale.x = maxX + 0.5;
      node.children[0].scale.z = maxZ + 0.5;
      node.children[0].scale.y = 0.2;

      for (let child of children) {
         if (child instanceof Building) {
            child.position.x -= maxX / 2;
            child.position.z -= maxZ / 2;
         } else if (child instanceof Plane) {
            child.position.x -= maxX / 2;
            child.position.z -= maxZ / 2;
         }
      }
      return node;
   }

   adjustChildrenLayerPositionY(node) {
      for (let child of node.children) {
         if (child instanceof Plane) {
            child.position.y = 0.2;
            this.adjustChildrenLayerPositionY(child);
         } else if (child instanceof Building) {
            child.position.y += 0.1;
         }
      }
   }

   getLowestTimestamp() {
      let lowestTimestamp = 99999999999999999;
      for (let building of this.list) {
         for (let entry of building.buildingData) {
            if (entry.timestamp < lowestTimestamp) {
               lowestTimestamp = entry.timestamp;
            }
         }
      }
      return lowestTimestamp;
   }

   getHighestTimestamp() {
      let highestTimestamp = 0;
      for (let building of this.list) {
         for (let entry of building.buildingData) {
            if (entry.timestamp > highestTimestamp) {
               highestTimestamp = entry.timestamp;
            }
         }
      }
      return highestTimestamp;
   }
}

export { TreeOfBuildings }