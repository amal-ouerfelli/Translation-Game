import * as dotenv from "dotenv";
import { router } from "./routes/word.routes";
const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");
const socketIo = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

dotenv.config();

dbConnection;

// if (!process.env.PORT) {
//   process.exit(1);
// }
let players = {};
let turnQueue = []; // Queue to manage turns
let currentTurn = null; // Current player whose turn it is
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("joinGame", (data) => {
    if (Object.keys(players).length < 2) {
      players[socket.id] = { name: data.playerName, score: data.score };
      turnQueue.push(data.playerName);
    }
    console.log("Player joined:", data);

    io.emit("updatePlayers", players);
    // If no one is currently taking a turn, start the turn for the first player
    if (!currentTurn) {
      currentTurn = turnQueue[0];
      io.emit("turnUpdate", { currentTurn });
    }
  });
  socket.on("endTurn", () => {
    if (players[socket.id]?.name === currentTurn) {
      // Move the current player to the end of the queue and set the next player
      turnQueue.push(turnQueue.shift());

      currentTurn = turnQueue[0];
      io.emit("turnUpdate", { currentTurn });
    }
  });
  socket.on("reset", () => {
    players = {};
  });
  socket.on("connected", () => {
    io.emit("updatePlayers", players);
  });

  socket.on("updateScore", (data) => {
    if (players[socket.id]) {
      players[socket.id].score = data.score;
      io.emit("updatePlayers", players);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT: number = 7000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Authorization, Content-Type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//routes
app.use("/api/words", router);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
