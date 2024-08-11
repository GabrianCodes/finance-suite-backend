const Source = require('../models/Source');
const auth = require("../auth");


module.exports.postSource = async (req, res) => {
    // Logic to create a new Source
    try {
        const source = new Source({
            ...req.body,
            userId: req.user.id
        });
        const savedSource = await source.save();
        res.status(201).json(savedSource);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getAllSources = async (req, res) => {
    // Logic to get all Sources normal user can only see his own admin can see everyone
    try {
        let sources;
        if (req.user.isAdmin) {
            sources = await Source.find();
        } else {
            sources = await Source.find({ userId: req.user.id });
        }
        res.status(200).json(sources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getSingleSource = async (req, res) => {
    // Logic to get a specific Source by ID normal user only has access to his own admin has access to everyone
    try {
        const source = await Source.findById(req.params.sourceId);
        if (!source) {
            return res.status(404).json({ message: "Source not found" });
        }

        if (req.user.isAdmin || source.userId === req.user.id) {
            res.status(200).json(source);
        } else {
            res.status(403).json({ message: "Access denied" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

module.exports.updateSource = async (req, res) => {
    // Logic to update a specific Source by ID normal user only can update his own admin has can update to anyone's
    try {
        const source = await Source.findById(req.params.sourceId);
        if (!source) {
            return res.status(404).json({ message: "Source not found" });
        }

        if (req.user.isAdmin || source.userId === req.user.id) {
            Object.assign(source, req.body);
            const updatedSource = await source.save();
            res.status(200).json(updatedSource);
        } else {
            res.status(403).json({ message: "Access denied" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

module.exports.deleteSource = async (req, res) => {
    // Logic to delete a specific Source by ID normal user only can delete his own, admin can delete anyone's
    try {
        const source = await Source.findById(req.params.sourceId);
        if (!source) {
            return res.status(404).json({ message: "Source not found" });
        }

        if (req.user.isAdmin || source.userId === req.user.id) {
            await Source.deleteOne({ _id: req.params.sourceId });
            res.status(200).json({ message: "Source deleted" });
        } else {
            res.status(403).json({ message: "Access denied" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};