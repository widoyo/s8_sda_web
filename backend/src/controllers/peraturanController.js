"use strict";
const { Op } = require("sequelize");
const { Peraturan } = require("../../models");
const fileStorage = require("../utils/fileStorage");
const deleteFile = require("../utils/fileDelete");
const multer = require("multer");
const path = require("path");

// Set up multer for file uploads
const upload = multer({ storage: fileStorage("peraturan") });

// Determine the protocol based on the environment (production or development)
const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

// Create Peraturan
exports.createPeraturan = async (req, res) => {
  try {
    const { title } = req.body;
    const peraturanFile = req.files?.peraturan?.[0]; // Assuming peraturan file upload

    if (!peraturanFile) {
      return res.status(400).json({ message: "Peraturan file is required" });
    }

    const peraturan = await Peraturan.create({
      title,
      url: `${protocol}://${req.get("host")}/uploads/peraturan/${
        peraturanFile.filename
      }`,
    });

    res.status(201).json({
      data: {
        id: peraturan.id,
        title: peraturan.title,
        url: peraturan.url,
        createdAt: peraturan.createdAt,
        updatedAt: peraturan.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read All Peraturan with Pagination, Search, and Sorting
exports.getPeraturan = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const searchQuery = req.query.search || "";
    const sort = req.query.sort || "newest";

    const order =
      sort === "oldest" ? [["createdAt", "ASC"]] : [["createdAt", "DESC"]];

    const { count, rows: peraturanList } = await Peraturan.findAndCountAll({
      where: {
        title: { [Op.like]: `%${searchQuery.toLowerCase()}%` },
      },
      limit,
      offset,
      order,
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      data: peraturanList.map((peraturan) => ({
        id: peraturan.id,
        title: peraturan.title,
        url: peraturan.url,
        createdAt: peraturan.createdAt,
        updatedAt: peraturan.updatedAt,
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

// Get Peraturan by ID
exports.getPeraturanById = async (req, res) => {
  const { id } = req.params;
  try {
    const peraturan = await Peraturan.findByPk(id);
    if (!peraturan) {
      return res.status(404).json({ message: "Peraturan not found" });
    }

    res.status(200).json({
      data: {
        id: peraturan.id,
        title: peraturan.title,
        url: peraturan.url,
        createdAt: peraturan.createdAt,
        updatedAt: peraturan.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Peraturan
exports.updatePeraturan = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const peraturanFile = req.files?.peraturan?.[0];

  try {
    const peraturan = await Peraturan.findByPk(id);
    if (!peraturan) {
      return res.status(404).json({ message: "Peraturan not found" });
    }

    let newPeraturanUrl = peraturan.url;

    // If a new file is uploaded, delete the old one and update with the new file
    if (peraturanFile) {
      const oldPeraturanFileName = path.basename(peraturan.url);
      await deleteFile("peraturan", oldPeraturanFileName);
      newPeraturanUrl = `${protocol}://${req.get("host")}/uploads/peraturan/${
        peraturanFile.filename
      }`;
    }

    await peraturan.update({
      title: title || peraturan.title,
      url: newPeraturanUrl,
    });

    res.status(200).json({
      data: {
        id: peraturan.id,
        title: peraturan.title,
        url: peraturan.url,
        createdAt: peraturan.createdAt,
        updatedAt: peraturan.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Peraturan
exports.deletePeraturan = async (req, res) => {
  const { id } = req.params;
  try {
    const peraturan = await Peraturan.findByPk(id);
    if (!peraturan) {
      return res.status(404).json({ message: "Peraturan not found" });
    }

    const peraturanFileName = path.basename(peraturan.url);
    await deleteFile("peraturan", peraturanFileName);

    await peraturan.destroy();

    res.status(200).json({ message: "Peraturan deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware for uploading Peraturan files
exports.uploadMiddleware = upload.fields([{ name: "peraturan" }]);
