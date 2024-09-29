import React, { useEffect, useState } from 'react';
import { getCourse } from '../services/api.js';

const CourseDetail = ({ match }) => {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    getCourse(match.params.id).then(response => setCourse(response.data));
  }, [match.params.id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <h1>{course.name}</h1>
      <p>{course.description}</p>
      <p>Subject Area: {course.subjectArea}</p>
      <p>Credits: {course.credits}</p>
    </div>
  );
};

export default CourseDetail;