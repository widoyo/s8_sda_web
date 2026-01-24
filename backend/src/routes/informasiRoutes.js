const express = require("express");
const router = express.Router();
const informasiController = require("../controllers/informasiController");
const uploadMiddleware = informasiController.uploadMiddleware;
const authentication = require("../middlewares/authentication");

// Create Informasi
router.post(
  "/",
  authentication,
  uploadMiddleware,
  informasiController.createInformasi
);

// Read All Informasi
router.get("/", informasiController.getInformasi);

// Update Informasi
router.put(
  "/:id",
  authentication,
  uploadMiddleware,
  informasiController.updateInformasi
);

// Delete Informasi
router.delete("/:id", authentication, informasiController.deleteInformasi);

// Read Informasi By ID
router.get("/:id", informasiController.getInformasiById);

module.exports = router;
