import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 
import courses from './src/routes/courses.js';
import students from './src/routes/students.js';
import teachers from './src/routes/teachers.js';

const app = express();


app.use(cors({
  origin: 'http://localhost:3001' 
}));

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/college')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use('/api/courses', courses);
app.use('/api/students', students);
app.use('/api/teachers', teachers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
