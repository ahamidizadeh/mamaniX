const express = require("express");
const router = express.Router();
const Recipe = require("../db/models/recipe");
const User = require("../db/models/user");
const authenticateMiddleware = require("./middleware/authMiddleware");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/",
  authenticateMiddleware,
  upload.single("image"),
  async (req, res) => {
    const {
      title,
      servingSize,
      cookingTime,
      ingredients,
      instructions,
      typeOfFood,
    } = req.body;
    const contributor = req.user.id;
    const image = req.file ? "/images/" + req.file.filename : "";

    try {
      const newRecipe = new Recipe({
        title,
        image,
        typeOfFood,
        contributor,
        servingSize,
        cookingTime,
        ingredients,
        instructions,
      });

      await newRecipe.save();

      res.status(201).json({ message: "Recipe added successfully" });
    } catch (error) {
      console.error("Error adding recipe:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get("/", authenticateMiddleware, async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("contributor", "username");
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Error fetchin recipes" });
  }
});

router.post(
  "/add-favorite/:recipeId",
  authenticateMiddleware,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const recipeId = req.params.recipeId;
      const user = await User.findById(userId);

      if (!user.favorites.includes(recipeId)) {
        user.favorites.push(recipeId);
        await user.save();
      }

      console.log("added to favs");
      res.status(201).json({ message: "you are adding to favs" });
    } catch (err) {
      console.log(err);
    }
  }
);

router.post(
  "/remove-favorite/:recipeId",
  authenticateMiddleware,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const recipeId = req.params.recipeId;

      const user = await User.findById(userId);
      const index = user.favorites.indexOf(recipeId);

      if (index !== -1) {
        user.favorites.splice(index, 1);
        await user.save();
      }

      console.log("removed from favs");
      res.status(201).json({ message: "you are adding to favs" });
    } catch (err) {
      console.log(err);
    }
  }
);
module.exports = router;
