
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: [true, 'User ID is required!']
    },

    name: {
        type: String,
        required: [true, 'Income Name is Required']
    },
    description: {
        type: String,
        required: [true, 'Income Description is Required']
    },
    amount: {
        type: Number,
        required: [true, 'Income amount is Required']
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Income', incomeSchema);
