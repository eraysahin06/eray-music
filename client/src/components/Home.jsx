import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Card from './Card'; // Import the Card component
import axios from 'axios';

const Home = () => {
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

  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap justify-center gap-6">
        {songs.map((song) => (
          <Card key={song._id} loggedIn={loggedIn} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Home;
