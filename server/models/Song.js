const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  youtubeLink: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  songName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
