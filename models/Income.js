
const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'User ID is required!']
    },

    sourceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Source',
        required: false
    },
    
    incomeName: {
        type: String,
        required: [true, 'Income Name is Required']
    },
    incomeDescription: {
        type: String,
        required: [true, 'Income Description is Required']
    },
    incomeAmount: {
        type: Number,
        required: [true, 'Income amount is Required']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Income', incomeSchema);
