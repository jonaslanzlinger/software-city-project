const { get, set, clearDataStore } = require('../../application/services/getDataService');

function initializeEndpoints(app) {
    app.get('/', (req, res) => {
        const data = get();

        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });

    app.post('/', (req, res) => {
        const requestData = req.body;
        set(requestData);

        res.json({ message: 'Data received successfully', data: requestData });
    })

    app.delete('/', (req, res) => {
        clearDataStore();

        res.json({ message: 'Data deleted successfully' });
    })
}

module.exports = {
    initializeEndpoints
};