const express = require("express");
const sourceController = require("../controllers/source");
const auth = require("../auth");

const { verify, verifyAdmin } = auth;

const router = express.Router();

// Route to create a new source
router.post("/", verify, sourceController.postSource);

// Route to get all sources (Admin can see all, regular users see their own)
router.get("/", verify, sourceController.getAllSources);

// Route to get a specific source by ID (Admin and owner can view)
router.get("/:sourceId", verify, sourceController.getSingleSource);

// Route to update a specific source by ID (Admin and owner can update)
router.patch("/:sourceId", verify, sourceController.updateSource);

// Route to delete a specific source by ID (Admin and owner can delete)
router.delete("/:sourceId", verify, sourceController.deleteSource);

module.exports = router;