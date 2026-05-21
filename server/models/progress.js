const mongoose = require("mongoose");



const progressSchema = new mongoose.Schema({
  internationalBrands:{ type: String, required: true, default: 0 },
  highQualityProducts:{ type: String, required: true, default: 0 },
  happyCustomers:{ type: String, required: true, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Progress", progressSchema);