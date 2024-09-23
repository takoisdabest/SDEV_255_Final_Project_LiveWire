import React, { useState } from 'react';
import { registerStudent } from '../services/api';

const Register = () => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerStudent(student).then(() => {
      alert('Registration successful');
      setStudent({ name: '', email: '', password: '' });
    });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={student.name} onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" value={student.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={student.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;