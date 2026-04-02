export const chatSocket = (io) => {
  // In-memory storage (production e DB use hobe)
  let users = {};

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // 👉 JOIN ROOM
    socket.on("join_room", ({ username, room }, callback) => {
      socket.join(room);

      users[socket.id] = { username, room };
      console.log(users);

      console.log(`${username} joined ${room}`);

      // notify others
      socket.to(room).emit("receive_message", {
        user: "system",
        message: `${username} joined the chat`,
      });

      // ACK (important)
      callback({ status: "ok" });
    });

    // 👉 SEND MESSAGE
    socket.on("send_message", (data, callback) => {
      const user = users[socket.id];

      if (!user) return;

      io.to(user.room).emit("receive_message", {
        user: user.username,
        message: data.message,
      });

      callback({ status: "delivered" }); // ACK
    });

    // 👉 TYPING
    socket.on("typing", () => {
      const user = users[socket.id];
      if (user) {
        socket.to(user.room).emit("typing", user.username);
      }
    });

    // 👉 DISCONNECT
    socket.on("disconnect", () => {
      const user = users[socket.id];
      if (user) {
        socket.to(user.room).emit("receive_message", {
          user: "system",
          message: `${user.username} left`,
        });
      }

      delete users[socket.id];
      console.log("Disconnected:", socket.id);
    });
  });
};

export const learningSocket = (io) => {
  let users = {};

  io.on("connection", (socket) => {
    const username = socket.handshake.auth.username;

    io.emit(
      "chat:recieve",
      {
        msg: `${username} is joined the chat`,
        sendedBy: "system",
      },
      () => {},
    );

    socket.on("chat:send", (msg, callback) => {
      console.log(msg);
      const data = {
        msg,
        sendedBy: username,
      };

      io.emit("chat:recieve", data, (res) => {
        console.log(res);
      });

      callback({ status: "ok" });
    });

    socket.on("disconnect", (reason) => {
      io.emit(
        "chat:recieve",
        {
          msg: `${username} is left the chat`,
          sendedBy: "system",
        },
        () => {},
      );
      console.log(socket.id, "disconnected for ", reason);
    });
  });
};
