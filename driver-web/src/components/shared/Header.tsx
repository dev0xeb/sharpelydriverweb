import React from 'react';
import icons from '../../assets/icon';

interface HeaderProps {
  onBack: () => void;
  title: string;
  subtitle: string;
  progress?: number;
}

const Header: React.FC<HeaderProps> = ({ onBack, title, subtitle, progress }) => {
  return (
    <div className="w-full flex items-center mb-2 lg:mb-6">
      <button
        className="p-0 bg-transparent border-none mr-2 lg:mr-4 cursor-pointer"
        onClick={onBack}
        aria-label="Back"
      >
        <img src={icons.arrowBack} alt="Back" className="w-6 h-6" />
      </button>
      <div className="mt-3 flex-1">
        <div className="flex flex-col">
          <span className="font-bold text-xl lg:text-2xl text-gray-900">{title}</span>
          <span className="font-normal text-lg lg:text-xl text-gray-700 mt-1">
            {subtitle}
          </span>
        </div>
        {progress !== undefined && (
          <div className="flex items-center justify-center mt-4 space-x-2">
            <div className={`h-1 w-16 rounded-sm ${progress >= 1 ? 'bg-red-600' : 'bg-gray-300'}`} />
            <div className={`h-1 w-16 rounded-sm ${progress >= 2 ? 'bg-red-600' : 'bg-gray-300'}`} />
            <div className={`h-1 w-16 rounded-sm ${progress >= 3 ? 'bg-red-600' : 'bg-gray-300'}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
