const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;
app.use(cors());
const url = `mongodb+srv://eraysahinmoon:${process.env.MONGO_PW}@cluster0.v9hbbil.mongodb.net/?retryWrites=true&w=majority`;

const dbName = 'eray-music';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: dbName,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log(`Connected to MongoDB at ${url}`);
});

db.on('error', (err) => {
  console.error('MongoDB connection error: ', err);
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const secretKey = crypto.randomBytes(32).toString('hex');

app.post('/api/login', async (req, res) => {
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
});

app.post('/api/register', async (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
