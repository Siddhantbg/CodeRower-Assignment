// models/Configuration.js
import mongoose from 'mongoose';

const configurationSchema = new mongoose.Schema({
  // Use configId as a custom string field instead of _id
  configId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  // The 2D array data as per assignment requirements  
  data: {
    type: [[String]], // Array of arrays of strings
    required: true
    // No default values - data must come from database
  },
  // Remark field for updates
  remark: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Configuration', configurationSchema);