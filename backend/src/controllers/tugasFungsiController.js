const { TugasFungsi } = require("../../models");
const fileStorage = require("../utils/fileStorage");
const deleteFile = require("../utils/fileDelete");
const path = require("path");

// Use multer for file upload if needed
const multer = require("multer");
const upload = multer({ storage: fileStorage("tugas-fungsi") });

// Get the first TugasFungsi
exports.getTugasFungsi = async (_, res) => {
  try {
    // Fetch the first record from the TugasFungsi table
    const tugasFungsi = await TugasFungsi.findByPk(1);

    // Check if a record was found
    if (!tugasFungsi) {
      return res.status(404).json({ message: "No Tugas Fungsi found" });
    }

    // Return the first record
    res.status(200).json({
      data: {
        id: tugasFungsi.id,
        content: tugasFungsi.content,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update TugasFungsi
exports.updateTugasFungsi = async (req, res) => {
  const { content } = req.body;

  try {
    const tugasFungsi = await TugasFungsi.findByPk(1);

    if (!tugasFungsi) {
      return res.status(404).json({ message: "Tugas Fungsi not found" });
    }

    // Update the content of TugasFungsi
    await tugasFungsi.update({
      content: content,
    });

    res.status(200).json({
      data: {
        id: tugasFungsi.id,
        content: tugasFungsi.content,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware for uploading files (if applicable in the future)
exports.uploadMiddleware = upload.single("file"); // Adjust 'file' to match the input field name if file upload is needed
