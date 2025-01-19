const express = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create a product, only accessible by admins
router.post('/', authMiddleware('admin'), createProduct); // Admin only

// Route to get all products, accessible by all users
router.get('/', getProducts); // All users

router.put("/products/:id", authMiddleware('admin'),updateProduct); // Update a product by ID
router.delete("/products/:id", authMiddleware('admin'), deleteProduct); // Delete a product by ID


module.exports = router;
