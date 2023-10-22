import React from 'react';
import Navbar from './Navbar';

const Home = () => {
  const userName = localStorage.getItem('userName');

  return (
    <div>
      <Navbar />
      {userName && (
        // Only display the greeting if a user is logged in
        <p>Hello, {userName}</p>
      )}
    </div>
  );
};

export default Home;
