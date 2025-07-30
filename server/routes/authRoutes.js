import express from 'express';
import {
  signin,
  signout
} from '../controllers/authController.js';
import {
  validateUserLogin
} from '../middleware/validation.js';

const router = express.Router();

/**
 * Authentication Routes
 * Handles user signin and signout
 */

// @route   POST /auth/signin
// @desc    Authenticate user & get token
// @access  Public
router.post('/signin', validateUserLogin, signin);

// @route   GET /auth/signout
// @desc    Sign out user (client-side token removal)
// @access  Public
router.get('/signout', signout);

export default router;
