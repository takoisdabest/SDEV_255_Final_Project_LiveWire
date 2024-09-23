const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/college', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const courses = require('./routes/courses');
const teachers = require('./routes/teachers');
const students = require('./routes/students');

app.use('/api/courses', courses);
app.use('/api/teachers', teachers);
app.use('/api/students', students);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));