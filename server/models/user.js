const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cartItemSchema = require("./cart-item");

const addressSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      trim: true,
      default: "Location",
    },
    addressLine: {
      type: String,
      required: true,
      trim: true,
    },
    placeId: {
      type: String,
      trim: true,
    },
  },
  { _id: true }
);

const phoneNumberSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      trim: true,
      default: "Phone",
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: true }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    addresses: [addressSchema],
    phoneNumbers: [phoneNumberSchema],
    cart: [cartItemSchema],
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

userSchema.methods.correctPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model("user", userSchema);
