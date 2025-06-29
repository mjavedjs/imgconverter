import axios from 'axios';
import API_CONFIG, { isApiKeyValid, isDoppelMeApiKeyValid, getErrorMessage } from '../config/api';

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
    // Use the centralized error message function
    const errorMessage = getErrorMessage(error);
    return Promise.reject(new Error(errorMessage));
  }
);

// Retry function with exponential backoff
const retryWithBackoff = async (fn, maxRetries = API_CONFIG.MAX_RETRIES) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Don't retry on client errors (4xx) except 429
      if (error.response?.status >= 400 && error.response?.status < 500 && error.response?.status !== 429) {
        throw error;
      }
      
      // Wait with exponential backoff
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// API functions
export const cartoonifyImage = async (imageFile) => {
  // Validate API key first
  if (!isApiKeyValid()) {
    throw new Error('Please add your DeepAI API key to the .env file');
  }

  const formData = new FormData();
  formData.append('image', imageFile);
  
  const makeRequest = async () => {
    const response = await api.post(API_CONFIG.DEEPAI_API_ENDPOINT, formData);
    return response.data;
  };

  try {
    return await retryWithBackoff(makeRequest);
  } catch (error) {
    // Ensure we always return a user-friendly error message
    throw new Error(getErrorMessage(error));
  }
};

// DoppelMe API functions
export const createDoppelMeAvatar = async (avatarId = 'DM1670714VMJWTG', styleId = '59') => {
  // Validate API key first
  if (!isDoppelMeApiKeyValid()) {
    throw new Error('Please add your RapidAPI key to the .env file');
  }

  const options = {
    method: 'PUT',
    url: `${API_CONFIG.DOPPELME_API_ENDPOINT}/${avatarId}/${styleId}`,
    headers: {
      'x-rapidapi-key': API_CONFIG.RAPIDAPI_KEY,
      'x-rapidapi-host': API_CONFIG.DOPPELME_API_HOST,
      'Content-Type': 'application/json'
    },
    data: {}
  };

  const makeRequest = async () => {
    const response = await axios.request(options);
    return response.data;
  };

  try {
    return await retryWithBackoff(makeRequest);
  } catch (error) {
    // Ensure we always return a user-friendly error message
    throw new Error(getErrorMessage(error));
  }
};

export const getDoppelMeAvatar = async (avatarId = 'DM1670714VMJWTG') => {
  // Validate API key first
  if (!isDoppelMeApiKeyValid()) {
    throw new Error('Please add your RapidAPI key to the .env file');
  }

  const options = {
    method: 'GET',
    url: `${API_CONFIG.DOPPELME_API_ENDPOINT}/${avatarId}`,
    headers: {
      'x-rapidapi-key': API_CONFIG.RAPIDAPI_KEY,
      'x-rapidapi-host': API_CONFIG.DOPPELME_API_HOST
    }
  };

  const makeRequest = async () => {
    const response = await axios.request(options);
    return response.data;
  };

  try {
    return await retryWithBackoff(makeRequest);
  } catch (error) {
    // Ensure we always return a user-friendly error message
    throw new Error(getErrorMessage(error));
  }
};

// Export the isApiKeyValid, isDoppelMeApiKeyValid, and getErrorMessage functions
export { isApiKeyValid, isDoppelMeApiKeyValid, getErrorMessage };

export default api; 