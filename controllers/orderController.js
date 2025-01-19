const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Place an order (as before)
const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id; // Use req.user.id as the authenticated user's ID
    const { shippingAddress, paymentMethod } = req.body;

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Create a new order
    const order = new Order({
      userId,
      items: cart.items,
      totalAmount: cart.totalAmount,
      shippingAddress,
      paymentMethod,
      status: 'Pending',
      paymentStatus: 'Pending',
    });

    // Save the order and clear the cart
    await order.save();
    await Cart.deleteOne({ userId });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fetch all orders for a user
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders from the database

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { placeOrder, getAllOrders };
