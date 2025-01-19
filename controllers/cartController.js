const Cart = require('../models/Cart');
const Product = require('../models/Product');

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Extracted from authMiddleware

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex === -1) {
        cart.items.push({ productId, quantity });
      } else {
        cart.items[itemIndex].quantity += quantity;
      }
    }

    // Calculate total amount
    let totalAmount = 0;
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        totalAmount += item.quantity * product.price;
      }
    }
    cart.totalAmount = totalAmount;

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error('Error adding to cart:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addToCart };
