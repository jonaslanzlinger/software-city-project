import * as THREE from "three";
import { Building } from "./Building";

class MouseControls {
   constructor(document, camera, scene, renderer) {
      this.addMouseInteractions(document, camera, scene, renderer);
      this.mousePosition = null;
   }

   addMouseInteractions(document, camera, scene, renderer) {
      renderer.getRenderer().domElement.addEventListener("mousedown", e => {
         const mouse = new THREE.Vector2();
         mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
         mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
         this.mousePosition = mouse;
      });

      renderer.getRenderer().domElement.addEventListener("mouseup", e => {
         const mouse = new THREE.Vector2();
         mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
         mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

         if (mouse.x === this.mousePosition.x && mouse.y === this.mousePosition.y) {
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(scene.children);

            for (const obj of intersects) {
               if (obj.object.geometry.type === "BoxGeometry" && obj.object.visible) {
                  let objInfo = {};
                  if (obj.object instanceof Building) {
                     objInfo = {
                        buildingId: obj.object.buildingId,
                        buildingName: obj.object.buildingName,
                        buildingGroupingPath: obj.object.buildingGroupingPath,
                        buildingData: obj.object.buildingData
                     };
                  } else {
                     objInfo = {
                        nodeName: obj.object.parent.nodeName
                     }
                  }

                  const frameInfo = document.getElementById("frame-info");
                  frameInfo.style.display = "block";
                  const infoPanelDiv = document.getElementById("info-panel-div");
                  while (infoPanelDiv.firstChild) {
                     infoPanelDiv.removeChild(infoPanelDiv.firstChild);
                  }

                  for (const entry in objInfo) {
                     let newElement = document.createElement("p");
                     newElement.innerHTML = `<strong>${entry}:</strong><br>${objInfo[entry]}`;
                     infoPanelDiv.appendChild(newElement);
                  }
                  break;
               }
            }
         }
      });

      let previousHoverObject;
      let previousColor;
      renderer.getRenderer().domElement.addEventListener("mousemove", e => {
         const mouse = new THREE.Vector2();
         mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
         mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

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
            if (obj.object.geometry.type === "BoxGeometry" && obj.object.visible) {
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

      });
   }
}

export { MouseControls }