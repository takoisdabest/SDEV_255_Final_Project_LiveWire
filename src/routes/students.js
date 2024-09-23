const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Course = require('../models/course');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { auth, authorize } = require('../middleware/auth');

// Register a new student
router.post('/register', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  const token = jwt.sign({ _id: student._id }, 'your_jwt_secret');
  res.status(201).send({ student, token });
});

// Student login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const student = await Student.findOne({ email });
  if (!student || !await bcrypt.compare(password, student.password)) {
    return res.status(400).send({ error: 'Invalid login credentials' });
  }
  const token = jwt.sign({ _id: student._id }, 'your_jwt_secret');
  res.send({ student, token });
});

// Enroll in a course
router.post('/:id/enroll', auth, authorize(['student']), async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).send({ error: 'Course not found' });
  }
  course.enrolledStudents.push(req.user._id);
  await course.save();
  req.user.enrolledCourses.push(course._id);
  await req.user.save();
  res.send(course);
});

// Drop a course
router.delete('/:id/drop', auth, authorize(['student']), async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).send({ error: 'Course not found' });
  }
  course.enrolledStudents.pull(req.user._id);
  await course.save();
  req.user.enrolledCourses.pull(course._id);
  await req.user.save();
  res.send(course);
});

module.exports = router;
// Fetch enrolled courses for a student
router.get('/:id/enrolled-courses', auth, authorize(['student']), async (req, res) => {
  const student = await Student.findById(req.params.id).populate('enrolledCourses');
  if (!student) {
    return res.status(404).send({ error: 'Student not found' });
  }
  res.send(student.enrolledCourses);
});