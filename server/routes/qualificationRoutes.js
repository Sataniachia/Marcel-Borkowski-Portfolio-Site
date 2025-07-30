import express from 'express';
import {
  getAllQualifications,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualification,
  deleteAllQualifications
} from '../controllers/qualificationController.js';
import { validateQualification } from '../middleware/validation.js';

const router = express.Router();

/**
 * Qualification Routes (Education)
 * All CRUD operations for qualifications
 */

// @route   GET /api/qualifications
// @desc    Get all qualifications
// @access  Public
router.get('/', getAllQualifications);

// @route   GET /api/qualifications/:id
// @desc    Get qualification by ID
// @access  Public
router.get('/:id', getQualificationById);

// @route   POST /api/qualifications
// @desc    Create new qualification
// @access  Public
router.post('/', validateQualification, createQualification);

// @route   PUT /api/qualifications/:id
// @desc    Update qualification by ID
// @access  Public
router.put('/:id', validateQualification, updateQualification);

// @route   DELETE /api/qualifications/:id
// @desc    Delete qualification by ID
// @access  Public
router.delete('/:id', deleteQualification);

// @route   DELETE /api/qualifications
// @desc    Delete all qualifications
// @access  Public (should be protected in production)
router.delete('/', deleteAllQualifications);

export default router;
