import { getData, setData, clearData, getEpoques } from "./data";
import { Plane } from "./entities/Plane";
import { buildTreesOfBuildings, visualize, removeAllRenderers, removeAllGuis } from "./visualize";
import { formatDate } from "./utils";

const buttonUpload = document.getElementById("button-upload");
const buttonVisualize = document.getElementById("button-visualize");
const buttonViewData = document.getElementById("button-view-data");
const buttonClearData = document.getElementById("button-clear-data");

const viewData = document.getElementById("view-data");
const thead = document.getElementById("thead");
const tbody = document.getElementById("tbody");

const frameUpload = document.getElementById("frame-upload");
const frameVisualize = document.getElementById("frame-visualize");
const frameInfo = document.getElementById("frame-info");

const buttonsClose = document.getElementsByClassName("button-close");

const dimensionAttributeSelection = document.getElementById("dimension-attribute-selection");
const heightAttributeSelection = document.getElementById("height-attribute-selection");
const colorAttributeSelection = document.getElementById("color-attribute-selection");

const buttonUploadData = document.getElementById("button-upload-data");

const alertSuccessUploadData = document.getElementById("alert-success-upload-data");
const alertSuccessClearData = document.getElementById("alert-success-clear-data");
const buttonAlertCloseUploadData = document.getElementById("button-alert-close-upload-data");
const buttonAlertCloseClearData = document.getElementById("button-alert-close-clear-data");

const buttonStartVisualize = document.getElementById("button-start-visualize");

const sliderContainer = document.getElementById("slider-container");
const sliderThumb = document.getElementById("slider-thumb");
const slider = document.getElementById("slider");
const valueDisplay = document.getElementById("slider-value");

buttonUpload.addEventListener("click", () => {
   frameVisualize.style.display = "none";
   frameInfo.style.display = "none";
   if (frameUpload.style.display === "none" || frameUpload.style.display === '') {
      frameUpload.style.display = "block";
   } else {
      frameUpload.style.display = "none";
   }
});

buttonVisualize.addEventListener("click", () => {
   frameUpload.style.display = "none";
   frameInfo.style.display = "none";
   if (frameVisualize.style.display === "none" || frameVisualize.style.display === '') {
      frameVisualize.style.display = 'block';
   } else {
      frameVisualize.style.display = "none";
   }
});

buttonViewData.addEventListener("click", () => {
   frameUpload.style.display = "none";
   frameVisualize.style.display = "none";
   frameInfo.style.display = "none";
   removeAllRenderers();
   removeAllGuis();
   sliderContainer.style.display = "none";
   viewData.style.display = "block";
});

buttonClearData.addEventListener("click", () => {
   clearData();
   alertSuccessClearData.style.display = "block";
   $("#alert-success-clear-data").delay(2000).fadeOut(800);
   buildTable();
});

for (let i = 0; i < buttonsClose.length; i++) {
   buttonsClose[i].addEventListener("click", () => {
      frameUpload.style.display = "none";
      frameVisualize.style.display = "none";
      frameInfo.style.display = "none";
   });
}

document.addEventListener("keydown", e => {
   if (e.key === "Escape") {
      frameUpload.style.display = "none";
      frameVisualize.style.display = "none";
      frameInfo.style.display = "none";
   }
});

buttonUploadData.addEventListener("click", e => {
   e.preventDefault();

   const file = document.getElementById("file").files[0];

   let reader = new FileReader();
   reader.readAsText(file);

   reader.onload = e => {
      setData(e.target.result, document.getElementById("file-format").value);

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
   }
});

buttonAlertCloseUploadData.addEventListener("click", () => {
   alertSuccessUploadData.style.display = "none";
});

buttonAlertCloseClearData.addEventListener("click", () => {
   alertSuccessClearData.style.display = "none";
});

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
   frameVisualize.style.display = "none";
   viewData.style.display = "none";

   let treeOfBuildingsList = buildTreesOfBuildings(getData(), metaphorSelection);

   visualize(treeOfBuildingsList, metaphorSelection);
});

let frameInfoOffsetLeft = 0, frameInfoOffsetTop = 0;
frameInfo.addEventListener("mousedown", e => {
   let rect = frameInfo.getBoundingClientRect();
   frameInfoOffsetLeft = e.clientX - (rect.left + rect.width / 2);
   frameInfoOffsetTop = e.clientY - (rect.top + rect.height / 2);
   document.onmouseup = removeDrag;
   if (!(frameInfoOffsetLeft > (rect.width / 2 - 17) && frameInfoOffsetTop > (rect.height / 2 - 17))) {
      document.onmousemove = dragFrameInfo;
   }
});

const removeDrag = e => {
   document.onmouseup = null;
   document.onmousemove = null;
}

const dragFrameInfo = e => {
   e.preventDefault();
   let rect = frameInfo.getBoundingClientRect();
   let newPosLeft = e.clientX - frameInfoOffsetLeft;
   let newPosTop = e.clientY - frameInfoOffsetTop;
   newPosLeft = (newPosLeft - rect.width / 2) < 0 ? rect.width / 2 : newPosLeft;
   newPosTop = (newPosTop - rect.height / 2) < 0 ? rect.height / 2 : newPosTop;
   newPosLeft = (newPosLeft + rect.width / 2) > window.innerWidth ? window.innerWidth - rect.width / 2 : newPosLeft;
   newPosTop = (newPosTop + rect.height / 2) > window.innerHeight ? window.innerHeight - rect.height / 2 : newPosTop;
   frameInfo.style.left = newPosLeft + "px";
   frameInfo.style.top = newPosTop + "px";
}

const addSlider = (treeOfBuildingsList, scene) => {
   let i = 0;
   let displayedTreeOfBuildings = treeOfBuildingsList[i];

   let lowestTimestamp = new Date(treeOfBuildingsList[i].timestamp);
   let highestTimestamp = new Date(treeOfBuildingsList[treeOfBuildingsList.length - 1].timestamp);

   let deltaMillis = highestTimestamp - lowestTimestamp;

   valueDisplay.textContent = formatDate(lowestTimestamp);
   sliderContainer.style.display = "block";

   let isDragging = false;
   let SliderOffsetLeft = 0;

   sliderThumb.addEventListener("mousedown", e => {
      isDragging = true;
      SliderOffsetLeft = e.clientX - sliderThumb.getBoundingClientRect().left;
   });

   document.addEventListener("mouseup", () => {
      isDragging = false;
      SliderOffsetLeft = 0;
   });

   document.addEventListener("mousemove", e => {
      if (isDragging) {
         const sliderProgressInPixel = e.clientX - slider.getBoundingClientRect().left - SliderOffsetLeft;
         let newSliderProgressInPixel = Math.min(slider.clientWidth - sliderThumb.clientWidth, Math.max(0, sliderProgressInPixel));
         sliderThumb.style.left = newSliderProgressInPixel + "px";
         let sliderProgress = newSliderProgressInPixel / (slider.clientWidth - sliderThumb.clientWidth);
         let sliderTimestamp = new Date(lowestTimestamp.getTime() + parseInt(sliderProgress * deltaMillis));
         valueDisplay.textContent = formatDate(sliderTimestamp);

         const belowList = treeOfBuildingsList.filter(treeOfBuildings => new Date(treeOfBuildings.timestamp) <= sliderTimestamp);
         const next = belowList.reduce((max, treeOfBuildings) => new Date(treeOfBuildings.timestamp) > new Date(max.timestamp) ? treeOfBuildings : max, treeOfBuildingsList[0]);
         const newIndex = treeOfBuildingsList.findIndex(treeOfBuildings => treeOfBuildings === next);

         if (newIndex !== i) {
            i = newIndex;
            scene.remove(...scene.children.filter(child => child instanceof Plane));
            displayedTreeOfBuildings = next;
            scene.add(displayedTreeOfBuildings.baseNode);
         }
      }
   });
}

const addSliderEyeTracking = treeOfBuildings => {

   treeOfBuildings.list.forEach(building => {
      building.visible = false;
   });

   const lowestTimestamp = treeOfBuildings.getLowestTimestamp();
   const highestTimestamp = treeOfBuildings.getHighestTimestamp();
   const deltaMillis = highestTimestamp - lowestTimestamp;

   valueDisplay.textContent = formatDate(lowestTimestamp);
   sliderContainer.style.display = "block";

   let isDragging = false;
   let SliderOffsetLeft = 0;

   sliderThumb.addEventListener("mousedown", e => {
      isDragging = true;
      SliderOffsetLeft = e.clientX - sliderThumb.getBoundingClientRect().left;
   });

   document.addEventListener("mouseup", () => {
      isDragging = false;
      SliderOffsetLeft = 0;
   });

   document.addEventListener("mousemove", e => {
      if (isDragging) {
         const sliderProgressInPixel = e.clientX - slider.getBoundingClientRect().left - SliderOffsetLeft;
         let newSliderProgressInPixel = Math.min(slider.clientWidth - sliderThumb.clientWidth, Math.max(0, sliderProgressInPixel));
         sliderThumb.style.left = newSliderProgressInPixel + "px";
         let sliderProgress = newSliderProgressInPixel / (slider.clientWidth - sliderThumb.clientWidth);
         let sliderTimestamp = new Date(lowestTimestamp.getTime() + parseInt(sliderProgress * deltaMillis));
         valueDisplay.textContent = formatDate(sliderTimestamp);

         let maxOccurrences = 0;
         let maxTotalTime = 0;
         for (let building of treeOfBuildings.list) {
            let occurrences = 0;
            let totalTime = 0;
            for (let entry of building.buildingData) {
               occurrences += 1;
               totalTime += parseInt(entry.avgEyeFixationDuration);
            }
            if (occurrences > maxOccurrences) {
               maxOccurrences = occurrences;
            }
            if (totalTime > maxTotalTime) {
               maxTotalTime = totalTime;
            }
         }
         for (let building of treeOfBuildings.list) {
            let totalTime = 0;
            let totalOccurrences = 0;
            for (let entry of building.buildingData) {
               if (new Date(entry.timestamp) <= sliderTimestamp) {
                  totalTime += parseInt(entry.avgEyeFixationDuration);
                  totalOccurrences += 1;
               }
            }

            building.visible = totalTime > 0;
            let color = building.material[0].color;
            let ratio = (totalTime / maxTotalTime) * (50 / 100);
            color.r = 0.5 + ratio;
            color.g = 0.5 - ratio;
            color.b = 0.5 - ratio;
            building.material[0].color.set(color);
            building.material[1].color.set(color);
            building.material[3].color.set(color);
            building.material[4].color.set(color);
            building.material[5].color.set(color);

            color = building.material[2].color;
            ratio = (totalOccurrences / maxOccurrences) * (50 / 100);
            color.r = 0.5 + ratio;
            color.g = 0.5 - ratio;
            color.b = 0.5 - ratio;
            building.material[2].color.set(color);
         }
      }
   });
}

const buildTable = () => {
   while (thead.firstChild) {
      thead.removeChild(thead.firstChild);
   }
   while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
   }

   let data = getData();
   let tr = document.createElement("tr");
   data.attributeNames.forEach(attribute => {
      let th = document.createElement("th");
      th.innerText = attribute;
      tr.appendChild(th);
   });
   thead.appendChild(tr);
   data.data.forEach(entry => {
      tr = document.createElement("tr");
      for (let key in entry) {
         let td = document.createElement("td");
         if (key === "timestamp") {
            td.innerText = formatDate(entry[key]);
         } else {
            td.innerText = entry[key];
         }
         tr.appendChild(td);
      }
      tbody.appendChild(tr);
   });

   if (data.data.length > 0) {
      buttonClearData.style.display = "block";
   } else {
      buttonClearData.style.display = "none";
   }

   $("#table-data").DataTable();
}

export { addSlider, addSliderEyeTracking }