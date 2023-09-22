const express = require("express");
const path = require("path");
const connectDB = require("./db/db");
const cors = require("cors");
const { Pool } = require("pg");
const cookieParser = require("cookie-parser");
const recipeController = require("./controllers/recipeController"); // Adjust the path as needed
const userController = require("./controllers/userController");

require("dotenv").config();

connectDB();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, HEAD, PUT,PATCH ,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type"],
  preflightContinue: false,
};
app.use(cors(corsOptions));
const pool = new Pool({
  user: "alihamidizadeh",
  host: "localhost",
  database: "alihamidizadeh",
  password: "",
  port: 5432, // PostgreSQL default port
});
app.get("/api/ingredients", async (req, res) => {
  try {
    const ingredients = await pool.query("SELECT * FROM ingredients");
    res.status(200).json(ingredients.rows);
  } catch (error) {
    console.log("error in getting all the ingredients");
  }
});
app.get("/api/ingredients/search", async (req, res) => {
  try {
    const ingredient = req.query.name;

    const query = {
      text: "SELECT * FROM ingredients WHERE name = $1",
      values: [ingredient],
    };

    const result = await pool.query(query);
    if (result.rowCount === 0) {
      res.json("ingredient not found");
      return;
    }

    res.json(result.rows[0]);
    // console.log(ingredient);
    // const { rows } = await pool.query(`SELECT * FROM ingredients`);
    // res.json(rows);
  } catch (error) {
    console.log("error getting ingredients from postgresql");
    res.status(500).json({ error: "error fetching ingredients" });
  }
});
app.use(cookieParser());

const PORT = process.env.PORT || 1234;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/user", userController);
app.use("/api/recipes", recipeController);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.listen(PORT, () => {
  console.log(` server is running on port ${PORT}`);
});
