import React from 'react';
import { Link } from 'react-router-dom';
import admins from '../admins';

const Navbar = () => {
  const userName = localStorage.getItem('userName');
  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    // Clear user-related data from local storage
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');

    // Refresh the page after logging out
    window.location.reload();
  };
  
  const isAdmin = admins.includes(userEmail);
  console.log('userEmail:', userEmail);
  console.log('admins:', admins);
  console.log('isAdmin:', isAdmin);

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Eray Music
        </Link>
        <ul className="flex space-x-4">
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
            <>
              <li>
                <Link to="/add-song" className="text-white">
                  + Add Song
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
