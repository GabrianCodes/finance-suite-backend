// Dependencies and Modules
const express = require("express");
const userController = require("../controllers/user");

// Import the auth module
const { verify, verifyAdmin } = require("../auth");

// Routing Component
const router = express.Router();

router.post("/", userController.registerUser);

router.post("/login", userController.login);

router.get("/details", verify, userController.userDetails);

router.patch("/:userId/set-as-admin", verify, verifyAdmin, userController.setAsAdmin);

router.patch("/update-password", verify, userController.updatePassword);



// Export Route System
module.exports = router;