const express = require('express');
const { placeOrder,getAllOrders } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware'); // Include authentication middleware
const router = express.Router();

// Place an order (authenticated users only)
router.post('/', authMiddleware(), placeOrder);

router.get('/',  getAllOrders);

module.exports = router;
