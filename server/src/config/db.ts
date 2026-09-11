import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/apartment_db';
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error('❌ MongoDB Connection Error Details:');
    console.error(`Message: ${error.message}`);
    if (error.code) console.error(`Code: ${error.code}`);
    process.exit(1);
  }
};