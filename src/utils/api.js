import axios from 'axios';
import API_CONFIG, { isApiKeyValid } from '../config/api';

// Create axios instance with default config
const api = axios.create({
  timeout: API_CONFIG.REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add API key to all requests
    config.headers['Api-Key'] = API_CONFIG.DEEPAI_API_KEY;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = 'An unexpected error occurred.';
    
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 400:
          errorMessage = 'Invalid request. Please check your image file.';
          break;
        case 401:
          errorMessage = 'API key is invalid or expired.';
          break;
        case 403:
          errorMessage = 'Access denied. Please check your API key.';
          break;
        case 429:
          errorMessage = 'Rate limit exceeded. Please try again later.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = `Server error (${error.response.status}). Please try again.`;
      }
    } else if (error.request) {
      // Network error
      errorMessage = 'Network error. Please check your internet connection.';
    } else {
      // Other error
      errorMessage = error.message || 'An unexpected error occurred.';
    }
    
    return Promise.reject(new Error(errorMessage));
  }
);

// API functions
export const cartoonifyImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await api.post(API_CONFIG.DEEPAI_API_ENDPOINT, formData);
  return response.data;
};

// Export the isApiKeyValid function
export { isApiKeyValid };

export default api; 