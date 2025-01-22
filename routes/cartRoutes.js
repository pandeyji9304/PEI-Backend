const express = require('express');
const { addToCart,fetchCart,updateCartItem, deleteCartItem } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route for adding to cart (only authenticated users can access)

router.get('/', authMiddleware(), fetchCart);
router.post('/add', authMiddleware(), addToCart);
router.put('/update', authMiddleware(),updateCartItem );
router.delete('/delete', authMiddleware(), deleteCartItem);

module.exports = router;
