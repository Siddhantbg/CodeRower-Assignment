export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const ROUTES = {
  HOME: '/',
  UPDATE: '/update',
};

export const TOAST_MESSAGES = {
  FETCH_SUCCESS: 'Configuration fetched successfully',
  FETCH_ERROR: 'Failed to fetch configuration',
  UPDATE_SUCCESS: 'Remark updated successfully',
  UPDATE_ERROR: 'Failed to update remark',
  VALIDATION_ERROR: 'Please fill in all required fields',
};

export const VALIDATION = {
  CONFIG_ID_REQUIRED: 'Configuration ID is required',
  REMARK_REQUIRED: 'Remark is required',
};