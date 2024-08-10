const mongoose = require('mongoose');

const sourceTypeSchema = new mongoose.Schema({
    typeName: {
        type: String,
        required: [true, 'Source Type Name is required!']
    },
    description: {
        type: String,
    }
});

module.exports = mongoose.model('SourceType', sourceTypeSchema);