import React, { useEffect, useState } from 'react';
import { fetchCourses } from '../services/api.js';

const CourseList = () => {
  const [courses, setCourses] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await fetchCourses();
        setCourses(response.data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    loadCourses();
  }, []);

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>Error loading courses: {error}</div>;
  }

  return (
    <div>
      <h1>Course List</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.name}</li> 
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
