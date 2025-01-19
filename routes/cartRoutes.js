const express = require('express');
const { addToCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route for adding to cart (only authenticated users can access)
router.post('/', authMiddleware(), addToCart);

module.exports = router;
