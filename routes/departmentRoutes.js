// routes/departmentRoutes.js
const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

// Create a new department
router.post("/create", departmentController.createDepartment);

// Get all Departments
router.get("/", departmentController.getAllDepartments);

// Get departments by industry
router.get("/byIndustry/:industryId", departmentController.getDepartmentsByIndustry);

module.exports = router;
