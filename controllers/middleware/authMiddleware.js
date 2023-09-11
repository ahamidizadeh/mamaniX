const User = require("../../db/models/user");
const { verifyAccessToken } = require("./auth");

const authenticateMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = await verifyAccessToken(token);

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Unauthorized" });
  }
};

module.exports = authenticateMiddleware;
