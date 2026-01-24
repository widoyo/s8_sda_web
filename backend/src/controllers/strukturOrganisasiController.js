const { StrukturOrganisasi } = require("../../models");
const fileStorage = require("../utils/fileStorage");
const deleteFile = require("../utils/fileDelete");
const path = require("path");
const multer = require("multer");

// Set up multer for image upload
const upload = multer({ storage: fileStorage("struktur-organisasi") });

// Determine protocol based on environment
const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

// Get the first StrukturOrganisasi
exports.getStrukturOrganisasi = async (_, res) => {
  try {
    const strukturOrganisasi = await StrukturOrganisasi.findByPk(1);

    if (!strukturOrganisasi) {
      return res.status(404).json({ message: "No Struktur Organisasi found" });
    }

    // Set protocol based on environment
    const imgUrl = strukturOrganisasi.img.replace(
      /^https?:\/\//i,
      `${protocol}://`
    );

    res.status(200).json({
      data: {
        id: strukturOrganisasi.id,
        img: imgUrl,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update StrukturOrganisasi
exports.updateStrukturOrganisasi = async (req, res) => {
  const file = req.file;

  try {
    const strukturOrganisasi = await StrukturOrganisasi.findByPk(1);

    if (!strukturOrganisasi) {
      return res.status(404).json({ message: "Struktur Organisasi not found" });
    }

    // Handle image update
    if (file) {
      const oldFileName = strukturOrganisasi.img
        ? path.basename(strukturOrganisasi.img)
        : null;
      if (oldFileName) {
        await deleteFile("struktur-organisasi", oldFileName);
      }

      // Set protocol based on environment
      strukturOrganisasi.img = `${protocol}://${req.get(
        "host"
      )}/uploads/struktur-organisasi/${file.filename}`;
    }

    await strukturOrganisasi.save();

    res.status(200).json({
      data: {
        id: strukturOrganisasi.id,
        img: strukturOrganisasi.img,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware for uploading StrukturOrganisasi image
exports.uploadMiddleware = upload.single("img");
