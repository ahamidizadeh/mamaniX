const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../db/models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
} = require("./middleware/auth");

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
require("dotenv").config();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ _id: newUser._id }, JWT_SECRET);
    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const authToken = generateAccessToken({ userId: user._id });

    const refreshToken = generateRefreshToken({ userId: user._id });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", authToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/refresh-token", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "refresh token missing" });
    }
    const decoded = await verifyRefreshToken(refreshToken);

    const authToken = generateAccessToken({ userId: decoded.userId });

    res.json({ authToken });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
});
module.exports = router;
