// models/Position.js
const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
  name: String,
  industry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Industry",
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true
  },
  // Add other fields as needed
});

module.exports = mongoose.model("Position", positionSchema);
