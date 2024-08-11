const Income = require('../models/Income');
const auth = require("../auth");

module.exports.postIncome = async (req, res) => {
    try {
        const income = new Income({
            ...req.body,
            userId: req.user.id
        });
        const savedIncome = await income.save();
        res.status(201).json(savedIncome);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getAllIncomes = async (req, res) => {
    // Logic to get all Incomes normal user can only see his own admin can see everyone
    try {
        let incomes;
        if (req.user.isAdmin) {
            incomes = await Income.find();
        } else {
            incomes = await Income.find({ userId: req.user.id });
        }
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getSingleIncome = async (req, res) => {
    // Logic to get a specific Income by ID normal user only has access to his own admin has access to everyone
    try {
        const income = await Income.findById(req.params.incomeId);
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }

        if (req.user.isAdmin || income.userId === req.user.id) {
            res.status(200).json(income);
        } else {
            res.status(403).json({ message: "Access denied" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateIncome = async (req, res) => {
    // Logic to update a specific Income by ID normal user only can update his own admin has can update to anyone's
    try {
        const income = await Income.findById(req.params.incomeId);
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }

        if (req.user.isAdmin || income.userId === req.user.id) {
            Object.assign(income, req.body);
            const updatedIncome = await income.save();
            res.status(200).json(updatedIncome);
        } else {
            res.status(403).json({ message: "Access denied" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteIncome = async (req, res) => {
    // Logic to delete a specific Income by ID normal user only can delete his own, admin can delete anyone's
    try {
        const income = await Income.findById(req.params.incomeId);
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }

        if (req.user.isAdmin || income.userId === req.user.id) {
            await Income.deleteOne({ _id: req.params.incomeId });
            res.status(200).json({ message: "Income deleted" });
        } else {
            res.status(403).json({ message: "Access denied" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};