import app from "./app.js";
import http from "http";
import { Server } from "socket.io";
import { chatSocket, learningSocket } from "./config/socket.io.js";

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});

learningSocket(io);

server.listen(5000, () => {
  console.log("Server running at port 5000");
});
