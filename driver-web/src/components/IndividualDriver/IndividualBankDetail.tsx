import React, { useState } from 'react';
import icons from '../../assets/icon';
import PricingScreen from './PricingScreen';

interface IndividualBankDetailProps {
  onBack: () => void;
  onNext: () => void;
}

const IndividualBankDetail: React.FC<IndividualBankDetailProps> = ({ onBack, onNext }) => {
  const [showPricingScreen, setShowPricingScreen] = useState(false);

  const handleNext = () => {
    setShowPricingScreen(true);
  };

  const handlePricingBack = () => {
    setShowPricingScreen(false);
  };

  if (showPricingScreen) {
    return (
      <PricingScreen
        onBack={handlePricingBack}
        onNext={onNext}
      />
    );
  }
  const renderProgressBar = () => {
    return (
      <div className="flex items-center justify-center mt-4 space-x-2">
        <div className="h-1 w-12 lg:w-16 rounded-sm bg-red-600" />
        <div className="h-1 w-12 lg:w-16 rounded-sm bg-red-600" />
        <div className="h-1 w-12 lg:w-16 rounded-sm bg-red-600" />
        <div className="h-1 w-12 lg:w-16 rounded-sm bg-red-600" />
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
              <span className="font-bold text-xl lg:text-2xl text-gray-900">Now the exciting part</span>
              <span className="font-normal text-lg lg:text-xl text-gray-700 mt-1">Lets get your bank details</span>
            </div>
            {renderProgressBar()}
          </div>
        </div>

        {/* Main content */}
        <div className="w-full mt-6 lg:max-w-lg lg:mx-auto">
          <div className="mb-8">
            <h2 className="font-bold text-xl lg:text-2xl text-gray-900 mb-2">Bank Verification</h2>
            <p className="font-normal text-sm lg:text-base text-gray-700 leading-relaxed">
              Please enter your right bank details and cross check properly before moving on to the next.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
            className="space-y-6"
          >
            {/* Bank Name Dropdown */}
            <div className="space-y-2">
              <select
                className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500 text-gray-600 bg-gray-50"
                defaultValue=""
              >
                <option value="" disabled>Bank name</option>
                <option value="access">Access Bank</option>
                <option value="gtb">Guaranty Trust Bank</option>
                <option value="firstbank">First Bank of Nigeria</option>
                <option value="uba">United Bank for Africa</option>
                <option value="zenith">Zenith Bank</option>
                <option value="fcmb">First City Monument Bank</option>
                <option value="fidelity">Fidelity Bank</option>
                <option value="heritage">Heritage Bank</option>
                <option value="keystone">Keystone Bank</option>
                <option value="polaris">Polaris Bank</option>
                <option value="stanbic">Stanbic IBTC Bank</option>
                <option value="sterling">Sterling Bank</option>
                <option value="union">Union Bank</option>
                <option value="wema">Wema Bank</option>
                <option value="unity">Unity Bank</option>
              </select>
            </div>

            {/* Bank Verification Number */}
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Bank verification number"
                className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500 bg-gray-50"
              />
            </div>

            {/* Bank Account Number */}
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Bank account number"
                className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500 bg-gray-50"
              />
            </div>

            {/* National Identification Number */}
            <div className="space-y-2">
              <input
                type="text"
                placeholder="National Identification Number(NIN)"
                className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500 bg-gray-50"
              />
            </div>

            {/* Security Section */}
            <div className="pt-6">
              <div className="mb-6">
                <h3 className="font-bold text-xl lg:text-2xl text-gray-900 mb-2">Security</h3>
                <p className="font-normal text-sm lg:text-base text-gray-700 leading-relaxed">
                  Enter security password and pin to be able to gain access to your wallet (DO NOT FORGET THIS INFORMATION)
                </p>
              </div>

              {/* Password */}
              <div className="space-y-2 mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500 bg-gray-50"
                />
              </div>

              {/* 4-digit PIN */}
              <div className="space-y-2 mb-8">
                <input
                  type="text"
                  placeholder="4-digit pin"
                  maxLength={4}
                  pattern="[0-9]{4}"
                  className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500 bg-gray-50"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-gray-800 text-white rounded-xl p-4 font-bold text-lg border-none cursor-pointer transition-colors hover:bg-gray-600"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IndividualBankDetail;
