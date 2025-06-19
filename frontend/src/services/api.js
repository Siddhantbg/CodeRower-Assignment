import axios from 'axios';

const API_BASE_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_URL || 'process.env.VITE_API_URL'
  : 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    
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
    
    
    throw new Error(error.response?.data?.message || 'Network error. Please check your connection.');
  }
);


export const fetchConfiguration = async (id) => {
  try {
    const response = await api.get(`/configurations/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateConfiguration = async (id, remark) => {
  try {
    const response = await api.put(`/configurations/${id}`, { remark });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkBackendHealth = async () => {
  try {
    
    const baseURL = import.meta.env.PROD 
      ? import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://your-backend-url.onrender.com'
      : 'http://localhost:8080';
      
    await axios.get(baseURL, { timeout: 3000 });
    return true;
  } catch (error) {
    
    if (error.response && error.response.status) {
      return true;
    }
    
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      return false;
    }
    
    return true;
  }
};

export default api;