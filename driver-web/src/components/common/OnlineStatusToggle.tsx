import React from 'react';

interface OnlineStatusToggleProps {
  isOnline: boolean;
  onToggle: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const OnlineStatusToggle: React.FC<OnlineStatusToggleProps> = ({ 
  isOnline, 
  onToggle, 
  className = '',
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-12 h-6',
    md: 'w-14 h-7',
    lg: 'w-16 h-8'
  };

  const thumbSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7'
  };

  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex items-center ${sizeClasses[size]} rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
        isOnline ? 'bg-red-600' : 'bg-gray-300'
      } ${className}`}
    >
      <span
        className={`inline-block ${thumbSizes[size]} rounded-full bg-white shadow-lg transform transition-transform duration-200 ${
          isOnline ? `translate-x-${size === 'sm' ? '6' : size === 'md' ? '7' : '8'}` : 'translate-x-0.5'
        }`}
      />
    </button>
  );
};

export default OnlineStatusToggle;
