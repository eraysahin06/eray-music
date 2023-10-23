import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { RiDeleteBin6Line } from 'react-icons/ri'; // Import the delete icon from react-icons
import admins from '../admins';

const Card = ({ loggedIn, song }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(song.likeCount);

  const userEmail = localStorage.getItem('userEmail');

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

  const handleDeleteClick = async () => {
    try {
      // Send a DELETE request to delete the song
      await axios.delete(`http://localhost:5000/api/songs/${song._id}`);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting the song: ', error);
    }
  };

  // Determine whether the user is an admin
  const isAdmin = admins.includes(userEmail);

  return (
    <div className="max-w-sm mx-auto bg-gray-200 rounded-lg shadow-md overflow-hidden p-4">
      <div className="p-4">
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
            height="180" // Reduced the height
            allow="autoplay"
            src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${song.soundCloudLink}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`}
          ></iframe>
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
      {isAdmin && (
        <div
          className="p-4 text-red-500 cursor-pointer text-center"
          onClick={handleDeleteClick}
        >
          <RiDeleteBin6Line size={24} />
        </div>
      )}
    </div>
  );
};

export default Card;
