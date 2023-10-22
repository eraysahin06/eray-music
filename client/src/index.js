import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import ErrorPage from './components/error-page';
import About from './components/About';

// CSS
import './index.css';
import Login from './components/Login';
import Contact from './components/Contact';
import Register from './components/Register';
import AdminAddSong from './components/AdminAddSong';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/add-song',
    element: <AdminAddSong />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  <RouterProvider router={router} />
  //</React.StrictMode>
);
