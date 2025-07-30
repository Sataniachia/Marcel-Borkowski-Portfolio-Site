import Contact from '../models/Contact.js';
import { validationResult } from 'express-validator';

/**
 * Contact Controller
 * Handles all CRUD operations for contacts
 */

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Public
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to fetch contacts',
      error: error.message
    });
  }
};

// @desc    Get single contact by ID
// @route   GET /api/contacts/:id
// @access  Public
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to fetch contact',
      error: error.message
    });
  }
};

// @desc    Create new contact
// @route   POST /api/contacts
// @access  Public
export const createContact = async (req, res) => {
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

    const { firstname, lastname, email, message, phone } = req.body;
    
    // Create new contact
    const newContact = new Contact({
      firstname,
      lastname,
      email,
      message,
      phone
    });
    
    const savedContact = await newContact.save();
    
    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      data: savedContact
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    
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
      message: 'Server Error: Unable to create contact',
      error: error.message
    });
  }
};

// @desc    Update contact by ID
// @route   PUT /api/contacts/:id
// @access  Public
export const updateContact = async (req, res) => {
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

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID format'
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
      message: 'Server Error: Unable to update contact',
      error: error.message
    });
  }
};

// @desc    Delete contact by ID
// @route   DELETE /api/contacts/:id
// @access  Public
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to delete contact',
      error: error.message
    });
  }
};

// @desc    Delete all contacts
// @route   DELETE /api/contacts
// @access  Public (should be protected in production)
export const deleteAllContacts = async (req, res) => {
  try {
    const result = await Contact.deleteMany({});
    
    res.status(200).json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} contacts`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error deleting all contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to delete all contacts',
      error: error.message
    });
  }
};
