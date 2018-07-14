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

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  let last_seek_time = 0;
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('user disconnected')
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



})

server.listen(port, () => console.log(`Listening on port ${port}`));