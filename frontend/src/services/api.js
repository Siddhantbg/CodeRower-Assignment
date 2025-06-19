import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
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
    return Promise.reject(error);
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
    const response = await api.get('/', { timeout: 2000 });
    return true;
  } catch (error) {
    return false;
  }
};

export default api;