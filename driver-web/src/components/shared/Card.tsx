import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  variant = 'default',
  padding = 'medium'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'elevated':
        return 'bg-white shadow-lg rounded-2xl';
      case 'bordered':
        return 'bg-white border border-gray-200 rounded-2xl';
      default:
        return 'bg-white rounded-2xl';
    }
  };

  const getPaddingClasses = () => {
    switch (padding) {
      case 'none':
        return '';
      case 'small':
        return 'p-4';
      case 'large':
        return 'p-8 lg:p-10';
      default:
        return 'p-6';
    }
  };

  return (
    <div className={`${getVariantClasses()} ${getPaddingClasses()} ${className}`}>
      {children}
    </div>
  );
};

export default Card;