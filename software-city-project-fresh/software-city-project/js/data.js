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
         jsonObject[attributeNames[i]] = values[i];
      }

      dataStore.data.push(jsonObject);
   });

   dataStore.attributeNames = attributeNames;
   dataStore.dataType = dataType;
}

const calculateNormalizeFactors = metaphorSelection => {
   console.log(metaphorSelection);
   let maxDimensionValue = 0;
   let maxHeightValue = 0;
   dataStore.data.forEach(entry => {
      maxDimensionValue = parseFloat(entry[metaphorSelection.dimension]) > maxDimensionValue ? parseFloat(entry[metaphorSelection.dimension]) : maxDimensionValue;
      maxHeightValue = parseFloat(entry[metaphorSelection.height]) > maxHeightValue ? parseFloat(entry[metaphorSelection.height]) : maxHeightValue;
   });

   console.log(maxDimensionValue);
   console.log(maxHeightValue);

   let dimensionFactor = 15 / maxDimensionValue;
   let heightFactor = 15 / maxHeightValue;
   return { dimension: dimensionFactor, height: heightFactor };
}

export { getData, setData, calculateNormalizeFactors }