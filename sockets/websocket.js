const { Server } = require("socket.io");

// Initialize WebSocket server and export it
function initWebSocketServer(server) {
  const io = new Server(server, {
    path: "/socket-connection",
    allowEIO3: true,
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connect", (socket) => {
    console.log("connecting to the web sockets");
    socket.on("error", (error) => {
      console.error("websocket server error:", error);
    });
    io.emit("favoriteRecipeRemoved", true);
    // WebSocket logic for handling connections, events, and disconnections
    socket.on("addFavoriteRecipe", (recipeId) => {
      // Handle adding a recipe to favorites
      io.emit("favoriteRecipeAdded", recipeId); // Broadcast to all clients
    });

    socket.on("removeFavoriteRecipe", (recipeId) => {
      // Handle removing a recipe from favorites
      io.emit("favoriteRecipeRemoved", recipeId); // Broadcast to all clients
    });

    socket.on("disconnect", () => {
      // Handle disconnections
      console.log("client has disconnected");
    });
  });

  return io;
}

module.exports = { initWebSocketServer };
