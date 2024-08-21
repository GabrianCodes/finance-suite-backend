const express = require('express');

const dataController = require('../controllers/data');
const auth = require("../auth");

const { verify, verifyAdmin } = auth;

const router = express.Router();

// Daily data (income, expenses, and profit/loss) by day of the month
router.get('/daily/:year/:month', verify, dataController.getDailyData);

// Monthly data (income, expenses, and profit/loss) by month of the year
router.get('/monthly/:year', verify, dataController.getMonthlyData);

// Yearly data (income, expenses, and profit/loss) by year
router.get('/yearly', verify, dataController.getYearlyData);

module.exports = router;