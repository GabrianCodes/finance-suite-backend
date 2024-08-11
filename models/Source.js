const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema({
    sourceName: {
        type: String,
        required: [true, 'Source Name is required!']
    },
    sourceImage: {
        type: String,
        required: [true, 'Source Image is required!']
    },
    sourceTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SourceType',
        required: false
    },
    userGenerated: {
        type: Boolean,
        default: true
    },
    sourceDescription: {
        type: String,
        required: [true, 'Source Description is required!']
    },
    userId: {
        type: String,
        required: [true, 'User ID is required!']
    }
});

module.exports = mongoose.model('Source', sourceSchema);