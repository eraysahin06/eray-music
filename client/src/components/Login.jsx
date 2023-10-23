import React, { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email,
        password,
      };

      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        data
      );

      if (response.status === 200) {
        console.log('Login successful.');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.name);
        localStorage.setItem('userEmail', email);
        navigate('/');
      } else if (response.status === 401) {
        console.log('Incorrect password');
      } else if (response.status === 404) {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-lg w-80">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border rounded"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/register" className="w-full">
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full"
            '
                >
                  Create Account
                </button>
              </Link>

              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
