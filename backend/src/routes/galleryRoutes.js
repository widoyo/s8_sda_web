const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const authentication = require("../middlewares/authentication");

router.post(
  "/upload",
  authentication,
  galleryController.uploadMiddleware,
  galleryController.createGallery
);
router.get("/", galleryController.getGallery);
router.get("/:id", galleryController.getGalleryById);
router.put(
  "/:id",
  authentication,
  galleryController.uploadMiddleware,
  galleryController.updateGallery
);
router.delete("/:id", authentication, galleryController.deleteGallery);

module.exports = router;
