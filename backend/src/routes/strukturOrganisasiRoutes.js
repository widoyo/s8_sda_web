const express = require("express");
const router = express.Router();
const strukturOrganisasiController = require("../controllers/strukturOrganisasiController");
const authentication = require("../middlewares/authentication");

// Get all StrukturOrganisasi (GET)
router.get("/", strukturOrganisasiController.getStrukturOrganisasi);

// Update a StrukturOrganisasi (PUT)
router.put(
  "/",
  authentication,
  strukturOrganisasiController.uploadMiddleware,
  strukturOrganisasiController.updateStrukturOrganisasi
);

module.exports = router;
