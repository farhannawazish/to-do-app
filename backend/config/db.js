import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/to-do-app';
  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB (${uri}): ${error.message}`);
    // If Atlas failed (e.g. IP whitelist issue), try falling back to local MongoDB
    if (!uri.includes('127.0.0.1') && !uri.includes('localhost')) {
      try {
        console.log('Attempting fallback to local MongoDB (mongodb://127.0.0.1:27017/to-do-app)...');
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/to-do-app', { serverSelectionTimeoutMS: 3000 });
        console.log(`MongoDB Connected (local fallback): ${conn.connection.host}`);
        return;
      } catch (localError) {
        console.error(`Local MongoDB fallback failed: ${localError.message}`);
      }
    }
    process.exit(1);
  }
};

