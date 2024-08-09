// Dependencies and Modules
const express = require("express");
const orderController = require("../controllers/order");

// Import the auth module
const { verify, verifyAdmin } = require("../auth");

// Routing Component
const router = express.Router();

router.post("/checkout", verify, orderController.checkout);

router.post("/my-orders", verify, orderController.myOrders);

router.get("/all-orders", verify, verifyAdmin, orderController.allOrders);

// Export Route System
module.exports = router;