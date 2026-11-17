import express from 'express';
import {
  getMyProfile,
  updateMyProfile,
  deleteMyAccount,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Logged-in user routes
router
  .route('/me')
  .get(protect, getMyProfile)
  .put(protect, updateMyProfile)
  .delete(protect, deleteMyAccount);

// Admin routes
router.route('/').get(protect, adminOnly, getUsers);
router
  .route('/:id')
  .get(protect, adminOnly, getUserById)
  .put(protect, adminOnly, updateUser)
  .delete(protect, adminOnly, deleteUser);

export default router;
