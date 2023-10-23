import React from 'react';
import Navbar from './Navbar';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import ErayPhoto from '../assets/ErayPhoto.png';

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white w-full sm:w-96 p-4 rounded shadow-xl">
          <div className="text-center">
            <img
              src={ErayPhoto}
              alt="Eray Sahin"
              className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-blue-600"
            />
            <h1 className="text-2xl font-bold mb-3">Eray Sahin</h1>
            <h2 className="text-xl font-bold text-blue-500 mb-2">About Me</h2>
            <p className="text-gray-600 mb-6">
              I create my musical compositions using <b>FL Studio</b> and
              <b> Logic Pro</b>, driven by my deep passion for music production.
              Simultaneously, my interest in software development fuels my drive
              to build innovative solutions and craft digital experiences. Music
              and technology together define my creative journey.
            </p>
            <div className="flex gap-x-3 justify-center items-center text-center mb-4">
              <a
                href="https://www.linkedin.com/in/eraysahin06/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-blue-500 text-2xl mb-1" />
                <p className="text-sm text-gray-600">LinkedIn</p>
              </a>
              <a
                href="https://github.com/eraysahin06"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-gray-700 text-2xl mb-1" />
                <p className="text-sm text-gray-600">GitHub</p>
              </a>
              <a
                href="https://eraysahin.ca"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGlobe className="text-purple-600 text-2xl mb-1" />
                <p className="text-sm text-gray-600">Website</p>
              </a>
            </div>
            <p className="text-gray-600">
              Connect with me on LinkedIn or explore my software development
              projects on GitHub. You can also visit my personal website to
              learn more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
