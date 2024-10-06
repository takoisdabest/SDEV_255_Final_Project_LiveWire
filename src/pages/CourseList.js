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

      <section className="about-campus">
        <h2>About Web University</h2>
        <p>Welcome to Web University! Our campus is known for its excellent academic programs and vibrant student life.</p>
        <div className="campus-showcase">
          <img src="/pexels-expressivestanley-1454360.jpg" alt="Campus Image 1" className="campus-image" />
          <img src="/pexels-luis-gomes-166706-546819.jpg" alt="Campus Image 2" className="campus-image" />
        </div>
      </section>
      <section className="about-us">
        <h2>Why Choose Web University?</h2>
        <p>
          Our college offers a variety of courses and programs focused on computer programming that will help students learn 
          and grow their skills, ensuring they are ready for the real-world challenges they will face. We offer hands-on learning 
          to give students the experience they need, industry connections with reputable companys, and faculty to guide you on 
          your own journey.
        </p>
        <ul>
          <li>Cutting-edge courses in web development and IT.</li>
          <li>Experienced teachers with real-world experience.</li>
          <li>Flexible learning schedules.</li>
          <li>State-of-the-art facilities and resources.</li>
          <li>Strong industry partnerships for your futre job.</li>
        </ul>
        <p>
          Whether you're just starting your journey with the world of technology or looking to advance your career, Web University
           is the perfect place to learn the skills you need to succeed.
        </p>
      </section>

      <section className="course-list">
        <h2>Our Courses</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>{course.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CourseList;
