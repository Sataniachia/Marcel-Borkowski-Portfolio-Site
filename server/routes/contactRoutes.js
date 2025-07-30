import express from 'express';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  deleteAllContacts
} from '../controllers/contactController.js';
import { validateContact } from '../middleware/validation.js';

const router = express.Router();

/**
 * Contact Routes
 * All CRUD operations for contacts
 */

// @route   GET /api/contacts
// @desc    Get all contacts
// @access  Public
router.get('/', getAllContacts);

// @route   GET /api/contacts/:id
// @desc    Get contact by ID
// @access  Public
router.get('/:id', getContactById);

// @route   POST /api/contacts
// @desc    Create new contact
// @access  Public
router.post('/', validateContact, createContact);

// @route   PUT /api/contacts/:id
// @desc    Update contact by ID
// @access  Public
router.put('/:id', validateContact, updateContact);

// @route   DELETE /api/contacts/:id
// @desc    Delete contact by ID
// @access  Public
router.delete('/:id', deleteContact);

// @route   DELETE /api/contacts
// @desc    Delete all contacts
// @access  Public (should be protected in production)
router.delete('/', deleteAllContacts);

export default router;
