const { Op } = require("sequelize");
const { Dipa } = require("../../models");
const fileStorage = require("../utils/fileStorage");
const deleteFile = require("../utils/fileDelete");
const multer = require("multer");
const path = require("path");

// Set up multer for file uploads
const upload = multer({ storage: fileStorage("dipa") });

// Define protocol based on environment
const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

// Create Dipa
exports.createDipa = async (req, res) => {
  try {
    const { title } = req.body;
    const dipaFile = req.files?.dipa?.[0]; // Assuming dipa upload

    if (!dipaFile) {
      return res.status(400).json({ message: "Dipa file is required" });
    }

    const dipa = await Dipa.create({
      title,
      url: `${protocol}://${req.get("host")}/uploads/dipa/${dipaFile.filename}`,
    });

    res.status(201).json({
      data: {
        id: dipa.id,
        title: dipa.title,
        url: dipa.url,
        createdAt: dipa.createdAt,
        updatedAt: dipa.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read All Dipa with Pagination, Search, and Sorting
exports.getDipa = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const searchQuery = req.query.search || "";
    const sort = req.query.sort || "newest";

    const order =
      sort === "oldest" ? [["createdAt", "ASC"]] : [["createdAt", "DESC"]];

    const { count, rows: dipaList } = await Dipa.findAndCountAll({
      where: {
        title: { [Op.like]: `%${searchQuery.toLowerCase()}%` },
      },
      limit,
      offset,
      order,
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      data: dipaList.map((dipa) => ({
        id: dipa.id,
        title: dipa.title,
        url: dipa.url.replace(/^https?:\/\//, `${protocol}://`),
        createdAt: dipa.createdAt,
        updatedAt: dipa.updatedAt,
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

// Get Dipa by ID
exports.getDipaById = async (req, res) => {
  const { id } = req.params;
  try {
    const dipa = await Dipa.findByPk(id);
    if (!dipa) {
      return res.status(404).json({ message: "Dipa not found" });
    }

    res.status(200).json({
      data: {
        id: dipa.id,
        title: dipa.title,
        url: dipa.url.replace(/^https?:\/\//, `${protocol}://`),
        createdAt: dipa.createdAt,
        updatedAt: dipa.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Dipa
exports.updateDipa = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const dipaFile = req.files?.dipa?.[0];

  try {
    const dipa = await Dipa.findByPk(id);
    if (!dipa) {
      return res.status(404).json({ message: "Dipa not found" });
    }

    let newDipaUrl = dipa.url;

    // If a new file is uploaded, delete the old one and update with new file
    if (dipaFile) {
      const oldDipaFileName = path.basename(dipa.url);
      await deleteFile("dipa", oldDipaFileName);
      newDipaUrl = `${protocol}://${req.get("host")}/uploads/dipa/${
        dipaFile.filename
      }`;
    }

    await dipa.update({
      title: title || dipa.title,
      url: newDipaUrl,
    });

    res.status(200).json({
      data: {
        id: dipa.id,
        title: dipa.title,
        url: dipa.url,
        createdAt: dipa.createdAt,
        updatedAt: dipa.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Dipa
exports.deleteDipa = async (req, res) => {
  const { id } = req.params;
  try {
    const dipa = await Dipa.findByPk(id);
    if (!dipa) {
      return res.status(404).json({ message: "Dipa not found" });
    }

    const dipaFileName = path.basename(dipa.url);
    await deleteFile("dipa", dipaFileName);

    await dipa.destroy();

    res.status(200).json({ message: "Dipa deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware for uploading Dipa files
exports.uploadMiddleware = upload.fields([{ name: "dipa" }]);
