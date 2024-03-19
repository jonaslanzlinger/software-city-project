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
// This is for VR Button
import { VRButton } from "three/examples/jsm/webxr/VRButton";

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

   createModelTree(treeOfBuildingsList[0]);

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

   // TODO Uncomment this for VR button!
   document.body.appendChild(VRButton.createButton(renderer.getRenderer()));

   function animate(time) {
      renderer.getRenderer().render(scene, visualControls.getCamera());
   }
   renderer.getRenderer().setAnimationLoop(animate);

   rendererList.push(renderer);
}

const createModelTree = treeOfBuildingsList => {
   // console.log(treeOfBuildingsList);
   let modelTreeElement = document.getElementById("model-tree");
   while (modelTreeElement.firstChild) {
      modelTreeElement.removeChild(modelTreeElement.firstChild);
   }

   let check = [treeOfBuildingsList.baseNode]
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

      let colorPicker = document.createElement("input");
      colorPicker.type = "color";
      colorPicker.id = newElement.id;
      colorPicker.value = "#ffffff";

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

         folderElement.style.display = "flex";
         folderElement.style.alignItems = "center";

         folderElement.appendChild(colorPicker);

         colorPicker.addEventListener("input", () => {
            // can I replace this loop with just the 'current' object?
            for (let node of seen) {
               if (node.uuid === colorPicker.id) {
                  node.children[0].material.color.set(colorPicker.value);
               }
            }
         });

         newElement.appendChild(folderElement);

      } else {
         newElement.type = "building";
         newElement.style.display = "flex";
         newElement.style.alignItems = "center";

         if (current.buildingName.lastIndexOf(".") !== -1) {
            newElement.innerText = current.buildingName.substring(current.buildingName.lastIndexOf(".") + 1);
         } else {
            newElement.innerText = current.buildingName;
         }

         newElement.appendChild(colorPicker);

         colorPicker.addEventListener("input", () => {
            // can I just replace this with the 'current' object?
            for (let node of seen) {
               if (node.uuid === colorPicker.id) {
                  if (node instanceof Building) {
                     node.setBuildingBaseColor(new THREE.Color(colorPicker.value));
                     // TODO HERE
                     // calculate the ratio between fassade and roof
                     // let colorRoof = current.material[2].color;
                     // let colorPickerRGB = [parseInt(colorPicker.value.substring(1, 3), 16) / 255,
                     // parseInt(colorPicker.value.substring(3, 5), 16) / 255,
                     // parseInt(colorPicker.value.substring(5, 7), 16) / 255];
                     // let ratioR = node.material[2].color.r / node.material[0].color.r;
                     // let ratioG = node.material[2].color.g / node.material[0].color.g;
                     // let ratioB = node.material[2].color.b / node.material[0].color.b;
                     // colorRoof.r = ratioR === 0 ? colorPickerRGB[0] : colorPickerRGB[0] * ratioR;
                     // colorRoof.g = ratioG === 0 ? colorPickerRGB[1] : colorPickerRGB[1] * ratioG;
                     // colorRoof.b = ratioB === 0 ? colorPickerRGB[2] : colorPickerRGB[2] * ratioB;
                     // node.material[0].color.set(colorPicker.value);
                     // node.material[1].color.set(colorPicker.value);
                     // node.material[2].color.set(colorRoof);
                     // node.material[3].color.set(colorPicker.value);
                     // node.material[4].color.set(colorPicker.value);
                     // node.material[5].color.set(colorPicker.value);
                  }
               }
            }
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
                  newElement.style.marginLeft = 15 + "px";
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
               color.r *= 1.4;
               color.g *= 1.4;
               color.b *= 1.4;
               current.material[0].color.set(color);
               current.material[1].color.set(color);
               current.material[3].color.set(color);
               current.material[4].color.set(color);
               current.material[5].color.set(color);
               element.style.color = "blue";
               // element.style.boxShadow = '0px 0px 4px rgba(0, 0, 0, 0.5)';
            } else {
               let color = current.children[0].material.color;
               color.r *= 1.4;
               color.g *= 1.4;
               color.b *= 1.4;
               current.children[0].material.color.set(color);
               element.style.color = "blue";
               // element.style.boxShadow = '0px 0px 4px rgba(0, 0, 0, 0.5)';
            }
         })

         element.addEventListener("mouseleave", function () {
            if (current instanceof Building) {
               let color = current.material[0].color;
               color.r /= 1.4;
               color.g /= 1.4;
               color.b /= 1.4;
               current.material[0].color.set(color);
               current.material[1].color.set(color);
               current.material[3].color.set(color);
               current.material[4].color.set(color);
               current.material[5].color.set(color);
               element.style.color = "black";
               // element.style.boxShadow = "none";
            } else {
               let color = current.children[0].material.color;
               color.r /= 1.4;
               color.g /= 1.4;
               color.b /= 1.4;
               current.children[0].material.color.set(color);
               element.style.color = "black";
               // element.style.boxShadow = "none";
            }
         })

         element.addEventListener("click", e => {
            if (e.target.type === "color") return;
            if (newElement.type === "building") {
            } else {
               element.parentElement.expanded = element.parentElement.expanded === "true" ? "false" : "true";
               let colorPickerElement = element.children[0];
               element.innerText = element.parentElement.expanded === "true" ?
                  element.innerText.replace("\u25B8", "\u25BF") :
                  element.innerText.replace("\u25BF", "\u25B8");
               element.appendChild(colorPickerElement);
               let childrenToToggle = element.parentElement.children;
               for (let i = 1; i < childrenToToggle.length; i++) {
                  if (childrenToToggle[i].type === "building") {
                     childrenToToggle[i].style.display = childrenToToggle[i].style.display === "none" ? "flex" : "none";
                  } else {
                     childrenToToggle[i].style.display = childrenToToggle[i].style.display === "none" ? "block" : "none";
                  }
               }
            }
         })
      }
   }

   modelTreeElement.appendChild(container);

   return seen;
}

export { buildTreesOfBuildings, visualize, removeAllRenderers, removeAllGuis, createModelTree }