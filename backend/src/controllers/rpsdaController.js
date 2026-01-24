const { Op } = require("sequelize");
const { Rpsda } = require("../../models");
const fileStorage = require("../utils/fileStorage");
const deleteFile = require("../utils/fileDelete");
const multer = require("multer");
const path = require("path");

// Set up multer for file uploads
const upload = multer({ storage: fileStorage("rpsda") });

// Define protocol based on environment
const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

// Create Rpsda
exports.createRpsda = async (req, res) => {
  try {
    const { title } = req.body;
    const rpsdaFile = req.files?.rpsda?.[0];

    if (!rpsdaFile) {
      return res.status(400).json({ message: "RPSDA file is required" });
    }

    const rpsda = await Rpsda.create({
      title,
      url: `${protocol}://${req.get("host")}/uploads/rpsda/${
        rpsdaFile.filename
      }`,
    });

    res.status(201).json({
      data: {
        id: rpsda.id,
        title: rpsda.title,
        url: rpsda.url,
        createdAt: rpsda.createdAt,
        updatedAt: rpsda.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read All Rpsda with Pagination, Search, and Sorting
exports.getRpsda = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const searchQuery = req.query.search || "";
    const sort = req.query.sort || "newest";

    const order =
      sort === "oldest" ? [["createdAt", "ASC"]] : [["createdAt", "DESC"]];

    const { count, rows: rpsdaList } = await Rpsda.findAndCountAll({
      where: {
        title: { [Op.like]: `%${searchQuery.toLowerCase()}%` },
      },
      limit,
      offset,
      order,
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      data: rpsdaList.map((rpsda) => ({
        id: rpsda.id,
        title: rpsda.title,
        url: rpsda.url.replace(/^https?:\/\//, `${protocol}://`),
        createdAt: rpsda.createdAt,
        updatedAt: rpsda.updatedAt,
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

// Get Rpsda by ID
exports.getRpsdaById = async (req, res) => {
  const { id } = req.params;
  try {
    const rpsda = await Rpsda.findByPk(id);
    if (!rpsda) {
      return res.status(404).json({ message: "RPSDA not found" });
    }

    res.status(200).json({
      data: {
        id: rpsda.id,
        title: rpsda.title,
        url: rpsda.url.replace(/^https?:\/\//, `${protocol}://`),
        createdAt: rpsda.createdAt,
        updatedAt: rpsda.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Rpsda
exports.updateRpsda = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const rpsdaFile = req.files?.rpsda?.[0];

  try {
    const rpsda = await Rpsda.findByPk(id);
    if (!rpsda) {
      return res.status(404).json({ message: "RPSDA not found" });
    }

    let newRpsdaUrl = rpsda.url;

    if (rpsdaFile) {
      const oldRpsdaFileName = path.basename(rpsda.url);
      await deleteFile("rpsda", oldRpsdaFileName);
      newRpsdaUrl = `${protocol}://${req.get("host")}/uploads/rpsda/${
        rpsdaFile.filename
      }`;
    }

    await rpsda.update({
      title: title || rpsda.title,
      url: newRpsdaUrl,
    });

    res.status(200).json({
      data: {
        id: rpsda.id,
        title: rpsda.title,
        url: rpsda.url,
        createdAt: rpsda.createdAt,
        updatedAt: rpsda.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Rpsda
exports.deleteRpsda = async (req, res) => {
  const { id } = req.params;
  try {
    const rpsda = await Rpsda.findByPk(id);
    if (!rpsda) {
      return res.status(404).json({ message: "RPSDA not found" });
    }

    const rpsdaFileName = path.basename(rpsda.url);
    await deleteFile("rpsda", rpsdaFileName);

    await rpsda.destroy();

    res.status(200).json({ message: "RPSDA deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware for uploading Rpsda files
exports.uploadMiddleware = upload.fields([{ name: "rpsda" }]);
