import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import errorHandler from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
import configurationsRoutes from './routes/configurations.js';
app.use('/api/configurations', configurationsRoutes);

// Error handling middleware
app.use(errorHandler);

// Set port and start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});