const Expense = require('../models/Expense');
const auth = require("../auth");

module.exports.postExpense = async (req, res) => {
    // Logic to create a new Expense
    try {
        const expense = new Expense({
            ...req.body,
            userId: req.user.id
        });
        const savedExpense = await expense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getAllExpenses = async (req, res) => {
    // Logic to get all Expenses normal user can only see his own admin can see everyone
    try {
        let expenses;
        if (req.user.isAdmin) {
            expenses = await Expense.find();
        } else {
            expenses = await Expense.find({ userId: req.user.id });
        }
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getSingleExpense = async (req, res) => {
    // Logic to get a specific Expense by ID normal user only has access to his own admin has access to everyone
    try {
        const expense = await Expense.findById(req.params.expenseId);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        if (req.user.isAdmin || expense.userId === req.user.id) {
            res.status(200).json(expense);
        } else {
            res.status(403).json({ message: "Access denied" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateExpense = async (req, res) => {
    // Logic to update a specific Expense by ID normal user only can update his own admin has can update to anyone's
    try {
        const expense = await Expense.findById(req.params.expenseId);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        if (req.user.isAdmin || expense.userId === req.user.id) {
            Object.assign(expense, req.body);
            const updatedExpense = await expense.save();
            res.status(200).json(updatedExpense);
        } else {
            res.status(403).json({ message: "Access denied" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteExpense = async (req, res) => {
    // Logic to delete a specific Expense by ID normal user only can delete his own, admin can delete anyone's
    try {
        const expense = await Expense.findById(req.params.expenseId);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        if (req.user.isAdmin || expense.userId === req.user.id) {
            await Expense.deleteOne({ _id: req.params.expenseId });
            res.status(200).json({ message: "Expense deleted" });
        } else {
            res.status(403).json({ message: "Access denied" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};