import React from 'react';
import Navbar from './Navbar';
import Songs from './Songs';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <Songs />
      </div>
    </div>
  );
};

export default Home;
