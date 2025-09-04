import React from 'react';

interface StatusBadgeProps {
  isOnline: boolean;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ isOnline, className = '' }) => {
  return (
    <span 
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      } ${className}`}
    >
      {isOnline ? 'Online' : 'Offline'}
    </span>
  );
};

export default StatusBadge;
