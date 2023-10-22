const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
