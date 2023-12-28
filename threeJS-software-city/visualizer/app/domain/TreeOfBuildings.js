import {Building} from "./building";
import * as THREE from "three";
import {Plane} from "./plane";
import {Mesh} from "three";

export class TreeOfBuildings {

    constructor() {
        this.list = [];
        this.baseNode = new Plane('project_base_node')
        this.treeStructures = new Set();
    }

    getNextBuildingId(){
        let id = 1;
        if(this.list.some(building => building.buildingId === id)){
            id++;
        }
        return id;
    }

    addBuilding(data) {
        let newBuilding = new Building(this.getNextBuildingId(), data);
        this.list.push(newBuilding);
    }

    buildTreeStructure() {
        // here, we build the actual N-ary tree structure
        for (let i = 0; i < this.list.length; i++) {
            let building = this.list[i];
            let packagePathList = building.buildingData.className.split('.');
            let prevNode = this.baseNode;
            let nodeName = "";
            for (let j = 0; j < packagePathList.length; j++) {
                nodeName = nodeName + '.' + packagePathList[j];
                nodeName = nodeName.replace(/^\.+/, '');
                if (this.getNodeByKey(this.baseNode, nodeName) === null) {
                    if (j === packagePathList.length - 1){
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

    getNodeByKey(node, key){
        if(node == null){
            return null;
        }
        if(node.nodeName === key){
            return node
        }
        for(let i = 0; i < node.children.length; i++){
            let foundNode = this.getNodeByKey(node.children[i], key)
            if(foundNode != null){
                return foundNode;
            }
        }
        return null;
    }

    getHighestBuilding() {
        let max = 0;
        this.list.forEach(building => {
            if (building.getHeight() >= max) {
                max = building.getHeight();
            }
        })
        return max;
    }

    vis(node){
        let children = [];
        for (let child of node.children){
            if(child instanceof Building){
                children.push(child);
            }
            if(child instanceof Mesh){
                continue;
            }
            let foundChild = this.vis(child);
            children.push(foundChild);
        }

        let gridSize = 0;
        while(children.length > gridSize ** 2){
            gridSize += 1;
        }

        let biggestChild = 0;
        for(let child of children){
            if(child instanceof Building){
                if (child.scale.x >= biggestChild){
                    biggestChild = child.scale.x;
                }
            } else {
                if (child.children[0].scale.x >= biggestChild){
                    biggestChild = child.children[0].scale.x;
                }
            }
        }

        const layeredGrid = generateLayeredGrid(gridSize);

        const spreadOfElements = 0.3;
        let deepestLevel = 0;
        for(const child of children){
            let coords = layeredGrid.shift();
            child.position.x = coords.x * (biggestChild + spreadOfElements);
            child.position.z = coords.z * (biggestChild + spreadOfElements);
            if (child instanceof Plane){
                if(child.children[0].position.y < deepestLevel){
                    deepestLevel = child.children[0].position.y;
                }
            }
        }

        node.children[0].scale.x = biggestChild * (gridSize * 2 - 1) + ((gridSize * 2 - 1) * 0.5);
        node.children[0].scale.z = biggestChild * (gridSize * 2 - 1) + ((gridSize * 2 - 1) * 0.5);
        node.children[0].position.y = deepestLevel - 0.2;
        node.children[0].scale.y = 0.2;

        return node;
    }
}

class TreeNode {
    constructor(parent, key, data) {
        this.parent = parent;
        this.key = key;
        this.value = data;
        this.children = [];
    }
}

function generateLayeredGrid(size) {
    const grid = [];

    function addLayer(layer) {
        for (let i = -layer; i <= layer; i++) {
            for (let j = -layer; j <= layer; j++) {
                if (Math.abs(i) === layer || Math.abs(j) === layer) {
                    grid.push({ x: i, z: j });
                }
            }
        }
    }
    for (let layer = 0; layer < size; layer++) {
        addLayer(layer);
    }
    return grid;
}
