import { Building } from "./Building";
import { Plane } from "./Plane";
import { Mesh } from "three";
import pack from "bin-pack";
// import { calculateNormalizeFactors } from "../utils";
import { getDataType, getEpoques, getNormalizer, getVisualizationData, setNormalizer } from "../data";
import { Normalizer } from "./Normalizer";

/**
 * Class that represents a tree of buildings
 */
class TreeOfBuildings {

   /**
    * Constructor of the TreeOfBuildings class
    * 
    * @param {Date} timestamp 
    */
   constructor(timestamp) {
      this.list = [];
      this.baseNode = new Plane("project_base_node");
      this.buildingId = 1;
      this.timestamp = timestamp;
   }

   /**
    * Method that returns the next building id
    * for that TreeOfBuildings
    * 
    * @returns {number} The next building id
    */
   getNextBuildingId() {
      if (this.list.some(building => building.buildingId === this.buildingId)) {
         this.buildingId++;
      }
      return this.buildingId;
   }

   /**
    * Method that adds a building to the list of buildings
    * for that TreeOfBuildings
    * 
    * If the building already exists in the list, the data is added to the existing building
    * in the "buildingData" property.
    * 
    * @param {Object} data // data of the building
    * @param {String} dataType // data type of the building
    * @param {Object} metaphorSelection // metaphor selection for the building
    * @param {Object} factors // factors for the metaphor
    * @returns {void}
    */
   addBuilding(data) {
      let newBuilding = new Building(this.getNextBuildingId(), data);
      for (let building of this.list) {
         if (
            building.buildingGroupingPath + building.buildingName ===
            newBuilding.buildingGroupingPath + newBuilding.buildingName
         ) {
            building.addDataEntry(data);
            return;
         }
      }
      this.list.push(newBuilding);
   }

   /**
    * Method that builds the tree structure of the buildings based on the list of buildings
    */
   buildTreeStructure() {
      // here, we build the actual N-ary tree structure
      for (let i = 0; i < this.list.length; i++) {
         let building = this.list[i];
         let packagePathList = building.buildingGroupingPath.split(";");
         let prevNode = this.baseNode;
         let nodeName = "";
         for (let j = 0; j < packagePathList.length; j++) {
            nodeName = nodeName + ";" + packagePathList[j];
            nodeName = nodeName.replace(/^\;+/, "");
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

   /**
    * TODO: pull this method out of this class
    * 
    * Method that creates a tree structure with a list of buildings
    * 
    * @param {List} list of Buildings 
    */
   buildTreeStructureWithList(listOfVisibleBuildings) {
      // here, we build the actual N-ary tree structure
      for (let i = 0; i < listOfVisibleBuildings.length; i++) {
         let building = listOfVisibleBuildings[i];
         let packagePathList = building.buildingGroupingPath.split(";");
         let prevNode = this.baseNode;
         let nodeName = "";
         for (let j = 0; j < packagePathList.length; j++) {
            nodeName = nodeName + ";" + packagePathList[j];
            nodeName = nodeName.replace(/^\;+/, "");
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

   /**
    * Method that returns a node by its key revursively
    * 
    * @param {Building | Plane} node 
    * @param {String} key 
    * @returns the node, if found, otherwise null
    */
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

   getMaxDimensionBuilding() {
      let max = -Infinity;
      this.list.forEach(building => {
         if (building.getTotalDimensionValue() >= max) {
            max = building.getTotalDimensionValue();
         }
      });
      return max;
   }

   getMinDimensionBuilding() {
      let min = Infinity;
      this.list.forEach(building => {
         if (building.getTotalDimensionValue() <= min) {
            min = building.getTotalDimensionValue();
         }
      });
      return min;
   }

   getMaxHeightBuilding() {
      let max = -Infinity;
      this.list.forEach(building => {
         if (building.getTotalHeightValue() >= max) {
            max = building.getTotalHeightValue();
         }
      });
      return max;
   }

   getMinHeightBuilding() {
      let min = Infinity;
      this.list.forEach(building => {
         if (building.getMinHeightValue() <= min) {
            min = building.getMinHeightValue();
         }
      });
      return min;
   }

   /**
    * Method that returns the mean height of all buildings in this TreeOfBuildings
    * 
    * @returns {number} The mean height of all buildings
    */
   getCurrentHeightValueMean() {
      let sum = 0;
      for (let building of this.list) {
         sum += building.currentHeightValue;
      }
      return sum / this.list.length;
   }

   /**
    * Method that adjusts the X and Z position of all children of a node
    * and puts the elements (Building | Plane) on the scene
    * 
    * @param {Building | Plane} node 
    * @returns {Building | Plane} // returns the node with the children adjusted
    */
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
         if (child instanceof Building || child instanceof Plane) {
            child.position.x -= maxX / 2;
            child.position.z -= maxZ / 2;
         }
      }
      return node;
   }

   /**
    * Method that adjusts the Y position of all children of a node
    * within that TreeOfBuildings
    * 
    * @param {Building | Plane} node 
    */
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

   /**
    * Method that return the lowest timestamp of all buildings
    * in this TreeOfBuildings
    * 
    * @returns {number} The lowest timestamp of all buildings
    */
   getLowestTimestamp() {
      let lowestTimestamp = Infinity;
      for (let building of this.list) {
         for (let entry of building.buildingData) {
            if (entry.timestamp < lowestTimestamp) {
               lowestTimestamp = entry.timestamp;
            }
         }
      }
      return lowestTimestamp;
   }

   /**
    * Method that return the highest timestamp of all buildings
    * in this TreeOfBuildings
    * 
    * @returns {number} The highest timestamp of all buildings
    */
   getHighestTimestamp() {
      let highestTimestamp = -Infinity;
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


const buildTreesOfBuildings = () => {

   let listTreeOfBuildings = [];

   if (getDataType() === "java-source-code") {
      let epoques = getEpoques();

      for (let epoque in epoques) {
         const treeOfBuildings = new TreeOfBuildings(epoque);
         epoques[epoque].forEach(entry => {
            treeOfBuildings.addBuilding(entry, metaphorSelection);
         });

         let listOfVisibleBuildings = [];
         treeOfBuildings.list.forEach(building => {
            building.visible = false;
            building.buildingData.forEach(buildingData => {
               if (buildingData.timestamp == treeOfBuildings.timestamp) {
                  building.visible = true;
                  listOfVisibleBuildings.push(building);
                  if (metaphorSelection.dimension !== undefined) {
                     building.scale.x = buildingData[metaphorSelection.dimension];
                  } else {
                     building.scale.x = 1;
                  }
                  building.scale.z = building.scale.x;
                  if (metaphorSelection.height !== undefined) {
                     building.scale.y = buildingData[metaphorSelection.height];
                  } else {
                     building.scale.y = 1;
                  }
                  building.position.y = building.scale.y / 2;
               }
            });
         });

         treeOfBuildings.buildTreeStructureWithList(listOfVisibleBuildings);
         treeOfBuildings.putOnScreen(treeOfBuildings.baseNode);
         treeOfBuildings.adjustChildrenLayerPositionY(treeOfBuildings.baseNode);
         listTreeOfBuildings.push(treeOfBuildings);
      }
   } else {
      const treeOfBuildings = new TreeOfBuildings();
      getVisualizationData().forEach(entry => {
         treeOfBuildings.addBuilding(entry, getDataType());
      });

      // create a normalizer object for this tree of buildings
      setNormalizer(new Normalizer(treeOfBuildings));
      getNormalizer().normalizeDimensions(treeOfBuildings);

      treeOfBuildings.buildTreeStructure();
      treeOfBuildings.putOnScreen(treeOfBuildings.baseNode);
      treeOfBuildings.adjustChildrenLayerPositionY(treeOfBuildings.baseNode);
      listTreeOfBuildings.push(treeOfBuildings);
   }
   return listTreeOfBuildings;
}


export { TreeOfBuildings, buildTreesOfBuildings }