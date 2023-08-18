const jwt = require("jsonwebtoken");
const User = require("../db/models/user"); // Import your User model
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const authenticateMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", ""); // Extract token from header
    console.log("Received token:", token);

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded payload:", decoded);

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next(); // Continue to the next middleware/route
  } catch (error) {
    res.status(401).send({ error: "Unauthorized" }); // Invalid token or user not found
  }
};

module.exports = authenticateMiddleware;
