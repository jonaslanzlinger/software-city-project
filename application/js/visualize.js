import * as THREE from "three";
import { Renderer } from "./entities/Renderer";
import { VisualControls } from "./entities/VisualControls";
import { TreeOfBuildings } from "./entities/TreeOfBuildings";
import { LightSettings } from "./entities/LightSettings";
import { Gui } from "./entities/Gui";
import { MouseControls } from "./entities/MouseControls";
import { addSlider, addSliderEyeTracking } from "./addEventListener";
import { calculateNormalizeFactors, getEpoques } from "./data";
import { Plane } from "./entities/Plane";
import { Building } from "./entities/Building";


const buildTreesOfBuildings = (data, metaphorSelection) => {

   let treeOfBuildingsList = [];

   if (data.dataType === "java-source-code") {
      let epoques = getEpoques();

      for (let epoque in epoques) {
         const treeOfBuildings = new TreeOfBuildings(epoque);
         let factors = calculateNormalizeFactors(metaphorSelection);
         epoques[epoque].forEach(entry => {
            treeOfBuildings.addBuilding(entry, "java-source-code", metaphorSelection, factors);
         });

         let listOfVisibleBuildings = [];
         treeOfBuildings.list.forEach(building => {
            building.visible = false;
            building.buildingData.forEach(buildingData => {
               if (buildingData.timestamp == treeOfBuildings.timestamp) {
                  building.visible = true;
                  listOfVisibleBuildings.push(building);
                  if (metaphorSelection.dimension !== undefined) {
                     building.scale.x = buildingData[metaphorSelection.dimension] * factors.dimension;
                  } else {
                     building.scale.x = 1;
                  }
                  building.scale.z = building.scale.x;
                  if (metaphorSelection.height !== undefined) {
                     building.scale.y = buildingData[metaphorSelection.height] * factors.height;
                  } else {
                     building.scale.y = 1;
                  }
                  building.position.y = building.scale.y / 2;
               }
            });
         });

         treeOfBuildings.buildTreeStructureWithList(listOfVisibleBuildings);
         // treeOfBuildings.buildTreeStructure();
         treeOfBuildings.putOnScreen(treeOfBuildings.baseNode);
         treeOfBuildings.adjustChildrenLayerPositionY(treeOfBuildings.baseNode);
         treeOfBuildingsList.push(treeOfBuildings);
      }
   } else {
      const treeOfBuildings = new TreeOfBuildings();
      let factors = calculateNormalizeFactors(metaphorSelection);
      data.data.forEach(entry => {
         treeOfBuildings.addBuilding(entry, data.dataType, metaphorSelection, factors);
      });

      treeOfBuildings.buildTreeStructure();
      treeOfBuildings.putOnScreen(treeOfBuildings.baseNode);
      treeOfBuildings.adjustChildrenLayerPositionY(treeOfBuildings.baseNode);
      treeOfBuildingsList.push(treeOfBuildings);
   }
   return treeOfBuildingsList;
}

let rendererList = [];
let guiList = [];

const removeAllRenderers = () => {
   for (let renderer of rendererList) {
      removeRenderer(renderer.getRenderer());
   }
   rendererList = [];
}

const removeAllGuis = () => {
   for (let gui of guiList) {
      removeGui(gui.getGui());
   }
   guiList = [];
}

const removeRenderer = renderer => {
   renderer.dispose();
   let canvasElement = document.getElementsByTagName("canvas");
   if (canvasElement.length > 0) {
      canvasElement[0].remove();
   }
}

const removeGui = gui => {
   gui.destroy();
}

const visualize = treeOfBuildingsList => {
   removeAllRenderers();
   removeAllGuis();

   createModelTree(treeOfBuildingsList[0].baseNode);

   const renderer = new Renderer();
   document.body.appendChild(renderer.getRenderer().domElement);

   const scene = new THREE.Scene();

   const visualControls = new VisualControls(
      renderer.getRenderer()
   );

   renderer.getRenderer().render(scene, visualControls.getCamera());

   window.onresize = () => {
      renderer.getRenderer().setPixelRatio(window.devicePixelRatio);
      renderer.getRenderer().setSize(window.innerWidth, window.innerHeight);
      visualControls.getCamera().aspect = window.innerWidth / window.innerHeight;
      visualControls.getCamera().updateProjectionMatrix();
   };

   const lightSettings = new LightSettings();
   scene.add(lightSettings.getAmbientLight());
   scene.add(lightSettings.getDirectionalLight());
   scene.add(lightSettings.getDirectionalLightHelper());

   new MouseControls(document, visualControls.getCamera(), scene, renderer);

   scene.add(treeOfBuildingsList[0].baseNode);

   let gui = new Gui(scene, treeOfBuildingsList[0]);
   guiList.push(gui);

   if (treeOfBuildingsList.length === 1) {
      addSliderEyeTracking(treeOfBuildingsList[0]);
   } else {
      addSlider(treeOfBuildingsList, scene);
   }

   function animate(time) {
      renderer.getRenderer().render(scene, visualControls.getCamera());
   }
   renderer.getRenderer().setAnimationLoop(animate);

   rendererList.push(renderer);
}

const createModelTree = baseNode => {
   let modelTreeElement = document.getElementById("model-tree");
   while (modelTreeElement.firstChild) {
      modelTreeElement.removeChild(modelTreeElement.firstChild);
   }

   let check = [baseNode]
   let seen = []
   let container = document.createElement("div");
   let allNewElements = []

   while (check.length > 0) {
      let current = check.pop();
      seen.push(current);
      let filtered = current.children.filter(child => child instanceof Plane || child instanceof Building);
      filtered.forEach(e => {
         check.push(e);
      })

      let newElement = document.createElement("div");
      newElement.classList.add("model-tree-element");
      newElement.id = current.uuid;

      if (current instanceof Plane) {
         newElement.type = "plane";
         newElement.expanded = "true";

         let folderElement = document.createElement("div");
         folderElement.classList.add("model-tree-element");
         folderElement.style.fontWeight = "bold";

         if (current.nodeName.lastIndexOf(".") !== -1) {
            folderElement.innerText = "\u25BF " + current.nodeName.substring(current.nodeName.lastIndexOf(".") + 1);
         } else {
            folderElement.innerText = "\u25BF " + current.nodeName;
         }
         newElement.appendChild(folderElement);

      } else {
         newElement.type = "building";

         if (current.buildingName.lastIndexOf(".") !== -1) {
            newElement.innerText = current.buildingName.substring(current.buildingName.lastIndexOf(".") + 1);
         } else {
            newElement.innerText = current.buildingName;
         }
         let colorPicker = document.createElement("input");
         colorPicker.type = "color";
         colorPicker.id = newElement.id;
         colorPicker.value = 0xe66465;
         newElement.innerHTML = newElement.innerText;
         newElement.appendChild(colorPicker);
         colorPicker.addEventListener("input", function () {
            console.log("changed");
            console.log(this.value);
         });
      }

      allNewElements.push(newElement);

      if (current.nodeName !== "project_base_node") {
         for (let i of allNewElements) {
            if (i.id === current.parent.uuid) {
               i.appendChild(newElement);
               if (newElement.type == "building") {
                  newElement.style.marginLeft = "20px";
               } else {
                  newElement.style.marginLeft = 20 + "px";
               }
               break;
            }
         }
      } else {
         container.appendChild(newElement);
      }

      // Listeners
      if (newElement.type === "building" || newElement.type === "plane") {
         let element = newElement;
         if (newElement.type === "plane") {
            element = newElement.childNodes[0];
         }
         element.addEventListener("mouseenter", function () {
            if (current instanceof Building) {
               let color = current.material[0].color;
               color.r *= 1.3;
               color.g *= 1.3;
               color.b *= 1.3;
               current.material[0].color.set(color);
               current.material[1].color.set(color);
               current.material[3].color.set(color);
               current.material[4].color.set(color);
               current.material[5].color.set(color);
               element.style.boxShadow = '0px 0px 4px rgba(0, 0, 0, 0.5)';
            } else {
               let color = current.children[0].material.color;
               color.r *= 1.3;
               color.g *= 1.3;
               color.b *= 1.3;
               current.children[0].material.color.set(color);
               element.style.boxShadow = '0px 0px 4px rgba(0, 0, 0, 0.5)';
            }
         })

         element.addEventListener("mouseleave", function () {
            if (current instanceof Building) {
               let color = current.material[0].color;
               color.r /= 1.3;
               color.g /= 1.3;
               color.b /= 1.3;
               current.material[0].color.set(color);
               current.material[1].color.set(color);
               current.material[3].color.set(color);
               current.material[4].color.set(color);
               current.material[5].color.set(color);
               element.style.boxShadow = "none";
            } else {
               let color = current.children[0].material.color;
               color.r /= 1.3;
               color.g /= 1.3;
               color.b /= 1.3;
               current.children[0].material.color.set(color);
               element.style.boxShadow = "none";
            }
         })

         element.addEventListener("click", function () {
            if (newElement.type === "building") {
               console.log(newElement);
            } else {
               console.log(element.parentElement);
               element.parentElement.expanded = element.parentElement.expanded === "true" ? "false" : "true";
               element.innerText = element.parentElement.expanded === "true" ?
                  "\u25BF " + element.innerText.substring(2) :
                  "\u25B8 " + element.innerText.substring(2);
               let childrenToToggle = element.parentElement.children;
               for (let i = 1; i < childrenToToggle.length; i++) {
                  childrenToToggle[i].style.display = childrenToToggle[i].style.display === "none" ? "block" : "none";
               }
            }
         })
      }
   }

   modelTreeElement.appendChild(container);

   return seen;
}

export { buildTreesOfBuildings, visualize, removeAllRenderers, removeAllGuis, createModelTree }