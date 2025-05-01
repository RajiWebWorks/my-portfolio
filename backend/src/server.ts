import app from './app';
import dotenv from 'dotenv';
import connectDB from './config/database';
import cors from 'cors';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Enhanced CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://my-portfolio-gules-theta-99.vercel.app',
    'https://my-portfolio-vqy5.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
};

startServer();