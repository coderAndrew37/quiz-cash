require("dotenv").config(); // Load environment variables
require("./startup/db.js")();
const express = require("express");
const path = require("path");
const {
  homeRoute,
  userAreaRoute,
  supportRoute,
} = require("./routes/htmlRoutes.js");

const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public")); // Serve static files like CSS and JS

// Routes
app.use("/", homeRoute);
app.use("/", userAreaRoute);
app.use("/", supportRoute);

io.on("connection", (socket) => {
  console.log("New client connected");

  // Simulate real-time payment notifications
  socket.on("payment", (data) => {
    io.emit("paymentReceived", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

//initialize all routes

require("./startup/routes.js")(app); // Initialize all routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
