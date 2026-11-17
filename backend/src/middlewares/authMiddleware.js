import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Verifies the Bearer token and attaches the user to req.user
export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Bearer ')) {
      res.status(401);
      throw new Error('Not authorized, no token.');
    }

    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.status(401);
      throw new Error('Not authorized, user not found.');
    }

    req.user = user;
    next();
  } catch (error) {
    if (!res.statusCode || res.statusCode === 200) res.status(401);
    next(error);
  }
};

// Must be used after protect
export const adminOnly = (req, res, next) => {
  if (req.user?.role === 'admin') {
    return next();
  }
  res.status(403);
  next(new Error('Admin access required.'));
};
