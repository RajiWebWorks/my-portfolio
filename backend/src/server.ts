import app from './app';
import dotenv from 'dotenv';
import connectDB from './config/database';

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5000; // Default to 5000 if PORT not in .env

const startServer = async () => {
  try {
    // Connect to Database
    await connectDB();

    // Start the HTTP server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server or connect to database:', error);
    process.exit(1); // Exit process with failure code
  }
};

startServer(); 