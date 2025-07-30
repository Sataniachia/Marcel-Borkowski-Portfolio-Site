import Qualification from '../models/Qualification.js';
import { validationResult } from 'express-validator';

/**
 * Qualification Controller
 * Handles all CRUD operations for qualifications (educations)
 */

// @desc    Get all qualifications
// @route   GET /api/qualifications
// @access  Public
export const getAllQualifications = async (req, res) => {
  try {
    const qualifications = await Qualification.find().sort({ completion: -1 });
    
    res.status(200).json({
      success: true,
      count: qualifications.length,
      data: qualifications
    });
  } catch (error) {
    console.error('Error fetching qualifications:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to fetch qualifications',
      error: error.message
    });
  }
};

// @desc    Get single qualification by ID
// @route   GET /api/qualifications/:id
// @access  Public
export const getQualificationById = async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    
    if (!qualification) {
      return res.status(404).json({
        success: false,
        message: 'Qualification not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: qualification
    });
  } catch (error) {
    console.error('Error fetching qualification:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid qualification ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to fetch qualification',
      error: error.message
    });
  }
};

// @desc    Create new qualification
// @route   POST /api/qualifications
// @access  Public
export const createQualification = async (req, res) => {
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
      institution,
      degree,
      grade,
      field,
      certificateUrl
    } = req.body;
    
    // Create new qualification
    const newQualification = new Qualification({
      title,
      firstname,
      lastname,
      email,
      completion,
      description,
      institution,
      degree,
      grade,
      field,
      certificateUrl
    });
    
    const savedQualification = await newQualification.save();
    
    res.status(201).json({
      success: true,
      message: 'Qualification created successfully',
      data: savedQualification
    });
  } catch (error) {
    console.error('Error creating qualification:', error);
    
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
      message: 'Server Error: Unable to create qualification',
      error: error.message
    });
  }
};

// @desc    Update qualification by ID
// @route   PUT /api/qualifications/:id
// @access  Public
export const updateQualification = async (req, res) => {
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

    const qualification = await Qualification.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!qualification) {
      return res.status(404).json({
        success: false,
        message: 'Qualification not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Qualification updated successfully',
      data: qualification
    });
  } catch (error) {
    console.error('Error updating qualification:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid qualification ID format'
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
      message: 'Server Error: Unable to update qualification',
      error: error.message
    });
  }
};

// @desc    Delete qualification by ID
// @route   DELETE /api/qualifications/:id
// @access  Public
export const deleteQualification = async (req, res) => {
  try {
    const qualification = await Qualification.findByIdAndDelete(req.params.id);
    
    if (!qualification) {
      return res.status(404).json({
        success: false,
        message: 'Qualification not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Qualification deleted successfully',
      data: qualification
    });
  } catch (error) {
    console.error('Error deleting qualification:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid qualification ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to delete qualification',
      error: error.message
    });
  }
};

// @desc    Delete all qualifications
// @route   DELETE /api/qualifications
// @access  Public (should be protected in production)
export const deleteAllQualifications = async (req, res) => {
  try {
    const result = await Qualification.deleteMany({});
    
    res.status(200).json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} qualifications`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error deleting all qualifications:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to delete all qualifications',
      error: error.message
    });
  }
};
