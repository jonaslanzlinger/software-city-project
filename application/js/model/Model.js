import { getOriginalData, setOriginalData, processOriginalData, getAttributeNames, getDataType, getParticipants, getTasks, setMetaphorSelection, setVisualizationData, setListTreeOfBuildings, clearData } from './dataManagement/data';
import { getConfig, updateConfig, getMapping, updateMapping } from './cookieManager';
import { buildTreesOfBuildings } from './metaphorModels/TreeOfBuildings';
import { visualize } from '../view/visualization3D/visualize';

class Model {

   constructor() {
      this.getOriginalData = getOriginalData;
      this.setOriginalData = setOriginalData;
      this.getAttributeNames = getAttributeNames;
      this.getParticipants = getParticipants;
      this.getTasks = getTasks;
      this.getConfig = getConfig;
      this.getDataType = getDataType;
      this.updateConfig = updateConfig;
      this.getMapping = getMapping;
      this.updateMapping = updateMapping;
      this.processOriginalData = processOriginalData;
      this.setMetaphorSelection = setMetaphorSelection;
      this.setVisualizationData = setVisualizationData;
      this.buildTreesOfBuildings = buildTreesOfBuildings;
      this.setListTreeOfBuildings = setListTreeOfBuildings;
      this.visualize = visualize;
      this.clearData = clearData;
   }
}

export { Model };