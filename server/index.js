const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

const rooms = {};
const users = {};

io.on('connection', (socket) => {
  console.log('a user connected ' + socket.id);

  socket.on("disconnect", (params) => {
    Object.keys(rooms).map(roomId => {
      rooms[roomId].users = rooms[roomId].users.filter(x => x !== socket.id)
    })
    delete users[socket.id];
  })

  socket.on("join", (params) => {
    const roomId = params.roomId;
    users[socket.id] = {
      roomId: roomId
    }
    if (!rooms[roomId]) {
      rooms[roomId] = {
        roomId,
        users: []
      }
    }
    rooms[roomId].users.push(socket.id);
    console.log("user added to room " + roomId);
  });

  socket.on("localDescription", (params) => {
    let roomId = users[socket.id].roomId;
    
    let otherUsers = rooms[roomId].users;
    otherUsers.forEach(otherUser => {
      if (otherUser !== socket.id) {
        io.to(otherUser).emit("localDescription", {
            description: params.description
        })
      }
    })
  })

  socket.on("remoteDescription", (params) => {
    let roomId = users[socket.id].roomId;    
    let otherUsers = rooms[roomId].users;

    otherUsers.forEach(otherUser => {
      if (otherUser !== socket.id) {
        io.to(otherUser).emit("remoteDescription", {
            description: params.description
        })
      }
    })
  });

  socket.on("iceCandidate", (params) => {
    let roomId = users[socket.id].roomId;    
    let otherUsers = rooms[roomId].users;

    otherUsers.forEach(otherUser => {
      if (otherUser !== socket.id) {
        io.to(otherUser).emit("iceCandidate", {
          candidate: params.candidate
        })
      }
    })
  });


  socket.on("iceCandidateReply", (params) => {
    let roomId = users[socket.id].roomId;    
    let otherUsers = rooms[roomId].users;

    otherUsers.forEach(otherUser => {
      if (otherUser !== socket.id) {
        io.to(otherUser).emit("iceCandidateReply", {
          candidate: params.candidate
        })
      }
    })
  });

});

server.listen(3001, () => {
  console.log('listening on *:3001');
});
