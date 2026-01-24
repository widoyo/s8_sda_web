require("dotenv").config();
// Packages
const jwt = require("jsonwebtoken");
// Models
const { User } = require("../../models");
// Helpers
const statusMessage = require("../helpers/status.message");
// ENV
const secretKey = process.env.JWT_SECRET;

const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];

      if (token) {
        const decoded = jwt.verify(token, secretKey);

        const user = await User.findByPk(decoded.id);

        if (user) {
          req.decoded = user;
          next();
        } else {
          statusMessage(res, 401, false, "Unauthenticated user!");
        }
      } else {
        statusMessage(res, 401, false, "Invalid token");
      }
    } else {
      statusMessage(
        res,
        401,
        false,
        "Authorization header missing or incorrect"
      );
    }
  } catch (error) {
    statusMessage(res, 401, false, error.message);
  }
};

module.exports = authentication;
