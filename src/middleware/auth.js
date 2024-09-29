import jwt from 'jsonwebtoken';
import Teacher from '../models/teacher.js';
import Student from '../models/student.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await Teacher.findOne({ _id: decoded._id, 'tokens.token': token }) || await Student.findOne({ _id: decoded._id, 'tokens.token': token });

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

export const authorize = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).send({ error: 'Access denied' });
  }
  next();
};
