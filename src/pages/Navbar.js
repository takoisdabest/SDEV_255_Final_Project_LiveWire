import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('studentId');
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <img src="/logo.png" alt="Logo" className="navbar-logo" />
          <div className="college-name">Web University</div>
        </div>
        <ul className="navbar-menu">
          <li><Link to="/" className="navbar-link">About Us</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link to="/register-course" className="navbar-link">Register for a Course</Link></li>
              <li><Link to="/dashboard" className="navbar-link">Dashboard</Link></li>
              <li>
                <button className="navbar-link login-btn" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="navbar-link login-btn">Login</Link></li>
              <li><Link to="/register" className="navbar-link login-btn">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
