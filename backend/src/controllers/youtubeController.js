const { Youtube } = require("../../models");

// Create new YouTube entry
exports.createYoutube = async (req, res) => {
  try {
    const { url } = req.body;
    const newYoutube = await Youtube.create({ url });

    res.status(201).json({ data: newYoutube });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all YouTube entries with Pagination and Sorting
exports.getYoutubes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const offset = (page - 1) * limit;

    const sort = req.query.sort || "newest"; // Default to 'newest'

    // Determine order based on the sort parameter
    const order =
      sort === "oldest" ? [["createdAt", "ASC"]] : [["createdAt", "DESC"]];

    // Query YouTube entries with pagination and sorting
    const { count, rows: youtubes } = await Youtube.findAndCountAll({
      limit,
      offset,
      order, // Apply the determined order (newest or oldest)
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      data: youtubes,
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

// Update a YouTube entry by ID
exports.updateYoutube = async (req, res) => {
  try {
    const { id } = req.params;
    const { url } = req.body;

    const youtube = await Youtube.findByPk(id);
    if (!youtube) {
      return res.status(404).json({ message: "YouTube entry not found" });
    }

    youtube.url = url;
    await youtube.save();

    res.status(200).json({ data: youtube });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a YouTube entry by ID
exports.deleteYoutube = async (req, res) => {
  try {
    const { id } = req.params;

    const youtube = await Youtube.findByPk(id);
    if (!youtube) {
      return res.status(404).json({ message: "YouTube entry not found" });
    }

    await youtube.destroy();

    res.status(200).json({ message: "YouTube entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
