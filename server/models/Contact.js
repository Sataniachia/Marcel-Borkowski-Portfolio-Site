import mongoose from 'mongoose';

/**
 * Contact Schema for storing contact form submissions
 * Assignment Requirements - Fields: firstname, lastname, email, message
 */
const contactSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters'],
    minlength: [10, 'Message must be at least 10 characters long']
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Create indexes for better query performance
contactSchema.index({ email: 1 });
contactSchema.index({ createdAt: -1 });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
