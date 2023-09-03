// controllers/industryController.js
const Industry = require("../models/Industry");
const Department = require("../models/Department");
const Position = require("../models/Position");

// Implement CRUD operations for Industry here

// Create a new industry, department, and position
exports.createIndustry = async (req, res) => {
    try {
        const { industry, department, position } = req.body;

        // Check if the industry already exists
        let existingIndustry = await Industry.findOne({ name: industry });

        if (!existingIndustry) {
            // Create a new industry if it doesn't exist
            existingIndustry = new Industry({ name: industry });
            await existingIndustry.save();
        }

        let newDepartment;
        if (department) {
            // Check if the department already exists within the industry
            newDepartment = await Department.findOne({ name: department, industry: existingIndustry });

            if (!newDepartment) {
                // Create a new department linked to the industry if it doesn't exist
                newDepartment = new Department({ name: department, industry: existingIndustry });
                await newDepartment.save();
            }
        }

        let newPosition;
        if (position) {
            // Check if the position already exists within the industry and department
            newPosition = await Position.findOne({ name: position, industry: existingIndustry, department: newDepartment });

            if (!newPosition) {
                // Create a new position linked to the industry and department if it doesn't exist
                newPosition = new Position({ name: position, industry: existingIndustry, department: newDepartment });
                await newPosition.save();
            }
        }

        res.status(201).json({ industry: existingIndustry, department: newDepartment, position: newPosition });
    } catch (error) {
        console.error("Error creating industry, department, or position:", error);
        res.status(500).json({ error: "Server error" });
    }
};


// Get all industries with pagination
exports.getAllIndustries = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
        };

        const industries = await Industry.paginate({}, options);

        // Customize the response structure
        const customResponse = {
            industries: industries.docs, // Rename "docs" to "industries"
            totalIndustries: industries.totalDocs, // Rename "totalDocs" to "totalIndustries"
            totalPages: industries.totalPages,
            currentPage: industries.page,
        };

        res.json(customResponse);
    } catch (error) {
        console.error("Error fetching industries:", error);
        res.status(500).json({ error: "Server error" });
    }
};

