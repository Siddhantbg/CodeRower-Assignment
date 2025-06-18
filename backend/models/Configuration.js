import mongoose from 'mongoose';

const ConfigurationSchema = new mongoose.Schema(
  {
    configurationId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    data: {
      type: [[String]],
      required: true
    },
    remark: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Configuration', ConfigurationSchema);