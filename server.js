const express = require("express");
const path = require("path");
const connectDB = require("./db/db");
const cors = require("cors");
const recipeController = require("./controllers/recipeController"); // Adjust the path as needed
const userController = require("./controllers/userController");
require("dotenv").config();

connectDB();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 1234;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", userController);
app.use("/api/recipes", recipeController);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
