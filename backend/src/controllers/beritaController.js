const { Berita } = require("../../models");
const { Op } = require("sequelize");
const fileStorage = require("../utils/fileStorage");
const deleteFile = require("../utils/fileDelete");
const multer = require("multer");
const path = require("path");

const upload = multer({ storage: fileStorage("berita") });

// Define protocol based on environment
const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

// Create Berita
exports.createBerita = async (req, res) => {
  try {
    const { title, description, location, highlighted } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const berita = await Berita.create({
      title,
      description,
      location,
      img: `${protocol}://${req.get("host")}/uploads/berita/${file.filename}`,
      highlighted: highlighted || false,
    });

    res.status(201).json({
      data: {
        id: berita.id,
        title: berita.title,
        description: berita.description,
        location: berita.location,
        img: berita.img,
        highlighted: berita.highlighted,
        createdAt: berita.createdAt,
        updatedAt: berita.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read All Berita
exports.getBerita = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const sort = req.query.sort === "oldest" ? "ASC" : "DESC";
    const highlightedFilter =
      req.query.highlighted === "true"
        ? true
        : req.query.highlighted === "false"
        ? false
        : null;
    const searchQuery = req.query.search || "";

    const whereClause = {
      ...(highlightedFilter !== null && { highlighted: highlightedFilter }),
      ...(searchQuery && {
        [Op.or]: [
          { title: { [Op.like]: `%${searchQuery}%` } },
          { description: { [Op.like]: `%${searchQuery}%` } },
          { location: { [Op.like]: `%${searchQuery}%` } },
        ],
      }),
    };

    const { count, rows: beritaList } = await Berita.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [["createdAt", sort]],
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      data: beritaList.map((berita) => ({
        id: berita.id,
        title: berita.title,
        description: berita.description,
        location: berita.location,
        img: berita.img.replace(/^https?:\/\//, `${protocol}://`),
        highlighted: berita.highlighted,
        createdAt: berita.createdAt,
        updatedAt: berita.updatedAt,
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

// Update Berita
exports.updateBerita = async (req, res) => {
  const { id } = req.params;
  const { title, description, location, highlighted } = req.body;
  const file = req.file;

  try {
    const berita = await Berita.findByPk(id);
    if (!berita) {
      return res.status(404).json({ message: "Berita not found" });
    }

    berita.title = title || berita.title;
    berita.description = description || berita.description;
    berita.location = location || berita.location;
    berita.highlighted =
      highlighted !== undefined ? highlighted : berita.highlighted;

    if (file) {
      const oldFileName = berita.img ? path.basename(berita.img) : null;
      if (oldFileName) {
        await deleteFile("berita", oldFileName);
      }

      berita.img = `${protocol}://${req.get("host")}/uploads/berita/${
        file.filename
      }`;
    }

    await berita.save();

    res.status(200).json({
      data: {
        id: berita.id,
        title: berita.title,
        description: berita.description,
        location: berita.location,
        img: berita.img,
        highlighted: berita.highlighted,
        createdAt: berita.createdAt,
        updatedAt: berita.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Berita
exports.deleteBerita = async (req, res) => {
  const { id } = req.params;
  try {
    const berita = await Berita.findByPk(id);
    if (!berita) {
      return res.status(404).json({ message: "Berita not found" });
    }

    const imgFileName = path.basename(berita.img);

    await deleteFile("berita", imgFileName);
    await berita.destroy();

    res.status(200).json({ message: "Berita deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Berita by ID
exports.getBeritaById = async (req, res) => {
  const { id } = req.params;

  try {
    const berita = await Berita.findByPk(id);

    if (!berita) {
      return res.status(404).json({ message: "Berita not found" });
    }

    res.status(200).json({
      data: {
        id: berita.id,
        title: berita.title,
        description: berita.description,
        location: berita.location,
        img: berita.img.replace(/^https?:\/\//, `${protocol}://`),
        highlighted: berita.highlighted,
        createdAt: berita.createdAt,
        updatedAt: berita.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all highlighted Berita
exports.getHighlightedBerita = async (_, res) => {
  try {
    const highlightedBerita = await Berita.findAll({
      where: { highlighted: 1 },
      order: [["createdAt", "DESC"]],
    });

    if (highlightedBerita.length === 0) {
      return res.status(404).json({ message: "No highlighted berita found" });
    }

    res.status(200).json({
      data: highlightedBerita.map((berita) => ({
        id: berita.id,
        title: berita.title,
        description: berita.description,
        location: berita.location,
        img: berita.img.replace(/^https?:\/\//, `${protocol}://`),
        highlighted: berita.highlighted,
        createdAt: berita.createdAt,
        updatedAt: berita.updatedAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware for uploading images
exports.uploadMiddleware = upload.single("img");
