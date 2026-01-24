const express = require("express");
const router = express.Router();
const peraturanController = require("../controllers/peraturanController");
const uploadMiddleware = peraturanController.uploadMiddleware;
const authentication = require("../middlewares/authentication");

// Create Majalah
router.post(
  "/",
  authentication,
  uploadMiddleware,
  peraturanController.createPeraturan
);

// Read All Majalah
router.get("/", peraturanController.getPeraturan);

// Update Majalah
router.put(
  "/:id",
  authentication,
  uploadMiddleware,
  peraturanController.updatePeraturan
);

// Delete Majalah
router.delete("/:id", authentication, peraturanController.deletePeraturan);

// Read Berita By ID
router.get("/:id", peraturanController.getPeraturanById);

module.exports = router;
