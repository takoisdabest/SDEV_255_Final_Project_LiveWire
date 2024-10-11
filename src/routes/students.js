import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from '../models/student.js';
import Course from '../models/course.js';
import { auth, authorize } from '../middleware/auth.js';

const router = express.Router();

// Register a new student
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student with the hashed password
    const student = new Student({
      name,
      email,
      password: hashedPassword,
    });

    // Save the student to the database
    await student.save();

    // Generate JWT token
    const token = jwt.sign({ _id: student._id, role: student.role }, 'super_secret_secret');

    // Return the student and the token
    res.status(201).send({ student, token });
  } catch (error) {
    res.status(500).send({ error: 'Registration failed' });
  }
});

// Student login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const student = await Student.findOne({ email });

  if (!student || !await bcrypt.compare(password, student.password)) {
    return res.status(400).send({ error: 'Invalid login credentials' });
  }

  const token = jwt.sign({ _id: student._id, role: student.role }, 'super_secret_secret');

  student.tokens = student.tokens.concat({ token });
  await student.save();

  res.send({ student, token });
});

// Enroll in a course
router.post('/:id/enroll', auth, authorize(['student']), async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).send({ error: 'Course not found' });
  }
  
  // ensure that req.user._id is the student ID
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

// Remove a course from the student's shopping cart
router.delete('/:id/cart/:courseId', auth, authorize(['student']), async (req, res) => {
  const { courseId } = req.params;
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(404).send({ error: 'Student not found' });
  }

  // remove the course from the shopping cart
  student.shoppingCart.pull(courseId);
  await student.save();

  res.send(student.shoppingCart);
});


// Get student's shopping cart
router.get('/:id/cart', auth, authorize(['student']), async (req, res) => {
  const student = await Student.findById(req.params.id).populate('shoppingCart');
  if (!student) {
    return res.status(404).send({ error: 'Student not found' });
  }
  res.send(student.shoppingCart);
});

// add a course to the student's shopping cart
router.post('/:id/add-to-cart', auth, authorize(['student']), async (req, res) => {
  try {
    const course = await Course.findById(req.body.courseId);
    if (!course) {
      return res.status(404).send({ error: 'Course not found' });
    }

    // add course to student's shopping cart if not already in there
    if (!req.user.shoppingCart.includes(course._id)) {
      req.user.shoppingCart.push(course._id);
      await req.user.save();
    }

    res.send(req.user.shoppingCart);
  } catch (error) {
    res.status(500).send({ error: 'Unable to add course to cart' });
  }
});

// Enroll in all courses in the cart
router.post('/:id/checkout', auth, authorize(['student']), async (req, res) => {
  try {
    const student = req.user;

    // Move courses from shopping cart to enrolled courses
    student.shoppingCart.forEach(courseId => {
      if (!student.enrolledCourses.includes(courseId)) {
        student.enrolledCourses.push(courseId);
      }
    });

    // Clear shopping cart after enrollment
    student.shoppingCart = [];
    await student.save();

    res.send(student.enrolledCourses);
  } catch (error) {
    res.status(500).send({ error: 'Checkout failed' });
  }
});

// Get enrolled courses
router.get('/:id/enrolled-courses', auth, authorize(['student']), async (req, res) => {
  const student = await Student.findById(req.params.id).populate('enrolledCourses');
  if (!student) {
    return res.status(404).send({ error: 'Student not found' });
  }
  res.send(student.enrolledCourses);
});

export default router;
