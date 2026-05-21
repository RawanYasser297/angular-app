const mongoose = require("mongoose");

const siteSettingsSchema = new mongoose.Schema({
  logo: {
    type: String, // image URL
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("SiteSettings", siteSettingsSchema);