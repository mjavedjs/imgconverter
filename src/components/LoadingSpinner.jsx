import React from 'react';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...', showMessage = true }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const borderSizes = {
    small: 'border-2',
    medium: 'border-4',
    large: 'border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`${sizeClasses[size]} ${borderSizes[size]} border-gray-300 border-t-purple-600 rounded-full animate-spin`}
        style={{
          borderTopColor: '#9333ea',
          borderColor: 'rgba(255, 255, 255, 0.3)'
        }}
      ></div>
      {showMessage && message && (
        <p className="mt-4 text-gray-300 text-sm">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner; 