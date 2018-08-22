const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// our localhost port
const port = 3700;

const app = express();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

let UserList = new Set();
// map of rooms: code to room
// room: 0: users that haven't join any room
// other rooms with a code: include user lists with user id
// user id

// This is what the socket.io syntax is like
io.on('connection', socket => {
  let last_seek_time = 0;
  let youtube_last_seek_time = 0;
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('seek', (time) => {
    console.log(time,last_seek_time);
    if (last_seek_time !== time){
      last_seek_time = time;
      io.sockets.emit('seek', time);
      console.log('SERVER ask everyone to seek to', time);
    }
  });
  socket.on('pause', (pause) => {
    io.sockets.emit('pause', pause);
    console.log('SERVER ask everyone to ', pause ? 'pause' : 'play');
  });



  // TODO: for youtube, the current one
  socket.on('youtube pause', () => {
    io.sockets.emit('youtube pause');
    console.log('SERVER ask everyone to pause');
  });
  socket.on('youtube play/seek', (time) => {
    if (youtube_last_seek_time !== time){
      io.sockets.emit('youtube play/seek', time);
      console.log('SERVER ask everyone to seek/play at', time);
    }
  });
  socket.on('youtube url', (url) => {
    io.sockets.emit('youtube url', url);
    console.log('SERVER ask everyone to load url: ', url);
  });

})

server.listen(port, () => console.log(`Listening on port ${port}`));