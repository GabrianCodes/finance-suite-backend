// Dependencies and Modules
const express = require("express");
const cartController = require("../controllers/cart");

// Import the auth module
const { verify, verifyAdmin } = require("../auth");

// Routing Component
const router = express.Router();


router.get("/get-cart", verify, cartController.getCart)

router.post("/add-to-cart", verify, cartController.addToCart)


router.post("/update-cart-quantity", verify, cartController.updateCartQuantity);

// Route to remove item from cart
router.patch("/:productId/remove-from-cart", verify, cartController.removeFromCart);

// Route to clear all items from cart
router.patch("/clear-cart", verify, cartController.clearCart);

// Export Route System
module.exports = router;