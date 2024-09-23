import React, { useState } from 'react';
import { loginStudent } from '../services/api';

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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;