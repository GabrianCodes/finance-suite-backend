const express = require("express");
const incomeController = require("../controllers/income");
const auth = require("../auth");

const { verify, verifyAdmin } = auth;

const router = express.Router();

// Route to create a new income
router.post("/", verify, incomeController.postIncome);

// Route to get all incomes (Admin can see all, regular users see their own)
router.get("/", verify, incomeController.getAllIncomes);

// Route to get a specific income by ID (Admin and owner can view)
router.get("/:incomeId", verify, incomeController.getSingleIncome);

// Route to update a specific income by ID (Admin and owner can update)
router.patch("/:incomeId", verify, incomeController.updateIncome);

// Route to delete a specific income by ID (Admin and owner can delete)
router.delete("/:incomeId", verify, incomeController.deleteIncome);

module.exports = router;