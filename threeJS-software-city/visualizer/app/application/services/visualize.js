import * as THREE from 'three';

import { MouseControls } from '../../domain/MouseControls';
import { TreeOfBuildings } from '../../domain/TreeOfBuildings';
import { LightSettings } from '../../domain/LightSettings';
import { VisualControls } from '../../domain/VisualControls';
import { Renderer } from '../../domain/Renderer';
import { GUI } from '../../domain/Gui';

let rendererList = [];

function removeRenderer(renderer) {
   // scene.traverse(object => {
   //    if (object instanceof THREE.Mesh) {
   //       object.geometry.dispose();
   //       object.material.dispose();
   //    }
   // });
   renderer.dispose();
   // remove old canvas and gui
   let canvasElement = document.getElementsByTagName('canvas');
   if (canvasElement.length > 0) {
      canvasElement[0].remove();
   }
   let guiElement = document.getElementsByClassName('dg ac');
   if (guiElement.length > 0) {
      guiElement[0].remove();
   }

   console.log(document);
   // document.removeEventListener('mousedown');
   // document.removeEventListener('mousedown', onMouseClick);
   // document.removeEventListener('mousemove');
}

export async function visualize(event, DATA, metaphorSelection, citySelection) {
   let data = DATA.data;
   let dataType = DATA.dataType;

   for (let renderer of rendererList) {
      removeRenderer(renderer.getRenderer());
   }
   rendererList = [];

   let sliderContainer = document.getElementById('slider-container');
   sliderContainer.style.display = 'block';

   let cityRectangleRatio =
      citySelection.dimension === undefined || citySelection.dimension === ''
         ? 2
         : citySelection.dimension;
   let citySpread =
      citySelection.spread === undefined || citySelection.spread === '' ? 2 : citySelection.spread;
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
   data.forEach(entry => {
      treeOfBuildings.addBuilding(entry, dataType, metaphorSelection);
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
   // scene.add(lightSettings.getDirectionalLightHelper());

   new GUI(scene, treeOfBuildings);
   new MouseControls(document, visualControls.getCamera(), scene);

   function animate(time) {
      renderer.getRenderer().render(scene, visualControls.getCamera());
   }
   renderer.getRenderer().setAnimationLoop(animate);

   rendererList.push(renderer);

   // Dragging of the slider
   const lowestTimestamp = treeOfBuildings.getLowestTimestamp();
   const highestTimestamp = treeOfBuildings.getHighestTimestamp();
   const deltaTimestamp = highestTimestamp - lowestTimestamp;
   let isDragging = false;
   document.addEventListener('mouseup', () => {
      isDragging = false;
   });
   let sliderThumb = document.querySelector('.slider-thumb');
   sliderThumb.addEventListener('mousedown', () => {
      isDragging = true;
   });
   const slider = document.querySelector('.slider');
   const valueDisplay = document.getElementById('slider-value');
   document.addEventListener('mousemove', e => {
      if (isDragging) {
         const mouseX = e.clientX - slider.getBoundingClientRect().left;
         const percent = (mouseX / slider.clientWidth) * 100;
         let newValue = Math.min(100, Math.max(0, percent));
         sliderThumb.style.left = `${newValue}%`;
         newValue = Math.round(newValue);
         let time =
            parseInt(lowestTimestamp) + parseInt((newValue / 100) * parseInt(deltaTimestamp));
         time = time.toString();
         const year = time.slice(0, 4);
         const month = time.slice(4, 6);
         const day = time.slice(6, 8);
         const hour = time.slice(8, 10);
         const minute = time.slice(10, 12);
         const second = time.slice(12, 14);
         const millisecond = time.slice(14);
         valueDisplay.textContent = `${year}-${month}-${day}, ${hour}:${minute}:${second}.${millisecond}`;

         for (let building of treeOfBuildings.list) {
            let totalTime = 0;
            for (let entry of building.buildingData) {
               if (entry.timestamp <= time) {
                  totalTime += parseInt(entry.avgEyeFixationDuration);
               }
            }
            building.visible = totalTime > 0;
            let color = building.material.color;
            console.log(totalTime);
            color.r = totalTime / 100;
            building.material.color.set(color);
         }
      }
   });
}
