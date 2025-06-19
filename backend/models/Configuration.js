// backend/models/Configuration.js

import mongoose from 'mongoose';

const configurationSchema = new mongoose.Schema({
  configurationId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  data: {
    type: [[String]], // Array of Arrays of Strings (2D array)
    default: [
      ["sym1", "sym2", "sym3"],
      ["sym4", "sym6", "sym8"], 
      ["sym5", "sym1", "sym0"]
    ]
  },
  remark: {
    type: String,
    default: "",
    trim: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Create index for better performance
configurationSchema.index({ configurationId: 1 });

const Configuration = mongoose.model('Configuration', configurationSchema);

export default Configuration;