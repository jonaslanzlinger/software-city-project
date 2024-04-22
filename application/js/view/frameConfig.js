const buttonSaveConfig = document.getElementById("button-save-config");

const groupingPathSelection = document.getElementById("groupingPath-selection");
const timestampSelection = document.getElementById("timestamp-selection");
const participantSelection = document.getElementById("participant-selection");
const taskIdSelection = document.getElementById("taskId-selection");

const dimensionAttributeSelection = document.getElementById("dimension-attribute-selection");
const heightAttributeSelection = document.getElementById("height-attribute-selection");
const colorAttributeSelection = document.getElementById("color-attribute-selection");

const alertSuccessUploadData = document.getElementById("alert-success-upload-data");

const frameConfig = document.getElementById("frame-config");

const buttonStartVisualize = document.getElementById("button-start-visualize");

const buttonVisualize = document.getElementById("button-visualize");
const buttonModelTree = document.getElementById("button-model-tree");

const bindSaveConfig = (handleUpdateConfig, handleProcessOriginalData, handleGetAttributeNames, handleGetDatatype, handleGetParticipants, handleGetTasks, handleGetMapping) => {

   buttonSaveConfig.addEventListener("click", () => {

      let config = {
         groupingPath: groupingPathSelection.value,
         timestamp: timestampSelection.value,
         participant: participantSelection.value,
         taskId: taskIdSelection.value
      }

      handleUpdateConfig(config);
      handleProcessOriginalData(config);

      dimensionAttributeSelection.replaceChildren();
      heightAttributeSelection.replaceChildren();
      colorAttributeSelection.replaceChildren();

      handleGetAttributeNames().forEach(attributeName => {
         const newElement = document.createElement("option");
         newElement.value = attributeName;
         newElement.innerText = attributeName;
         dimensionAttributeSelection.appendChild(newElement.cloneNode(true));
         heightAttributeSelection.appendChild(newElement.cloneNode(true));
         colorAttributeSelection.appendChild(newElement.cloneNode(true));
      })

      if (handleGetDatatype() !== "java-source-code") {
         document.getElementById("participant").style.display = "block";
         document.getElementById("taskId").style.display = "block";
         document.getElementById("participant-label").style.display = "block";
         document.getElementById("taskId-label").style.display = "block";

         handleGetParticipants().forEach(participant => {
            let newElement = document.createElement("option");
            newElement.value = participant;
            newElement.innerText = `participant - ${participant}`;
            document.getElementById("participant").appendChild(newElement);
         });

         handleGetTasks().forEach(task => {
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
      let mapping = handleGetMapping();
      if (mapping.length > 0) {
         mapping = JSON.parse(mapping[0].split('=')[1]).mapping;
         dimensionAttributeSelection.value = mapping.dimension;
         heightAttributeSelection.value = mapping.height;
         colorAttributeSelection.value = mapping.color;
         participant.value = mapping.participant;
         taskId.value = mapping.taskId;
      }

      alertSuccessUploadData.style.display = "block";
      $("#alert-success-upload-data").delay(2000).fadeOut(800);
      frameConfig.style.display = "none";

      buttonVisualize.disabled = false;
      buttonModelTree.disabled = false;
   });
}

export { bindSaveConfig };