const mongoose = require('mongoose');

const sourceTypeSchema = new mongoose.Schema({
    typeName: {
        type: String,
        required: [true, 'Source Type Name is required!']
    },
    description: {
        type: String,
    },
    userId: {
        type: String,
        required: [true, 'User ID is required!']
    }
});

module.exports = mongoose.model('SourceType', sourceTypeSchema);