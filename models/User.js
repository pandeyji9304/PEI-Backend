const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  addresses: [
    {
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      phone: String,
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
