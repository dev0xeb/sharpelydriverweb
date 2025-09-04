
import React from 'react';

interface StatusScreenProps {
  title: string;
  messageLine1: string;
  messageLine2?: string;
  buttonText: string;
  onButtonClick: () => void;
  icon: React.ReactNode;
  showNavigationDots?: boolean;
}

const StatusScreen: React.FC<StatusScreenProps> = ({
  title,
  messageLine1,
  messageLine2,
  buttonText,
  onButtonClick,
  icon,
  showNavigationDots,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="w-full max-w-md mx-4 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="mb-8">{icon}</div>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-2">{messageLine1}</p>
          {messageLine2 && <p className="text-gray-600 text-lg leading-relaxed">{messageLine2}</p>}
        </div>

        <div className="flex-1"></div>

        <div className="w-full mb-8">
          <button
            onClick={onButtonClick}
            className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors shadow-lg"
          >
            {buttonText}
          </button>
        </div>

        {showNavigationDots && (
          <div className="flex space-x-2 mb-8">
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-red-600 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusScreen;
