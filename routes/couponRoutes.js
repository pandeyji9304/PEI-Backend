const express = require('express');
const { applyCoupon } = require('../controllers/couponController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/apply',authMiddleware(), applyCoupon);

module.exports = router;
