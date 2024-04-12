import { timestampToDate } from "./utils";


let dataStore = {
   originalData: [],
   attributeNames: [],
   dataType: "",
   visualizationData: [],
   listTreeOfBuildings: [],
   listModelTrees: [],
   listRenderers: [],
   listGuis: []
};


/**
 * Method to process the originalData according to the config
 * 
 * @param {Object} config // the configuration of attributesNames to [groupingPath, timestamp, participant, taskId]
 */
const processOriginalData = config => {

   let listDataObjects = [];
   dataStore.originalData.forEach(entry => {
      let dataObject = {}
      for (let i = 0; i < dataStore.attributeNames.length; i++) {
         let attributeName = dataStore.attributeNames[i];

         if (attributeName === config.groupingPath) {
            // if the dataType is java-source-code, replace the "." with ";"
            dataObject["groupingPath"] = entry[attributeName].replace(/\./g, ";")
         } else if (attributeName === config.timestamp) {
            dataObject["timestamp"] = timestampToDate(entry[attributeName]);
         } else if (attributeName === config.participant && dataStore.dataType !== "java-source-code") {
            dataObject["participant"] = entry[attributeName];
         } else if (attributeName === config.taskId && dataStore.dataType !== "java-source-code") {
            dataObject["taskId"] = entry[attributeName];
         } else {
            dataObject[attributeName] = entry[attributeName];
         }

         // if the attribute is not defined, skip the entry
         // if that attribute is one of those important attributes
         if ((attributeName === config.groupingPath || attributeName === config.timestamp) && dataStore.dataType === "java-source-code") {
            if (entry[attributeName] === undefined || entry[attributeName] === "") {
               continue;
            }
         }
         if ((attributeName === config.groupingPath || attributeName === config.timestamp || attributeName === config.participant || attributeName === config.taskId) && dataStore.dataType !== "java-source-code") {
            if (entry[attributeName] === undefined || entry[attributeName] === "") {
               continue;
            }
         }
      }
      listDataObjects.push(dataObject);
   });

   dataStore.originalData = listDataObjects;
   dataStore.visualizationData = [];
   // now, save in the dataStore.attributeNames the new attribute names
   dataStore.attributeNames = Object.keys(dataStore.originalData[0]);
}

/**
 * Method to clear the dataStore
 */
const clearData = () => {
   dataStore.originalData = [];
   dataStore.attributeNames = [];
   dataStore.dataType = "";
   dataStore.visualizationData = [];
   dataStore.listTreeOfBuildings = [];
   dataStore.listModelTrees = [];
   dataStore.listRenderers = [];
   dataStore.listGuis = [];
}

/**
 * Method to retrieve the epoques (only used for the java-source-code data type)
 * 
 * @returns {Object} // the epoques
 */
const getEpoques = () => {
   let epoques = {};
   dataStore.visualizationData.forEach(entry => {
      if (!(entry.timestamp in epoques)) {
         epoques[entry.timestamp] = [];
      }
   });
   dataStore.visualizationData.forEach(entry => {
      for (let epoque in epoques) {
         epoques[epoque].push(entry);
      }
   });
   return epoques;
}

/**
 * Method to retrieve the participants
 * 
 * @returns {Array} // the participants
 */
const getParticipants = () => {
   let participants = [];
   dataStore.originalData.forEach(entry => {
      if (!participants.includes(entry.participant)) {
         participants.push(entry.participant);
      }
   });
   return participants;
}

/**
 * Method to retrieve the tasks
 * 
 * @returns {Array} // the tasks
 */
const getTasks = () => {
   let tasks = [];
   dataStore.originalData.forEach(entry => {
      if (!tasks.includes(entry.taskId)) {
         tasks.push(entry.taskId);
      }
   });
   return tasks;
}

/**
 * Method to add a renderer to the list of renderers
 */
const addRenderer = renderer => {
   dataStore.listRenderers.push(renderer);
}

/**
 * Method to add a gui to the list of guis
 */
const addGui = gui => {
   dataStore.listGuis.push(gui);
}

/**
 * Method to remove all renderers and guis
 */
const removeRenderersAndGuis = () => {
   removeAllRenderers();
   removeAllGuis();
}

const removeAllRenderers = () => {
   for (let renderer of dataStore.listRenderers) {
      removeRenderer(renderer);
   }
   dataStore.listRenderers = [];
}

const removeAllGuis = () => {
   for (let gui of dataStore.listGuis) {
      removeGui(gui);
   }
   dataStore.listGuis = [];
}

const removeRenderer = renderer => {
   renderer.dispose();
   let canvasElement = document.getElementsByTagName("canvas");
   if (canvasElement.length > 0) {
      canvasElement[0].remove();
   }
}

const removeGui = gui => {
   gui.destroy();
}


// ///////////////////
// GETTERS
// ///////////////////
const getDataStore = () => {
   return dataStore;
}

const getOriginalData = () => {
   return dataStore.originalData;
}

const getAttributeNames = () => {
   return dataStore.attributeNames;
}

const getDataType = () => {
   return dataStore.dataType;
}

const getVisualizationData = () => {
   return dataStore.visualizationData;
}

const getListTreeOfBuildings = () => {
   return dataStore.listTreeOfBuildings;
}

const getListModelTrees = () => {
   return dataStore.listModelTrees;
}

const getListRenderers = () => {
   return dataStore.listRenderers;
}

const getListGuis = () => {
   return dataStore.listGuis;
}


// ///////////////////
// SETTERS
// ///////////////////

/**
 * Method to set ...
 * - the original data
 * - the attribute names
 * - the data type
 * 
 * @param {String} data // the data in csv format separated by commas and new lines for each new record
 * @param {String} dataType // the type of the data (e.g. "eye-tracking-java-source-code")
 */
const setOriginalData = (data, dataType) => {

   let lines = data.split("\n");

   // get the attribute names (first line of the csv file, and remove it from "lines")
   let attributeNames = lines.shift().split(",");
   attributeNames = attributeNames.map(attributeName => {
      // remove the spaces and make the first letter lowercase
      return attributeName.slice(0, 1).toLowerCase() + attributeName.replace(" ", "").slice(1);
   });

   // iterate over all lines and add them to the dataStore
   lines.forEach(line => {
      // create a new object for each line
      let dataObject = {};
      let values = line.split(",");
      for (let i = 0; i < attributeNames.length; i++) {
         dataObject[attributeNames[i]] = values[i];
      }
      dataStore.originalData.push(dataObject);
   });

   // set the attribute names and the data type
   dataStore.attributeNames = attributeNames;
   dataStore.dataType = dataType;
}

/**
 * Method to set the visualization data
 * 
 * @param {Array} data 
 */
const setVisualizationData = data => {
   dataStore.visualizationData = data;
}

export {
   processOriginalData,
   clearData,
   getEpoques,
   getParticipants,
   getTasks,
   addRenderer,
   addGui,
   removeRenderersAndGuis,
   getDataStore,
   getOriginalData,
   getAttributeNames,
   getDataType,
   getVisualizationData,
   getListTreeOfBuildings,
   getListModelTrees,
   getListRenderers,
   getListGuis,
   setOriginalData,
   setVisualizationData
}