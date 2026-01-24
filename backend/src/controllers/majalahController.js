const { Op } = require("sequelize"); // Import Op for query operators
const { Majalah } = require("../../models");
const fileStorage = require("../utils/fileStorage");
const deleteFile = require("../utils/fileDelete");
const multer = require("multer");
const path = require("path");

// Use protocol based on NODE_ENV (development or production)
const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

// Use fileStorage utility to upload thumbnails and majalah files
const upload = multer({ storage: fileStorage("majalah") });

// Create Majalah
exports.createMajalah = async (req, res) => {
  try {
    const { title } = req.body;
    const thumbnailFile = req.files?.thumbnail?.[0]; // Assuming thumbnail upload
    const majalahFile = req.files?.majalah?.[0]; // Assuming majalah upload

    if (!thumbnailFile || !majalahFile) {
      return res
        .status(400)
        .json({ message: "Both thumbnail and majalah are required" });
    }

    const majalah = await Majalah.create({
      thumbnail: `${protocol}://${req.get("host")}/uploads/majalah/${
        thumbnailFile.filename
      }`,
      title,
      url: `${protocol}://${req.get("host")}/uploads/majalah/${
        majalahFile.filename
      }`,
    });

    res.status(201).json({
      data: {
        id: majalah.id,
        thumbnail: majalah.thumbnail,
        title: majalah.title,
        url: majalah.url,
        createdAt: majalah.createdAt,
        updatedAt: majalah.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read All Majalah with Pagination, Search, and Sorting
exports.getMajalah = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const offset = (page - 1) * limit;

    // Get the search query and sort order from the request
    const searchQuery = req.query.search || ""; // Changed from title to search
    const sort = req.query.sort || "newest"; // Default to 'newest'

    // Determine order based on the sort parameter
    const order =
      sort === "oldest" ? [["createdAt", "ASC"]] : [["createdAt", "DESC"]];

    // Query Majalah with pagination, search, and sorting
    const { count, rows: majalahList } = await Majalah.findAndCountAll({
      where: {
        title: {
          [Op.like]: `%${searchQuery.toLowerCase()}%`, // Use lower case for case-insensitive search
        },
      },
      limit,
      offset,
      order, // Apply the determined order
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      data: majalahList.map((majalah) => ({
        id: majalah.id,
        thumbnail: majalah.thumbnail,
        title: majalah.title,
        url: majalah.url,
        createdAt: majalah.createdAt,
        updatedAt: majalah.updatedAt,
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

// Get Majalah by ID
exports.getMajalahById = async (req, res) => {
  const { id } = req.params;
  try {
    const majalah = await Majalah.findByPk(id);
    if (!majalah) {
      return res.status(404).json({ message: "Majalah not found" });
    }

    res.status(200).json({
      data: {
        id: majalah.id,
        thumbnail: majalah.thumbnail,
        title: majalah.title,
        url: majalah.url,
        createdAt: majalah.createdAt,
        updatedAt: majalah.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Majalah
exports.updateMajalah = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const thumbnailFile = req.files?.thumbnail?.[0];
  const majalahFile = req.files?.majalah?.[0];

  try {
    const majalah = await Majalah.findByPk(id);
    if (!majalah) {
      return res.status(404).json({ message: "Majalah not found" });
    }

    let newThumbnailUrl = majalah.thumbnail;
    let newMajalahUrl = majalah.url;

    // If a new thumbnail is uploaded, delete the old one and update with new file
    if (thumbnailFile) {
      const oldThumbnailFileName = path.basename(majalah.thumbnail);
      await deleteFile("majalah", oldThumbnailFileName);
      newThumbnailUrl = `${protocol}://${req.get("host")}/uploads/majalah/${
        thumbnailFile.filename
      }`;
    }

    // If a new majalah file is uploaded, delete the old one and update with new file
    if (majalahFile) {
      const oldMajalahFileName = path.basename(majalah.url);
      await deleteFile("majalah", oldMajalahFileName);
      newMajalahUrl = `${protocol}://${req.get("host")}/uploads/majalah/${
        majalahFile.filename
      }`;
    }

    await majalah.update({
      title: title || majalah.title,
      thumbnail: newThumbnailUrl,
      url: newMajalahUrl,
    });

    res.status(200).json({
      data: {
        id: majalah.id,
        thumbnail: majalah.thumbnail,
        title: majalah.title,
        url: majalah.url,
        createdAt: majalah.createdAt,
        updatedAt: majalah.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Majalah
exports.deleteMajalah = async (req, res) => {
  const { id } = req.params;
  try {
    const majalah = await Majalah.findByPk(id);
    if (!majalah) {
      return res.status(404).json({ message: "Majalah not found" });
    }

    const thumbnailFileName = path.basename(majalah.thumbnail);
    const majalahFileName = path.basename(majalah.url);

    // Delete physical files
    await deleteFile("majalah", thumbnailFileName);
    await deleteFile("majalah", majalahFileName);

    // Delete the record from the database
    await majalah.destroy();

    res.status(200).json({ message: "Majalah deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware for uploading thumbnail and majalah files
exports.uploadMiddleware = upload.fields([
  { name: "thumbnail" },
  { name: "majalah" },
]);
