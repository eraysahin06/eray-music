const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// SONG ROUTES
const songRoutes = require('./routes/song');
app.use('/api/songs', songRoutes);

//USER ROUTES
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
