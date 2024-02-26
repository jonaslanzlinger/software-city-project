import * as THREE from "three";
import { Renderer } from "./entities/Renderer";
import { VisualControls } from "./entities/VisualControls";
import { TreeOfBuildings } from "./entities/TreeOfBuildings";
import { LightSettings } from "./entities/LightSettings";
import { Gui } from "./entities/Gui";
import { MouseControls } from "./entities/MouseControls";
import { addSlider, addSliderEyeTracking } from "./addEventListener";
import { calculateNormalizeFactors, getEpoques } from "./data";

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

         treeOfBuildings.list.forEach(building => {
            building.visible = false;
            building.buildingData.forEach(buildingData => {
               if (buildingData.timestamp == treeOfBuildings.timestamp) {
                  building.visible = true;
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

         treeOfBuildings.buildTreeStructure();
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

export { buildTreesOfBuildings, visualize, removeAllRenderers, removeAllGuis }