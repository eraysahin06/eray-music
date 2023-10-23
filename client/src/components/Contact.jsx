import React from 'react';
import Navbar from './Navbar';

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white w-full sm:w-96 p-4 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <p className="text-gray-600 mb-4">
            Did you enjoy my songs or have any questions? Please feel free to
            get in touch with me.
          </p>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600 font-medium">
                Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded py-2 px-3"
                id="name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 font-medium"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded py-2 px-3"
                id="email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-600 font-medium"
              >
                Message
              </label>
              <textarea
                className="w-full border border-gray-300 rounded py-2 px-3"
                id="message"
                rows="5"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
