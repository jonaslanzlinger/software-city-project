import { getData, getParticipants, getTasks } from "./data.js";
import { buildTreesOfBuildings, visualize } from "./visualize.js";
import { getMapping, updateMapping } from "./cookie_manager.js";

const buttonStartVisualize = document.getElementById("button-start-visualize");

const dimensionAttributeSelection = document.getElementById("dimension-attribute-selection");
const heightAttributeSelection = document.getElementById("height-attribute-selection");
const colorAttributeSelection = document.getElementById("color-attribute-selection");

const prepareFrame = () => {

   dimensionAttributeSelection.replaceChildren();
   heightAttributeSelection.replaceChildren();
   colorAttributeSelection.replaceChildren();

   getData().attributeNames.forEach(attributeName => {
      const newElement = document.createElement("option");
      newElement.value = attributeName;
      newElement.innerText = attributeName;
      dimensionAttributeSelection.appendChild(newElement.cloneNode(true));
      heightAttributeSelection.appendChild(newElement.cloneNode(true));
      colorAttributeSelection.appendChild(newElement.cloneNode(true));
   })

   if (getData().dataType !== "java-source-code") {
      document.getElementById("participant").style.display = "block";
      document.getElementById("taskId").style.display = "block";
      document.getElementById("participant-label").style.display = "block";
      document.getElementById("taskId-label").style.display = "block";

      getParticipants().forEach(participant => {
         let newElement = document.createElement("option");
         newElement.value = participant;
         newElement.innerText = `participant - ${participant}`;
         document.getElementById("participant").appendChild(newElement);
      });

      getTasks().forEach(task => {
         let newElement = document.createElement("option");
         newElement.value = task;
         newElement.innerText = `task - ${task}`;
         document.getElementById("taskId").appendChild(newElement);
      });

   } else {
      let participant = document.getElementById("participant");
      let taskId = document.getElementById("taskId");

      participant.style.display = "none";
      taskId.style.display = "none";
      document.getElementById("participant-label").style.display = "none";
      document.getElementById("taskId-label").style.display = "none";

      while (participant.firstChild) {
         participant.removeChild(participant.firstChild);
      }

      while (taskId.firstChild) {
         taskId.removeChild(taskId.firstChild);
      }
   }

   // get a mapping from the cookies_manager
   let mapping = getMapping(getData().attributeNames);
   if (mapping.length > 0) {
      mapping = JSON.parse(mapping[0].split('=')[1]).mapping;
      dimensionAttributeSelection.value = mapping.dimension;
      heightAttributeSelection.value = mapping.height;
      colorAttributeSelection.value = mapping.color;
      participant.value = mapping.participant;
      taskId.value = mapping.taskId;
   }
}

buttonStartVisualize.addEventListener("click", e => {
   e.preventDefault();

   let metaphorSelection = {
      dimension: dimensionAttributeSelection.value,
      height: heightAttributeSelection.value,
      color: colorAttributeSelection.value
   }
   let citySelection = {
      dimension: document.getElementById("city-dimension").value,
      spread: document.getElementById("city-spread").value
   }
   document.getElementById("frame-visualize").style.display = "none";
   document.getElementById("view-data").style.display = "none";

   let data = getData();
   let participant = document.getElementById("participant").value;
   let taskId = document.getElementById("taskId").value;

   // update the mapping in the cookies_manager
   const mapping = {
      dimension: metaphorSelection.dimension,
      height: metaphorSelection.height,
      color: metaphorSelection.color,
      participant: participant,
      taskId: taskId
   }
   updateMapping(getData().attributeNames, mapping);

   // filter data depending on participant and task selection
   if (data.dataType !== "java-source-code") {
      data.data = data.data.filter(entry => {
         return entry.participant === participant.toString() && entry.taskId === taskId.toString();
      });
      // filter out all data that has no "Fixation Duration"
      // data.data = data.data.filter(entry => !Number.isNaN(entry.fixationDuration));
   }

   let treeOfBuildingsList = buildTreesOfBuildings(getData(), metaphorSelection);

   visualize(treeOfBuildingsList, metaphorSelection);
});

export { prepareFrame };