const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "default-profile-picture.jpg",
  },
  savedRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe", // Assuming you have a Recipe model
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
