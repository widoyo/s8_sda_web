const express = require("express");
const router = express.Router();
const layananTerpaduController = require("../controllers/layananTerpaduController");
const authentication = require("../middlewares/authentication");

// Upload middleware for image upload
router.post(
  "/",
  authentication,
  layananTerpaduController.uploadMiddleware,
  layananTerpaduController.createLayananTerpadu
);

// Update
router.put(
  "/:id",
  authentication,
  layananTerpaduController.uploadMiddleware,
  layananTerpaduController.update
);
router.get("/:id", layananTerpaduController.getLayananTerpaduById);
router.get("/", layananTerpaduController.getAllLayananTerpadu);
router.delete(
  "/:id",
  authentication,
  layananTerpaduController.deleteLayananTerpadu
);

module.exports = router;
