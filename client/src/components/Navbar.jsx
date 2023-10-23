import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import admins from '../admins';
import { SiMusicbrainz } from 'react-icons/si';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userName = localStorage.getItem('userName');
  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    window.location.reload();
  };

  const isAdmin = admins.includes(userEmail);

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center relative">
        <Link
          to="/"
          className="text-white text-2xl font-bold flex flex-row justify-center align-center gap-3"
        >
          <SiMusicbrainz className="mt-1" /> <span>ErayTunes</span>
        </Link>
        <div className="md:hidden">
          {menuOpen ? (
            <FaTimes
              className="text-white text-2xl cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <FaBars
              className="text-white text-2xl cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link to="/about" className="text-white">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-white">
              Contact
            </Link>
          </li>
          {userName && token ? (
            <>
              <li>
                <span className="text-green-500 font-bold">{userName}</span>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  type="button"
                  className="bg-red-500 border border-red-700 hover:bg-red-700 px-2 text-white font-bold rounded"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="bg-blue-500 border border-blue-700 hover-bg-blue-700 text-white font-bold py-2 px-2 rounded"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-gray-500 border border-gray-700 hover-bg-gray-700 text-white font-bold py-2 px-2 rounded"
                >
                  Register
                </Link>
              </li>
            </>
          )}
          {isAdmin && (
            <li>
              <Link to="/add-song" className="text-white">
                + Add Song
              </Link>
            </li>
          )}
        </ul>
        <div
          className={`${
            menuOpen
              ? 'w-40 transform translate-x-0 transition-all duration-300'
              : 'w-0 transform translate-x-40 transition-all duration-300'
          } md:hidden absolute top-16 right-0 bg-blue-500 p-4 flex flex-col space-y-2 list-none`}
        >
          <li>
            <Link
              to="/about"
              className="text-white"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-white"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
          {userName && token ? (
            <>
              <li>
                <span className="text-green-500 font-bold">{userName}</span>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  type="button"
                  className="bg-red-500 border border-red-700 hover:bg-red-700 px-2 text-white font-bold rounded"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="bg-blue-500 border border-blue-700 hover-bg-blue-700 text-white font-bold py-2 px-2 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-gray-500 border border-gray-700 hover-bg-gray-700 text-white font-bold py-2 px-2 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </li>
            </>
          )}
          {isAdmin && (
            <li>
              <Link
                to="/add-song"
                className="text-white"
                onClick={() => setMenuOpen(false)}
              >
                + Add Song
              </Link>
            </li>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
