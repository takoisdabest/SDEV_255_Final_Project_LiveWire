import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CourseRegistration = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await axios.post(`http://localhost:3000/api/students/${courseId}/enroll`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Enrolled in course successfully!');
      fetchCourses();
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('Unable to enroll in course.');
    }
  };

  return (
    <div>
      <h1>Register for Courses</h1>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            <Link to={`/course/${course._id}`}>{course.title}</Link>
            <button className="enroll-button" onClick={() => handleEnroll(course._id)}>Enroll</button>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseRegistration;
