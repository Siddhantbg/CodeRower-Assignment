import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.data || error.message);
    
    // Handle different error types
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Backend server is not running. Please start your backend server on port 8080.');
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

/**
 * Fetch configuration data by ID
 * @param {string} configId - Configuration ID
 * @returns {Promise<Array>} 2D array of configuration data
 */
export const fetchConfiguration = async (configId) => {
  try {
    const response = await api.get(`/configurations/${configId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update configuration remark
 * @param {string} configId - Configuration ID
 * @param {string} remark - Remark text
 * @returns {Promise<Object>} Success message
 */
export const updateConfiguration = async (configId, remark) => {
  try {
    const response = await api.put(`/configurations/${configId}`, {
      remark: remark.trim()
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Health check for backend connection - use a simple ping approach
 * @returns {Promise<boolean>} Backend status
 */
export const checkBackendHealth = async () => {
  try {
    // Use a simple base URL check instead of calling a specific endpoint
    await axios.get('http://localhost:8080', { timeout: 3000 });
    return true;
  } catch (error) {
    // Check if we get any HTTP response (even if it's an error)
    if (error.response && error.response.status) {
      console.log('✅ Backend is running (got HTTP response)');
      return true;
    }
    // If we get network error, backend is not running
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      console.warn('❌ Backend not running:', error.message);
      return false;
    }
    // For other errors, assume backend is running
    console.warn('⚠️ Backend health check unclear, assuming running:', error.message);
    return true;
  }
};

export default api;