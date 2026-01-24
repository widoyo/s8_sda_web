const multer = require("multer");
const fileStorage = require("../utils/fileStorage");
const { Banner } = require("../../models");
const deleteFile = require("../utils/fileDelete");

const bannerUpload = multer({ storage: fileStorage("banners") });

// Determine protocol based on environment
const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

exports.uploadBanner = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const fileSavePromises = files.map(async (file) => {
      const fileUrl = `${protocol}://${req.get("host")}/uploads/banners/${
        file.filename
      }`;

      // Save the banner details in the database
      const banner = await Banner.create({
        url: fileUrl,
        filename: file.filename,
      });

      return { id: banner.id, url: banner.url };
    });

    const savedFiles = await Promise.all(fileSavePromises);

    res.status(200).json({
      data: savedFiles,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Banners with Pagination and Sorting
exports.getBanners = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const sort = req.query.sort || "newest";
    const order =
      sort === "oldest" ? [["createdAt", "ASC"]] : [["createdAt", "DESC"]];

    const { count, rows: banners } = await Banner.findAndCountAll({
      limit,
      offset,
      order,
    });

    const totalPages = Math.ceil(count / limit);

    const response = banners.map((banner) => ({
      id: banner.id,
      url: banner.url.replace(/^https?:\/\//i, `${protocol}://`),
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

// Delete banner function
exports.deleteBanner = async (req, res) => {
  const { id } = req.params;

  try {
    const banner = await Banner.findByPk(id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    await deleteFile("banners", banner.filename);
    await Banner.destroy({ where: { id } });

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware for uploading banners
exports.uploadMiddleware = bannerUpload.array("banners", 3);
