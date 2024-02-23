let dataStore = {
   data: [],
   attributeNames: [],
   dataType: ""
};

const getData = () => {
   return dataStore;
}

const setData = (data, dataType) => {
   const lines = data.split("\n");
   let attributeNames = lines[0].split(",");

   lines.forEach((line, index) => {
      if (index === 0) {
         return;
      }

      let jsonObject = {};
      let values = line.split(",");
      for (let i = 0; i < attributeNames.length; i++) {
         if (attributeNames[i] === "timestamp") {
            let year = parseInt(values[i].substring(0, 4));
            let month = parseInt(values[i].substring(4, 6)) - 1;
            let day = parseInt(values[i].substring(6, 8));
            let hour = parseInt(values[i].substring(8, 10));
            let minute = parseInt(values[i].substring(10, 12));
            let second = parseInt(values[i].substring(12, 14));
            let millisecond = parseInt(values[i].substring(14));
            jsonObject[attributeNames[i]] = new Date(year, month, day, hour, minute, second, millisecond);
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
      if (entry.timestamp in epoques) {
         epoques[entry.timestamp].push(entry);
      }
      else {
         epoques[entry.timestamp] = [];
         epoques[entry.timestamp].push(entry);
      }
   });
   return epoques;
}

export { getData, setData, clearData, calculateNormalizeFactors, getEpoques }