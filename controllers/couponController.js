// couponController.js
const Coupon = require('../models/Coupon');

const applyCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    // Find the coupon by code
    const coupon = await Coupon.findOne({ code });
    
    // Check if coupon exists
    if (!coupon) {
      return res.status(400).json({ message: 'Invalid coupon code' });
    }

    // Check if coupon is expired
    if (coupon.expirationDate < new Date()) {
      return res.status(400).json({ message: 'Coupon expired' });
    }

    // If valid, return discount percentage
    res.json({ discountPercentage: coupon.discountPercentage });
  } catch (error) {
    console.error('Error applying coupon:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { applyCoupon };
