import React from 'react';
import { useNavigate } from 'react-router-dom';
import icons from '../assets/icon';


const Notifications: React.FC = () => {
  const navigate = useNavigate();

  const renderHeader = () => (
    <div className="w-full flex items-center mb-4 lg:mb-6">
      <button
        className="p-0 bg-transparent border-none mr-4 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <img src={icons.arrowBack} alt="Back" className="w-6 h-6" />
      </button>
      <div className="mt-2 flex-1">
        <div className="flex flex-col items-start">
          <span className="font-bold text-xl lg:text-2xl text-gray-900">Notifications</span>
        </div>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md lg:max-w-2xl bg-white rounded-2xl shadow-none lg:shadow-lg p-0 lg:p-10">
        {renderHeader()}
      </div>
    </div>
  );
};

export default Notifications; 