import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';

const Songs = () => {
  const userName = localStorage.getItem('userName');
  const [loggedIn, setLoggedIn] = useState(false);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/songs')
      .then((response) => {
        setSongs(response.data.songs);
      })
      .catch((error) => {
        console.error('Error fetching songs: ', error);
      });
  }, []);

  useEffect(() => {
    if (userName) {
      setLoggedIn(true);
    }
  }, [userName]);

  // Group songs by genre
  const songsByGenre = {};
  songs.forEach((song) => {
    const genre = song.genre;
    if (!songsByGenre[genre]) {
      songsByGenre[genre] = [];
    }
    songsByGenre[genre].push(song);
  });

  return (
    <div>
      <div className="p-4">
        <div className="p-2 w-full text-center">
          <h4 className="text-2xl font-bold text-red-500">Warning</h4>
          <p>
            These songs may be played at a high volume, so please adjust your
            speakers accordingly.
          </p>
        </div>
        <hr />
        {Object.keys(songsByGenre).map((genre) => (
          <div key={genre}>
            <h2 className="p-2 text-3xl font-bold text-center my-4 text-blue-500">
              {genre}
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {songsByGenre[genre].map((song) => (
                <Card key={song._id} loggedIn={loggedIn} song={song} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Songs;
