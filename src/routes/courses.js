import express from 'express';
import Course from '../models/course.js';
import { auth, authorize } from '../middleware/auth.js';

const router = express.Router();

// Add new course (restricted to teachers)
router.post('/', auth, authorize(['teacher']), async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).send(course);
  } catch (error) {
    res.status(400).send({ error: 'Failed to add course' });
  }
});

// Edit course (restricted to teachers)
router.put('/:id', auth, authorize(['teacher']), async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) {
      return res.status(404).send({ error: 'Course not found' });
    }
    res.send(course);
  } catch (error) {
    res.status(400).send({ error: 'Failed to update course' });
  }
});

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.send(courses);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch courses' });
  }
});

// Get a specific course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send({ error: 'Course not found' });
    }
    res.send(course);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch course' });
  }
});

// Delete a course by ID (restricted to teachers)
router.delete('/:id', auth, authorize(['teacher']), async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).send({ error: 'Course not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete course' });
  }
});

export default router;
