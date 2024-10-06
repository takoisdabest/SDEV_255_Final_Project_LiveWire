import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Retrieve token from localStorage
const getToken = () => localStorage.getItem('token');

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); 
  console.log("Sending token:", token); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;

}, (error) => Promise.reject(error));

// Login API
export const loginStudent = (credentials) => {
  return axios.post(`${API_URL}/students/login`, credentials);
};

// Fetch all courses
export const getCourses = () => {
  return axios.get(`${API_URL}/courses`);
};

export const fetchCourses = () => {
  return getCourses();
};

// Fetch a single course by ID
export const getCourse = (id) => {
  return axios.get(`${API_URL}/courses/${id}`);
};

// Add a new course
export const addCourse = (course) => {
  return axios.post(`${API_URL}/courses`, course);
};

// Register a new student
export const registerStudent = (student) => {
  return axios.post(`${API_URL}/students/register`, student);
};

// Enroll a student in a course
export const enrollCourse = (studentId, courseId) => {
  return axios.post(`${API_URL}/students/${studentId}/enroll`, { courseId });
};

// Drop a student from a course
export const dropCourse = (studentId, courseId) => {
  return axios.delete(`${API_URL}/students/${studentId}/drop`, { data: { courseId } });
};

// Fetch student's enrolled courses 
export const fetchStudentCourses = async (studentId) => {
  try {
    const response = await axios.get(`${API_URL}/students/${studentId}/enrolled-courses`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching student courses:', error);
    throw error; 
  }
};
