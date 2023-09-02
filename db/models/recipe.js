const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  image: String,

  servingSize: {
    type: Number,
    required: true,
  },

  cookingTime: {
    type: String,
    required: true,
  },
  typeOfFood: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
  instructions: {
    type: String,
    required: true,
  },
  contributor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    default: 0,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
