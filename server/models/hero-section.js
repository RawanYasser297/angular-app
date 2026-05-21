const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  backgroundImage: String
}, { timestamps: true });

module.exports = mongoose.model("Hero", heroSchema);