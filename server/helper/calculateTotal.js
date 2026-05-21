exports.calculateTotal = (cart) => {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};


exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
    .populate('items.product');

  res.json({ data: cart });
};


exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;

  let cart = await Cart.findOne({ user: req.user._id });

  cart.items = cart.items.filter(
    item => item.product.toString() !== productId
  );

  cart.totalPrice = await calculateTotal(cart);

  await cart.save();

  res.json({ data: cart });
};