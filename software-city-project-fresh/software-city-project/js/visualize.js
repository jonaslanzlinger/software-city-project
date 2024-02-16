import * as THREE from "three";
import { Renderer } from "./entities/Renderer";
import { VisualControls } from "./entities/VisualControls";
import { TreeOfBuildings } from "./entities/TreeOfBuildings";
import { LightSettings } from "./entities/LightSettings";
import { Gui } from "./entities/Gui";
import { MouseControls } from "./entities/MouseControls";
import { addSliderFunctionality } from "./addEventListener";
import { calculateNormalizeFactors } from "./data";

let rendererList = [];

const removeRenderer = renderer => {
   renderer.dispose();
   let canvasElement = document.getElementsByTagName("canvas");
   if (canvasElement.length > 0) {
      canvasElement[0].remove();
   }
   let guiElement = document.getElementsByClassName("dg ac");
   if (guiElement.length > 0) {
      guiElement[0].remove();
   }
}

const visualize = (e, data, metaphorSelection, citySelection) => {
   for (let renderer of rendererList) {
      removeRenderer(renderer.getRenderer());
   }
   rendererList = [];

   let cityRectangleRatio =
      citySelection.dimension === undefined || citySelection.dimension === ""
         ? 2
         : citySelection.dimension;
   let citySpread =
      citySelection.spread === undefined || citySelection.spread === "" ? 2 : citySelection.spread;
   let shortSide = Math.sqrt(data.data.length / cityRectangleRatio);
   let longSide = cityRectangleRatio * shortSide;
   shortSide = Math.round(shortSide);
   longSide = Math.round(longSide);

   // Build Renderer
   const renderer = new Renderer();
   document.body.appendChild(renderer.getRenderer().domElement);

   // Build Scene
   const scene = new THREE.Scene();

   // Build AxesHelper
   // const axesHelper = new THREE.AxesHelper(100);
   // scene.add(axesHelper);

   const visualControls = new VisualControls(
      renderer.getRenderer(),
      longSide,
      shortSide,
      citySpread
   );

   renderer.getRenderer().render(scene, visualControls.getCamera());

   window.onresize = () => {
      renderer.getRenderer().setPixelRatio(window.devicePixelRatio);
      renderer.getRenderer().setSize(window.innerWidth, window.innerHeight);
      visualControls.getCamera().aspect = window.innerWidth / window.innerHeight;
      visualControls.getCamera().updateProjectionMatrix();
   };

   const treeOfBuildings = new TreeOfBuildings();
   let factors = calculateNormalizeFactors(metaphorSelection);
   data.data.forEach(entry => {
      treeOfBuildings.addBuilding(entry, data.dataType, metaphorSelection, factors);
   });

   treeOfBuildings.buildTreeStructure();
   scene.add(treeOfBuildings.putOnScreen(treeOfBuildings.baseNode));
   treeOfBuildings.adjustChildrenLayerPositionY(treeOfBuildings.baseNode);

   const lightSettings = new LightSettings(
      treeOfBuildings.baseNode.children[0].scale.x,
      treeOfBuildings.getHighestBuilding(),
      treeOfBuildings.baseNode.children[0].scale.z
   );
   scene.add(lightSettings.getAmbientLight());
   scene.add(lightSettings.getDirectionalLight());
   scene.add(lightSettings.getDirectionalLightHelper());

   new Gui(scene, treeOfBuildings);
   new MouseControls(document, visualControls.getCamera(), scene, renderer);
   let sliderContainer = document.getElementById("slider-container");
   sliderContainer.style.display = "block";
   addSliderFunctionality(treeOfBuildings);

   function animate(time) {
      renderer.getRenderer().render(scene, visualControls.getCamera());
   }
   renderer.getRenderer().setAnimationLoop(animate);

   rendererList.push(renderer);
}

export { visualize }