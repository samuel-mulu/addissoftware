import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router

const Nav = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/songs">Songs</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
