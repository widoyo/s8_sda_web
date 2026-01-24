const express = require("express");
const router = express.Router();
const prediksiCuacaController = require("../controllers/prediksiCuacaController");
const authentication = require("../middlewares/authentication");

// Get all Prediksi Cuaca (GET)
router.get("/", prediksiCuacaController.getPrediksiCuaca);

// Update a Prediksi Cuaca (PUT)
router.put(
  "/",
  authentication,
  prediksiCuacaController.uploadMiddleware,
  prediksiCuacaController.updatePrediksiCuaca
);

module.exports = router;
