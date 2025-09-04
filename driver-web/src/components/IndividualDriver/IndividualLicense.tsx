import React, { useState } from 'react';
import icons from '../../assets/icon';
import DriverForm from './DriverForm';
import Riders from './Riders'; 

interface IndividualLicenseProps {
  onBack: () => void;
  onNext: () => void;
}

const IndividualLicense: React.FC<IndividualLicenseProps> = ({ onBack, onNext }) => {
  const [licenseNumber, setLicenseNumber] = useState('');
  const [selectedType, setSelectedType] = useState<'driver' | 'rider' | null>(null);
  const [showDriverForm, setShowDriverForm] = useState(false);
  const [showRiderForm, setShowRiderForm] = useState(false); // <-- Add this

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (licenseNumber && selectedType) {
      if (selectedType === 'driver') {
        setShowDriverForm(true);
      } else if (selectedType === 'rider') {
        setShowRiderForm(true); // <-- Show Riders form
      }
    }
  };

  const handleDriverClick = () => {
    setSelectedType('driver');
    setShowDriverForm(true);
  };

  const handleRiderClick = () => {
    setSelectedType('rider');
    setShowRiderForm(true);
  };

  const handleDriverFormBack = () => {
    setShowDriverForm(false);
  };

  const handleRiderFormBack = () => {
    setShowRiderForm(false);
  };

  if (showDriverForm) {
    return (
      <DriverForm
        onBack={handleDriverFormBack}
        onNext={onNext}
      />
    );
  }

  if (showRiderForm) {
    return (
      <Riders
        onBack={handleRiderFormBack}
        onNext={onNext}
      />
    );
  }

  const renderProgressBar = () => {
    return (
      <div className="flex items-center justify-center mt-4 space-x-2">
        <div className="h-1 w-12 lg:w-16 rounded-sm bg-red-600" />
        <div className="h-1 w-12 lg:w-16 rounded-sm bg-red-600" />
        <div className="h-1 w-12 lg:w-16 rounded-sm bg-gray-300" />
        <div className="h-1 w-12 lg:w-16 rounded-sm bg-gray-300" />
        <div className="h-1 w-12 lg:w-16 rounded-sm bg-gray-300" />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md lg:max-w-4xl bg-white rounded-2xl shadow-none lg:shadow-lg p-0 lg:p-10 flex flex-col items-center">
        {/* Header section */}
        <div className="w-full flex items-center mb-4 lg:mb-6">
          <button 
            className="p-0 bg-transparent border-none mr-4 cursor-pointer" 
            onClick={onBack}
          >
            <img src={icons.arrowBack} alt="Back" className="w-6 h-6 text-red-600" />
          </button>
          <div className="mt-2 flex-1">
            <div className="flex flex-col items-start">
              <span className="font-bold text-xl lg:text-2xl text-gray-900">Almost done</span>
              <span className="font-normal text-lg lg:text-xl text-gray-700 mt-1">Just some few process</span>
            </div>
            {renderProgressBar()}
          </div>
        </div>

        {/* Main content */}
        <div className="w-full mt-6 lg:max-w-lg lg:mx-auto">
          <div className="mb-8">
            <h2 className="font-bold text-xl lg:text-2xl text-gray-900 mb-2">Private & License Details</h2>
            <p className="font-normal text-sm lg:text-base text-gray-700 leading-relaxed">
              Your ID & license details will be kept private
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* License Number Input */}
            <div className="space-y-2">
              <label className="font-medium text-sm lg:text-base text-gray-900 block">
                Driver License or JTB Form Number
              </label>
              <input
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500 bg-gray-50"
                placeholder=""
                required
              />
              <p className="font-normal text-xs lg:text-sm text-gray-600">
                Licenses number on your driver documents
              </p>
            </div>

            {/* Driver Type Selection */}
            <div className="space-y-4 pt-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  type="button"
                  onClick={handleDriverClick}
                  className={`px-8 py-3 rounded-xl border-2 font-semibold text-lg transition-all duration-200 min-w-32 ${
                    selectedType === 'driver'
                      ? 'border-red-600 bg-red-50 text-red-600'
                      : 'border-red-600 bg-white text-red-600 hover:bg-red-50'
                  }`}
                >
                  Driver
                </button>
                
                <button
                  type="button"
                  onClick={handleRiderClick}
                  className={`px-8 py-3 rounded-xl border-2 font-semibold text-lg transition-all duration-200 min-w-32 ${
                    selectedType === 'rider'
                      ? 'border-red-600 bg-red-600 text-white'
                      : 'border-red-600 bg-white text-red-600 hover:bg-red-50'
                  }`}
                >
                  Rider
                </button>
              </div>
            </div>

            {/* Submit Button - Hidden, form submits when type is selected */}
            {selectedType && licenseNumber && (
              <div className="pt-8">
                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white rounded-xl p-4 font-bold text-lg border-none cursor-pointer transition-colors hover:bg-gray-600"
                >
                  Continue
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default IndividualLicense;
