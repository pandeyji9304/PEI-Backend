const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  stock: Number,
  images: [String],
  specifications: {
    capacity: String,
    voltage: String,
    warranty: String,
  },
});

module.exports = mongoose.model('Product', productSchema);
