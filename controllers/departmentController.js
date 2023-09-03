// controllers/departmentController.js
const Department = require("../models/Department");

// Create a new department
exports.createDepartment = async (req, res) => {
    try {
        const { name, industry } = req.body;
        if (!name || !industry) {
            return res.status(400).json({ error: "Name and industry are required" });
        }

        // Check if a department with the same name and industry already exists
        const existingDepartment = await Department.findOne({ name, industry });

        if (existingDepartment) {
            return res.status(400).json({ error: "Department with the same name and industry already exists" });
        }

        const department = new Department({ name, industry });
        await department.save();

        res.status(201).json(department);
    } catch (error) {
        console.error("Error creating department:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Get all departments with associated industry names
exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find().populate("industry", "name");

        const departmentsWithIndustryNames = departments.map((department) => ({
            _id: department._id,
            name: department.name,
            industry: department.industry.name, // Get the name of the associated industry
        }));

        res.json(departmentsWithIndustryNames);
    } catch (error) {
        console.error("Error fetching departments:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Get departments by industry
exports.getDepartmentsByIndustry = async (req, res) => {
    try {
        const { industryId } = req.params;

        const departments = await Department.find({ industry: industryId });

        res.json(departments);
    } catch (error) {
        console.error("Error fetching departments by industry:", error);
        res.status(500).json({ error: "Server error" });
    }
};


