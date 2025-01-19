const express = require('express');
const { placeOrder } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware'); // Include authentication middleware
const router = express.Router();

// Place an order (authenticated users only)
router.post('/', authMiddleware(), placeOrder);

module.exports = router;
