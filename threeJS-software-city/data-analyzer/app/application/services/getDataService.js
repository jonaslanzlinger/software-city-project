const { DUMMY_DATA } = require("../../../resources/data/dummy_data");

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
      setCsvJavaSourceCode(csv_data);
      break;
  }
}

function setCsvJavaSourceCode(csv_data) {
  const lines = csv_data.split("\n");

  lines.forEach((line, index) => {
    if (index === 0 && line.startsWith(",")) {
      return;
    }

    // Structure of the Dataset
    let lineElements = line.split(",");
    const jsonObject = {
      className: lineElements[0],
      commentLinesOfCode: lineElements[1],
      javadocLinesOfCode: lineElements[2],
      linesOfCode: lineElements[3],
      avgEyeFixationDuration: Math.random() * 685 + 65,
    };

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
