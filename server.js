const express = require("express");
const path = require("path");
const connectDB = require("./db/db");
const userController = require("./controllers/userController");
require("dotenv").config();

connectDB();
const app = express();

const PORT = process.env.PORT || 1234;
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api", userController);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
