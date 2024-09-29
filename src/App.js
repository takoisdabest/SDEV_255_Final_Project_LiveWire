import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar.js'; 
import CourseList from './pages/CourseList.js';
import CourseDetail from './pages/CourseDetail.js';
import AddCourse from './pages/AddCourse.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import StudentDashboard from './pages/StudentDashboard.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Navbar*/}
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
