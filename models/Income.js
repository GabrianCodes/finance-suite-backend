
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
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Income', incomeSchema);
