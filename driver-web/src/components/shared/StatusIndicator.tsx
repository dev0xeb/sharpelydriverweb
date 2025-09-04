import React from 'react';

interface StatusIndicatorProps {
  isOnline: boolean;
  onToggle?: () => void;
  variant?: 'badge' | 'toggle' | 'simple';
  className?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  isOnline,
  onToggle,
  variant = 'badge',
  className = ''
}) => {
  const getStatusClasses = () => {
    return isOnline 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const getToggleButtonClasses = () => {
    return isOnline
      ? 'bg-gray-600 text-white hover:bg-gray-700'
      : 'bg-red-600 text-white hover:bg-red-700';
  };

  if (variant === 'simple') {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses()} ${className}`}>
        {isOnline ? 'Online' : 'Offline'}
      </span>
    );
  }

  if (variant === 'toggle') {
    return (
      <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium text-gray-900">Status</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses()}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
        {onToggle && (
          <>
            <button
              onClick={onToggle}
              className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors ${getToggleButtonClasses()}`}
            >
              {isOnline ? 'Go Offline' : 'Go Online'}
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {isOnline ? 'Click to stop accepting deliveries' : 'Click to start accepting deliveries'}
            </p>
          </>
        )}
      </div>
    );
  }

  // Default badge variant
  return (
    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClasses()} ${className}`}>
      {isOnline ? 'Online' : 'Offline'}
    </div>
  );
};

export default StatusIndicator;