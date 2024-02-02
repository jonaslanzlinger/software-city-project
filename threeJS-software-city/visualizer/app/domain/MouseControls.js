import * as THREE from 'three';
import { Building } from './Building';
import { Plane } from 'three';

export class MouseControls {
   constructor(document, camera, scene) {
      this.addMouseInteractions(document, camera, scene);
      this.mousePosition = null;
   }

   addMouseInteractions(document, camera, scene) {
      document.addEventListener('mousedown', onMouseDown);
      function onMouseDown(event) {
         const mouse = new THREE.Vector2();
         mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
         mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
         this.mousePosition = mouse;
      }

      // Mouse Click
      document.addEventListener('mouseup', onMouseUp);
      function onMouseUp(event) {
         const mouse = new THREE.Vector2();
         mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
         mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

         if (mouse.x === this.mousePosition.x && mouse.y === this.mousePosition.y) {
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(scene.children);

            for (const element of intersects) {
               if (element.object.geometry.type === 'BoxGeometry') {
                  const elementInfo = {
                     buildingId: element.object.buildingId,
                     buildingName: element.object.buildingName,
                     buildingGroupingPath: element.object.buildingGroupingPath,
                     buildingData: element.object.buildingData,
                  };

                  const infoPanel = document.getElementById('info-panel');
                  infoPanel.style.display = 'block';
                  const infoPanelDiv = document.getElementById('info-panel-div');
                  while (infoPanelDiv.firstChild) {
                     infoPanelDiv.removeChild(infoPanelDiv.firstChild);
                  }

                  for (const entry in elementInfo) {
                     // if (entry === 'buildingData') {
                     //    for (const buildingDataEntry in elementInfo[entry]) {
                     //       let newBuildingDataElement = document.createElement('p');
                     //       newBuildingDataElement.innerHTML = `<strong>${buildingDataEntry}:</strong> ${elementInfo[entry][buildingDataEntry]}`;
                     //       infoPanelDiv.appendChild(newBuildingDataElement);
                     //    }
                     //    break;
                     // }
                     let newElement = document.createElement('p');
                     newElement.innerHTML = `<strong>${entry}:</strong> ${elementInfo[entry]}`;
                     infoPanelDiv.appendChild(newElement);
                  }
                  break;
               }
            }
         }
      }

      // Mouse Hover
      document.addEventListener('mousemove', onMouseMove);
      let previousHoverObject;
      let previousColor;
      function onMouseMove(event) {
         const mouse = new THREE.Vector2();
         mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
         mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

         const raycaster = new THREE.Raycaster();
         raycaster.setFromCamera(mouse, camera);

         const intersects = raycaster.intersectObjects(scene.children);

         if (previousHoverObject != null) {
            if (previousHoverObject.object instanceof Building) {
               previousHoverObject.object.material[0].color.set(previousColor);
               previousHoverObject.object.material[1].color.set(previousColor);
               previousHoverObject.object.material[3].color.set(previousColor);
               previousHoverObject.object.material[4].color.set(previousColor);
               previousHoverObject.object.material[5].color.set(previousColor);
            } else {
               previousHoverObject.object.material.color.set(previousColor);
            }
            previousHoverObject = null;
         }

         for (const obj of intersects) {
            if (obj.object.geometry.type === 'BoxGeometry') {
               previousHoverObject = obj;
               if (previousHoverObject.object instanceof Building) {
                  previousColor = new THREE.Color(obj.object.material[0].color);
               } else {
                  previousColor = new THREE.Color(obj.object.material.color);
               }

               // calculate complementary color
               // let color = obj.object.material.color;
               // color.r = 1 - color.r;
               // color.g = 1 - color.g;
               // color.b = 1 - color.b;
               // obj.object.material.color.set(color);

               // now, just make hovered elements brighter
               if (obj.object instanceof Building) {
                  let color = obj.object.material[0].color;
                  color.r *= 1.3;
                  color.g *= 1.3;
                  color.b *= 1.3;
                  obj.object.material[0].color.set(color);
                  obj.object.material[1].color.set(color);
                  obj.object.material[3].color.set(color);
                  obj.object.material[4].color.set(color);
                  obj.object.material[5].color.set(color);
               } else {
                  let color = obj.object.material.color;
                  color.r *= 1.3;
                  color.g *= 1.3;
                  color.b *= 1.3;
                  obj.object.material.color.set(color);
               }
               break;
            }
         }
      }
   }
}
