import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Teacher from '../models/teacher.js';

const router = express.Router();

// Register a new teacher
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the teacher's password before saving
    const hashedPassword = await bcrypt.hash(password, 8);

    const teacher = new Teacher({
      name,
      email,
      password: hashedPassword
    });

    await teacher.save();

    // Generate JWT token
    const token = jwt.sign({ _id: teacher._id, role: 'teacher' }, 'super_secret_secret', { expiresIn: '1h' });
    teacher.tokens = teacher.tokens.concat({ token });
    await teacher.save();

    res.status(201).send({ teacher, token });
  } catch (error) {
    res.status(400).send({ error: 'Failed to register teacher' });
  }
});

// Teacher login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res.status(400).send({ error: 'Invalid login credentials.' });
    }

    const isPasswordMatch = await bcrypt.compare(password, teacher.password);
    if (!isPasswordMatch) {
      return res.status(400).send({ error: 'Invalid login credentials.' });
    }

    // generate JWT token
    const token = jwt.sign({ _id: teacher._id, role: 'teacher' }, 'super_secret_secret', { expiresIn: '1h' });
    teacher.tokens = teacher.tokens.concat({ token });
    await teacher.save();

    res.send({ teacher, token });
  } catch (error) {
    res.status(400).send({ error: 'Login failed. Please check your email and password.' });
  }
});

// Get all teachers
router.get('/', async (req, res) => {
  const teachers = await Teacher.find();
  res.send(teachers);
});

// Get a specific teacher
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).send({ error: 'Teacher not found.' });
    }
    res.send(teacher);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch teacher.' });
  }
});

// Update a teacher
router.put('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!teacher) {
      return res.status(404).send({ error: 'Teacher not found.' });
    }
    res.send(teacher);
  } catch (error) {
    res.status(400).send({ error: 'Failed to update teacher.' });
  }
});

// Delete a teacher
router.delete('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).send({ error: 'Teacher not found.' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete teacher.' });
  }
});

export default router;
