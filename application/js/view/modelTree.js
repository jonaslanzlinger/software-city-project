import { Plane } from "../model/metaphorModels/Plane";
import { Building } from "../model/metaphorModels/Building";
import { hexToRgb, rgbToHsl } from "../utils/utils";

const createModelTrees = listTreeOfBuildings => {
   let listOfModelTrees = [];
   for (let treeOfBuildings of listTreeOfBuildings) {

      let check = [treeOfBuildings.baseNode]
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

         if (current instanceof Building) {
            newElement.type = "building";
            newElement.style.display = "flex";
            newElement.style.alignItems = "center";

            if (current.buildingName.lastIndexOf(";") !== -1) {
               newElement.innerText = current.buildingName.substring(current.buildingName.lastIndexOf(";") + 1);
            } else {
               newElement.innerText = current.buildingName;
            }

            newElement.appendChild(colorPicker);

            colorPicker.addEventListener("input", () => {
               current.setBaseColor(rgbToHsl(hexToRgb(colorPicker.value)));
            });
         } else if (current instanceof Plane) {
            newElement.type = "plane";
            newElement.expanded = "true";

            let folderElement = document.createElement("div");
            folderElement.classList.add("model-tree-element");
            folderElement.style.fontWeight = "bold";

            if (current.nodeName.lastIndexOf(";") !== -1) {
               folderElement.innerText = "\u25BF " + current.nodeName.substring(current.nodeName.lastIndexOf(";") + 1);
            } else {
               folderElement.innerText = "\u25BF " + current.nodeName;
            }

            folderElement.style.display = "flex";
            folderElement.style.alignItems = "center";

            folderElement.appendChild(colorPicker);

            colorPicker.addEventListener("input", () => {
               current.setBaseColor(rgbToHsl(hexToRgb(colorPicker.value)));
            });

            newElement.appendChild(folderElement);

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
                  current.highlightBuilding();
                  element.style.color = "blue";
               } else {
                  current.highlightPlane();
                  element.style.color = "blue";
               }
            })

            element.addEventListener("mouseleave", function () {
               if (current instanceof Building) {
                  current.notHighlightBuilding();
                  element.style.color = "black";
               } else {
                  current.notHighlightPlane();
                  element.style.color = "black";

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
      listOfModelTrees.push(container);
   }

   return listOfModelTrees;
}

export { createModelTrees }