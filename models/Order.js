const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  shippingAddress: {
    addressLine1: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'] },
  paymentStatus: { type: String, enum: ['Pending', 'Completed'] },
  paymentMethod: String,
});

module.exports = mongoose.model('Order', orderSchema);
