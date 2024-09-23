import React, { useEffect, useState } from 'react';
import { getCourses, enrollCourse, dropCourse, getEnrolledCourses } from '../services/api';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const studentId = 'logged-in-student-id'; // Replace with actual logged-in student ID

  useEffect(() => {
    // Fetch all courses
    getCourses().then(response => setCourses(response.data));

    // Fetch enrolled courses for the logged-in student
    getEnrolledCourses(studentId).then(response => setEnrolledCourses(response.data.map(course => course._id)));
  }, [studentId]);

  const handleEnroll = (courseId) => {
    enrollCourse(studentId, courseId).then(() => {
      alert('Enrolled successfully');
      setEnrolledCourses([...enrolledCourses, courseId]);
    });
  };

  const handleDrop = (courseId) => {
    dropCourse(studentId, courseId).then(() => {
      alert('Dropped successfully');
      setEnrolledCourses(enrolledCourses.filter(id => id !== courseId));
    });
  };

  return (
    <div>
      <h1>Student Dashboard</h1>
      <h2>Available Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            {course.name}
            {enrolledCourses.includes(course._id) ? (
              <button onClick={() => handleDrop(course._id)}>Drop</button>
            ) : (
              <button onClick={() => handleEnroll(course._id)}>Enroll</button>
            )}
          </li>
        ))}
      </ul>
      <h2>Enrolled Courses</h2>
      <ul>
        {enrolledCourses.map(courseId => {
          const course = courses.find(c => c._id === courseId);
          return course ? <li key={course._id}>{course.name}</li> : null;
        })}
      </ul>
    </div>
  );
};

export default StudentDashboard;