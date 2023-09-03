// controllers/positionController.js
const Position = require("../models/Position");

// Create a new position
exports.createPosition = async (req, res) => {
    try {
        const { name, department, industry } = req.body;
        if (!name || !department || !industry) {
            return res.status(400).json({ error: "Name, department, and industry are required" });
        }

        // Check if a position with the same name, department, and industry already exists
        const existingPosition = await Position.findOne({ name, department, industry });

        if (existingPosition) {
            return res.status(400).json({ error: "Position with the same name, department, and industry already exists" });
        }

        const position = new Position({ name, department, industry });
        await position.save();

        res.status(201).json(position);
    } catch (error) {
        console.error("Error creating position:", error);
        res.status(500).json({ error: "Server error" });
    }
};


// Get all positions
exports.getAllPositions = async (req, res) => {
    try {
        const positions = await Position.find().populate("department industry", "name");

        res.json(positions);
    } catch (error) {
        console.error("Error fetching positions:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Get positions by industry and department
exports.getPositionsByIndustryAndDepartment = async (req, res) => {
    try {
        const { industryId, departmentId } = req.params;

        const positions = await Position.find({
            industry: industryId,
            department: departmentId,
        }).populate("department industry", "name");

        res.json(positions);
    } catch (error) {
        console.error("Error fetching positions by industry and department:", error);
        res.status(500).json({ error: "Server error" });
    }
};
