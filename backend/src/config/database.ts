import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Ensure environment variables are loaded

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error('Error: MONGODB_URI is not defined in the .env file');
    process.exit(1); // Exit if DB URI is missing
  }

  try {
    await mongoose.connect(mongoUri, {
      // useNewUrlParser: true, // Deprecated
      // useUnifiedTopology: true, // Deprecated
      // useCreateIndex: true, // Deprecated
      // useFindAndModify: false, // Deprecated
      // Mongoose 6+ handles these options by default
      serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
    });
    console.log('MongoDB Connected...');
  } catch (err: any) {
    console.error('MongoDB connection error:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB; 