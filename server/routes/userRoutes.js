import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUser
} from '../controllers/userController.js';
import {
  validateUserRegistration,
  validateUserLogin,
  validateUserUpdate
} from '../middleware/validation.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

/**
 * User Routes
 * Authentication and user management
 */

// @route   POST /api/users/register
// @desc    Register new user
// @access  Public
router.post('/register', validateUserRegistration, registerUser);

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', validateUserLogin, loginUser);

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, getUserProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, validateUserUpdate, updateUserProfile);

// @route   GET /api/users
// @desc    Get all users (Admin only)
// @access  Private/Admin
router.get('/', protect, admin, getAllUsers);

// @route   GET /api/users/:id
// @desc    Get user by ID (Admin only)
// @access  Private/Admin
router.get('/:id', protect, admin, getUserById);

// @route   POST /api/users
// @desc    Create new user (Admin only)
// @access  Private/Admin
router.post('/', protect, admin, validateUserRegistration, registerUser);

// @route   PUT /api/users/:id
// @desc    Update user by ID (Admin only)
// @access  Private/Admin
router.put('/:id', protect, admin, validateUserUpdate, updateUserProfile);

// @route   DELETE /api/users/:id
// @desc    Delete user (Admin only)
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteUser);

export default router;
