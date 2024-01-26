let memory_data = { data: [], dataType: "" };

function getData() {
  return memory_data.data;
}

function getDataType() {
  return memory_data.dataType;
}

function set(data) {
  memory_data.data = data;
}

function setCsv(csv_data, fileFormat) {
  memory_data = { data: [], dataType: "" };
  switch (fileFormat) {
    case "java-source-code":
      setCsvJavaSourceCode(csv_data);
      break;
    case "bpmn":
      setCsvBPMN(csv_data);
      break;
    default:
      // console.log('No valid fileFormat!');
      setCsvGeneric(csv_data);
      break;
  }
}

function setCsvJavaSourceCode(csv_data) {
  const lines = csv_data.split("\n");
  let attributeNames = lines[0].split(",");

  lines.forEach((line, index) => {
    if (index === 0) {
      return;
    }

    let jsonObject = {};
    let attributes = line.split(",");
    for (let i = 0; i < attributeNames.length; i++) {
      jsonObject[attributeNames[i]] = attributes[i];
    }

    memory_data.data.push(jsonObject);
    memory_data.dataType = "java-source-code";
  });
}

function setCsvBPMN(csv_data) {
  const lines = csv_data.split("\n");
  let attributeNames = lines[0].split(",");

  lines.forEach((line, index) => {
    if (index === 0) {
      return;
    }

    let jsonObject = {};
    let attributes = line.split(",");
    for (let i = 0; i < attributeNames.length; i++) {
      jsonObject[attributeNames[i]] = attributes[i];
    }

    memory_data.data.push(jsonObject);
    memory_data.dataType = "bpmn";
  });
}

function setCsvGeneric(csv_data) {
  const lines = csv_data.split("\n");
  let attributeNames = lines[0].split(",");

  lines.forEach((line, index) => {
    if (index === 0) {
      return;
    }

    let jsonObject = {};
    let attributes = line.split(",");
    for (let i = 0; i < attributeNames.length; i++) {
      jsonObject[attributeNames[i]] = attributes[i];
    }

    memory_data.data.push(jsonObject);
    memory_data.dataType = "generic";
  });
}

function clearDataStore() {
  memory_data = { data: [], dataType: "" };
  console.log("Datastore cleared.");
}

module.exports = {
  getData,
  getDataType,
  set,
  setCsv,
  clearDataStore,
};
