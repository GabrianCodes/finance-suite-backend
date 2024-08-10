const express = require("express");
const sourceTypeController = require("../controllers/SourceType");
const auth = require("../auth");

const { verify, verifyAdmin } = auth;

const router = express.Router();

// Route to create a new source type
router.post("/", verify, sourceTypeController.postSourceType);

// Route to get all source types (Admin can see all, regular users see their own)
router.get("/", verify, sourceTypeController.getAllSourceTypes);

// Route to get a specific source type by ID (Admin and owner can view)
router.get("/:sourceTypeId", verify, sourceTypeController.getSingleSourceType);

// Route to update a specific source type by ID (Admin and owner can update)
router.patch("/:sourceTypeId", verify, sourceTypeController.updateSourceType);

// Route to delete a specific source type by ID (Admin and owner can delete)
router.delete("/:sourceTypeId", verify, sourceTypeController.deleteSourceType);

module.exports = router;