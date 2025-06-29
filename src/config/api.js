// API Configuration
export const API_CONFIG = {
  // DeepAI API Settings
  // ⚠️ IMPORTANT: You need to provide your own DeepAI API key
  // Get one from: https://deepai.org/
  DEEPAI_API_KEY: import.meta.env.VITE_DEEPAI_API_KEY || '',
  DEEPAI_API_ENDPOINT: 'https://api.deepai.org/api/toonify',
  
  // DoppelMe API Settings
  // ⚠️ IMPORTANT: You need to provide your own RapidAPI key
  // Get one from: https://rapidapi.com/
  RAPIDAPI_KEY: import.meta.env.VITE_RAPIDAPI_KEY || '68deefe93emshbcaf075f3a1a1cfp187d87jsn18efbe156976',
  DOPPELME_API_HOST: 'doppelme-avatars.p.rapidapi.com',
  DOPPELME_API_ENDPOINT: 'https://doppelme-avatars.p.rapidapi.com/avatar',
  
  // File upload settings
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  
  // Request settings
  REQUEST_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000, // 30 seconds
  MAX_RETRIES: parseInt(import.meta.env.VITE_MAX_RETRIES) || 3,
};

// Helper function to validate file
export const validateFile = (file) => {
  const errors = [];
  
  if (!file) {
    errors.push('No file selected');
    return errors;
  }
  
  if (!API_CONFIG.ALLOWED_FILE_TYPES.includes(file.type)) {
    errors.push('Invalid file type. Please select a valid image file (JPEG, PNG, GIF, WebP).');
  }
  
  if (file.size > API_CONFIG.MAX_FILE_SIZE) {
    errors.push(`File size too large. Maximum size is ${API_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB.`);
  }
  
  return errors;
};

// Helper function to check if API key is valid
export const isApiKeyValid = () => {
  const key = API_CONFIG.DEEPAI_API_KEY;
  
  // Debug logging (remove in production)
  if (import.meta.env.DEV) {
    console.log('API Key Status:', {
      hasKey: !!key,
      keyLength: key ? key.length : 0,
      keyValue: key ? `${key.substring(0, 10)}...` : 'none',
      envVar: import.meta.env.VITE_DEEPAI_API_KEY ? 'present' : 'missing'
    });
  }
  
  return key && 
         key.length > 10 && 
         key !== 'your_deepai_api_key_here' && 
         key !== 'YOUR_API_KEY_HERE' &&
         key !== 'c0b70261-2bd5-4805-9b33-cdfeb6e7b8eb'; // Remove the old invalid key
};

// Helper function to check if DoppelMe API key is valid
export const isDoppelMeApiKeyValid = () => {
  const key = API_CONFIG.RAPIDAPI_KEY;
  
  // Debug logging (remove in production)
  if (import.meta.env.DEV) {
    console.log('DoppelMe API Key Status:', {
      hasKey: !!key,
      keyLength: key ? key.length : 0,
      keyValue: key ? `${key.substring(0, 10)}...` : 'none',
      envVar: import.meta.env.VITE_RAPIDAPI_KEY ? 'present' : 'missing'
    });
  }
  
  return key && 
         key.length > 10 && 
         key !== 'your_rapidapi_key_here' && 
         key !== 'YOUR_RAPIDAPI_KEY_HERE';
};

// Get user-friendly error messages
export const getErrorMessage = (error) => {
  const errorMessages = {
    400: 'The image format is not supported. Please try a different image.',
    401: 'API key is invalid or expired. Please check your DeepAI API key.',
    403: 'Access denied. Please check your API key permissions.',
    404: 'Service not found. Please try again later.',
    429: 'Too many requests. Please wait a moment and try again.',
    500: 'Server error. Please try again in a few minutes.',
    502: 'Service temporarily unavailable. Please try again later.',
    503: 'Service is down for maintenance. Please try again later.',
    504: 'Request timeout. Please try again.',
    NETWORK_ERROR: 'Network error. Please check your internet connection.',
    TIMEOUT_ERROR: 'Request timed out. Please try again.',
    UNKNOWN_ERROR: 'Something went wrong. Please try again.',
  };

  if (error.response?.status && errorMessages[error.response.status]) {
    return errorMessages[error.response.status];
  }
  
  if (error.message && errorMessages[error.message]) {
    return errorMessages[error.message];
  }
  
  return error.message || errorMessages.UNKNOWN_ERROR;
};

export default API_CONFIG; 