import mongoose from 'mongoose';

const configurationSchema = new mongoose.Schema({
  configId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  data: {
    type: [[String]], 
    required: true
  },
  remark: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Configuration', configurationSchema);