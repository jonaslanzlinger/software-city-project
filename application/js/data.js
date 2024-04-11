let dataStore = {
   data: [],
   attributeNames: [],
   dataType: "",
   selectedData: []
};

const getData = () => {
   return dataStore;
}

const setData = (data, dataType) => {
   const lines = data.split("\n");
   let attributeNames = lines[0].split(",");

   // remove whitespaces and make first letter lowercase
   attributeNames = attributeNames.map(attributeName => {
      return attributeName.replace(" ", "").slice(0, 1).toLowerCase() + attributeName.replace(" ", "").slice(1);
   });

   // iterate over all lines and add them to the dataStore
   lines.forEach((line, index) => {
      // skip the first line (because this is the attribute names line)
      if (index === 0) {
         return;
      }

      // create a new object for each line
      let jsonObject = {};
      let values = line.split(",");
      for (let i = 0; i < attributeNames.length; i++) {
         jsonObject[attributeNames[i]] = values[i];
      }
      // add the object to the dataStore
      dataStore.data.push(jsonObject);
   });
   // set the attribute names and the data type
   dataStore.attributeNames = attributeNames;
   dataStore.dataType = dataType;
}

const processData = config => {

   // process / filter the data according to the config
   dataStore.data.forEach(entry => {
      let jsonObject = {};
      for (let i = 0; i < dataStore.attributeNames.length; i++) {
         let attributeName = dataStore.attributeNames[i];

         if (attributeName === config.groupingPath) {
            // if the dataType is java-source-code, replace the "." with ";"
            jsonObject["groupingPath"] = entry[attributeName].replace(/\./g, ";")
         } else if (attributeName === config.timestamp) {
            let year = parseInt(entry[attributeName].substring(0, 4));
            let month = parseInt(entry[attributeName].substring(4, 6)) - 1;
            let day = parseInt(entry[attributeName].substring(6, 8));
            let hour = parseInt(entry[attributeName].substring(8, 10));
            let minute = parseInt(entry[attributeName].substring(10, 12));
            let second = parseInt(entry[attributeName].substring(12, 14));
            let millisecond = parseInt(entry[attributeName].substring(14));
            jsonObject["timestamp"] = new Date(year, month, day, hour, minute, second, millisecond);
         } else if (attributeName === config.participant && dataStore.dataType !== "java-source-code") {
            jsonObject["participant"] = entry[attributeName];
         } else if (attributeName === config.taskId && dataStore.dataType !== "java-source-code") {
            jsonObject["taskId"] = entry[attributeName];
         } else {
            jsonObject[attributeName] = entry[attributeName];
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
      dataStore.selectedData.push(jsonObject);
   });
   // TODO this part such that I keep the original data and original attribute names
   dataStore.data = dataStore.selectedData;
   dataStore.selectedData = [];
   // now, save in the dataStore.attributeNames the new attribute names
   dataStore.attributeNames = Object.keys(dataStore.data[0]);
}

const clearData = () => {
   dataStore = {
      data: [],
      attributeNames: [],
      dataType: ""
   };
}

const calculateNormalizeFactors = metaphorSelection => {
   let maxDimensionValue = 0;
   let maxHeightValue = 0;
   dataStore.data.forEach(entry => {
      maxDimensionValue = parseFloat(entry[metaphorSelection.dimension]) > maxDimensionValue ? parseFloat(entry[metaphorSelection.dimension]) : maxDimensionValue;
      maxHeightValue = parseFloat(entry[metaphorSelection.height]) > maxHeightValue ? parseFloat(entry[metaphorSelection.height]) : maxHeightValue;
   });

   let dimensionFactor = 15 / maxDimensionValue;
   let heightFactor = 15 / maxHeightValue;
   return { dimension: dimensionFactor, height: heightFactor };
}

const getEpoques = () => {
   let epoques = {};
   dataStore.data.forEach(entry => {
      if (!(entry.timestamp in epoques)) {
         epoques[entry.timestamp] = [];
      }
   });
   dataStore.data.forEach(entry => {
      for (let epoque in epoques) {
         epoques[epoque].push(entry);
      }
   });
   return epoques;
}

const getParticipants = () => {
   let participants = [];
   dataStore.data.forEach(entry => {
      if (!participants.includes(entry.participant)) {
         participants.push(entry.participant);
      }
   });
   return participants;
}

const getTasks = () => {
   let tasks = [];
   dataStore.data.forEach(entry => {
      if (!tasks.includes(entry.taskId)) {
         tasks.push(entry.taskId);
      }
   });
   return tasks;
}

export { getData as getData, processData, setData, clearData, calculateNormalizeFactors, getEpoques, getParticipants, getTasks }