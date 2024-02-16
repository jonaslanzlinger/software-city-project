import { getData, setData } from "./data";
import { visualize } from "./visualize";

const buttonUpload = document.getElementById("button-upload");
const buttonVisualize = document.getElementById("button-visualize");

const frameUpload = document.getElementById("frame-upload");
const frameVisualize = document.getElementById("frame-visualize");
const frameInfo = document.getElementById("frame-info");

const buttonsClose = document.getElementsByClassName("button-close");

const dimensionAttributeSelection = document.getElementById("dimension-attribute-selection");
const heightAttributeSelection = document.getElementById("height-attribute-selection");
const colorAttributeSelection = document.getElementById("color-attribute-selection");

const buttonUploadData = document.getElementById("button-upload-data");

const alertSuccess = document.getElementById("alert-success");
const buttonAlertClose = document.getElementById("button-alert-close");

const buttonStartVisualize = document.getElementById("button-start-visualize");

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

      alertSuccess.style.display = "block";
      $("#alert-success").delay(2000).fadeOut(800);
      frameUpload.style.display = "none";
   }
});

buttonAlertClose.addEventListener("click", () => {
   alertSuccess.style.display = "none";
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

   visualize(e, getData(), metaphorSelection, citySelection);
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

const addSliderFunctionality = treeOfBuildings => {
   const lowestTimestamp = treeOfBuildings.getLowestTimestamp();
   const highestTimestamp = treeOfBuildings.getHighestTimestamp();
   const deltaTimestamp = highestTimestamp - lowestTimestamp;
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
         let time =
            parseInt(lowestTimestamp) + parseInt(sliderProgress * parseInt(deltaTimestamp));
         time = time.toString();
         const year = time.slice(0, 4);
         const month = time.slice(4, 6);
         const day = time.slice(6, 8);
         const hour = time.slice(8, 10);
         const minute = time.slice(10, 12);
         const second = time.slice(12, 14);
         const millisecond = time.slice(14);
         valueDisplay.textContent = `${year}-${month}-${day}, ${hour}:${minute}:${second}.${millisecond}`;

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
               if (entry.timestamp <= time) {
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

export { addSliderFunctionality }