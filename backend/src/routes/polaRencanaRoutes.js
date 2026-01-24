const express = require("express");
const router = express.Router();
const polaRencanaController = require("../controllers/polaRencanaController");
const authentication = require("../middlewares/authentication");

// Get all StrukturOrganisasi (GET)
router.get("/", polaRencanaController.getPolaRencana);

// Update a StrukturOrganisasi (PUT)
router.put(
  "/",
  authentication,
  polaRencanaController.uploadMiddleware,
  polaRencanaController.updatePolaRencana
);

module.exports = router;
