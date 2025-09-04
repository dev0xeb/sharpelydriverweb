import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface OutgoingCallScreenProps {
  contactName?: string;
  contactAvatar?: string;
  isMuted?: boolean;
  isCallAnswered?: boolean;
  onToggleMute?: () => void;
  onEndCall?: () => void;
  onBack?: () => void;
}

const OutgoingCallScreen: React.FC<OutgoingCallScreenProps> = ({
  contactName = 'Mr Hassan',
  contactAvatar,
  isMuted = false,
  isCallAnswered = false,
  onToggleMute,
  onEndCall,
  onBack
}) => {
  const navigate = useNavigate();
  const [callAttempts, setCallAttempts] = useState(0);
  const [callDuration, setCallDuration] = useState(0);
  const [isActiveCall, setIsActiveCall] = useState(isCallAnswered);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActiveCall) {
      // Call is active - start duration timer
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      // Call is ringing - increment attempt counter
      interval = setInterval(() => {
        setCallAttempts(prev => prev + 1);
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActiveCall]);

  // Handle call being answered
  useEffect(() => {
    if (isCallAnswered && !isActiveCall) {
      setIsActiveCall(true);
      setCallAttempts(0); // Reset attempts when call is answered
    }
  }, [isCallAnswered, isActiveCall]);

  const handleToggleMute = () => {
    if (onToggleMute) {
      onToggleMute();
    }
  };

  const handleEndCall = () => {
    if (onEndCall) {
      onEndCall();
    } else {
      navigate(-1);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusText = () => {
    if (isActiveCall) {
      return formatDuration(callDuration);
    } else {
      return 'Calling...';
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header - Only show on desktop */}
      <div className="hidden lg:block bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {isActiveCall ? 'Call' : 'Calling'}
          </h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 lg:py-16">
        <div className="max-w-md w-full text-center">
          {/* Contact Avatar */}
          <div className="mb-6 lg:mb-8">
            <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto rounded-full bg-gray-200 overflow-hidden border-4 border-gray-100 shadow-lg">
              {contactAvatar ? (
                <img 
                  src={contactAvatar} 
                  alt={contactName} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center">
                  <span className="text-white font-bold text-2xl lg:text-3xl">
                    {contactName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Contact Name and Status */}
          <div className="mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {contactName}
            </h2>
            <p className="text-lg lg:text-xl text-gray-600">
              {getStatusText()}
            </p>
            {!isActiveCall && callAttempts > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                Attempt {callAttempts}
              </p>
            )}
          </div>

          {/* Calling Animation - Mobile Only, show only when not answered */}
          {!isActiveCall && (
            <div className="lg:hidden mb-8">
              <div className="flex justify-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Call Controls */}
      <div className="bg-white border-t border-gray-200 px-4 py-6 lg:px-6 lg:py-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-8 lg:space-x-12">
            {/* Mute Button */}
            <button
              onClick={handleToggleMute}
              className={`p-4 lg:p-5 rounded-full transition-colors ${
                isMuted 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            </button>

            {/* End Call Button */}
            <button
              onClick={handleEndCall}
              className="p-5 lg:p-6 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
            >
              <svg className="w-7 h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutgoingCallScreen; 