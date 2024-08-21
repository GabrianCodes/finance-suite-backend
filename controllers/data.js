const Income = require('../models/Income');
const Expense = require('../models/Expense');
const auth = require("../auth");

// Utility function to calculate profit/loss
const calculateProfitLoss = (incomes, expenses) => {
    return incomes.map((income, index) => {
        const expense = expenses[index] || { totalExpenses: 0 };
        return {
            period: income._id, // This could be day, month, or year
            profitLoss: income.totalIncome - expense.totalExpenses
        };
    });
};

// Get data grouped by day
module.exports.getDailyData = async (req, res) => {
    const { month, year } = req.params;

    try {
        const incomes = await Income.aggregate([
            {
                $match: {
                    userId: req.user.id,
                    $expr: {
                        $and: [
                            { $eq: [{ $month: "$date" }, parseInt(month)] },
                            { $eq: [{ $year: "$date" }, parseInt(year)] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: { day: { $dayOfMonth: "$date" } },
                    totalIncome: { $sum: "$incomeAmount" }
                }
            }
        ]);

        const expenses = await Expense.aggregate([
            {
                $match: {
                    userId: req.user.id,
                    $expr: {
                        $and: [
                            { $eq: [{ $month: "$date" }, parseInt(month)] },
                            { $eq: [{ $year: "$date" }, parseInt(year)] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: { day: { $dayOfMonth: "$date" } },
                    totalExpenses: { $sum: "$expenseAmount" }
                }
            }
        ]);

        const profitLoss = calculateProfitLoss(incomes, expenses);

        res.status(200).json({ incomes, expenses, profitLoss });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get data grouped by month
module.exports.getMonthlyData = async (req, res) => {
    const { year } = req.params;

    try {
        const incomes = await Income.aggregate([
            {
                $match: {
                    userId: req.user.id,
                    $expr: { $eq: [{ $year: "$date" }, parseInt(year)] }
                }
            },
            {
                $group: {
                    _id: { month: { $month: "$date" } },
                    totalIncome: { $sum: "$incomeAmount" }
                }
            }
        ]);

        const expenses = await Expense.aggregate([
            {
                $match: {
                    userId: req.user.id,
                    $expr: { $eq: [{ $year: "$date" }, parseInt(year)] }
                }
            },
            {
                $group: {
                    _id: { month: { $month: "$date" } },
                    totalExpenses: { $sum: "$expenseAmount" }
                }
            }
        ]);

        const profitLoss = calculateProfitLoss(incomes, expenses);

        res.status(200).json({ incomes, expenses, profitLoss });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get data grouped by year
module.exports.getYearlyData = async (req, res) => {
    try {
        const incomes = await Income.aggregate([
            {
                $match: { userId: req.user.id }
            },
            {
                $group: {
                    _id: { year: { $year: "$date" } },
                    totalIncome: { $sum: "$incomeAmount" }
                }
            }
        ]);

        const expenses = await Expense.aggregate([
            {
                $match: { userId: req.user.id }
            },
            {
                $group: {
                    _id: { year: { $year: "$date" } },
                    totalExpenses: { $sum: "$expenseAmount" }
                }
            }
        ]);

        const profitLoss = calculateProfitLoss(incomes, expenses);

        res.status(200).json({ incomes, expenses, profitLoss });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};