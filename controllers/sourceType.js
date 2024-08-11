const SourceType = require('../models/SourceType');
const auth = require("../auth");



module.exports.postSourceType = async (req, res) => {
    try {
        const sourceType = new SourceType({
            ...req.body,
            userId: req.user.id // Automatically set the userId based on the logged-in user
        });
        const savedSourceType = await sourceType.save();
        res.status(201).json(savedSourceType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getAllSourceTypes = async (req, res) => {
    // Logic to get all SourceTypes normal user can only see his own admin can see everyone
    try {
        let sourceTypes;
        if (req.user.isAdmin) {
            sourceTypes = await SourceType.find();
        } else {
            sourceTypes = await SourceType.find({ userId: req.user.id });
        }
        res.status(200).json(sourceTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getSingleSourceType = async (req, res) => {
    // Logic to get a specific SourceType by ID normal user only has access to his own admin has access to everyone
    try {
        const sourceType = await SourceType.findById(req.params.sourceTypeId);
        if (!sourceType) {
            return res.status(404).json({ message: "SourceType not found" });
        }

        if (req.user.isAdmin || sourceType.userId === req.user.id) {
            res.status(200).json(sourceType);
        } else {
            res.status(403).json({ message: "Access denied" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateSourceType = async (req, res) => {
    // Logic to update a specific SourceType by ID normal user only can update his own admin has can update to anyone's
    try {
        const sourceType = await SourceType.findById(req.params.sourceTypeId);
        if (!sourceType) {
            return res.status(404).json({ message: "SourceType not found" });
        }

        if (req.user.isAdmin || sourceType.userId === req.user.id) {
            Object.assign(sourceType, req.body);
            const updatedSourceType = await sourceType.save();
            res.status(200).json(updatedSourceType);
        } else {
            res.status(403).json({ message: "Access denied" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteSourceType = async (req, res) => {
    // Logic to delete a specific SourceType by ID normal user only can delete his own, admin can delete anyone's
    try {
        const sourceType = await SourceType.findById(req.params.sourceTypeId);
        if (!sourceType) {
            return res.status(404).json({ message: "SourceType not found" });
        }

        if (req.user.isAdmin || sourceType.userId === req.user.id) {
            await SourceType.deleteOne({ _id: req.params.sourceTypeId });
            res.status(200).json({ message: "SourceType deleted" });
        } else {
            res.status(403).json({ message: "Access denied" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};