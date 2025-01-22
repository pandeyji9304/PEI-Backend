const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Cart = require('../models/Cart');

// Register function to create a new user
const register = async (req, res) => {
  const { name, email, password, role } = req.body; // Accept role in the request body
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Default role to 'user' if not provided
  const userRole = role || 'user';

  const hashedPassword = await bcrypt.hash(password,12);
  const user = new User({ name, email, password: hashedPassword, role: userRole });
  const cart = new Cart({ userId: user._id, items: [], totalAmount: 0 });

  await user.save();

  const token = jwt.sign( { userId: user._id, role: user.role }, process.env.JWT_SECRET );

  res.status(201).json({ token });
};

// Login function to authenticate user
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);

  res.json({ token });
};

module.exports = { register, login };
