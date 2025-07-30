import mongoose from 'mongoose';

/**
 * Qualification Schema for storing education/qualification information
 * Assignment Requirements - Fields: title, firstname, lastname, email, completion, description
 */
const qualificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Qualification title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  firstname: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  completion: {
    type: Date,
    required: [true, 'Completion date is required']
  },
  description: {
    type: String,
    required: [true, 'Qualification description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Create indexes for better query performance
qualificationSchema.index({ email: 1 });
qualificationSchema.index({ completion: -1 });

const Qualification = mongoose.model('Qualification', qualificationSchema);

export default Qualification;
