//[SECTION] Dependencies and Modules
const express = require("express");
const productController = require("../controllers/product");
const auth = require("../auth");

const { verify, verifyAdmin } = auth;


const router = express.Router();


router.post("/", verify, verifyAdmin, productController.createProduct); 

router.get("/all", verify, verifyAdmin, productController.getAllProducts);

router.get("/", productController.getAllActiveProducts);

router.get("/:productId", productController.getSingleProduct);


// Updating a product
router.patch("/:productId", verify, verifyAdmin, productController.updateProduct);


router.patch("/:productId/archive", verify, verifyAdmin, productController.archiveProduct);

router.patch("/:productId/activate", verify, verifyAdmin, productController.activateProduct);

// New route for searching products by name
router.post("/searchByName", productController.searchProductByName);

// New route for searching products by price range
router.post("/searchByPrice", productController.searchProductByPriceRange);


module.exports = router;