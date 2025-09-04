import React from 'react';
import { useNavigate } from 'react-router-dom';
import icons from '../assets/icon';
import { useDriverType } from '../context/DriverTypeContext';

const SignUpOptions: React.FC = () => {
  const navigate = useNavigate();
  const { setDriverType } = useDriverType();

  const handleCompanyDriver = () => {
    setDriverType('company');
    navigate('/company-driver?type=company');
  };

  const handleIndividualDriver = () => {
    setDriverType('individual');
    navigate('/individual-driver?type=individual');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-4 sm:p-6 lg:p-8">
      {/* Header with back button */}
      <div className="flex items-start mb-6 lg:mb-8">
        <button
          onClick={handleBack}
          className="p-0 bg-transparent border-none cursor-pointer"
        >
          <img
            src={icons.arrowBack}
            alt="Back"
            className="w-6 h-6 lg:w-7 lg:h-7"
          />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex justify-center items-start pt-12 lg:pt-20">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl text-center">
          {/* Title and subtitle */}
          <div className="mb-12 lg:mb-16">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
              How would you want to get signed up
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
              Pick from the option and get started
            </p>
          </div>

          {/* Option buttons */}
          <div className="flex flex-col gap-4 lg:gap-6 items-center">
            <button
              onClick={handleCompanyDriver}
              className="w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg px-6 py-4 lg:py-5 text-center border border-gray-300 rounded-xl bg-white text-red-600 text-base lg:text-lg font-bold cursor-pointer transition-all duration-200 hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Driving for a company
            </button>

            <button
              onClick={handleIndividualDriver}
              className="w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg px-6 py-4 lg:py-5 text-center border border-gray-300 rounded-xl bg-white text-red-600 text-base lg:text-lg font-bold cursor-pointer transition-all duration-200 hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              An Individual driver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpOptions;
