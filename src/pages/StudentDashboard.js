import React, { useEffect, useState } from 'react';
import { fetchStudentCourses } from '../services/api.js';

const StudentDashboard = () => {
  const [studentCourses, setStudentCourses] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const studentId = localStorage.getItem('studentId');
    console.log('Retrieved Student ID:', studentId); 
  
    const fetchCourses = async () => {
      if (studentId) {
        try {
          const data = await fetchStudentCourses(studentId);
          setStudentCourses(data);
        } catch (err) {
          console.error('Failed to fetch courses:', err);
          setError('Failed to load courses. Please try again.');
        } finally {
          setLoading(false);
        }
      } else {
        setError('No student ID found. Please log in again.');
        setLoading(false);
      }
    };
  
    fetchCourses();
  }, []);
  

  if (loading) {
    return <div>Loading courses...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className="list-container">
      <h2 className="dashboard-title">My Courses</h2>
      <ul>
        {studentCourses.map(course => (
          <li key={course._id} className="dashboard-item">
            <h3>{course.name}</h3>
            <button onClick={() => window.location.href = `/courses/${course._id}`}>Go to Course</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
