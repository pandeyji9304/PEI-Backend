const express = require('express');
const { createProduct, getProducts } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create a product, only accessible by admins
router.post('/', authMiddleware('admin'), createProduct); // Admin only

// Route to get all products, accessible by all users
router.get('/', getProducts); // All users

module.exports = router;
