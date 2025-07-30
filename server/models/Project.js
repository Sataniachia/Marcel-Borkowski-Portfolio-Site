import mongoose from 'mongoose';

/**
 * Project Schema for storing project information
 * Assignment Requirements - Fields: title, firstname, lastname, email, completion, description
 */
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
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
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Create indexes for better query performance
projectSchema.index({ email: 1 });
projectSchema.index({ completion: -1 });

const Project = mongoose.model('Project', projectSchema);

export default Project;
