"use strict";
const { Infografis } = require("../../models");
const fileStorage = require("../utils/fileStorage");
const deleteFile = require("../utils/fileDelete");
const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize");

// Set up multer for file uploads
const upload = multer({ storage: fileStorage("infografis") });

// Define protocol based on environment
const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

// Create Infografis
exports.createInfografis = async (req, res) => {
  try {
    const { description } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "File is required" });
    }

    const infografis = await Infografis.create({
      url: `${protocol}://${req.get("host")}/uploads/infografis/${
        file.filename
      }`,
      description,
    });

    res.status(201).json({
      data: {
        id: infografis.id,
        url: infografis.url,
        description: infografis.description,
        createdAt: infografis.createdAt,
        updatedAt: infografis.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read all Infografis with Pagination and Sorting
exports.getInfografis = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const sort = req.query.sort || "newest";
    const order =
      sort === "oldest" ? [["createdAt", "ASC"]] : [["createdAt", "DESC"]];
    const searchQuery = req.query.search || "";

    const { count, rows: infografisList } = await Infografis.findAndCountAll({
      where: {
        description: {
          [Op.like]: `%${searchQuery.toLowerCase()}%`,
        },
      },
      limit,
      offset,
      order,
    });

    const totalPages = Math.ceil(count / limit);

    const response = infografisList.map((infografis) => ({
      id: infografis.id,
      url: infografis.url.replace(/^https?:\/\//, `${protocol}://`),
      description: infografis.description,
      createdAt: infografis.createdAt,
      updatedAt: infografis.updatedAt,
    }));

    res.status(200).json({
      data: response,
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

// Read Infografis by ID
exports.getInfografisById = async (req, res) => {
  const { id } = req.params;

  try {
    const infografis = await Infografis.findByPk(id);

    if (!infografis) {
      return res.status(404).json({ message: "Infografis not found" });
    }

    res.status(200).json({
      data: {
        id: infografis.id,
        url: infografis.url.replace(/^https?:\/\//, `${protocol}://`),
        description: infografis.description,
        createdAt: infografis.createdAt,
        updatedAt: infografis.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Infografis
exports.updateInfografis = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const infografisFile = req.file;

  try {
    const infografis = await Infografis.findByPk(id);
    if (!infografis) {
      return res.status(404).json({ message: "Infografis not found" });
    }

    let newInfografisUrl = infografis.url;

    if (infografisFile) {
      const oldInfografisFileName = path.basename(infografis.url);
      await deleteFile("infografis", oldInfografisFileName);
      newInfografisUrl = `${protocol}://${req.get("host")}/uploads/infografis/${
        infografisFile.filename
      }`;
    }

    await infografis.update({
      url: newInfografisUrl,
      description: description || infografis.description,
    });

    res.status(200).json({
      data: {
        id: infografis.id,
        url: infografis.url,
        description: infografis.description,
        createdAt: infografis.createdAt,
        updatedAt: infografis.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Infografis
exports.deleteInfografis = async (req, res) => {
  const { id } = req.params;
  try {
    const infografis = await Infografis.findByPk(id);
    if (!infografis) {
      return res.status(404).json({ message: "Infografis not found" });
    }

    const fileName = path.basename(infografis.url);
    await deleteFile("infografis", fileName);

    await infografis.destroy();
    res.status(200).json({ message: "Infografis deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware for uploading infografis
exports.uploadMiddleware = upload.single("infografis");
