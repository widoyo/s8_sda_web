const { PolaRencana } = require("../../models");
const fileStorage = require("../utils/fileStorage");
const deleteFile = require("../utils/fileDelete");
const path = require("path");
const multer = require("multer");
const upload = multer({ storage: fileStorage("pola-rencana") });

// Determine protocol based on environment
const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

// Get the first PolaRencana
exports.getPolaRencana = async (_, res) => {
  try {
    const polaRencana = await PolaRencana.findByPk(1);

    if (!polaRencana) {
      return res.status(404).json({ message: "No Pola Rencana found" });
    }

    // Set protocol based on environment
    const pdfUrl = polaRencana.pdf.replace(/^https?:\/\//i, `${protocol}://`);

    res.status(200).json({
      data: {
        id: polaRencana.id,
        pdf: pdfUrl,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update PolaRencana
exports.updatePolaRencana = async (req, res) => {
  const file = req.file;

  try {
    const polaRencana = await PolaRencana.findByPk(1);

    if (!polaRencana) {
      return res.status(404).json({ message: "Pola Rencana not found" });
    }

    if (file) {
      const oldFileName = polaRencana.pdf
        ? path.basename(polaRencana.pdf)
        : null;
      if (oldFileName) {
        await deleteFile("pola-rencana", oldFileName);
      }

      // Set protocol based on environment
      polaRencana.pdf = `${protocol}://${req.get(
        "host"
      )}/uploads/pola-rencana/${file.filename}`;
    }

    await polaRencana.save();

    res.status(200).json({
      data: {
        id: polaRencana.id,
        pdf: polaRencana.pdf,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware for uploading Pola Rencana PDF
exports.uploadMiddleware = upload.single("pdf");
