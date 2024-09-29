import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const getToken = () => localStorage.getItem('token');

axios.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getCourses = () => axios.get(`${API_URL}/courses`);
export const getCourse = (id) => axios.get(`${API_URL}/courses/${id}`);
export const addCourse = (course) => axios.post(`${API_URL}/courses`, course);
export const registerStudent = (student) => axios.post(`${API_URL}/students/register`, student);
export const loginStudent = (credentials) => axios.post(`${API_URL}/students/login`, credentials);
export const enrollCourse = (studentId, courseId) => axios.post(`${API_URL}/students/${studentId}/enroll`, { courseId });
export const dropCourse = (studentId, courseId) => axios.delete(`${API_URL}/students/${studentId}/drop`, { data: { courseId } });
export const getEnrolledCourses = (studentId) => axios.get(`${API_URL}/students/${studentId}/enrolled-courses`);

export const fetchCourses = () => getCourses(); 
export const fetchStudentCourses = async (studentId) => {
  try {
    const response = await axios.get(`${API_URL}/students/${studentId}/enrolled-courses`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching student courses:', error);
    throw error; 
  }
};
