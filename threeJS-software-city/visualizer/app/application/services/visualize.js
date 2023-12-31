import * as THREE from 'three';

import { MouseControls } from '../../domain/MouseControls';
import { TreeOfBuildings } from '../../domain/TreeOfBuildings';
import { LightSettings } from '../../domain/LightSettings';
import { VisualControls } from '../../domain/VisualControls';
import { Renderer } from '../../domain/Renderer';
import { GUI } from '../../domain/Gui';

export async function visualize(event, DATA) {
   let data = DATA.data;
   let dataType = DATA.dataType;

   // remove old canvas and gui
   let canvasElement = document.getElementsByTagName('canvas');
   if (canvasElement.length > 0) {
      canvasElement[0].remove();
   }
   let guiElement = document.getElementsByClassName('dg ac');
   if (guiElement.length > 0) {
      guiElement[0].remove();
   }

   // Fetch Data first
   // let DATA = await fetchData();

   /**
    * START VISUALIZE
    */

   // Get Data from Form
   const form = event.target;
   let cityRectangleRatio = form.elements.dimensions.value;
   let citySpread = form.elements.citySpread.value;
   let shortSide = Math.sqrt(data.length / cityRectangleRatio);
   let longSide = cityRectangleRatio * shortSide;
   shortSide = Math.round(shortSide);
   longSide = Math.round(longSide);

   // Build Renderer
   const renderer = new Renderer();
   document.body.appendChild(renderer.getRenderer().domElement);

   // Build Scene
   const scene = new THREE.Scene();

   // Build AxesHelper
   const axesHelper = new THREE.AxesHelper(100);
   scene.add(axesHelper);

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
      visualControls.getCamera().aspect =
         window.innerWidth / window.innerHeight;
      visualControls.getCamera().updateProjectionMatrix();
   };

   const treeOfBuildings = new TreeOfBuildings();
   data.forEach(entry => {
      treeOfBuildings.addBuilding(entry, dataType);
   });

   treeOfBuildings.buildTreeStructure();
   scene.add(treeOfBuildings.putOnScreen(treeOfBuildings.baseNode));

   const lightSettings = new LightSettings(
      treeOfBuildings.baseNode.children[0].scale.x,
      treeOfBuildings.getHighestBuilding(),
      treeOfBuildings.baseNode.children[0].scale.z
   );
   scene.add(lightSettings.getAmbientLight());
   scene.add(lightSettings.getDirectionalLight());
   scene.add(lightSettings.getDirectionalLightHelper());

   new GUI(scene, treeOfBuildings.getHighestBuilding());
   new MouseControls(document, visualControls.getCamera(), scene);

   function animate(time) {
      renderer.getRenderer().render(scene, visualControls.getCamera());
   }
   renderer.getRenderer().setAnimationLoop(animate);
}
