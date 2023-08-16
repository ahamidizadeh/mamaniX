const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      name: String,
      quantity: String,
    },
  ],
  instructions: {
    type: String,
    required: true,
  },
  contributor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
  rating: {
    type: Number,
    default: 0,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
