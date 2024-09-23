const jwt = require('jsonwebtoken');
const Teacher = require('../models/teacher');
const Student = require('../models/student');

const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  const decoded = jwt.verify(token, 'your_jwt_secret');
  const user = await Teacher.findOne({ _id: decoded._id, 'tokens.token': token }) || await Student.findOne({ _id: decoded._id, 'tokens.token': token });

  if (!user) {
    throw new Error();
  }

  req.token = token;
  req.user = user;
  next();
};

const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).send({ error: 'Access denied' });
  }
  next();
};

module.exports = { auth, authorize };