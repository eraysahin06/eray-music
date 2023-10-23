const Song = require('../models/Song');

const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find({});
    return res.status(200).json({ songs });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

const createSong = async (req, res) => {
  const { soundCloudLink, songName, description, likeCount, genre } = req.body;

  try {
    const newSong = new Song({
      soundCloudLink,
      songName,
      description,
      likeCount,
      genre,
    });

    const savedSong = await newSong.save();

    return res
      .status(201)
      .json({ message: 'Song created successfully', song: savedSong });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

const likeSong = async (req, res) => {
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
};

const unlikeSong = async (req, res) => {
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
};

const deleteSong = async (req, res) => {
  const { songId } = req.params;

  try {
    // Find the song by its ID
    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    // Delete the song
    await Song.findByIdAndDelete(songId);

    return res.status(200).json({ message: 'Song deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getAllSongs,
  createSong,
  likeSong,
  unlikeSong,
  deleteSong,
};
