const mongoose = require("mongoose");

const categoryPanelSchema = new mongoose.Schema({
  women: {
    image: { type: String, required: true }
  },
  men: {
    image: { type: String, required: true }
  },
  children: {
    image: { type: String, required: true }
  },
  teenager: {
    image: { type: String, required: true }
  }
}, { timestamps: true });

module.exports = mongoose.model("CategoryPanel", categoryPanelSchema);