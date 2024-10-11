import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; 
import { Link, useNavigate } from 'react-router-dom'; 

const ShoppingCart = () => {
  const [cartCourses, setCartCourses] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchCartCourses();
  }, []);

  const fetchCartCourses = async () => {
    try {
      const studentId = localStorage.getItem('studentId');
      const response = await axios.get(`http://localhost:3000/api/students/${studentId}/cart`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCartCourses(response.data);
    } catch (error) {
      console.error('Error fetching cart courses:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      const studentId = localStorage.getItem('studentId');
      await axios.post(`http://localhost:3000/api/students/${studentId}/checkout`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Courses purchased successfully!');
      fetchCartCourses(); 

      navigate('/dashboard');
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Checkout failed.');
    }
  };

  const handleRemoveFromCart = async (courseId) => {
    try {
      const studentId = localStorage.getItem('studentId');
      await axios.delete(`http://localhost:3000/api/students/${studentId}/cart/${courseId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Course removed from cart!');
      fetchCartCourses(); 
    } catch (error) {
      console.error('Error removing course from cart:', error);
      alert('Unable to remove course from cart.');
    }
  };

  return (
    <div className="course-registration-container">
      <h1>Your Cart</h1>
      <ul className="course-list"> 
        {cartCourses.map(course => (
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
              onClick={() => handleRemoveFromCart(course._id)}
              title="Remove course"
            />
          </li>
        ))}
      </ul>
      <button onClick={handleCheckout}>Purchase Courses</button>
    </div>
  );
};

export default ShoppingCart;
