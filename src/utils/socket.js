module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on(
      "joinRoom",
      async ({ username, userId, roomId, ownerId, avatar }) => {
        const onlineUsers = [];
        socket.join(roomId);
        console.log(`[joinRoom event] ${username} joined the room: ${roomId}`);
        socket.emit("joinMessage", { joined: true, userId, ownerId, roomId });
        await io
          .of("/")
          .in(roomId)
          .clients((error, clients) => {
            // console.log("[1]", clients);
            if (!error) {
              if (clients.length > 0) {
                clients.map((client) => {
                  const { _id, name, avatar_url } =
                    io.sockets.connected[client].feathers.user;
                  // console.log(
                  //   "[2]",
                  //   io.sockets.connected[client].feathers.user
                  // );
                  const user = {
                    userId: _id,
                    username: name,
                    avatar: avatar_url,
                  };
                  onlineUsers.push(user);
                });
              }
            }
          });
        // console.log("[3]", onlineUsers);
        socket.emit("onlineUsers", onlineUsers);

        socket.broadcast.to(roomId).emit("userJoined", {
          username,
          userId,
          avatar,
          message: `${username} joined the room`,
        });
      }
    );

    socket.on("getOnlineUsers", async (roomId) => {
      const onlineUsers = [];

      await io
        .of("/")
        .in(roomId)
        .clients((error, clients) => {
          // console.log("[1]", clients);
          if (!error) {
            if (clients.length > 0) {
              clients.map((client) => {
                const { _id, name, avatar_url } =
                  io.sockets.connected[client].feathers.user;
                // console.log(
                //   "[2]",
                //   io.sockets.connected[client].feathers.user
                // );
                const user = {
                  userId: _id,
                  username: name,
                  avatar: avatar_url,
                };
                onlineUsers.push(user);
              });
            }
          }
        });
      // console.log("[3]", onlineUsers);
      socket.emit("onlineUsers", onlineUsers);
    });

    socket.on("leaveRoom", ({ username, userId, roomId }) => {
      socket.leave(roomId);
      console.log(`[leaveRoom event] ${username} left the room: ${roomId}`);
      socket.emit("leaveMessage", { joined: false, userId });
      socket.broadcast.to(roomId).emit("userLeft", {
        username,
        userId,
        message: `${username} left the room`,
      });
    });
  });
};
