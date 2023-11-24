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

function clearDataStore() {
    memory_data = [];
}

module.exports = {
    get,
    set,
    clearDataStore
}