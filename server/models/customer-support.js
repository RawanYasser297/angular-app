const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema({
  title: String,
  description: String,
  email: String,
  phone: String
}, { timestamps: true });

module.exports = mongoose.model("Support", supportSchema);