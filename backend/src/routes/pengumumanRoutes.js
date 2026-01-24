const express = require("express");
const router = express.Router();
const pengumumanController = require("../controllers/pengumumanController");
const uploadMiddleware = pengumumanController.uploadMiddleware;
const authentication = require("../middlewares/authentication");

// Create Pengumuman
router.post(
  "/",
  authentication,
  uploadMiddleware,
  pengumumanController.createPengumuman
);

// Read All Pengumuman
router.get("/", pengumumanController.getPengumuman);

// Update Pengumuman
router.put(
  "/:id",
  authentication,
  uploadMiddleware,
  pengumumanController.updatePengumuman
);

// Delete Pengumuman
router.delete("/:id", authentication, pengumumanController.deletePengumuman);

// Read Pengumuman By ID
router.get("/:id", pengumumanController.getPengumumanById);

module.exports = router;
