import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// In-memory counter for demo purposes.
let counter = 0;

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.emit("counterUpdated", counter);

  socket.on("increment", () => {
    counter += 1;
    io.emit("counterUpdated", counter);
  });
});

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});