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
         for (let e of allModelTreeElements) {
            e.style.color = "black";
            // e.style.boxShadow = "none";
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

               // calculate complementary color
               // color.r = 1 - color.r;
               // color.g = 1 - color.g;
               // color.b = 1 - color.b;

               // now, just make hovered elements brighter
               if (obj.object instanceof Building) {
                  let color = obj.object.material[0].color;
                  let luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
                  if (luminance >= 0.5) {
                     color.r -= Math.max(0.3, 0.6 * (luminance - 0.5) ** 3);
                     color.g -= Math.max(0.3, 0.6 * (luminance - 0.5) ** 3);
                     color.b -= Math.max(0.3, 0.6 * (luminance - 0.5) ** 3);
                  } else {
                     color.r += Math.max(0.1, 0.2 * (0.5 - luminance) ** 3);
                     color.g += Math.max(0.1, 0.2 * (0.5 - luminance) ** 3);
                     color.b += Math.max(0.1, 0.2 * (0.5 - luminance) ** 3);
                  }
                  obj.object.material[0].color.set(color);
                  obj.object.material[1].color.set(color);

                  let roofColor = obj.object.material[2].color;
                  let roofLuminance = 0.299 * roofColor.r + 0.587 * roofColor.g + 0.114 * roofColor.b;
                  if (roofLuminance >= 0.5) {
                     roofColor.r -= Math.max(0.3, 0.6 * (roofLuminance - 0.5) ** 3);
                     roofColor.g -= Math.max(0.3, 0.6 * (roofLuminance - 0.5) ** 3);
                     roofColor.b -= Math.max(0.3, 0.6 * (roofLuminance - 0.5) ** 3);
                  } else {
                     roofColor.r += Math.max(0.1, 0.2 * (0.5 - roofLuminance) ** 3);
                     roofColor.g += Math.max(0.1, 0.2 * (0.5 - roofLuminance) ** 3);
                     roofColor.b += Math.max(0.1, 0.2 * (0.5 - roofLuminance) ** 3);
                  }
                  obj.object.material[2].color.set(roofColor);
                  obj.object.material[3].color.set(color);
                  obj.object.material[4].color.set(color);
                  obj.object.material[5].color.set(color);
               } else {
                  let color = obj.object.material.color;
                  color.r *= 1.5;
                  color.g *= 1.5;
                  color.b *= 1.5;
                  obj.object.material.color.set(color);
               }

               for (let e of allModelTreeElements) {
                  if (obj.object instanceof Building) {
                     if (e.id === obj.object.uuid) {
                        e.style.color = "blue";
                        // e.style.boxShadow = '0px 0px 4px rgba(0, 0, 0, 0.5)';
                     }
                  } else {
                     if (e.id === obj.object.parent.uuid) {
                        e.children[0].style.color = "blue";
                        // e.style.boxShadow = '0px 0px 4px rgba(0, 0, 0, 0.5)';
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