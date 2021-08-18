module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinRoom", ({ username, userId, roomId, ownerId }) => {
      console.log(`[joinRoom event] triggered by ${username}`);
      socket.join(roomId);
      socket.emit("joinMessage", { joined: true, ownerId, roomId });
      socket.broadcast
        .to(roomId)
        .emit("studentJoined", `${username} joined the room`);
    });
  });
};
