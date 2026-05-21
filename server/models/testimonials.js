const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: String,

  message: {
    type: String,
    required: true
  },


  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  },

  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  reviewedAt: Date

}, { timestamps: true });

module.exports = mongoose.model("Testimonial", testimonialSchema);
