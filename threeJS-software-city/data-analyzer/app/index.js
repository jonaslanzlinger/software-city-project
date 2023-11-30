const express = require('express');
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');
const { initializeEndpoints } = require('./adapters/in/analyzeWebController');
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`Data Analyzer service listening on port ${port}`);
})

initializeEndpoints(app);
