const { PrediksiCuaca } = require("../../models");
const fileStorage = require("../utils/fileStorage");
const deleteFile = require("../utils/fileDelete");
const path = require("path");
const multer = require("multer");

// Set up multer for image upload
const upload = multer({ storage: fileStorage("prediksi-cuaca") });

// Determine protocol based on environment
const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

// Get the first PrediksiCuaca
exports.getPrediksiCuaca = async (_, res) => {
  try {
    const prediksiCuaca = await PrediksiCuaca.findByPk(1);

    if (!prediksiCuaca) {
      return res.status(404).json({ message: "No Prediksi Cuaca found" });
    }

    const imgUrl = prediksiCuaca.img.replace(/^https?:\/\//i, `${protocol}://`);

    res.status(200).json({
      data: {
        id: prediksiCuaca.id,
        img: imgUrl,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update PrediksiCuaca
exports.updatePrediksiCuaca = async (req, res) => {
  const file = req.file;

  try {
    const prediksiCuaca = await PrediksiCuaca.findByPk(1);

    if (!prediksiCuaca) {
      return res.status(404).json({ message: "Prediksi Cuaca not found" });
    }

    if (file) {
      const oldFileName = prediksiCuaca.img
        ? path.basename(prediksiCuaca.img)
        : null;

      if (oldFileName) {
        await deleteFile("prediksi-cuaca", oldFileName);
      }

      prediksiCuaca.img = `${protocol}://${req.get(
        "host"
      )}/uploads/prediksi-cuaca/${file.filename}`;
    }

    await prediksiCuaca.save();

    res.status(200).json({
      data: {
        id: prediksiCuaca.id,
        img: prediksiCuaca.img,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware for image upload
exports.uploadMiddleware = upload.single("img");
