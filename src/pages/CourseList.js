import React, { useEffect, useState } from 'react';
import { getCourses } from '../services/api';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses().then(response => setCourses(response.data));
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            <a href={`/courses/${course._id}`}>{course.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;