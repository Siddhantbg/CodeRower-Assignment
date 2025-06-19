// backend/restoreData.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const restoreAssignmentData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://development:X3TcC8tKnI5JINuR@betalive.9sakb.gcp.mongodb.net/database');
    
    console.log('📄 Connected to MongoDB');
    console.log('🔄 Restoring original assignment data...\n');
    
    // Restore the EXACT data from the PDF assignment
    const originalAssignmentData = {
      configId: 'qwertyuiop',
      data: [
        ['sym1', 'sym2', 'sym3'],
        ['sym4', 'sym6', 'sym8'],
        ['sym5', 'sym1', 'sym0']
      ],
      remark: 'Original assignment configuration',
      updatedAt: new Date()
    };
    
    // Update the qwertyuiop configuration with original data
    const result = await mongoose.connection.db.collection('configurations').replaceOne(
      { configId: 'qwertyuiop' },
      originalAssignmentData,
      { upsert: true }
    );
    
    if (result.modifiedCount > 0 || result.upsertedCount > 0) {
      console.log('✅ Successfully restored original assignment data');
    } else {
      console.log('ℹ️ Data was already correct');
    }
    
    // Verify the restoration
    const verified = await mongoose.connection.db.collection('configurations').findOne({ configId: 'qwertyuiop' });
    
    console.log('\n📋 Verified Restored Data:');
    console.log('==========================');
    console.log('ConfigId:', verified.configId);
    console.log('Data:', JSON.stringify(verified.data, null, 2));
    console.log('Remark:', verified.remark);
    
    console.log('\n🎯 This matches the PDF assignment requirements:');
    console.log('   Row 1: ["sym1", "sym2", "sym3"]');
    console.log('   Row 2: ["sym4", "sym6", "sym8"]');
    console.log('   Row 3: ["sym5", "sym1", "sym0"]');
    
    await mongoose.connection.close();
    console.log('\n✅ Assignment data restored successfully!');
    console.log('🚀 Now test your frontend - it should show the correct data');
    
  } catch (error) {
    console.error('❌ Error restoring data:', error);
  }
};

restoreAssignmentData();