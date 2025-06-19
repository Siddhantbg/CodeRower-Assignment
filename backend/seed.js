import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const configurationSchema = new mongoose.Schema({
  configId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  data: {
    type: [[String]],
    required: true,
    default: [
      ['sym1', 'sym2', 'sym3'],
      ['sym4', 'sym6', 'sym8'],
      ['sym5', 'sym1', 'sym0']
    ]
  },
  remark: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Configuration = mongoose.model('Configuration', configurationSchema);

const cleanAndSeedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(' Connected to MongoDB');
    
    console.log(' Cleaning existing data...');
    try {
      await Configuration.collection.drop();
      console.log(' Old configuration collection dropped');
    } catch (error) {
      if (error.code === 26) {
        console.log(' Collection does not exist, proceeding with fresh creation');
      } else {
        throw error;
      }
    }
    
    console.log(' Creating indexes...');
    await Configuration.createIndexes();
    console.log(' Indexes created successfully');
    
    console.log(' Seeding fresh data...');
    
    const testConfigurations = [
      {
        configId: 'qwertyuiop',
        data: [
          ['sym1', 'sym2', 'sym3'],
          ['sym4', 'sym6', 'sym8'],
          ['sym5', 'sym1', 'sym0']
        ],
        remark: 'Sample configuration for assignment testing'
      },
      {
        configId: 'test123',
        data: [
          ['a1', 'b2', 'c3'],
          ['d4', 'e5', 'f6'],
          ['g7', 'h8', 'i9']
        ],
        remark: 'Test configuration 1'
      },
      {
        configId: 'sample456',
        data: [
          ['x1', 'y2', 'z3'],
          ['p4', 'q5', 'r6'],
          ['s7', 't8', 'u9']
        ],
        remark: 'Test configuration 2'
      }
    ];
    
    const createdConfigs = await Configuration.insertMany(testConfigurations);
    console.log(` Successfully created ${createdConfigs.length} configurations`);
    
    console.log(' Verifying created data...');
    for (const config of testConfigurations) {
      const found = await Configuration.findOne({ configId: config.configId });
      if (found) {
        console.log(` Verified: ${config.configId} exists with data:`, found.data);
      } else {
        console.log(` Error: ${config.configId} not found`);
      }
    }
    
    console.log('\n Database seeding completed successfully!');
    console.log(' Available test configurations:');
    console.log('   - qwertyuiop (from assignment requirements)');
    console.log('   - test123 (additional test data)');
    console.log('   - sample456 (additional test data)');
    console.log('\n Test your API endpoints:');
    console.log('   GET  http://localhost:8080/api/configurations/qwertyuiop');
    console.log('   PUT  http://localhost:8080/api/configurations/qwertyuiop');
    
    await mongoose.connection.close();
    console.log('\n Database connection closed');
    process.exit(0);
    
  } catch (error) {
    console.error(' Error during database operation:', error);
    try {
      await mongoose.connection.close();
    } catch (closeError) {
      console.error(' Error closing connection:', closeError);
    }
    process.exit(1);
  }
};

cleanAndSeedData();