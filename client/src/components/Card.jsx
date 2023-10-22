import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Card = ({ loggedIn, song }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(song.likeCount);

  const handleLikeClick = async () => {
    if (!liked) {
      try {
        // Send a POST request to like the song
        await axios.post(`http://localhost:5000/api/like/${song._id}`);
        // Update the like count in the state
        setLikeCount(likeCount + 1);
      } catch (error) {
        console.error('Error liking the song: ', error);
      }
    } else {
      try {
        // Send a POST request to unlike the song
        await axios.post(`http://localhost:5000/api/unlike/${song._id}`);
        // Update the like count in the state
        setLikeCount(likeCount - 1);
      } catch (error) {
        console.error('Error unliking the song: ', error);
      }
    }

    // Toggle the liked state
    setLiked(!liked);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <Link
          to="#"
          className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
        >
          {song.songName}
        </Link>
        <div className="mt-2">
          <iframe
            width="100%"
            height="315"
            src={song.youtubeLink}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <p className="mt-2 text-gray-500">{song.description}</p>

        <div className="mt-4">
          {loggedIn && (
            <button
              onClick={handleLikeClick}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                liked ? 'bg-red-500' : ''
              }`}
            >
              {liked ? 'Unlike' : 'Like'}
            </button>
          )}

          <span className="ml-2 text-gray-600">{likeCount} Likes</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
