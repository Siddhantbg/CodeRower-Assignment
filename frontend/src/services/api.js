import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = 
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';
    
    return Promise.reject({ message });
  }
);

// API functions
export const fetchConfiguration = async (id) => {
  try {
    const response = await api.get(`/configurations/${id}`);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const updateConfiguration = async (id, remark) => {
  try {
    const response = await api.put(`/configurations/${id}`, { remark });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};