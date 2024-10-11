import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const CourseList = () => {
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

  return (
    <div className="course-list-container">
      <h1>Course List</h1>
      <ul className="course-list">
        {courses.map(course => (
          <li key={course._id} className="course-item">
            <div className="course-info">
              <Link to={`/course/${course._id}`} className="course-title">{course.title}</Link>
              <span className="course-description">{course.description}</span>
            </div>

            {/* Modify icons created by Freepik - Flaticon*/}
            <Link
              to={`/edit-course/${course._id}`}
              title="Edit Course"
              className="edit-icon"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/2356/2356780.png"
                alt="Edit Course"
                className="edit-icon"
              />
            </Link>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
