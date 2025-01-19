const Product = require("../models/Product"); // Ensure you have the Product model imported

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, category, price, description, stock, specifications, images } = req.body;
    const product = new Product({ name, category, price, description, stock, specifications, images });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Update Request - Product ID:", id); // Log the ID

    const updates = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedProduct) {
      console.error("Product not found for ID:", id); // Log if product is not found
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Product updated successfully:", updatedProduct); // Log updated product details
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product", error });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Delete Request - Product ID:", id); // Log the ID

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      console.error("Product not found for ID:", id); // Log if product is not found
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Product deleted successfully:", deletedProduct); // Log deleted product details
    res.json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product", error });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
