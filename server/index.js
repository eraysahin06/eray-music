const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User');
const Song = require('./models/Song');

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const secretKey = crypto.randomBytes(32).toString('hex');

app.get('/api/songs', async (req, res) => {
  try {
    const songs = await Song.find({});
    return res.status(200).json({ songs });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

app.post('/api/songs', async (req, res) => {
  const { youtubeLink, songName, description, likeCount } = req.body;

  try {
    const newSong = new Song({
      youtubeLink,
      songName,
      description,
      likeCount,
    });

    const savedSong = await newSong.save();

    return res
      .status(201)
      .json({ message: 'Song created successfully', song: savedSong });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

app.post('/api/like/:songId', async (req, res) => {
  const { songId } = req.params;

  try {
    // Find the song by its ID
    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    // Increment the likeCount for the song
    song.likeCount += 1;
    await song.save();

    return res.status(200).json({ message: 'Song liked successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

app.post('/api/unlike/:songId', async (req, res) => {
  const { songId } = req.params;

  try {
    // Find the song by its ID
    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    // Decrement the likeCount for the song (make sure it doesn't go below 0)
    song.likeCount = Math.max(0, song.likeCount - 1);
    await song.save();

    return res.status(200).json({ message: 'Song unliked successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

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
