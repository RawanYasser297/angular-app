const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    logos: [
      {
        image: {
          type: String,
          required: true,
        },
        show: { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Brand", brandSchema);
