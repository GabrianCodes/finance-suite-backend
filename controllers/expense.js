const Expense = require('../models/Expense');

// Function to post an expense
exports.postExpense = async (req, res) => {
    try {
        const { userId, name, description, amount } = req.body;

        const newExpense = new Expense({
            userId,
            name,
            description,
            amount
        });

        const savedExpense = await newExpense.save();
        res.status(201).json({ message: 'Expense created successfully', expense: savedExpense });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create expense', error: error.message });
    }
};

// Function to get all expenses (admin sees all, user sees their own)
exports.getAllExpenses = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user is populated with the logged-in user's data
        const isAdmin = req.user.isAdmin; // Assuming req.user.isAdmin determines if the user is an admin

        let expenses;
        if (isAdmin) {
            expenses = await Expense.find(); // Admin sees all expenses
        } else {
            expenses = await Expense.find({ userId }); // Regular user sees only their own expenses
        }

        res.status(200).json({ expenses });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve expenses', error: error.message });
    }
};