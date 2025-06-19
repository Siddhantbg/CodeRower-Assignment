// backend/models/Configuration.js

import mongoose from 'mongoose';

// Flexible schema that can work with company's existing data structure
const configurationSchema = new mongoose.Schema({
  // Multiple possible ID fields
  configId: {
    type: String,
    sparse: true // Allow multiple docs without this field
  },
  configurationId: {
    type: String,
    sparse: true // Allow multiple docs without this field
  },
  // Multiple possible data fields
  data: {
    type: mongoose.Schema.Types.Mixed, // Flexible type
    default: undefined
  },
  configuration: {
    type: mongoose.Schema.Types.Mixed,
    default: undefined
  },
  values: {
    type: mongoose.Schema.Types.Mixed,
    default: undefined
  },
  // Remark field
  remark: {
    type: String,
    default: ""
  }
}, {
  timestamps: true,
  strict: false, // Allow additional fields from company's DB
  collection: 'configurations'
});

const Configuration = mongoose.model('Configuration', configurationSchema);

export default Configuration;