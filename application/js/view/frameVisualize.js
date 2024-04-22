const dimensionAttributeSelection = document.getElementById("dimension-attribute-selection");
const heightAttributeSelection = document.getElementById("height-attribute-selection");
const colorAttributeSelection = document.getElementById("color-attribute-selection");

const buttonStartVisualize = document.getElementById("button-start-visualize");

const frameModelTree = document.getElementById("frame-model-tree");
const frameInfo = document.getElementById("frame-info");

const bindStartVisualize = (handleGetOriginalData, handleUpdateMapping, handleSetMetaphorSelection, handleGetDatatype, handleSetVisualizationData, handleBuildTreesOfBuildings, handleSetListTreeOfBuildings, handleVisualize) => {

   buttonStartVisualize.addEventListener("click", e => {

      e.preventDefault();

      let metaphorSelection = {
         dimension: dimensionAttributeSelection.value,
         height: heightAttributeSelection.value,
         color: colorAttributeSelection.value
      }

      document.getElementById("frame-visualize").style.display = "none";
      document.getElementById("view-data").style.display = "none";

      let data = handleGetOriginalData();
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
      handleUpdateMapping(mapping);
      handleSetMetaphorSelection(mapping);

      // filter data depending on participant and task selection
      if (handleGetDatatype() !== "java-source-code") {
         data = data.filter(entry => {
            return entry.participant === participant.toString() && entry.taskId === taskId.toString();
         });

      }

      handleSetVisualizationData(data);

      let treeOfBuildingsList = handleBuildTreesOfBuildings();

      handleSetListTreeOfBuildings(treeOfBuildingsList);

      handleVisualize(treeOfBuildingsList);

      frameModelTree.style.display = "block";
      frameInfo.style.display = "block";

   });
}

export { bindStartVisualize };