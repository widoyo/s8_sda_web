const express = require("express");
const router = express.Router();
const majalahController = require("../controllers/majalahController");
const uploadMiddleware = majalahController.uploadMiddleware;
const authentication = require("../middlewares/authentication");

// Create Majalah
router.post(
  "/",
  authentication,
  uploadMiddleware,
  majalahController.createMajalah
);

// Read All Majalah
router.get("/", majalahController.getMajalah);

// Update Majalah
router.put(
  "/:id",
  authentication,
  uploadMiddleware,
  majalahController.updateMajalah
);

// Delete Majalah
router.delete("/:id", authentication, majalahController.deleteMajalah);

// Read Berita By ID
router.get("/:id", majalahController.getMajalahById);

module.exports = router;
