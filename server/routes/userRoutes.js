import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUser,
  deleteAllUsers,
  createUser
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
// @desc    Get all users
// @access  Private
router.get('/', protect, getAllUsers);

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', protect, getUserById);

// @route   POST /api/users
// @desc    Create new user
// @access  Private
router.post('/', protect, validateUserRegistration, createUser);

// @route   PUT /api/users/:id
// @desc    Update user by ID
// @access  Private
router.put('/:id', protect, validateUserUpdate, updateUserProfile);

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Private
router.delete('/:id', protect, deleteUser);

// @route   DELETE /api/users
// @desc    Delete all users
// @access  Private
router.delete('/', protect, deleteAllUsers);

export default router;
