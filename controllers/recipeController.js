const express = require("express");
const router = express.Router();
const Recipe = require("../db/models/recipe"); // Import your Recipe model
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

module.exports = router;
