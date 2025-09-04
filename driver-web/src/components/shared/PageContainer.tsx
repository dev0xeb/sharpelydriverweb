import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'fullscreen' | 'card';
}

const PageContainer: React.FC<PageContainerProps> = ({ 
  children, 
  className = '',
  variant = 'default'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'fullscreen':
        return 'fixed inset-0 z-50 flex items-center justify-center bg-white';
      case 'card':
        return 'min-h-screen flex flex-col items-center bg-white p-4 sm:p-6 lg:p-8';
      default:
        return 'min-h-screen bg-white flex flex-col p-4 sm:p-6 lg:p-8';
    }
  };

  const getContentClasses = () => {
    switch (variant) {
      case 'fullscreen':
        return 'w-full max-w-md mx-4 flex flex-col items-center justify-center min-h-screen px-6';
      case 'card':
        return 'w-full max-w-md lg:max-w-4xl bg-white rounded-2xl shadow-none lg:shadow-lg p-0 lg:p-10 flex flex-col items-center';
      default:
        return '';
    }
  };

  return (
    <div className={`${getVariantClasses()} ${className}`}>
      {variant === 'default' ? (
        children
      ) : (
        <div className={getContentClasses()}>
          {children}
        </div>
      )}
    </div>
  );
};

export default PageContainer;