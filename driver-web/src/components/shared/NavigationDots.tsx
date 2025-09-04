import React from 'react';

interface NavigationDotsProps {
  total: number;
  current: number;
  className?: string;
}

const NavigationDots: React.FC<NavigationDotsProps> = ({ 
  total, 
  current, 
  className = '' 
}) => {
  return (
    <div className={`flex space-x-2 ${className}`}>
      {Array.from({ length: total }, (_, index) => (
        <div
          key={index}
          className={`w-8 h-1 rounded-full ${
            index === current ? 'bg-red-600' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default NavigationDots;