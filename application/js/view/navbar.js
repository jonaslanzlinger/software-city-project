import { removeArrow } from "./visualization3D/arrow.js";
import { removeRenderersAndGuis } from "../model/dataManagement/data.js";

const buttonUpload = document.getElementById("button-upload");
const frameUpload = document.getElementById("frame-upload");

const buttonConfig = document.getElementById("button-config");
const frameConfig = document.getElementById("frame-config");

const buttonVisualize = document.getElementById("button-visualize");
const frameVisualize = document.getElementById("frame-visualize");

const buttonViewData = document.getElementById("button-view-data");

const buttonModelTree = document.getElementById("button-model-tree");
const frameModelTree = document.getElementById("frame-model-tree");

const frameInfo = document.getElementById("frame-info");

const sliderContainer = document.getElementById("slider-container");
const aggregateFunction = document.getElementById("aggregate-function");
const viewData = document.getElementById("view-data");

const closeAllFrames = () => {
   frameUpload.style.display = "none";
   frameConfig.style.display = "none";
   frameVisualize.style.display = "none";
   frameInfo.style.display = "none";
   frameModelTree.style.display = "none";
}

const _initNavbarButtons = () => {
   buttonUpload.addEventListener("click", () => {
      let frameDisplay = frameUpload.style.display;
      closeAllFrames();
      frameUpload.style.display = frameDisplay === "block" ? "none" : "block";
   });

   buttonConfig.addEventListener("click", () => {
      let frameDisplay = frameConfig.style.display;
      closeAllFrames();
      frameConfig.style.display = frameDisplay === "block" ? "none" : "block";
   });

   buttonVisualize.addEventListener("click", () => {
      let frameDisplay = frameVisualize.style.display;
      closeAllFrames();
      frameVisualize.style.display = frameDisplay === "block" ? "none" : "block";
   });

   buttonViewData.addEventListener("click", () => {
      closeAllFrames();
      removeArrow();
      removeRenderersAndGuis();
      sliderContainer.style.display = "none";
      aggregateFunction.style.display = "none";
      viewData.style.display = "block";
   });

   buttonModelTree.addEventListener("click", () => {
      let frameModelTreeDisplay = frameModelTree.style.display;
      let frameInfoDisplay = frameInfo.style.display;
      closeAllFrames();
      frameModelTree.style.display = frameModelTreeDisplay === "block" ? "none" : "block";
      frameInfo.style.display = frameInfoDisplay === "block" ? "none" : "block";
   });

   // Close all frames when pressing "Esc"
   document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
         closeAllFrames();
      }
   });
}

export { _initNavbarButtons };
