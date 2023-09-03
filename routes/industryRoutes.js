// routes/industryRoutes.js
const express = require("express");
const router = express.Router();
const industryController = require('../controllers/IndustryController');

// Create a new industry
router.post("/create", industryController.createIndustry);

// Get all industries with pagination
router.get("/", industryController.getAllIndustries);

module.exports = router;
