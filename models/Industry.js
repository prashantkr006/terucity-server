// models/Industry.js
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2"); // Import the plugin

const industrySchema = new mongoose.Schema({
  // Define your industry schema fields here
  name: String,
  // ...
});

// Apply the mongoose-paginate-v2 plugin to the schema
industrySchema.plugin(mongoosePaginate);

const Industry = mongoose.model("Industry", industrySchema);

module.exports = Industry;
