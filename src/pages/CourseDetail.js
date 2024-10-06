import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const { courseId } = useParams();
    fetch(`/api/courses/${courseId}`)
      .then(response => response.json())
      .then(data => setCourseDetails(data))
      .catch(error => console.error('Error fetching course details:', error));
  }, []);


  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/courses/${courseId}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{course.title}</h1>
      <p><strong>Description:</strong> {course.description}</p>
      <p><strong>Subject Area:</strong> {course.subjectArea}</p>
      <p><strong>Credits:</strong> {course.credits}</p>
    </div>
  );
};

export default CourseDetails;
