"use strict";
const { Op } = require("sequelize");
const { Pengumuman } = require("../../models");
const fileStorage = require("../utils/fileStorage");
const deleteFile = require("../utils/fileDelete");
const multer = require("multer");
const path = require("path");

// Set up multer for file uploads (optional, if you want to upload files)
const upload = multer({ storage: fileStorage("pengumuman") });

// Determine the protocol based on the environment (production or development)
const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

// Create Pengumuman
exports.createPengumuman = async (req, res) => {
  try {
    const { title } = req.body;
    const pengumumanFile = req.files?.pengumuman?.[0]; // Assuming pengumuman file upload

    const pengumuman = await Pengumuman.create({
      title,
      url: pengumumanFile
        ? `${protocol}://${req.get("host")}/uploads/pengumuman/${
            pengumumanFile.filename
          }`
        : null,
    });

    res.status(201).json({
      data: {
        id: pengumuman.id,
        title: pengumuman.title,
        url: pengumuman.url,
        createdAt: pengumuman.createdAt,
        updatedAt: pengumuman.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read All Pengumuman with Pagination, Search, and Sorting
exports.getPengumuman = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const searchQuery = req.query.search || "";
    const sort = req.query.sort || "newest";

    const order =
      sort === "oldest" ? [["createdAt", "ASC"]] : [["createdAt", "DESC"]];

    const { count, rows: pengumumanList } = await Pengumuman.findAndCountAll({
      where: {
        title: { [Op.like]: `%${searchQuery.toLowerCase()}%` },
      },
      limit,
      offset,
      order,
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      data: pengumumanList.map((pengumuman) => ({
        id: pengumuman.id,
        title: pengumuman.title,
        url: pengumuman.url,
        createdAt: pengumuman.createdAt,
        updatedAt: pengumuman.updatedAt,
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

// Get Pengumuman by ID
exports.getPengumumanById = async (req, res) => {
  const { id } = req.params;
  try {
    const pengumuman = await Pengumuman.findByPk(id);
    if (!pengumuman) {
      return res.status(404).json({ message: "Pengumuman not found" });
    }

    res.status(200).json({
      data: {
        id: pengumuman.id,
        title: pengumuman.title,
        url: pengumuman.url,
        createdAt: pengumuman.createdAt,
        updatedAt: pengumuman.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Pengumuman
exports.updatePengumuman = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const pengumumanFile = req.files?.pengumuman?.[0];

  try {
    const pengumuman = await Pengumuman.findByPk(id);
    if (!pengumuman) {
      return res.status(404).json({ message: "Pengumuman not found" });
    }

    let newPengumumanUrl = pengumuman.url;

    // If a new file is uploaded, delete the old one and update with the new file
    if (pengumumanFile) {
      if (pengumuman.url) {
        const oldPengumumanFileName = path.basename(pengumuman.url);
        await deleteFile("pengumuman", oldPengumumanFileName);
      }
      newPengumumanUrl = `${protocol}://${req.get("host")}/uploads/pengumuman/${
        pengumumanFile.filename
      }`;
    }

    await pengumuman.update({
      title: title || pengumuman.title,
      url: newPengumumanUrl,
    });

    res.status(200).json({
      data: {
        id: pengumuman.id,
        title: pengumuman.title,
        url: pengumuman.url,
        createdAt: pengumuman.createdAt,
        updatedAt: pengumuman.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Pengumuman
exports.deletePengumuman = async (req, res) => {
  const { id } = req.params;
  try {
    const pengumuman = await Pengumuman.findByPk(id);
    if (!pengumuman) {
      return res.status(404).json({ message: "Pengumuman not found" });
    }

    if (pengumuman.url) {
      const pengumumanFileName = path.basename(pengumuman.url);
      await deleteFile("pengumuman", pengumumanFileName);
    }

    await pengumuman.destroy();

    res.status(200).json({ message: "Pengumuman deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware for uploading Pengumuman files (optional)
exports.uploadMiddleware = upload.fields([{ name: "pengumuman" }]);
