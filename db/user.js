const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
