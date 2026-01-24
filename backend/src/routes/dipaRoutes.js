const express = require("express");
const router = express.Router();
const dipaController = require("../controllers/dipaController");
const uploadMiddleware = dipaController.uploadMiddleware;
const authentication = require("../middlewares/authentication");

// Create Majalah
router.post("/", authentication, uploadMiddleware, dipaController.createDipa);

// Read All Majalah
router.get("/", dipaController.getDipa);

// Update Majalah
router.put("/:id", authentication, uploadMiddleware, dipaController.updateDipa);

// Delete Majalah
router.delete("/:id", authentication, dipaController.deleteDipa);

// Read Berita By ID
router.get("/:id", dipaController.getDipaById);

module.exports = router;
