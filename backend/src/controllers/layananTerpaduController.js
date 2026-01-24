"use strict";
const { LayananTerpadu } = require("../../models");
const fileStorage = require("../utils/fileStorage");
const deleteFile = require("../utils/fileDelete");
const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize");

// Configure multer for file uploads
const upload = multer({ storage: fileStorage("layanan-terpadu") });
const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

// Create LayananTerpadu
exports.createLayananTerpadu = async (req, res) => {
  try {
    const { title, url, platform, description } = req.body;
    const file = req.file;
    const imageUrl = file
      ? `${protocol}://${req.get("host")}/uploads/layanan-terpadu/${
          file.filename
        }`
      : null;

    const layananTerpadu = await LayananTerpadu.create({
      title,
      url,
      platform,
      description,
      img: imageUrl,
    });

    res.status(201).json({
      data: {
        id: layananTerpadu.id,
        title: layananTerpadu.title,
        url: layananTerpadu.url,
        platform: layananTerpadu.platform,
        description: layananTerpadu.description,
        img: layananTerpadu.img,
        createdAt: layananTerpadu.createdAt,
        updatedAt: layananTerpadu.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get LayananTerpadu by ID
exports.getLayananTerpaduById = async (req, res) => {
  try {
    const { id } = req.params;
    const layanan = await LayananTerpadu.findByPk(id);

    if (!layanan) {
      return res.status(404).json({ message: "Layanan not found" });
    }

    res.status(200).json({
      data: {
        id: layanan.id,
        title: layanan.title,
        url: layanan.url,
        platform: layanan.platform,
        description: layanan.description,
        img: layanan.img?.replace(/^https?:\/\//, `${protocol}://`),
        createdAt: layanan.createdAt,
        updatedAt: layanan.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update LayananTerpadu
exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, url, platform, description } = req.body;
  const file = req.file;

  try {
    const layanan = await LayananTerpadu.findByPk(id);
    if (!layanan) {
      return res.status(404).json({ message: "Layanan not found" });
    }

    let newImageUrl = layanan.img;
    if (file) {
      if (layanan.img) {
        const oldFileName = path.basename(layanan.img);
        await deleteFile("layanan-terpadu", oldFileName);
      }
      newImageUrl = `${protocol}://${req.get("host")}/uploads/layanan-terpadu/${
        file.filename
      }`;
    }

    await layanan.update({
      title: title || layanan.title,
      url: url || layanan.url,
      platform: platform || layanan.platform,
      description: description || layanan.description,
      img: newImageUrl,
    });

    res.status(200).json({
      data: {
        id: layanan.id,
        title: layanan.title,
        url: layanan.url,
        platform: layanan.platform,
        description: layanan.description,
        img: layanan.img,
        createdAt: layanan.createdAt,
        updatedAt: layanan.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read all LayananTerpadu with pagination, sorting, and search
exports.getAllLayananTerpadu = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const sort = req.query.sort || "newest";
    const order =
      sort === "oldest" ? [["createdAt", "ASC"]] : [["createdAt", "DESC"]];
    const searchQuery = req.query.search || "";

    const { count, rows: layananList } = await LayananTerpadu.findAndCountAll({
      where: { title: { [Op.like]: `%${searchQuery.toLowerCase()}%` } },
      limit,
      offset,
      order,
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      data: layananList.map((layanan) => ({
        id: layanan.id,
        title: layanan.title,
        url: layanan.url,
        platform: layanan.platform,
        description: layanan.description,
        img: layanan.img?.replace(/^https?:\/\//, `${protocol}://`),
        createdAt: layanan.createdAt,
        updatedAt: layanan.updatedAt,
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

// Delete LayananTerpadu
exports.deleteLayananTerpadu = async (req, res) => {
  const { id } = req.params;
  try {
    const layanan = await LayananTerpadu.findByPk(id);
    if (!layanan) {
      return res.status(404).json({ message: "Layanan not found" });
    }

    if (layanan.img) {
      const fileName = path.basename(layanan.img);
      await deleteFile("layanan-terpadu", fileName);
    }

    await layanan.destroy();
    res.status(200).json({ message: "Layanan deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware for uploading Layanan Terpadu image
exports.uploadMiddleware = upload.single("img");
