import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  deleteAllProjects
} from '../controllers/projectController.js';
import { validateProject } from '../middleware/validation.js';

const router = express.Router();

/**
 * Project Routes
 * All CRUD operations for projects
 */

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', getAllProjects);

// @route   GET /api/projects/:id
// @desc    Get project by ID
// @access  Public
router.get('/:id', getProjectById);

// @route   POST /api/projects
// @desc    Create new project
// @access  Public
router.post('/', validateProject, createProject);

// @route   PUT /api/projects/:id
// @desc    Update project by ID
// @access  Public
router.put('/:id', validateProject, updateProject);

// @route   DELETE /api/projects/:id
// @desc    Delete project by ID
// @access  Public
router.delete('/:id', deleteProject);

// @route   DELETE /api/projects
// @desc    Delete all projects
// @access  Public (should be protected in production)
router.delete('/', deleteAllProjects);

export default router;
