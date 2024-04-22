import * as THREE from "three";
import { Building } from "../model/metaphorModels/Building";
import { Plane } from "../model/metaphorModels/Plane";
import { Mesh } from "three";
import { getListTreeOfBuildings, getMetaphorSelection } from "../model/dataManagement/data";
import { drawArrow, removeArrow } from "../view/visualization3D/arrow";

class MouseControls {

   mousePosition = null;
   previousHoverObject = null;
   previousColor = null;
   previousRoofColor = null;
   allModelTreeElements = document.getElementsByClassName("model-tree-element");

   chartBuilding = null;
   chartHeight = null;
   chartColor = null;

   arrowObject = null;

   constructor(document, camera, scene, renderer) {

      renderer.domElement.addEventListener("mousedown", e => {
         const mouse = new THREE.Vector2();
         mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
         mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
         this.mousePosition = mouse;
      });

      renderer.domElement.addEventListener("mouseup", e => {
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

                  // clear chart
                  if (this.chartBuilding !== null) {
                     this.chartBuilding.destroy();
                  }
                  if (this.chartHeight !== null) {
                     this.chartHeight.destroy();
                  }
                  if (this.chartColor !== null) {
                     this.chartColor.destroy();
                  }

                  if (obj.object instanceof Building) {

                     let building = obj.object;
                     let dataHeightMetaphor = [];
                     let dataColorMetaphor = [];

                     building.buildingData.forEach(dataEntry => {
                        dataHeightMetaphor.push({
                           x: dataEntry.timestamp,
                           y: parseFloat(dataEntry[getMetaphorSelection().height])
                        });
                        dataColorMetaphor.push({
                           x: dataEntry.timestamp,
                           y: parseFloat(dataEntry[getMetaphorSelection().color])
                        });
                     });

                     dataHeightMetaphor.sort((a, b) => a.x - b.x);
                     dataColorMetaphor.sort((a, b) => a.x - b.x);

                     dataHeightMetaphor = dataHeightMetaphor.map(entry => {
                        return {
                           // x: formatDate(entry.x),
                           x: entry.x,
                           y: entry.y
                        }
                     });
                     dataColorMetaphor = dataColorMetaphor.map(entry => {
                        return {
                           // x: formatDate(entry.x),
                           x: entry.x,
                           y: entry.y
                        }
                     });

                     let buildingBaseColor = building.baseColor.getRgb();

                     let allTimestamps = [];
                     let heightMetaphorDatasets = [];
                     let colorMetaphorDatasets = [];

                     getListTreeOfBuildings()[0].list.forEach(building => {
                        for (let entry of building.buildingData) {
                           if (!allTimestamps.includes(entry.timestamp)) {
                              allTimestamps.push(entry.timestamp);
                           }
                           heightMetaphorDatasets.push({
                              x: entry.timestamp,
                              y: parseFloat(entry[getMetaphorSelection().height])
                           });
                           colorMetaphorDatasets.push({
                              x: entry.timestamp,
                              y: parseFloat(entry[getMetaphorSelection().color])
                           });
                        }
                     });

                     this.chartHeight = new Chart("chartHeight", {
                        type: 'line',
                        data: {
                           datasets: [{
                              type: 'scatter',
                              label: 'All Buildings',
                              data: heightMetaphorDatasets,
                              order: 2,
                              backgroundColor: 'rgba(255, 99, 132, 0.2)',
                           },
                           {
                              type: 'line',
                              label: 'Current Building',
                              data: dataHeightMetaphor,
                              order: 1,
                              backgroundColor: 'rgba(54, 162, 235, 1)',
                           }],
                           labels: allTimestamps
                        },
                        options: {}
                     });

                     this.chartColor = new Chart("chartColor", {
                        type: 'line',
                        data: {
                           datasets: [{
                              type: 'scatter',
                              label: 'All Buildings',
                              data: colorMetaphorDatasets,
                              order: 2,
                              backgroundColor: 'rgba(255, 99, 132, 0.2)',
                           },
                           {
                              type: 'line',
                              label: 'Current Building',
                              data: dataColorMetaphor,
                              order: 1,
                              backgroundColor: 'rgba(54, 162, 235, 1)',
                           }],
                           labels: allTimestamps
                        },
                        options: {}
                     });

                     this.chart = new Chart("chartBuilding", {
                        type: "line",
                        data: {
                           labels: dataHeightMetaphor.map(entry => entry.x),
                           datasets: [{
                              label: `Height - ${getMetaphorSelection().height}`,
                              fill: false,
                              lineTension: 0,
                              borderColor: "rgba(128, 128, 128, 1)",
                              backgroundColor: "rgba(128, 128, 128, 0.8)",
                              pointStyle: 'circle',
                              pointRadius: 5,
                              pointHoverRadius: 7.5,
                              data: dataHeightMetaphor
                           }, {
                              label: `Color - ${getMetaphorSelection().color}`,
                              fill: false,
                              lineTension: 0,
                              borderColor: `rgba(${buildingBaseColor.r * 255}, ${buildingBaseColor.g * 255}, ${buildingBaseColor.b * 255}, 1)`,
                              backgroundColor: `rgba(${buildingBaseColor.r * 255}, ${buildingBaseColor.g * 255}, ${buildingBaseColor.b * 255}, 0.8)`,
                              pointStyle: 'circle',
                              pointRadius: 5,
                              pointHoverRadius: 7.5,
                              data: dataColorMetaphor
                           }],
                        },
                        options: {}
                     });
                     // display arrow over the building
                     drawArrow(building)
                  } else {
                     removeArrow();
                  }
                  break;
               }
            }
         }
      });

      renderer.domElement.addEventListener("mousemove", e => {

         for (let element of this.allModelTreeElements) {
            element.style.color = "black";
         }

         const mouse = new THREE.Vector2();
         mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
         mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

         const raycaster = new THREE.Raycaster();
         raycaster.setFromCamera(mouse, camera);

         let intersects = raycaster.intersectObjects(scene.children);

         if (this.previousHoverObject !== null) {
            if (this.previousHoverObject instanceof Building) {
               this.previousHoverObject.notHighlightBuilding();
            } else if (this.previousHoverObject instanceof Plane) {
               this.previousHoverObject.notHighlightPlane();
            }
            this.previousHoverObject = null;
         }

         intersects = intersects.filter(intersect =>
            intersect.object instanceof Building ||
            intersect.object instanceof Mesh ||
            intersect.object instanceof Plane);
         intersects = intersects.filter(intersect => intersect.object.visible);

         if (intersects.length === 0) {
            return;
         }
         let elementToHighlight = intersects[0].object;
         if (elementToHighlight instanceof Building) {
            elementToHighlight.highlightBuilding();
            for (let modelTreeElement of this.allModelTreeElements) {
               if (modelTreeElement.id === elementToHighlight.uuid) {
                  modelTreeElement.children[0].style.color = "blue";
               }
            }
            this.previousHoverObject = elementToHighlight;
         } else if (elementToHighlight.parent instanceof Plane) {
            elementToHighlight.parent.highlightPlane();
            for (let modelTreeElement of this.allModelTreeElements) {
               if (modelTreeElement.id === elementToHighlight.parent.uuid) {
                  modelTreeElement.children[0].style.color = "blue";
               }
            }
            this.previousHoverObject = elementToHighlight.parent;
         }
      });
   }
}

export { MouseControls }