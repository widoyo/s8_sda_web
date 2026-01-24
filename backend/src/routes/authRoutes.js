const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authentication = require("../middlewares/authentication");

router.post("/register", authentication, authController.register);
router.post("/login", authController.login);

module.exports = router;
