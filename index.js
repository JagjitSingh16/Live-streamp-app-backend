const express = require("express");
const app = express();
const server = require("http").Server(app);

const io = require("socket.io")(server);

const users = [];

app.get("/", (req, res) => {
  res.send("Live Commerce API");
});

const addUser = (userName, roomId) => {
  users.push({
    userName: userName,
    roomId: roomId,
  });
};

io.on("connection", (socket) => {
  console.log("someone connected");
  socket.on("join-room", ({ roomId, userName }) => {
    console.log("User joined room");
    console.log(roomId);
    console.log(userName);
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userName);
  });
});

server.listen(3000, () => {
  console.log(`Listen on ${3000}`);
});
