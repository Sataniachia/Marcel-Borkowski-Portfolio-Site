import Project from '../models/Project.js';
import { validationResult } from 'express-validator';

/**
 * Project Controller
 * Handles all CRUD operations for projects
 */

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ completion: -1 });
    
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to fetch projects',
      error: error.message
    });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to fetch project',
      error: error.message
    });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Public
export const createProject = async (req, res) => {
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

    const { 
      title, 
      firstname, 
      lastname, 
      email, 
      completion, 
      description,
      technologies,
      status,
      imageUrl,
      githubUrl,
      liveUrl
    } = req.body;
    
    // Create new project
    const newProject = new Project({
      title,
      firstname,
      lastname,
      email,
      completion,
      description,
      technologies,
      status,
      imageUrl,
      githubUrl,
      liveUrl
    });
    
    const savedProject = await newProject.save();
    
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: savedProject
    });
  } catch (error) {
    console.error('Error creating project:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: validationErrors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to create project',
      error: error.message
    });
  }
};

// @desc    Update project by ID
// @route   PUT /api/projects/:id
// @access  Public
export const updateProject = async (req, res) => {
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

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Error updating project:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID format'
      });
    }
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: validationErrors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to update project',
      error: error.message
    });
  }
};

// @desc    Delete project by ID
// @route   DELETE /api/projects/:id
// @access  Public
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: project
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to delete project',
      error: error.message
    });
  }
};

// @desc    Delete all projects
// @route   DELETE /api/projects
// @access  Public (should be protected in production)
export const deleteAllProjects = async (req, res) => {
  try {
    const result = await Project.deleteMany({});
    
    res.status(200).json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} projects`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error deleting all projects:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to delete all projects',
      error: error.message
    });
  }
};
