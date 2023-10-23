import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        name,
        email,
        password,
      };

      const response = await axios.post(
        'https://eray-music.vercel.app/api/users/register',
        data
      );

      if (response.status === 201) {
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        setRegistrationMessage('Registration successful.');
        navigate('/');
      } else if (response.status === 409) {
        setRegistrationMessage(
          'Email is already in use. Please use a different email.'
        );
      } else {
        setRegistrationMessage('Registration failed.');
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
          <h2 className="text-2xl font-semibold mb-4">Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border rounded"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            {registrationMessage && (
              <div className="text-red-500 mb-3">{registrationMessage}</div>
            )}
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="bg-blue-500 hover-bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
