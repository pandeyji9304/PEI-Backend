const Product = require('../models/Product');

const createProduct = async (req, res) => {
  const { name, category, price, description, stock, specifications, images } = req.body;
  const product = new Product({ name, category, price, description, stock, specifications, images });
  
  await product.save();
  res.status(201).json(product);
};

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

module.exports = { createProduct, getProducts };


