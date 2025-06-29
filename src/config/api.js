// API Configuration
export const API_CONFIG = {
  // DeepAI API Settings
  // ⚠️ IMPORTANT: You need to provide your own DeepAI API key
  // Get one from: https://deepai.org/
  DEEPAI_API_KEY: 'c0b70261-2bd5-4805-9b33-cdfeb6e7b8eb',
  DEEPAI_API_ENDPOINT: 'https://api.deepai.org/api/toonify',
  
  // File upload settings
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  
  // Request settings
  REQUEST_TIMEOUT: 30000, // 30 seconds
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
  return key && key.length > 10 && key !== 'YOUR_API_KEY_HERE';
};

export default API_CONFIG; 