import React, { useState } from 'react';
import IdScreenVerification from './IdScreenVerification';
import SuccessScreen from './SuccessScreen';

interface IdScreenProps {
  onBack: () => void;
  onNext?: () => void;
  onNavigateToDashboard?: () => void;
}

const IdScreen: React.FC<IdScreenProps> = ({ onBack: _onBack, onNext: _onNext, onNavigateToDashboard }) => {
  const [idNumber] = useState('9085-6746-7347'); // Generated ID
  const [copied, setCopied] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(idNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContinue = () => {
    setShowVerification(true);
  };

  const handleVerificationAccept = () => {
    setShowVerification(false);
    setShowSuccess(true);
  };

  // Show SuccessScreen if verification is accepted
  if (showSuccess) {
    return (
      <SuccessScreen
        onNavigateToDashboard={onNavigateToDashboard}
        onStartDelivery={() => {
          // Fallback if onNavigateToDashboard is not provided
          if (onNavigateToDashboard) {
            onNavigateToDashboard();
          } else {
            console.log('No navigation callback provided');
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md text-center">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Almost done Eric
        </h1>
        
        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-600 mb-12 lg:mb-16">
          This is your ID number, make sure to keep it safe
        </p>

        {/* ID Number Section */}
        <div className="mb-16 lg:mb-20">
          <label className="block text-left text-sm font-medium text-gray-900 mb-3">
            ID number
          </label>
          <div className="relative">
            <input
              type="text"
              value={idNumber}
              readOnly
              className="w-full p-4 border border-gray-300 rounded-xl text-base text-gray-900 bg-gray-50 pr-12"
            />
            <button
              onClick={handleCopyId}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded transition-colors"
              title="Copy ID"
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-gray-600"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
            {copied && (
              <div className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                Copied!
              </div>
            )}
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full bg-red-600 text-white rounded-xl p-4 font-bold text-lg border-none cursor-pointer transition-colors hover:bg-red-700"
        >
          Continue
        </button>
      </div>

      {/* Verification Modal */}
      {showVerification && (
        <IdScreenVerification onAccept={handleVerificationAccept} />
      )}
    </div>
  );
};

export default IdScreen;
