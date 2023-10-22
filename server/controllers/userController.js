const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user._id, name: user.name }, secretKey, {
      expiresIn: '1h',
    });

    // Return the token and user's name in the response
    res
      .status(200)
      .json({ message: 'Login successful', token, name: user.name });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, name: newUser.name },
      secretKey,
      { expiresIn: '1h' }
    );

    return res.status(201).json({ message: 'Registration successful', token });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  login,
  register,
};
