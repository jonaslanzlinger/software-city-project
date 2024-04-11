import { setData, getData, getParticipants, getTasks } from "../data.js";
import { buildTable } from "./table.js";
import { getConfig } from "./cookie_manager.js";

const dimensionAttributeSelection = document.getElementById("dimension-attribute-selection");
const heightAttributeSelection = document.getElementById("height-attribute-selection");
const colorAttributeSelection = document.getElementById("color-attribute-selection");

const alertSuccessUploadData = document.getElementById("alert-success-upload-data");
const frameUpload = document.getElementById("frame-upload");

const groupingPathSelection = document.getElementById("groupingPath-selection");
const timestampSelection = document.getElementById("timestamp-selection");
const participantSelection = document.getElementById("participant-selection");
const taskIdSelection = document.getElementById("taskId-selection");

const uploadData = () => {
   document.getElementById("instructions").style.display = "none";

   const file = document.getElementById("file").files[0];

   let reader = new FileReader();
   reader.readAsText(file);

   reader.onload = e => {
      setData(e.target.result, document.getElementById("file-format").value);

      // populate the config dropdowns
      groupingPathSelection.replaceChildren();
      timestampSelection.replaceChildren();
      participantSelection.replaceChildren();
      taskIdSelection.replaceChildren();

      getData().attributeNames.forEach(attributeName => {
         const newElement = document.createElement("option");
         newElement.value = attributeName;
         newElement.innerText = attributeName;
         groupingPathSelection.appendChild(newElement.cloneNode(true));
         timestampSelection.appendChild(newElement.cloneNode(true));
         participantSelection.appendChild(newElement.cloneNode(true));
         taskIdSelection.appendChild(newElement.cloneNode(true));
      });

      // load a config (if present for the attributes)
      // set the config dropdowns to the values of the config
      let config = getConfig(getData().attributeNames);
      if (config.length > 0) {
         config = JSON.parse(getConfig(getData().attributeNames)[0].split('=')[1]).config;
         groupingPathSelection.value = config.groupingPath;
         timestampSelection.value = config.timestamp;
         participantSelection.value = config.participant;
         taskIdSelection.value = config.taskId;
      }


      if (getData().dataType === "java-source-code") {
         document.getElementById("participant-selection").style.display = "none";
         document.getElementById("participant-selection-label").style.display = "none";
         document.getElementById("taskId-selection").style.display = "none";
         document.getElementById("taskId-selection-label").style.display = "none";
      } else {
         document.getElementById("participant-selection").style.display = "block";
         document.getElementById("participant-selection-label").style.display = "block";
         document.getElementById("taskId-selection").style.display = "block";
         document.getElementById("taskId-selection-label").style.display = "block";
      }

      // alert success and hide upload frame
      alertSuccessUploadData.style.display = "block";
      $("#alert-success-upload-data").delay(2000).fadeOut(800);
      frameUpload.style.display = "none";

      buildTable();

      // show table
      document.getElementById("table-data").style.display = "block";
   }
}

const uploadDataOld = () => {
   document.getElementById("instructions").style.display = "none";

   const file = document.getElementById("file").files[0];

   let reader = new FileReader();
   reader.readAsText(file);

   reader.onload = e => {
      setData(e.target.result, document.getElementById("file-format").value);

      // load all mappings that have the same attribute names as the data
      let mappings = getMappingsByAttributeNames(getData().attributeNames);

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

      alertSuccessUploadData.style.display = "block";
      $("#alert-success-upload-data").delay(2000).fadeOut(800);
      frameUpload.style.display = "none";

      buildTable();

      if (getData().dataType === "eye-tracking-bpmn") {
         document.getElementById("participant-selection").style.display = "block";
         document.getElementById("task-selection").style.display = "block";
         document.getElementById("participant-selection-label").style.display = "block";
         document.getElementById("task-selection-label").style.display = "block";

         getParticipants().forEach(participant => {
            let newElement = document.createElement("option");
            newElement.value = participant;
            newElement.innerText = `participant - ${participant}`;
            document.getElementById("participant-selection").appendChild(newElement);
         });

         getTasks().forEach(task => {
            let newElement = document.createElement("option");
            newElement.value = task;
            newElement.innerText = `task - ${task}`;
            document.getElementById("task-selection").appendChild(newElement);
         });

      } else {
         let participantSelection = document.getElementById("participant-selection");
         let taskSelection = document.getElementById("task-selection");

         participantSelection.style.display = "none";
         taskSelection.style.display = "none";
         document.getElementById("participant-selection-label").style.display = "none";
         document.getElementById("task-selection-label").style.display = "none";

         while (participantSelection.firstChild) {
            participantSelection.removeChild(participantSelection.firstChild);
         }

         while (taskSelection.firstChild) {
            taskSelection.removeChild(taskSelection.firstChild);
         }
      }
   }
}

export { uploadData };