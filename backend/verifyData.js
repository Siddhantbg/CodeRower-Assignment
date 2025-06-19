import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const verifyDatabaseData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(' Connected to MongoDB for verification\n');
    
    const rawCollection = mongoose.connection.db.collection('configurations');
    
    console.log(' Raw MongoDB Documents:');
    console.log('=====================================');
    
    const allDocs = await rawCollection.find({}).toArray();
    
    allDocs.forEach((doc, index) => {
      console.log(`\n Document ${index + 1}:`);
      console.log(`   _id: ${doc._id}`);
      console.log(`   configId: ${doc.configId}`);
      console.log(`   data: ${JSON.stringify(doc.data)}`);
      console.log(`   remark: "${doc.remark}"`);
      console.log(`   createdAt: ${doc.createdAt}`);
      console.log(`   updatedAt: ${doc.updatedAt}`);
    });
    
    console.log('\n Specifically checking "qwertyuiop":');
    console.log('=====================================');
    
    const qwertyDoc = await rawCollection.findOne({ configId: 'qwertyuiop' });
    if (qwertyDoc) {
      console.log('✅ Found in database:');
      console.log(`   Current remark: "${qwertyDoc.remark}"`);
      console.log(`   Data: ${JSON.stringify(qwertyDoc.data)}`);
      console.log(`   Last updated: ${qwertyDoc.updatedAt}`);
      
      console.log('\n🕐 Timestamp Analysis:');
      console.log(`   Created: ${qwertyDoc.createdAt}`);
      console.log(`   Updated: ${qwertyDoc.updatedAt}`);
      
      if (qwertyDoc.updatedAt > qwertyDoc.createdAt) {
        console.log(' PROOF: Document has been updated after creation!');
        console.log('   This proves data is coming from MongoDB, not defaults.');
      }
    } else {
      console.log(' Document not found in database');
    }
    
    console.log('\n Let\'s modify the data to prove it\'s live:');
    console.log('=====================================');
    
    const testData = [
      ['LIVE', 'DATA', 'TEST'],
      ['FROM', 'MONGO', 'DB'],
      ['NOT', 'HARD', 'CODED']
    ];
    
    await rawCollection.updateOne(
      { configId: 'qwertyuiop' },
      { 
        $set: { 
          data: testData,
          remark: `Updated at ${new Date().toISOString()} to prove this is live data`,
          updatedAt: new Date()
        }
      }
    );
    
    console.log(' Updated qwertyuiop with test data');
    console.log(' New data:', JSON.stringify(testData));
    console.log('\n Now test your API:');
    console.log('   GET http://localhost:8080/api/configurations/qwertyuiop');
    console.log('   You should see the LIVE DATA TEST instead of sym1,sym2,sym3');
    
    await mongoose.connection.close();
    console.log('\n Database connection closed');
    
  } catch (error) {
    console.error(' Error:', error);
  }
};

verifyDatabaseData();