const dummy_data = require('./dummy_data');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

let IN_MEMORY_DATA = [];

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    // if no data has been uploaded, return DUMMY_DATA
    if (IN_MEMORY_DATA.length == 0) {
        res.json(dummy_data.DUMMY_DATA);
    } else {
        res.json(IN_MEMORY_DATA);
    }
});

app.post('/', (req, res) => {
    const requestData = req.body;
    IN_MEMORY_DATA = requestData;
    res.json({ message: 'Data received successfully', data: requestData });
})

app.listen(port, () => {
    console.log(`Data Analyzer service listening on port ${port}`);
})