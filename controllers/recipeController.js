const express = require("express");
const router = express.Router();
const Recipe = require("../db/models/recipe"); // Import your Recipe model
const authenticateMiddleware = require("../middleware/authMiddleware");
// Route to add a new recipe
router.post("/", authenticateMiddleware, async (req, res) => {
  console.log("this is the user:", req.user.id);
  const { title, image, cookingTime, ingredients, instructions } = req.body;
  const contributor = req.user.id;
  try {
    // Create a new recipe document in the database
    const newRecipe = new Recipe({
      title,
      image,
      contributor,
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
});

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Error fetchin recipes" });
  }
});

module.exports = router;
