import React, { useState } from 'react';
import { registerTeacher } from '../services/api.js';
import { useNavigate } from 'react-router-dom'; 

const RegisterTeacher = () => {
  const [teacher, setTeacher] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerTeacher(teacher).then(() => {
      alert('Teacher registration successful');
      setTeacher({ name: '', email: '', password: '' });
      navigate('/login');
    });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Register Teacher</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={teacher.name} onChange={handleChange} placeholder="Name" required />

        <label>Email</label>
        <input type="email" name="email" value={teacher.email} onChange={handleChange} placeholder="Email" required />

        <label>Password</label>
        <input type="password" name="password" value={teacher.password} onChange={handleChange} placeholder="Password" required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterTeacher;
