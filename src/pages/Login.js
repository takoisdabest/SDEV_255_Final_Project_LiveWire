import React, { useState } from 'react';
import { loginStudent } from '../services/api.js';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginStudent(credentials).then(response => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('studentId', response.data.student._id);
      alert('Login successful');
      window.location.href = '/dashboard'; // Redirect to dashboard
    });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="Email" required />
        
        <label>Password</label>
        <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" required />
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
