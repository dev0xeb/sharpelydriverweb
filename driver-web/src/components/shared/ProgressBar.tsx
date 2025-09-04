import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
  variant?: 'default' | 'compact';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentStep, 
  totalSteps, 
  className = '',
  variant = 'default'
}) => {
  const stepWidth = variant === 'compact' ? 'w-12 lg:w-16' : 'w-16';
  
  return (
    <div className={`flex items-center justify-center mt-4 space-x-2 ${className}`}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`h-1 ${stepWidth} rounded-sm ${
            index + 1 <= currentStep ? 'bg-red-600' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressBar;