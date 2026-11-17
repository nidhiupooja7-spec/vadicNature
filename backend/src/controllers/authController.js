import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register new user
// @route   POST /api/auth/register
export const registerUser = async (req, res, next) => {
  try {
    const { fullName, email, contact, password } = req.body;

    if (!fullName || !email || !contact || !password) {
      res.status(400);
      throw new Error('Please provide full name, email, contact, and password.');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists with this email.');
    }

    const user = await User.create({
      fullName,
      email,
      contact,
      password
    });

    if (user) {
      res.status(201).json({
        success: true,
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        contact: user.contact,
        token: generateToken(user._id)
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data.');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        contact: user.contact,
        token: generateToken(user._id)
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password.');
    }
  } catch (error) {
    next(error);
  }
};

