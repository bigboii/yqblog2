/*
    1) start up mongo db
        "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"

    2) Connect to mongo db
        "C:\Program Files\MongoDB\Server\3.6\bin\mongo.exe"
*/

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

// API file for interacting with MongoDB
// const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
// app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'dist/yqblog/'))); //<- it will automatically search for index.html under src folder.
// console.log("__dirname = " + path.join(__dirname+"\\dist\\mean\\", 'index.html'));
console.log("__dirname = " + path.join(__dirname, 'dist/yqblog/'));

// API location
// app.use('/api', api);

// Send all other requests to the Angular app
app.get('/', (req, res) => {
    // res.sendFile(path.join(path.join(__dirname, 'dist/mean/'), 'index.html'));
    res.sendFile(path.join(__dirname, 'index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));