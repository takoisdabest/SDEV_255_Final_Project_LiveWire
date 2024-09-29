import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Teacher from '../models/teacher.js';

const router = express.Router();

// Add a new teacher
router.post('/', async (req, res) => {
  const teacher = new Teacher(req.body);
  await teacher.save();
  res.status(201).send(teacher);
});

// Get all teachers
router.get('/', async (req, res) => {
  const teachers = await Teacher.find();
  res.send(teachers);
});

// Get a specific teacher
router.get('/:id', async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  res.send(teacher);
});

// Update a teacher
router.put('/:id', async (req, res) => {
  const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(teacher);
});

// Delete a teacher
router.delete('/:id', async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
