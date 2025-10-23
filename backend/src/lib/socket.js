import { Server } from "socket.io";
import http from "http";
import express from "express";
import { env } from "process";
import "dotenv/config";
import { Socket } from "dgram";
import { SocketAuthMiddleware } from "../middleware/SocketAuthMiddleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL],
    credentials: true,
  },
});

io.use(SocketAuthMiddleware);

// Storing online users
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.user.fullName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  //  Used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export {io,app,server}
