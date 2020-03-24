const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require("./db");
const characterRouter = require("./routes/character-router");

const app = express();
const apiPort = 3003;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));