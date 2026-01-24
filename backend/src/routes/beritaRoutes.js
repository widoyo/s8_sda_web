const express = require("express");
const router = express.Router();
const beritaController = require("../controllers/beritaController");
const uploadMiddleware = beritaController.uploadMiddleware;
const authentication = require("../middlewares/authentication");

// Create Berita
router.post(
  "/",
  authentication,
  uploadMiddleware,
  beritaController.createBerita
);

// Read All Berita
router.get("/", beritaController.getBerita);

// Read All Berita Highlighted
router.get("/highlighted", beritaController.getHighlightedBerita);

// Update Berita
router.put(
  "/:id",
  authentication,
  uploadMiddleware,
  beritaController.updateBerita
);

// Delete Berita
router.delete("/:id", authentication, beritaController.deleteBerita);

// Read Berita By ID
router.get("/:id", beritaController.getBeritaById);

module.exports = router;
