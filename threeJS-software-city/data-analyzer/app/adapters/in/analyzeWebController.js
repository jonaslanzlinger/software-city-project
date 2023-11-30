const { uptime } = require('process');
const { get, set, setCsv, clearDataStore } = require('../../application/services/getDataService');
const path = require('path')
const multer = require('multer')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function initializeEndpoints(app) {

    app.get('/', (req, res) => {
        res.render('index', { message: null, data: [{ className: 'EyeFixation' }] });
    });

    app.get('/view/', (req, res) => {
        console.log(get());
        res.render('index', { message: 'View Datastore.', data: [{ className: 'EyeFixation' }] });
    });

    app.post('/upload/', upload.single('file'), (req, res) => {

        console.log('Processing file-upload...');

        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        const csvData = req.file.buffer.toString('utf8');
        setCsv(csvData);

        console.log('File-upload processed.')

        res.render('index', { message: 'File successfully uploaded.', data: [{ className: 'EyeFixation' }] });
    });

    app.get('/clear-datastore/', (req, res) => {
        clearDataStore();
        res.render('index', { message: 'Datastore cleared.', data: [{ className: 'EyeFixation' }] });
    });

    app.get('/api/', (req, res) => {
        const data = get();

        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });

    app.post('/api/', (req, res) => {
        const requestData = req.body;
        set(requestData);

        res.json({ message: 'Data received successfully', data: requestData });
    })

    app.delete('/api/', (req, res) => {
        clearDataStore();

        res.json({ message: 'Data deleted successfully' });
    })
}

module.exports = {
    initializeEndpoints
};