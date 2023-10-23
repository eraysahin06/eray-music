import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Card = ({ loggedIn, song }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(song.likeCount);

  const handleLikeClick = async () => {
    if (!liked) {
      try {
        // Send a POST request to like the song
        await axios.post(`http://localhost:5000/api/songs/like/${song._id}`);
        // Update the like count in the state
        setLikeCount(likeCount + 1);
      } catch (error) {
        console.error('Error liking the song: ', error);
      }
    } else {
      try {
        // Send a POST request to unlike the song
        await axios.post(`http://localhost:5000/api/songs/unlike/${song._id}`);
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
    <div className="max-w-md mx-auto bg-gray-200 rounded-xl shadow-md overflow-hidden p-4">
      <div className="p-8">
        <Link
          to="#"
          className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
        >
          {song.songName}
        </Link>
        <div className="mt-2">
          <iframe
            title={song.songName}
            key={song._id}
            width="100%"
            height="300"
            allow="autoplay"
            src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${song.soundCloudLink}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`}
          ></iframe>
        </div>
      </div>
      <p className="mt-2 text-gray-700">{song.description}</p>

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
  );
};

export default Card;
