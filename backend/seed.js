import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Configuration from './models/Configuration.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    // Clear existing data
    await Configuration.deleteMany({});

    // Create test configuration
    await Configuration.create({
      configurationId: 'qwertyuiop',
      data: [
        ['sym1', 'sym2', 'sym3'],
        ['sym4', 'sym6', 'sym8'],
        ['sym5', 'sym1', 'sym0']
      ],
      remark: ''
    });

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();