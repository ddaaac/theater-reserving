const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const api = require('./routes/index');

app.use(cors());

app.use(bodyParser.json());
app.use('/api', api);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));