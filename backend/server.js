// server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import configurationRoutes from './routes/configurations.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add root route for health check (fixes the 404 error)
app.get('/', (req, res) => {
  res.json({
    message: 'CodeRower Assignment API is running',
    status: 'OK',
    timestamp: new Date().toISOString(),
    endpoints: {
      'GET /api/configurations/:id': 'Fetch configuration data',
      'PUT /api/configurations/:id': 'Update configuration remark'
    }
  });
});

// API Routes
app.use('/api/configurations', configurationRoutes);

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    availableRoutes: [
      'GET /',
      'GET /api/configurations/:id',
      'PUT /api/configurations/:id'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});