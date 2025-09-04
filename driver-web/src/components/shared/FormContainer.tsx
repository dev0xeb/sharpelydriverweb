import React from 'react';

interface FormContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'centered' | 'wide';
}

const FormContainer: React.FC<FormContainerProps> = ({ 
  children, 
  className = '',
  variant = 'default'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'centered':
        return 'w-full max-w-md lg:max-w-lg mx-auto';
      case 'wide':
        return 'w-full max-w-md lg:max-w-2xl mx-auto';
      default:
        return 'w-full max-w-md lg:max-w-lg mx-auto';
    }
  };

  return (
    <div className={`${getVariantClasses()} ${className}`}>
      {children}
    </div>
  );
};

export default FormContainer;