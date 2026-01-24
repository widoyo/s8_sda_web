// routes/bannerRoutes.js
const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/bannerController");
const authentication = require("../middlewares/authentication");

// Route for uploading banners
router.post(
  "/upload",
  authentication,
  bannerController.uploadMiddleware,
  bannerController.uploadBanner
);

// Route for getting banners
router.get("/", bannerController.getBanners);

// Route for deleting a specific banner by ID
router.delete("/:id", authentication, bannerController.deleteBanner);

module.exports = router;
