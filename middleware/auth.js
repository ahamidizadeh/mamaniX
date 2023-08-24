const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// Verify the access token
const verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });
};

const verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_REFRESH_SECRET, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });
};

const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

module.exports = {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
};
