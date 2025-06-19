import axios from 'axios';

// Environment-based API URL configuration
const API_BASE_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_URL || 'process.env.VITE_API_URL'
  : 'http://localhost:8080/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for handling requests
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling responses
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle different error types
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Backend server is not running. Please start your backend server.');
    }
    
    if (error.response?.status === 404) {
      throw new Error('Configuration not found. Please check the configuration ID.');
    }
    
    if (error.response?.status === 500) {
      throw new Error('Server error. Please try again later.');
    }
    
    if (error.response?.status === 400) {
      throw new Error(error.response.data?.message || 'Invalid request. Please check your input.');
    }
    
    // Default error message
    throw new Error(error.response?.data?.message || 'Network error. Please check your connection.');
  }
);

// API Functions

// Fetch configuration data by ID
export const fetchConfiguration = async (id) => {
  try {
    const response = await api.get(`/configurations/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update configuration remark by ID
export const updateConfiguration = async (id, remark) => {
  try {
    const response = await api.put(`/configurations/${id}`, { remark });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Check if backend is healthy
export const checkBackendHealth = async () => {
  try {
    // Get base URL without /api for health check
    const baseURL = import.meta.env.PROD 
      ? import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://your-backend-url.onrender.com'
      : 'http://localhost:8080';
      
    await axios.get(baseURL, { timeout: 3000 });
    return true;
  } catch (error) {
    // If we get any HTTP response (even if it's an error), backend is running
    if (error.response && error.response.status) {
      return true;
    }
    // If we get network error, backend is not running
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      return false;
    }
    // For other errors, assume backend is running
    return true;
  }
};

export default api;