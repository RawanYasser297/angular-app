const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  title: {
    type: String, // admin يكتبها
    required: true
  },
  subtitle: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Banner", bannerSchema);