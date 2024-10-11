import React, { useState } from 'react';
import { loginTeacher } from '../services/api.js';

const TeacherLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginTeacher(credentials);
      localStorage.setItem('token', response.data.token);
      alert('Login successful');
      window.location.href = '/courselist';
    } catch (error) {
      setError('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Teacher Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default TeacherLogin;
