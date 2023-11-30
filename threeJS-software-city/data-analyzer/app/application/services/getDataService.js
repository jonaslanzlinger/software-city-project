const { DUMMY_DATA } = require('../../../resources/data/dummy_data');

let memory_data = [];

function get() {
    if (memory_data.length == 0) {
        return DUMMY_DATA
    } else {
        return memory_data;
    }
}

function set(data) {
    memory_data = data;
}

function setCsv(csv_data) {
    const lines = csv_data.split('\n');

    lines.forEach((line, index) => {
        if (index === 0 && line.startsWith(',')) {
            return;
        }

        // Structure of the Dataset
        let lineElements = line.split(',');
        const jsonObject = {
            className: lineElements[0],
            commentLinesOfCode: lineElements[1],
            javadocLinesOfCode: lineElements[2],
            linesOfCode: lineElements[3],
            avgEyeFixationDuration: Math.random() * 685 + 65
        }

        memory_data.push(jsonObject);
    })
    console.log(memory_data);
}

function clearDataStore() {
    memory_data = [];
}

module.exports = {
    get,
    set,
    setCsv,
    clearDataStore
}