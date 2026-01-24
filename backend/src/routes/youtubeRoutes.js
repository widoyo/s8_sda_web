const express = require("express");
const router = express.Router();
const youtubeController = require("../controllers/youtubeController");
const authentication = require("../middlewares/authentication");

// Create a new YouTube entry
router.post("/", authentication, youtubeController.createYoutube);

// Get all YouTube entries
router.get("/", youtubeController.getYoutubes);

// Update a YouTube entry by ID
router.put("/:id", authentication, youtubeController.updateYoutube);

// Delete a YouTube entry by ID
router.delete("/:id", authentication, youtubeController.deleteYoutube);

module.exports = router;
