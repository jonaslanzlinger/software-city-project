import * as THREE from "three";
import { Building } from "./Building";

class MouseControls {
   constructor(document, camera, scene, renderer) {
      this.mousePosition = null;

      // add mouse listeners
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
                     if (entry === "buildingData") {
                        let newElement = document.createElement("p");
                        newElement.innerHTML = `<strong>${entry}:</strong><br>`;
                        for (const dataEntry of objInfo[entry]) {
                           let dataElement = document.createElement("p");
                           dataElement.innerText = JSON.stringify(dataEntry);
                           newElement.appendChild(dataElement);
                        }
                        infoPanelDiv.appendChild(newElement);
                     } else {
                        let newElement = document.createElement("p");
                        newElement.innerHTML = `<strong>${entry}:</strong><br>${objInfo[entry]}`;
                        infoPanelDiv.appendChild(newElement);
                     }
                  }
                  break;
               }
            }
         }
      });

      let previousHoverObject;
      let previousColor;
      let previousRoofColor;
      renderer.getRenderer().domElement.addEventListener("mousemove", e => {
         let allModelTreeElements = document.getElementsByClassName("model-tree-element");

         for (let element of allModelTreeElements) {
            element.style.color = "black";
         }

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
               previousHoverObject.object.material[2].color.set(previousRoofColor);
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
                  previousRoofColor = new THREE.Color(obj.object.material[2].color);
               } else {
                  previousColor = new THREE.Color(obj.object.material.color);
               }

               // now, just make hovered elements brighter
               if (obj.object instanceof Building) {
                  let color = obj.object.material[0].color;
                  let hslColor = { h: 0, s: 0, l: 0 }
                  color.getHSL(hslColor);
                  if (hslColor.l >= 0.5) {
                     hslColor.l -= 0.2;
                  } else {
                     hslColor.l += 0.2;
                  }
                  obj.object.material[0].color.setHSL(hslColor.h, hslColor.s, hslColor.l);
                  obj.object.material[1].color.setHSL(hslColor.h, hslColor.s, hslColor.l);

                  let roofColor = obj.object.material[2].color;
                  let roofHslColor = { h: 0, s: 0, l: 0 }
                  roofColor.getHSL(roofHslColor);
                  if (roofHslColor.l >= 0.5) {
                     roofHslColor.l -= 0.2;
                  } else {
                     roofHslColor.l += 0.2;
                  }
                  obj.object.material[2].color.setHSL(roofHslColor.h, roofHslColor.s, roofHslColor.l);
                  obj.object.material[3].color.setHSL(hslColor.h, hslColor.s, hslColor.l);
                  obj.object.material[4].color.setHSL(hslColor.h, hslColor.s, hslColor.l);
                  obj.object.material[5].color.setHSL(hslColor.h, hslColor.s, hslColor.l);
               } else {
                  let color = obj.object.material.color;
                  let hslColor = { h: 0, s: 0, l: 0 }
                  color.getHSL(hslColor);
                  hslColor.l += 0.2;
                  obj.object.material.color.setHSL(hslColor.h, hslColor.s, hslColor.l);
               }

               // highlight the corresponding modelTreeElement
               for (let e of allModelTreeElements) {
                  if (obj.object instanceof Building) {
                     if (e.id === obj.object.uuid) {
                        e.style.color = "blue";
                     }
                  } else {
                     if (e.id === obj.object.parent.uuid) {
                        e.children[0].style.color = "blue";
                     }
                  }
               }
               break;
            }
         }
      });
   }
}

export { MouseControls }