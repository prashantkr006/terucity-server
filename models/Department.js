// models/Department.js
const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: String,
  industry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Industry",
    required: true,
  },
  // Add other fields as needed
});

module.exports = mongoose.model("Department", departmentSchema);
