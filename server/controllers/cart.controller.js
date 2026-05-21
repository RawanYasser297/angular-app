const User = require("../models/user");
const Product = require("../models/product");

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId);
    const { slug } = req.body;
    console.log(slug);

    // 🔍 هات المنتج بالـ slug
    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(userId);

    // 🔎 شوف موجود قبل كده ولا لا
    const existingItem = user.cart.find(
      (item) => item.product.toString() === product._id.toString(),
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({
        product: product._id,
        quantity: 1,
        price: product.price,
      });
    }

    await user.save();

    res.json({ data: user.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "cart.product",
      select: "title slug images price -_id",
    });

    const cart = user.cart.map((item) => ({
      product: {
        title: item.product.title,
        slug: item.product.slug,
        image: item.product.images[0],
        price: item.product.price,
      },
      quantity: item.quantity,
      price: item.price,
    }));

    res.status(200).json({ message: "data send", data: cart });
  } catch (error) {
    res.status(500).json({ message: "error", error: error });
  }
};

exports.removeFromCart = async (req, res) => {
  const { productSlug } = req.params;

  const product = await Product.findOne({ slug: productSlug });
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const user = await User.findById(req.user._id);

  user.cart = user.cart.filter(
    (item) => item.product.toString() !== product._id.toString(),
  );

  await user.save();

  res.json({ data: user.cart });
};

exports.updateQuantity = async (req, res) => {
  const { productSlug, quantity } = req.body;

  const product = await Product.findOne({ slug: productSlug });
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const user = await User.findById(req.user._id);

  const item = user.cart.find(
    (item) => item.product.toString() === product._id.toString(),
  );

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  item.quantity = quantity;

  if (item.quantity <= 0) {
    user.cart = user.cart.filter(
      (i) => i.product.toString() !== product._id.toString(),
    );
  }

  await user.save();

  res.json({ data: user.cart });
};

exports.clearCart = async (req, res) => {
  const user = await User.findById(req.user._id);

  user.cart = [];

  await user.save();

  res.json({ message: "Cart cleared" });
};
