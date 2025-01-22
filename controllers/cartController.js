const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add to Cart Function
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;
  console.log(userId);

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

// Fetch Cart Function
const fetchCart = async (req, res) => {
  const userId = req.user.id;
  

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const populatedItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (product) {
          return {
            productId: item.productId,
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: item.quantity,
            total: item.quantity * product.price,
          };
        } else {
          return {
            productId: item.productId,
            name: 'Unknown Product',
            description: null,
            price: 0,
            quantity: item.quantity,
            total: 0,
          };
        }
      })
    );

    const totalAmount = populatedItems.reduce((sum, item) => sum + item.total, 0);

    res.json({ items: populatedItems, totalAmount });
  } catch (err) {
    console.error('Error fetching cart:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Cart Item Function
const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body; // `quantity` should be updated to a new value
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity === 0) {
      // Remove the item from the cart if quantity is 0
      cart.items.splice(itemIndex, 1);
    } else {
      // Update the item quantity
      cart.items[itemIndex].quantity = quantity;
    }

    // Recalculate total amount
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
    console.error('Error updating cart item:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Cart Item Function
const deleteCartItem = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Recalculate total amount
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
    console.error('Error deleting cart item:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addToCart, fetchCart, updateCartItem, deleteCartItem };
