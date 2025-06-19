import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://development:X3TcC8tKnI5JINuR@betalive.9sakb.gcp.mongodb.net/database', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error');
    process.exit(1);
  }
};

export default connectDB;