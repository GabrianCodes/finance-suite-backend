const SourceType = require('../models/SourceType');
const auth = require("../auth");


module.exports.postSourceType = async (req, res) => {
    // Logic to create a new SourceType
};

module.exports.getAllSourceTypes = async (req, res) => {
    // Logic to get all SourceTypes normal user can only see his own admin can see everyone
};

module.exports.getSingleSourceType = async (req, res) => {
    // Logic to get a specific SourceType by ID normal user only has access to his own admin has access to everyone
};

module.exports.updateSourceType = async (req, res) => {
    // Logic to update a specific SourceType by ID normal user only can update his own admin has can update to anyone's
};

module.exports.deleteSourceType = async (req, res) => {
    // Logic to delete a specific SourceType by ID normal user only can delete to his own admin can delete to anyone's
};