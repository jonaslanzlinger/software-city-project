import { getData, clearData, processData } from "../data";
import { removeAllRenderers, removeAllGuis } from "./visualize";
import { updateConfig } from "./cookie_manager";
import { uploadData } from "./index-upload";
import { buildTable } from "./table";
import { prepareFrame } from "./index-visualize";

const buttonUpload = document.getElementById("button-upload");
const buttonConfig = document.getElementById("button-config");
const buttonVisualize = document.getElementById("button-visualize");
const buttonViewData = document.getElementById("button-view-data");
const buttonClearData = document.getElementById("button-clear-data");
const buttonModelTree = document.getElementById("button-model-tree");

const viewData = document.getElementById("view-data");

const frameUpload = document.getElementById("frame-upload");
const frameConfig = document.getElementById("frame-config");
const frameVisualize = document.getElementById("frame-visualize");
const frameModelTree = document.getElementById("frame-model-tree");
const frameInfo = document.getElementById("frame-info");

const buttonsClose = document.getElementsByClassName("button-close");

const buttonUploadData = document.getElementById("button-upload-data");
const buttonSaveConfig = document.getElementById("button-save-config");

const alertSuccessUploadData = document.getElementById("alert-success-upload-data");
const alertSuccessClearData = document.getElementById("alert-success-clear-data");
const buttonAlertCloseUploadData = document.getElementById("button-alert-close-upload-data");
const buttonAlertCloseClearData = document.getElementById("button-alert-close-clear-data");

const sliderContainer = document.getElementById("slider-container");

buttonUpload.addEventListener("click", () => {
   frameConfig.style.display = "none";
   frameVisualize.style.display = "none";
   frameInfo.style.display = "none";
   frameModelTree.style.display = "none";
   if (frameUpload.style.display === "none" || frameUpload.style.display === '') {
      frameUpload.style.display = "block";
   } else {
      frameUpload.style.display = "none";
   }
});

buttonConfig.addEventListener("click", () => {
   frameUpload.style.display = "none";
   frameVisualize.style.display = "none";
   frameInfo.style.display = "none";
   frameModelTree.style.display = "none";
   if (frameConfig.style.display === "none" || frameConfig.style.display === '') {
      frameConfig.style.display = 'block';
   } else {
      frameConfig.style.display = "none";
   }
});

buttonVisualize.addEventListener("click", () => {
   frameUpload.style.display = "none";
   frameConfig.style.display = "none";
   frameInfo.style.display = "none";
   frameModelTree.style.display = "none";
   if (frameVisualize.style.display === "none" || frameVisualize.style.display === '') {
      frameVisualize.style.display = 'block';
   } else {
      frameVisualize.style.display = "none";
   }
});

buttonViewData.addEventListener("click", () => {
   frameUpload.style.display = "none";
   frameConfig.style.display = "none";
   frameVisualize.style.display = "none";
   frameInfo.style.display = "none";
   frameModelTree.style.display = "none";
   removeAllRenderers();
   removeAllGuis();
   sliderContainer.style.display = "none";
   viewData.style.display = "block";
});

buttonModelTree.addEventListener("click", () => {
   if (frameModelTree.style.display === "none" || frameModelTree.style.display === "") {
      frameModelTree.style.display = "block";
   } else {
      frameModelTree.style.display = "none";
   }
});

buttonClearData.addEventListener("click", () => {
   clearData();
   alertSuccessClearData.style.display = "block";
   $("#alert-success-clear-data").delay(2000).fadeOut(800);
   buildTable();
   toggleConfigAndViewDataButton(true);
   toggleVisualizeAndModelTreeButton(true);
   // hide table
   document.getElementById("table-data").style.display = "none";
});

buttonSaveConfig.addEventListener("click", () => {

   let config = {
      groupingPath: document.getElementById("groupingPath-selection").value,
      timestamp: document.getElementById("timestamp-selection").value,
      participant: document.getElementById("participant-selection").value,
      taskId: document.getElementById("taskId-selection").value
   }

   // safe config in cookies_manager
   updateConfig(getData().attributeNames, config);

   processData(config);

   prepareFrame();

   alertSuccessUploadData.style.display = "block";
   $("#alert-success-upload-data").delay(2000).fadeOut(800);
   frameConfig.style.display = "none";
   toggleVisualizeAndModelTreeButton(false);
});

const toggleConfigAndViewDataButton = boolChoice => {
   buttonConfig.disabled = boolChoice;
   buttonViewData.disabled = boolChoice;
}

const toggleVisualizeAndModelTreeButton = boolChoice => {
   buttonVisualize.disabled = boolChoice;
   buttonModelTree.disabled = boolChoice;
}

for (let i = 0; i < buttonsClose.length; i++) {
   buttonsClose[i].addEventListener("click", () => {
      switch (buttonsClose[i].parentElement.id) {
         case "frame-upload":
            frameUpload.style.display = "none";
            break;
         case "frame-config":
            frameConfig.style.display = "none";
            break;
         case "frame-visualize":
            frameVisualize.style.display = "none";
            break;
         case "frame-info":
            frameInfo.style.display = "none";
            break;
         case "frame-model-tree":
            frameModelTree.style.display = "none";
            break;
      }
   });
}

document.addEventListener("keydown", e => {
   if (e.key === "Escape") {
      frameUpload.style.display = "none";
      frameConfig.style.display = "none";
      frameVisualize.style.display = "none";
      frameInfo.style.display = "none";
      frameModelTree.style.display = "none";
   }
});

buttonUploadData.addEventListener("click", e => {
   e.preventDefault();
   uploadData();
   toggleConfigAndViewDataButton(false);
});

buttonAlertCloseUploadData.addEventListener("click", () => {
   alertSuccessUploadData.style.display = "none";
});

buttonAlertCloseClearData.addEventListener("click", () => {
   alertSuccessClearData.style.display = "none";
});