const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { error } = require('winston');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  try {
    const { username,email, password, shopName, phone } = req.body;

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ msg: 'Username already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashed,
      shopName,
      phone
    });

    res.status(201).json({ msg: 'User registered successfully',user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error',ippaThappu_enna_na :err.message });
  }
};
