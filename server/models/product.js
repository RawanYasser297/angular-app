const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    description: { type: String },
    category: { type: String, required: true , enum: ["women", "men", "teenager","children"]},
    stock: { type: Number, default: 0 },
    session:{ type: String, required: true , enum: ["summer", "winter", "spring","autumn"]},
    slug: { type: String, unique: true, required: true },
    status: {
      type: String,
      enum: ["inStock", "lowStock", "outOfStock"],
    },
  },
  { timestamps: true },

);


const Product = mongoose.model("Product", productSchema);

module.exports = Product;
