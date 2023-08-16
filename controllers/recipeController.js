const express = require("express");
const router = express.Router();
const Recipe = require("../db/models/recipe"); // Import your Recipe model

// Route to add a new recipe
router.post("/", async (req, res) => {
  try {
    const { title, description, image, ingredients, instructions } = req.body;

    // Create a new recipe document in the database
    const newRecipe = new Recipe({
      title,
      description,
      image,
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

module.exports = router;
