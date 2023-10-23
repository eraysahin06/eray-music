import React from 'react';
import Navbar from './Navbar';
import Songs from './Songs';
import TopHome from './TopHome';

const Home = () => {
  return (
    <div>
      <Navbar />
      <TopHome />
      <div className="p-4">
        <Songs />
      </div>
    </div>
  );
};

export default Home;
