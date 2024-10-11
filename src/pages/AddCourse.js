import React, { useState } from 'react';
import { addCourse } from '../services/api.js';

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    subjectArea: '',
    credits: 0
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCourse(course);
      alert('Course added successfully');
      setCourse({ title: '', description: '', subjectArea: '', credits: 0 });
    } catch (err) {
      console.error('Error adding course:', err.response?.data || err.message); 
      setError('Failed to add course. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add Course</h2>
      <form onSubmit={handleSubmit}>
        <label>Course Title</label>
        <input type="text" name="title" value={course.title} onChange={handleChange} placeholder="Course Title" required />

        <label>Description</label>
        <textarea name="description" value={course.description} onChange={handleChange} placeholder="Description" className="form-input textarea" required />

        <label>Subject Area</label>
        <input type="text" name="subjectArea" value={course.subjectArea} onChange={handleChange} placeholder="Subject Area" required />

        <label>Credits</label>
        <input type="number" name="credits" value={course.credits} onChange={handleChange} placeholder="Credits" required />

        {error && <p className="error-message">{error}</p>}
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
