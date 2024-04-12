import { formatDate } from "../utils.js";
import { Plane } from "./Plane.js";

const sliderContainer = document.getElementById("slider-container");
const valueDisplay = document.getElementById("slider-value");
const sliderThumb = document.getElementById("slider-thumb");

const cumulativeRadio = document.getElementById("cumulative");
const snapshotsRadio = document.getElementById("snapshots");
const windowWidth = document.getElementById("window-width");

const checkboxAggregated = document.getElementById("aggregated");

// global variable for timeline mode
let timelineMode = "cumulative";

const addSlider = (treeOfBuildingsList, scene, listOfModelTrees) => {

   let modelTreeElement = document.getElementById("model-tree");
   while (modelTreeElement.firstChild) {
      modelTreeElement.removeChild(modelTreeElement.firstChild);
   }
   modelTreeElement.appendChild(listOfModelTrees[0]);

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

            while (modelTreeElement.firstChild) {
               modelTreeElement.removeChild(modelTreeElement.firstChild);
            }
            modelTreeElement.appendChild(listOfModelTrees[newIndex]);
         }
      }
   });
   showTimelineModes();
}

const addSliderEyeTracking = (treeOfBuildings, listOfModelTrees) => {

   let modelTreeElement = document.getElementById("model-tree");
   while (modelTreeElement.firstChild) {
      modelTreeElement.removeChild(modelTreeElement.firstChild);
   }
   modelTreeElement.appendChild(listOfModelTrees[0]);

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

   // if the aggregated checkbox is checked, I want to calculate the
   // aggregated values of the height metaphor and the color metaphor
   // ...otherwise I only want to calculate based on the last data point for each building
   let heightMetaphor = treeOfBuildings.list[0].metaphorSelection.height;
   let colorMetaphor = treeOfBuildings.list[0].metaphorSelection.color;
   //
   let heightMaxOccurrences = 0;
   let heightMaxTotalValue = 0;
   let heightMaxValue = 0;
   let colorMaxOccurrences = 0;
   let colorMaxTotalValue = 0;
   let colorMaxValue = 0;
   //
   for (let building of treeOfBuildings.list) {
      let heightOccurrences = 0;
      let heightTotalValue = 0;
      let heightValue = 0;
      let colorOccurrences = 0;
      let colorTotalValue = 0;
      let colorValue = 0;
      for (let entry of building.buildingData) {
         heightOccurrences += 1;
         heightTotalValue += parseInt(entry[heightMetaphor]);
         heightValue = parseInt(entry[heightMetaphor]);

         colorOccurrences += 1;
         colorTotalValue += parseInt(entry[colorMetaphor]);
         colorValue = parseInt(entry[colorMetaphor]);
      }
      if (heightOccurrences > heightMaxOccurrences) {
         heightMaxOccurrences = heightOccurrences;
      }
      if (heightTotalValue > heightMaxTotalValue) {
         heightMaxTotalValue = heightTotalValue;
      }
      if (heightValue > heightMaxValue) {
         heightMaxValue = heightValue;
      }
      if (colorOccurrences > colorMaxOccurrences) {
         colorMaxOccurrences = colorOccurrences;
      }
      if (colorTotalValue > colorMaxTotalValue) {
         colorMaxTotalValue = colorTotalValue;
      }
      if (colorValue > colorMaxValue) {
         colorMaxValue = colorValue;
      }
   }

   document.addEventListener("mousemove", e => {
      if (isDragging) {
         const sliderProgressInPixel = e.clientX - slider.getBoundingClientRect().left - SliderOffsetLeft;
         let newSliderProgressInPixel = Math.min(slider.clientWidth - sliderThumb.clientWidth, Math.max(0, sliderProgressInPixel));
         sliderThumb.style.left = newSliderProgressInPixel + "px";
         let sliderProgress = newSliderProgressInPixel / (slider.clientWidth - sliderThumb.clientWidth);
         let sliderTimestamp = new Date(lowestTimestamp.getTime() + parseInt(sliderProgress * deltaMillis));
         valueDisplay.textContent = formatDate(sliderTimestamp);

         // calculate the window width in milliseconds
         const windowWidthMillis = deltaMillis * windowWidth.value / 100;

         // Calculating the upper and lower bounds of the window
         const lowerWindowBoundsTimestamp = sliderTimestamp.getTime() - windowWidthMillis / 2;
         const lowerWindowBounds = new Date(lowerWindowBoundsTimestamp);
         const upperWindowBoundsTimestamp = sliderTimestamp.getTime() + windowWidthMillis / 2;
         const upperWindowBounds = new Date(upperWindowBoundsTimestamp);

         // in this second for-loop, we calculate the total value of the height metaphor
         // for each building.
         // depending on the timeline mode selection.
         // for the cumulative mode, we calculate the total value of the height metaphor up until this point in time
         // for the snapshots mode, we calculate the total value of the height metaphor for this specific point in time (including the window width)
         for (let building of treeOfBuildings.list) {
            let heightCumulativeValue = 0;
            let heightCumulativeOccurences = 0;
            let heightSnapshotsValue = 0;
            let heightSnapshotsOccurences = 0;
            let colorCumulativeValue = 0;
            let colorCumulativeOccurences = 0;
            let colorSnapshotsValue = 0;
            let colorSnapshotsOccurences = 0;
            for (let entry of building.buildingData) {
               // here we collect the data depending on the timeline mode
               if (timelineMode === "cumulative" && new Date(entry.timestamp) <= sliderTimestamp) {

                  heightCumulativeValue += parseInt(entry[heightMetaphor]);
                  heightCumulativeOccurences += 1;

                  colorCumulativeValue += parseInt(entry[colorMetaphor]);
                  colorCumulativeOccurences += 1;

               } else if (timelineMode === "snapshots" && new Date(entry.timestamp) >= lowerWindowBounds && new Date(entry.timestamp) <= upperWindowBounds) {

                  heightSnapshotsValue += parseInt(entry[heightMetaphor]);
                  heightSnapshotsOccurences += 1;

                  colorSnapshotsValue += parseInt(entry[colorMetaphor]);
                  colorSnapshotsOccurences += 1;
               }
            }

            if (timelineMode === "cumulative") {
               // Color
               building.visible = heightCumulativeOccurences > 0;
               let luminance;
               let ratio;
               if (checkboxAggregated.checked) {
                  luminance = (colorCumulativeValue / colorMaxTotalValue);
                  ratio = 0.8;
               } else {
                  luminance = (colorCumulativeValue / colorMaxValue);
                  ratio = 0.8;
               }
               building.setColorLuminance(luminance, ratio);

               // Height
               let heightDifference = heightCumulativeValue - building.scale.y;
               let moveBuildingYPosBy = heightDifference / 2;
               building.scale.y = heightCumulativeValue;
               building.position.y += moveBuildingYPosBy;

            } else {
               // Color
               building.visible = heightSnapshotsOccurences > 0;
               let luminance = colorSnapshotsValue / colorMaxTotalValue;
               let ratio = 0.8;
               building.setColorLuminance(luminance, ratio);

               // Height
               let heightDifference = heightSnapshotsValue - building.scale.y;
               let moveBuildingYPosBy = heightDifference / 2;
               building.scale.y = heightSnapshotsValue;
               building.position.y += moveBuildingYPosBy;
            }
         }
      }
   });
   showTimelineModes();
}

const showTimelineModes = () => {
   document.getElementById("timeline-modes-container").style.display = "block";
}

/**
 * Method to toggle between cumulative and snapshots mode
 * 
 * Note: This method is called when the user clicks on the radio buttons
 * Note: The checkbox for aggregated values is only displayed in the cumulative mode
 */
const toggleTimelineMode = () => {
   if (cumulativeRadio.checked) {
      windowWidth.style.display = "none";
      timelineMode = "cumulative";
      checkboxAggregated.style.display = "block";
   } else {
      windowWidth.style.display = "block";
      timelineMode = "snapshots";
      checkboxAggregated.style.display = "none";
   }
}

cumulativeRadio.addEventListener("click", toggleTimelineMode);
snapshotsRadio.addEventListener("click", toggleTimelineMode);

export { addSlider, addSliderEyeTracking };