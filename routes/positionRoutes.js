// routes/positionRoutes.js
const express = require("express");
const router = express.Router();
const positionController = require("../controllers/positionController");

// Create a new position
router.post("/create", positionController.createPosition);

// Get all positions with associated department and industry names
router.get("/", positionController.getAllPositions);

// Get positions by industry and department
router.get("/byIndustryAndDepartment/:industryId/:departmentId", positionController.getPositionsByIndustryAndDepartment);

module.exports = router;
