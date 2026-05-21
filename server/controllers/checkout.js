const mongoose = require("mongoose");
const User = require("../models/user");
const Orders = require("../models/orders");
const Product = require("../models/product");

exports.checkout = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user.id;
    const { addressId, paymentMethod } = req.body;

    const user = await User.findById(userId).session(session);

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.cart || user.cart.length === 0) {
      throw new Error("Cart is empty");
    }

    const address = user.addresses.id(addressId);
    if (!address) {
      throw new Error("Invalid address");
    }

    // 🔥 نجيب كل المنتجات مرة واحدة (أفضل أداء)
    const productIds = user.cart.map((item) => item.product);

    const products = await Product.find({
      _id: { $in: productIds },
    }).session(session);

    // نحولهم لـ map عشان الوصول يبقى سريع
    const productMap = {};
    products.forEach((p) => {
      productMap[p._id] = p;
    });

    // ✅ validation + update
    for (const item of user.cart) {
      const product = productMap[item.product];

      if (!product) throw new Error("Product not found");

      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for ${product.title}`);
      }

      // تحديث السعر
      if (product.price !== item.price) {
        item.price = product.price;
      }

      // 🔥 خصم من الـ stock
      product.stock -= item.quantity;
      await product.save({ session });
    }

    // 💰 حساب الإجمالي
    const totalPrice = user.cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    // 📦 إنشاء الأوردر
    const order = await Orders.create(
      [
        {
          user: user._id,
          items: user.cart,
          totalPrice,
          shippingAddress: address,
          paymentMethod: paymentMethod || "cash",
        },
      ],
      { session }
    );

    // 🧹 تفريغ الكارت
    user.cart = [];
    await user.save({ session });

    // ✅ تأكيد العملية
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Order placed successfully",
      order: order[0],
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      message: "Checkout failed",
      error: error.message,
    });
  }
};