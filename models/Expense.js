
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'User ID is required!']
    },

    sourceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Source',
        required: false
    },
    
    name: {
        type: String,
        required: [true, 'Expense Name is Required']
    },
    description: {
        type: String,
        required: [true, 'Expense Description is Required']
    },
    amount: {
        type: Number,
        required: [true, 'Expense amount is Required']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Expense', expenseSchema);
