"use strict";
const { Op } = require("sequelize");
const { Geolocation } = require("../../models");
const fileStorage = require("../utils/fileStorage");
const deleteFile = require("../utils/fileDelete");
const multer = require("multer");
const path = require("path");

// Set up multer for file uploads
const upload = multer({ storage: fileStorage("geolocation") });

// Define protocol based on environment
const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

// Create Geolocation
exports.createGeolocation = async (req, res) => {
  try {
    const { title, location } = req.body;
    const file = req.files?.file?.[0];

    if (!file) {
      return res.status(400).json({ message: "File is required" });
    }

    const geolocation = await Geolocation.create({
      title,
      location,
      url: `${protocol}://${req.get("host")}/uploads/geolocation/${
        file.filename
      }`,
    });

    res.status(201).json({
      data: {
        id: geolocation.id,
        title: geolocation.title,
        location: geolocation.location,
        url: geolocation.url,
        createdAt: geolocation.createdAt,
        updatedAt: geolocation.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read All Geolocations with Pagination, Search, and Sorting
exports.getGeolocation = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const searchQuery = req.query.search || "";
    const sort = req.query.sort || "newest";
    const order =
      sort === "oldest" ? [["createdAt", "ASC"]] : [["createdAt", "DESC"]];

    const { count, rows: geolocationList } = await Geolocation.findAndCountAll({
      where: { title: { [Op.like]: `%${searchQuery.toLowerCase()}%` } },
      limit,
      offset,
      order,
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      data: geolocationList.map((geo) => ({
        id: geo.id,
        title: geo.title,
        location: geo.location,
        url: geo.url.replace(/^https?:\/\//, `${protocol}://`),
        createdAt: geo.createdAt,
        updatedAt: geo.updatedAt,
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

// Get Geolocation by ID
exports.getGeolocationById = async (req, res) => {
  const { id } = req.params;
  try {
    const geolocation = await Geolocation.findByPk(id);
    if (!geolocation) {
      return res.status(404).json({ message: "Geolocation not found" });
    }

    res.status(200).json({
      data: {
        id: geolocation.id,
        title: geolocation.title,
        location: geolocation.location,
        url: geolocation.url.replace(/^https?:\/\//, `${protocol}://`),
        createdAt: geolocation.createdAt,
        updatedAt: geolocation.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Geolocation
exports.updateGeolocation = async (req, res) => {
  const { id } = req.params;
  const { title, location } = req.body;
  const file = req.files?.file?.[0];

  try {
    const geolocation = await Geolocation.findByPk(id);
    if (!geolocation) {
      return res.status(404).json({ message: "Geolocation not found" });
    }

    let newUrl = geolocation.url;

    if (file) {
      const oldFileName = path.basename(geolocation.url);
      await deleteFile("geolocation", oldFileName);
      newUrl = `${protocol}://${req.get("host")}/uploads/geolocation/${
        file.filename
      }`;
    }

    await geolocation.update({
      title: title || geolocation.title,
      location: location || geolocation.location,
      url: newUrl,
    });

    res.status(200).json({
      data: {
        id: geolocation.id,
        title: geolocation.title,
        location: geolocation.location,
        url: newUrl,
        createdAt: geolocation.createdAt,
        updatedAt: geolocation.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Geolocation
exports.deleteGeolocation = async (req, res) => {
  const { id } = req.params;
  try {
    const geolocation = await Geolocation.findByPk(id);
    if (!geolocation) {
      return res.status(404).json({ message: "Geolocation not found" });
    }

    const fileName = path.basename(geolocation.url);
    await deleteFile("geolocation", fileName);

    await geolocation.destroy();

    res.status(200).json({ message: "Geolocation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware for uploading Geolocation files
exports.uploadMiddleware = upload.fields([{ name: "file" }]);
