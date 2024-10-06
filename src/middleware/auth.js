import jwt from 'jsonwebtoken';
import Teacher from '../models/teacher.js';
import Student from '../models/student.js';

// authenticate user with jwt
export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'super_secret_secret');

    const user = await Teacher.findById(decoded._id) || await Student.findById(decoded._id);

    if (!user) {
      throw new Error('Authentication failed.');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

// check user's role
export const authorize = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).send({ error: 'Access denied' });
  }
  next();
};
