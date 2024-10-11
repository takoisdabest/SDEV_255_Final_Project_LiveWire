import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar.js';
import Index from './pages/Index.js';
import CourseDetail from './pages/CourseDetail.js';
import AddCourse from './pages/AddCourse.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import StudentDashboard from './pages/StudentDashboard.js';
import CourseRegistration from './pages/CourseRegistration.js';
import ShoppingCart from './pages/ShoppingCart.js'; 
import TeacherLogin from './pages/TeacherLogin.js'; 
import RegisterTeacher from './pages/RegisterTeacher.js';
import CourseList from './pages/CourseList.js'; 
import EditCourse from './pages/EditCourse.js'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/register-course" element={<CourseRegistration />} />
          <Route path="/courselist" element={<CourseList />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/register-teacher" element={<RegisterTeacher />} />
          <Route path="/edit-course/:courseId" element={<EditCourse />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
