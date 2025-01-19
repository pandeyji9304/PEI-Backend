const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: String,
  discountPercentage: Number,
  expirationDate: Date,
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model('Coupon', couponSchema);
