import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  subjectArea: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  enrolledStudents: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Student',
  },
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
