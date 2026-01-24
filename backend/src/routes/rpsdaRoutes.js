const express = require("express");
const router = express.Router();
const rpsdaController = require("../controllers/rpsdaController");
const uploadMiddleware = rpsdaController.uploadMiddleware;
const authentication = require("../middlewares/authentication");

// Create RPSDA
router.post("/", authentication, uploadMiddleware, rpsdaController.createRpsda);

// Read All RPSDA
router.get("/", rpsdaController.getRpsda);

// Update RPSDA
router.put(
  "/:id",
  authentication,
  uploadMiddleware,
  rpsdaController.updateRpsda
);

// Delete RPSDA
router.delete("/:id", authentication, rpsdaController.deleteRpsda);

// Read RPSDA By ID
router.get("/:id", rpsdaController.getRpsdaById);

module.exports = router;
