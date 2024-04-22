class Controller {

   constructor(model, view) {
      this.model = model;
      this.view = view;

      this.view.bindUploadData(this.handleSetOriginalData, this.handleGetAttributeNames, this.handleGetConfig, this.handleGetDatatype, this.handleGetOriginalData);
      this.view.bindSaveConfig(this.handleUpdateConfig, this.handleProcessOriginalData, this.handleGetAttributeNames, this.handleGetDatatype, this.handleGetParticipants, this.handleGetTasks, this.handleGetMapping);
      this.view.bindStartVisualize(this.handleGetOriginalData, this.handleUpdateMapping, this.handleSetMetaphorSelection, this.handleGetDatatype, this.handleSetVisualizationData, this.handleBuildTreesOfBuildings, this.handleSetListTreeOfBuildings, this.handleVisualize);
      this.view.bindClearTable(this.handleClearData, this.handleGetOriginalData, this.handleGetAttributeNames);
   }

   handleGetOriginalData = () => {
      return this.model.getOriginalData();
   }

   handleSetOriginalData = data => {
      this.model.setOriginalData(data);
   }

   handleProcessOriginalData = config => {
      this.model.processOriginalData(config);
   }

   handleGetParticipants = () => {
      return this.model.getParticipants();
   }

   handleGetTasks = () => {
      return this.model.getTasks();
   }

   handleGetAttributeNames = () => {
      return this.model.getAttributeNames();
   }

   handleGetConfig = () => {
      return this.model.getConfig();
   }

   handleUpdateConfig = config => {
      this.model.updateConfig(config);
   }

   handleGetMapping = () => {
      return this.model.getMapping();
   }

   handleUpdateMapping = mapping => {
      this.model.updateMapping(mapping);
   }

   handleGetDatatype = () => {
      return this.model.getDataType();
   }

   handleClearData = () => {
      this.model.clearData();
   }

   handleSetMetaphorSelection = mapping => {
      this.model.setMetaphorSelection(mapping);
   }

   handleSetVisualizationData = data => {
      this.model.setVisualizationData(data);
   }

   handleBuildTreesOfBuildings = () => {
      return this.model.buildTreesOfBuildings();
   }

   handleSetListTreeOfBuildings = treeOfBuildingsList => {
      this.model.setListTreeOfBuildings(treeOfBuildingsList);
   }

   handleVisualize = treeOfBuildingsList => {
      this.model.visualize(treeOfBuildingsList);
   }
}

export { Controller };