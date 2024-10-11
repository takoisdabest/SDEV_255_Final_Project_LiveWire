import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

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

  const handleAddToCart = async (courseId) => {
    try {
      const studentId = localStorage.getItem('studentId');
      await axios.post(`http://localhost:3000/api/students/${studentId}/add-to-cart`, { courseId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Course added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Unable to add course to cart.');
    }
  };

  return (
    <div className="course-registration-container">
      <h1>Register for Courses</h1>
      <ul className="course-list">
        {courses.map(course => (
          <li key={course._id} className="course-item">
            <div className="course-info">
              <Link to={`/course/${course._id}`} className="course-title">{course.title}</Link>
              <span className="course-description">{course.description}</span>
            </div>

            {/*Add icons created by Pixel perfect - Flaticon*/}
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
              alt="Add to Cart"
              className="plus-icon"
              title="Add to Cart"
              onClick={() => handleAddToCart(course._id)}
            />
          </li>
        ))}
      </ul>

      {localStorage.getItem('token') && (
        <div className="shopping-cart-link">
          <Link to="/shopping-cart">

            {/*Smart cart icons created by Freepik - Flaticon*/}
            <img
              src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
              alt="Shopping Cart"
              className="cart-icon"
              title="Go to Shopping Cart"
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default CourseRegistration;
