import express from 'express';
import Course from '../models/course.js';

const router = express.Router();

// Add a new course
router.post('/', async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.status(201).send(course);
});

// Get all courses
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.send(courses);
});

// Get a specific course
router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.send(course);
});

// Update a course
router.put('/:id', async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(course);
});

// Delete a course
router.delete('/:id', async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
