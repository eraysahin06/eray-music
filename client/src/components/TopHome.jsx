import React from 'react';
import backgroundImage from '../assets/ErayTunes.png';

const TopHome = () => {
  const bannerStyle = {
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
  };

  const textStyle = {
    textAlign: 'center',
    fontSize: '1.5rem',
    padding: '20px',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  return (
    <div>
      <img src={backgroundImage} alt="ErayTunes Banner" style={bannerStyle} />
      <div style={textStyle}>
        Welcome to ErayTunes. Explore songs recorded and remixed by me.
      </div>
    </div>
  );
};

export default TopHome;
