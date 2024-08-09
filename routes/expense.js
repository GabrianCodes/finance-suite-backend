const express = require("express");
const expenseController = require("../controllers/expenseController");
const auth = require("../config/auth");

const { verify, verifyAdmin } = auth;

const router = express.Router();

// Route to create a new expense
router.post("/", verify, expenseController.createExpense);

// Route to get all expenses (Admin can see all, regular users see their own)
router.get("/", verify, expenseController.getExpenses);

// Route to get a specific expense by ID (Admin and owner can view)
router.get("/:expenseId", verify, expenseController.getSingleExpense);

// Route to update a specific expense by ID (Admin and owner can update)
router.patch("/:expenseId", verify, expenseController.updateExpense);

// Route to delete a specific expense by ID (Admin and owner can delete)
router.delete("/:expenseId", verify, expenseController.deleteExpense);

module.exports = router;