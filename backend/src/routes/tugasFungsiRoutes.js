const express = require("express");
const router = express.Router();
const tugasFungsiController = require("../controllers/tugasFungsiController");
const authentication = require("../middlewares/authentication");

router.get("/", tugasFungsiController.getTugasFungsi);
router.put("/", authentication, tugasFungsiController.updateTugasFungsi);

module.exports = router;
