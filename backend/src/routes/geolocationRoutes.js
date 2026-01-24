const express = require("express");
const router = express.Router();
const geolocationController = require("../controllers/geolocationController");
const uploadMiddleware = geolocationController.uploadMiddleware;
const authentication = require("../middlewares/authentication");

// Create Geolocation
router.post(
  "/",
  authentication,
  uploadMiddleware,
  geolocationController.createGeolocation
);

// Read All Geolocations
router.get("/", geolocationController.getGeolocation);

// Update Geolocation
router.put(
  "/:id",
  authentication,
  uploadMiddleware,
  geolocationController.updateGeolocation
);

// Delete Geolocation
router.delete("/:id", authentication, geolocationController.deleteGeolocation);

// Read Geolocation By ID
router.get("/:id", geolocationController.getGeolocationById);

module.exports = router;
