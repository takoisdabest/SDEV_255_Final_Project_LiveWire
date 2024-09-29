import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Web University</Link>
        <ul className="navbar-menu">
          <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><Link to="/add-course" className="navbar-link">Add Course</Link></li>
          <li><Link to="/register" className="navbar-link">Register</Link></li>
          <li><Link to="/login" className="navbar-link">Login</Link></li>
          <li><Link to="/dashboard" className="navbar-link">Dashboard</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
