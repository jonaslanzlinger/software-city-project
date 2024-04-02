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
   attributeNames = attributeNames.map(attributeName => {
      return attributeName.replace(" ", "").slice(0, 1).toLowerCase() + attributeName.replace(" ", "").slice(1);
   });

   lines.forEach((line, index) => {
      if (index === 0) {
         return;
      }

      let jsonObject = {};
      let values = line.split(",");
      for (let i = 0; i < attributeNames.length; i++) {
         if (attributeNames[i] === "taskId" && dataType === "eye-tracking-bpmn") {
            if (values[i] === undefined || values[i] === "") {
               return;
            }
            jsonObject["taskId"] = values[i];
         } else if (attributeNames[i] === "timestamp" && dataType === "eye-tracking-bpmn") {
            if (values[i] === undefined) {
               return;
            }
            let minute = parseInt(values[i].substring(0, 2));
            let second = parseInt(values[i].substring(2, 6));
            let millisecond = parseInt(values[i].substring(6, 9));
            jsonObject["timestamp"] = new Date(2024, 1, 1, 8, minute, second, millisecond);
         } else if (attributeNames[i] === "timestamp") {
            if (values[i] === undefined) {
               return;
            }
            let year = parseInt(values[i].substring(0, 4));
            let month = parseInt(values[i].substring(4, 6)) - 1;
            let day = parseInt(values[i].substring(6, 8));
            let hour = parseInt(values[i].substring(8, 10));
            let minute = parseInt(values[i].substring(10, 12));
            let second = parseInt(values[i].substring(12, 14));
            let millisecond = parseInt(values[i].substring(14));
            jsonObject[attributeNames[i]] = new Date(year, month, day, hour, minute, second, millisecond);
         } else if (attributeNames[i] === "fixationDuration") {
            if (values[i] === undefined) {
               return;
            }
            jsonObject["fixationDuration"] = parseFloat(values[i].split(".")[0]);
         } else {
            jsonObject[attributeNames[i]] = values[i];
         }
      }
      dataStore.data.push(jsonObject);
   });

   dataStore.attributeNames = attributeNames;
   dataStore.dataType = dataType;
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

export { getData as getData, setData, clearData, calculateNormalizeFactors, getEpoques, getParticipants, getTasks }