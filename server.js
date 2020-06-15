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


var clients = [];          //associative array, array[sockets.id] = "username"
var users = [];             //array of usernames only
var nameCounter  = 1;            // number of users

//use io.on This event will be called when new user joins
//use socket.on to emit or receive event.
io.on('connection', function(socket) 
{
  console.log("a user connected");

  if(users.length > 0) {
    console.log("CURRENT_USERS being invoked, broadcasting current users: " + users);
    socket.emit("CURRENT_USERS", users); 
  }

  socket.on("JOINED", function(userName)
  {
    console.log("a new userName has joined => " +  userName);

    //Store info about user
    users.push(userName);

    clients[socket.id] = userName;

    console.log("clients: " + clients);

    io.emit("JOINED", userName);
    
    
    //console.log(data.user+" joined the conversation");
  });
  
  socket.on("LEFT", function(userName)
  {
    users = users.filter(e => e !== userName);
    
    io.emit("LEFT", userName)
  });

  //TODO: NEED to test RENAME
  socket.on("RENAME", function(data) {

    io.emit("RENAME",     //emit to all connected clients 
    {
      old: data.userName,
      new: data.newName
    });
  });

  //This event will be called when a user sends a message
  socket.on('MESSAGE', function(data)
  {
    function IntTwoChars(i) {
      return (`0${i}`).slice(-2);
    };

    // console.log(util.inspect(data, false, null, true));
    console.log('received message from', data.from, 'msg', data.content);

    console.log("broadcasting");           //let chatroom know there was new message
    //io.emit("something happened");         //for all

    let date = new Date();
    // current hours
    let hours = IntTwoChars(date.getHours());

    // current minutes
    let minutes = IntTwoChars(date.getMinutes());

    // current seconds
    let seconds = IntTwoChars(date.getSeconds());

    io.emit("MESSAGE",     //emit to all connected clients 
    {
      from: data.from,
      content: data.content,
      action: Action.BROADCAST,
      time: hours + ":" + minutes + ":" + seconds 
    });
    // console.log("broadcast complete");
  });
  
  //Whenever a client disconnects, this gets executed
  socket.on("disconnect", function()
  {   
    //console.log(clients2);          //debugging : before splice
    
    let userName = clients[socket.id];
    console.log("[Server] client, " + userName + ", disconnected from chat server");        //print socket id of disconnected client
    
    //remove from clients2 : associative array
    var index2 = clients.indexOf(socket.id);          //find index of 
    delete clients[socket.id];
    //clients2.splice(index2, 1);
    console.log("current list of clients after disconnect: " + clients);
    // console.log(client);
    
    //remove from clients3 : array of objects
    users = users.filter(e => e !== userName);
    console.log("users after " + userName + " disconnect: " + users);
    
    console.log(userName + "'s disconnection will be broadcasted to other clients");        //print socket id of disconnected client
    io.emit("LEFT", userName);
  });
  
  socket.on("TYPING", function()
  {   
    let userName = clients[socket.id];
    console.log(userName + " TYPING invoked!");

    socket.broadcast.emit("TYPING", userName + " is typing a message")        //broadcast to everyone else except for the socket that starts it.
  });

  socket.on("NOT_TYPING", function() 
  {
    let userName = clients[socket.id];
    console.log(userName + " NOT_TYPING invoked!");

    socket.broadcast.emit("NOT_TYPING", userName)
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
