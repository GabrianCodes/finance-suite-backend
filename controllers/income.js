const Income = require('../models/Income');

// Function to post an income
exports.postIncome = async (req, res) => {
    try {
        const { userId, name, description, amount } = req.body;

        const newIncome = new Income({
            userId,
            name,
            description,
            amount
        });

        const savedIncome = await newIncome.save();
        res.status(201).json({ message: 'Income created successfully', income: savedIncome });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create income', error: error.message });
    }
};

// Function to get all incomes (admin sees all, user sees their own)
exports.getAllIncomes = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user is populated with the logged-in user's data
        const isAdmin = req.user.isAdmin; // Assuming req.user.isAdmin determines if the user is an admin

        let incomes;
        if (isAdmin) {
            incomes = await Income.find(); // Admin sees all incomes
        } else {
            incomes = await Income.find({ userId }); // Regular user sees only their own incomes
        }

        res.status(200).json({ incomes });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve incomes', error: error.message });
    }
};