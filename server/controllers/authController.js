import User from '../models/User.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

/**
 * Auth Controller
 * Handles user signin and signout operations
 */

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

// @desc    Authenticate user & get token
// @route   POST /auth/signin
// @access  Public
export const signin = async (req, res) => {
  console.log('🔑 Signin attempt received:', {
    body: req.body ? 'present' : 'missing',
    email: req.body?.email ? 'present' : 'missing',
    timestamp: new Date().toISOString()
  });

  try {

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

// @desc    Authenticate user & get token (signin)
// @route   POST /auth/signin
// @access  Public
export const signin = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    
    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    res.status(200).json({
      success: true,
      message: 'Signin successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin || false,
        created: user.created,
        updated: user.updated
      }
    });
  } catch (error) {
    console.error('Error signing in user:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to sign in',
      error: error.message
    });
  }
};

// @desc    Sign out user (client-side token removal)
// @route   GET /auth/signout
// @access  Public
export const signout = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Signout successful'
    });
  } catch (error) {
    console.error('Error signing out user:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to sign out',
      error: error.message
    });
  }
};
