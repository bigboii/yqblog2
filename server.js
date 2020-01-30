/*
    1) start up mongo db
        "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"

    2) Connect to mongo db
        "C:\Program Files\MongoDB\Server\3.6\bin\mongo.exe"
*/

//BASE IMPORTS
const express = require('express');
const app = express();
const util = require('util');          //For debugging

const bodyParser = require('body-parser');
const path = require('path');


// API file for interacting with MongoDB
// const api = require('./server/routes/api');


/*****************************
       CHAT SETUP
***************************/
//ENUM
var Action = {
  BROADCAST : "BROADCAST"
}

//CHAT IMPORT
const http = require('http');
const socketio = require('socket.io')(http);

//Attach socket.io
var server = http.createServer(app);
var io = socketio.listen(server);
app.set('socketio', io);
app.set('server', server);

var clients2 = [];          //associative array, array[sockets.id] = "username"
var clients3 = [];          //array of user objects (username, socketid)
var nameCounter  = 1;            // number of users

//use io.on This event will be called when new user joins
//use socket.on to emit or receive event.
io.on('connection', function(socket) 
{
  //This event will be called when a user sends a message
  socket.on('message', function(data)
  {
    console.log(util.inspect(data, false, null, true));
    console.log('received message from', data.from.name, 'msg', data.content);

    console.log("broadcasting");           //let chatroom know there was new message
    //io.emit("something happened");         //for all

    let date = new Date();

    io.emit("message",     //for all except me      
    {
      from: data.from,
      content: data.content,
      action: Action.BROADCAST,
      time: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() 
    });
    console.log("broadcast complete");
  });
  
  //Called when new user joins
  socket.on("user_connect", function(username)
  {
    console.log(username);           //debugging
    
    clients2[socket.id] = username;  //
    clients3.push(
    {
      name: username,
      id: socket.id
    });
    
    io.emit("broadcast_user_connect", username);    //for all except me      

    //console.log(data.user+" joined the conversation");
  });
  
  socket.on("user_disconnect", function(data)
  {
    /*
    socket.emit("broadcast_user_disconnect", 
    {
      user: data.user 
    });
    */
  });
  
  //Called when a client first joins server
  socket.on("userlist_get", function()
  {
    console.log("userlist_get called");
    if(clients3.length > 0)
    {
      socket.emit("broadcast_userlist", clients3);
    }
  });
  
  //Whenever a client disconnects, this gets executed
  socket.on("disconnect", function()
  {   
    //console.log(clients2);          //debugging : before splice
    
    var nameOfDc = clients2[socket.id];
    console.log("[Server] client, " + nameOfDc + ", disconnected from chat server");        //print socket id of disconnected client
    
    //remove from clients2 : associative array
    var index2 = clients2.indexOf(socket.id);          //find index of 
    delete clients2[socket.id];
    //clients2.splice(index2, 1);
    console.log(clients2);
    
    //remove from clients3 : array of objects
    var index3 = clients3.indexOf((item) => item.id === sockets.id);
    clients3.splice(index3, 1);
    console.log(clients3);
    
    console.log(nameOfDc + "'s disconnection will be broadcasted to other clients");        //print socket id of disconnected client
    io.emit("broadcast_user_disconnect", nameOfDc);
  });
  
  // socket.emit('message', "Welcome to Chat");

});


/***************************************
  Remaining MEAN Configuration + Setup
****************************************/

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

// //const server = http.createServer(app);

// app.get('server').listen(process.env.PORT || 8080, function(){       //chat version
//   console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });  


server.listen(port, () => console.log(`Running on localhost:${port}`));