import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AdminAddSong = () => {
  const [soundCloudLink, setSoundCloudLink] = useState('');
  const [songName, setSongName] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('Phonk');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        soundCloudLink,
        songName,
        description,
        genre,
      };

      const response = await axios.post(
        'https://eray-music.vercel.app//api/songs',
        data
      );

      if (response.status === 201) {
        console.log('Song added successfully.');
        navigate('/'); // Redirect to the home page after adding the song.
      } else {
        console.log('Failed to add the song.');
        // Handle the error or display an error message if needed.
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-lg w-80">
          <h2 className="text-2xl font-semibold mb-4">Add New Song</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="soundCloudLink"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                SoundCloud Link (Track Number Only example: /track/[...])
              </label>
              <input
                type="text"
                id="soundCloudLink"
                className="w-full p-2 border rounded"
                placeholder="Enter the YouTube link"
                value={soundCloudLink}
                onChange={(e) => setSoundCloudLink(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="songName"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Song Name
              </label>
              <input
                type="text"
                id="songName"
                className="w-full p-2 border rounded"
                placeholder="Enter the song name"
                value={songName}
                onChange={(e) => setSongName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                className="w-full p-2 border rounded"
                placeholder="Enter a description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="genre"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Genre
              </label>
              <select
                id="genre"
                className="w-full p-2 border rounded"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="Phonk">Phonk</option>
                <option value="Remix">Remix</option>
                <option value="EDM">EDM</option>
                <option value="EDM (Remix)">EDM (Remix)</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full"
              >
                Add Song
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddSong;
