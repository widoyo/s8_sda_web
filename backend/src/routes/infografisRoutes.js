const express = require("express");
const router = express.Router();
const infografisController = require("../controllers/infografisController");
const authentication = require("../middlewares/authentication");

router.post(
  "/upload",
  authentication,
  infografisController.uploadMiddleware,
  infografisController.createInfografis
);
router.get("/", infografisController.getInfografis);
router.delete("/:id", authentication, infografisController.deleteInfografis);
router.put(
  "/:id",
  authentication,
  infografisController.uploadMiddleware,
  infografisController.updateInfografis
);
router.get("/:id", infografisController.getInfografisById);

module.exports = router;
