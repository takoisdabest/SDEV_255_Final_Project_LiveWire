import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; 
import { Link } from 'react-router-dom';
import { dropCourse } from '../services/api.js';

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const fetchEnrolledCourses = async () => {
    try {
      const studentId = localStorage.getItem('studentId');
      const response = await axios.get(`http://localhost:3000/api/students/${studentId}/enrolled-courses`);
      setEnrolledCourses(response.data);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      alert('Unable to fetch enrolled courses.');
    }
  };

  const handleDropCourse = async (courseId) => {
    try {
      await dropCourse(courseId); 
      setEnrolledCourses(prevCourses => prevCourses.filter(course => course._id !== courseId)); 
      alert('Course dropped successfully!');
    } catch (error) {
      console.error('Error dropping course:', error);
      alert('Unable to drop the course.');
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  return (
    <div className="course-registration-container">
      <h1>Student Dashboard</h1>
      <ul className="course-list">
        {enrolledCourses.map(course => (
          <li key={course._id} className="course-item">
            <div className="course-info">
              <Link to={`/course/${course._id}`} className="course-title">{course.title}</Link>
              <span className="course-description">{course.description}</span>
            </div>
            
              {/*Delete icons created by Kiranshastry - Flaticon*/}
              <img
              src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
              alt="Delete"
              className="trash-icon"
              onClick={() => handleDropCourse(course._id)}
              title="Remove course"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
