const { Gallery } = require("../../models");
const fileStorage = require("../utils/fileStorage");
const deleteFile = require("../utils/fileDelete");
const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize");

// Use the fileStorage utility for uploading gallery images
const upload = multer({ storage: fileStorage("gallery") });

// Define protocol based on environment
const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

// Create Gallery
exports.createGallery = async (req, res) => {
  try {
    const { description } = req.body;
    const file = req.file; // Assuming single image upload

    if (!file) {
      return res.status(400).json({ message: "File is required" });
    }

    const gallery = await Gallery.create({
      url: `${protocol}://${req.get("host")}/uploads/gallery/${file.filename}`,
      description,
    });

    res.status(201).json({
      data: {
        id: gallery.id,
        url: gallery.url,
        description: gallery.description,
        createdAt: gallery.createdAt,
        updatedAt: gallery.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read Gallery with Pagination and Sorting
exports.getGallery = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const searchQuery = req.query.search || "";
    const sort = req.query.sort || "newest";

    const order =
      sort === "oldest" ? [["createdAt", "ASC"]] : [["createdAt", "DESC"]];

    const { count, rows: galleryList } = await Gallery.findAndCountAll({
      where: {
        description: { [Op.like]: `%${searchQuery.toLowerCase()}%` },
      },
      limit,
      offset,
      order,
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      data: galleryList.map((gallery) => ({
        id: gallery.id,
        url: gallery.url.replace(/^https?:\/\//, `${protocol}://`),
        description: gallery.description,
        createdAt: gallery.createdAt,
        updatedAt: gallery.updatedAt,
      })),
      meta: {
        totalItems: count,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Gallery
exports.deleteGallery = async (req, res) => {
  const { id } = req.params;
  try {
    const gallery = await Gallery.findByPk(id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    const fileName = path.basename(gallery.url);
    await deleteFile("gallery", fileName);

    await gallery.destroy();
    res.status(200).json({ message: "Gallery deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Gallery
exports.updateGallery = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const galleryFile = req.file;

  try {
    const gallery = await Gallery.findByPk(id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    let newGalleryUrl = gallery.url;

    if (galleryFile) {
      const oldGalleryFileName = path.basename(gallery.url);
      await deleteFile("gallery", oldGalleryFileName);
      newGalleryUrl = `${protocol}://${req.get("host")}/uploads/gallery/${
        galleryFile.filename
      }`;
    }

    await gallery.update({
      url: newGalleryUrl,
      description: description || gallery.description,
    });

    res.status(200).json({
      data: {
        id: gallery.id,
        url: newGalleryUrl,
        description: gallery.description,
        createdAt: gallery.createdAt,
        updatedAt: gallery.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Gallery by ID
exports.getGalleryById = async (req, res) => {
  const { id } = req.params;

  try {
    const gallery = await Gallery.findByPk(id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    res.status(200).json({
      data: {
        id: gallery.id,
        url: gallery.url.replace(/^https?:\/\//, `${protocol}://`),
        description: gallery.description,
        createdAt: gallery.createdAt,
        updatedAt: gallery.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware for uploading gallery images
exports.uploadMiddleware = upload.single("gallery");
