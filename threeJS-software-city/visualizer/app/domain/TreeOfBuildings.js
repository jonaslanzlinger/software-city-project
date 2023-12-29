import {Building} from "./Building";
import {Plane} from "./Plane";
import {Mesh} from "three";
import pack from "bin-pack"

export class TreeOfBuildings {

    constructor() {
        this.list = [];
        this.baseNode = new Plane('project_base_node')
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
                // create new node if node is not yet included OR node is a leaf
                if (this.getNodeByKey(this.baseNode, nodeName) === null || j === packagePathList.length - 1) {
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

    putOnScreen(node){
        let children = [];
        for (let child of node.children){
            if(child instanceof Building){
                children.push(child);
            }
            if(child instanceof Mesh){
                continue;
            }
            let foundChild = this.putOnScreen(child);
            children.push(foundChild);
        }

        // Bin Packing Algorithm in the method 'pack'
        var bins = [];
        for(let child of children){
            if(child instanceof Building){
                bins.push({
                    uuid: child.uuid,
                    width: child.buildingWidth,
                    height: child.buildingLength });
            } else {
                bins.push({
                    uuid: child.uuid,
                    width: child.children[0].scale.x,
                    height: child.children[0].scale.z });
            }
        }

        pack(bins, { inPlace: true });

        let maxX = 0;
        let maxZ = 0;
        // map back on the objects again
        for(let bin of bins){
            for(let child of children){
                if(child instanceof Building){
                    if(bin.uuid === child.uuid){
                        child.position.x = bin.x + bin.width / 2;
                        child.position.z = bin.y + bin.height / 2;
                    }
                } else {
                    if(bin.uuid === child.uuid){
                        child.position.x = bin.x + bin.width / 2;
                        child.position.z = bin.y + bin.height / 2;
                    }
                }
                if((bin.x + bin.width) >= maxX) { maxX = bin.x + bin.width; }
                if((bin.y + bin.height) >= maxZ) { maxZ = bin.y + bin.height; }
            }
        }

        let deepestLevel = 0;
        for(const child of children){
            if (child instanceof Plane){
                if(child.children[0].position.y < deepestLevel){
                    deepestLevel = child.children[0].position.y;
                }
            }
        }

        node.children[0].scale.x = maxX + 0.5;
        node.children[0].scale.z = maxZ + 0.5;
        node.children[0].scale.y = 0.2;
        node.children[0].position.y = deepestLevel - 0.2;

        for (let child of children){
            if (child instanceof Building){
                child.position.x -= maxX / 2;
                child.position.z -= maxZ / 2;
            } else if (child instanceof Plane){
                child.position.x -= maxX / 2;
                child.position.z -= maxZ / 2;
            }
        }
        return node;
    }
}