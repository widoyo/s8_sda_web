"use strict";
const { Op } = require("sequelize");
const { Informasi } = require("../../models");
const fileStorage = require("../utils/fileStorage");
const deleteFile = require("../utils/fileDelete");
const multer = require("multer");
const path = require("path");

// Set up multer for file uploads
const upload = multer({ storage: fileStorage("informasi") });

// Define protocol based on environment
const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

// Create Informasi
exports.createInformasi = async (req, res) => {
  try {
    const { title, description, location } = req.body;
    const file = req.files?.file?.[0];
    const url = file
      ? `${protocol}://${req.get("host")}/uploads/informasi/${file.filename}`
      : null;

    const informasi = await Informasi.create({
      title,
      description,
      location,
      url,
    });

    res.status(201).json({
      data: {
        id: informasi.id,
        title: informasi.title,
        description: informasi.description,
        location: informasi.location,
        url: informasi.url,
        createdAt: informasi.createdAt,
        updatedAt: informasi.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read All Informasi with Pagination, Search, and Sorting
exports.getInformasi = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const searchQuery = req.query.search || "";
    const sort = req.query.sort || "newest";
    const order =
      sort === "oldest" ? [["createdAt", "ASC"]] : [["createdAt", "DESC"]];

    const { count, rows: informasiList } = await Informasi.findAndCountAll({
      where: { title: { [Op.like]: `%${searchQuery.toLowerCase()}%` } },
      limit,
      offset,
      order,
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      data: informasiList.map((info) => ({
        id: info.id,
        title: info.title,
        description: info.description,
        location: info.location,
        url: info.url?.replace(/^https?:\/\//, `${protocol}://`),
        createdAt: info.createdAt,
        updatedAt: info.updatedAt,
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

// Get Informasi by ID
exports.getInformasiById = async (req, res) => {
  const { id } = req.params;
  try {
    const informasi = await Informasi.findByPk(id);
    if (!informasi) {
      return res.status(404).json({ message: "Informasi not found" });
    }

    res.status(200).json({
      data: {
        id: informasi.id,
        title: informasi.title,
        description: informasi.description,
        location: informasi.location,
        url: informasi.url?.replace(/^https?:\/\//, `${protocol}://`),
        createdAt: informasi.createdAt,
        updatedAt: informasi.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Informasi
exports.updateInformasi = async (req, res) => {
  const { id } = req.params;
  const { title, description, location } = req.body;
  const file = req.files?.file?.[0];

  try {
    const informasi = await Informasi.findByPk(id);
    if (!informasi) {
      return res.status(404).json({ message: "Informasi not found" });
    }

    let newUrl = informasi.url;

    if (file) {
      if (informasi.url) {
        const oldFileName = path.basename(informasi.url);
        await deleteFile("informasi", oldFileName);
      }
      newUrl = `${protocol}://${req.get("host")}/uploads/informasi/${
        file.filename
      }`;
    }

    await informasi.update({
      title: title || informasi.title,
      description: description || informasi.description,
      location: location || informasi.location,
      url: newUrl,
    });

    res.status(200).json({
      data: {
        id: informasi.id,
        title: informasi.title,
        description: informasi.description,
        location: informasi.location,
        url: informasi.url,
        createdAt: informasi.createdAt,
        updatedAt: informasi.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Informasi
exports.deleteInformasi = async (req, res) => {
  const { id } = req.params;
  try {
    const informasi = await Informasi.findByPk(id);
    if (!informasi) {
      return res.status(404).json({ message: "Informasi not found" });
    }

    if (informasi.url) {
      const fileName = path.basename(informasi.url);
      await deleteFile("informasi", fileName);
    }

    await informasi.destroy();

    res.status(200).json({ message: "Informasi deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware for uploading Informasi files
exports.uploadMiddleware = upload.fields([{ name: "file" }]);
