import app from './app';
import dotenv from 'dotenv';
import connectDB from './config/database';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5000; // Default to 5000 if PORT not in .env

// Place CORS middleware BEFORE routes are defined and BEFORE starting the server
app.use(cors({
  origin: ['http://localhost:3000', 'https://my-portfolio-gules-theta-99.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

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