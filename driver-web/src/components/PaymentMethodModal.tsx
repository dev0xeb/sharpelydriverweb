import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CongratulationsScreen from './CongratulationsScreen';
import { PAYMENT_METHODS, type PaymentMethod } from '../constants';

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (paymentMethod: string) => void;
  onNextTask?: () => void;
  customerName?: string;
  totalTime?: string;
  driverName?: string;
}

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onNextTask,
  customerName = "Lauren Ingram",
  totalTime = "20minute-36seconds",
  driverName = "Eric"
}) => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState<string>('Cash');
  const [showCongratulations, setShowCongratulations] = useState(false);

  const paymentMethods = PAYMENT_METHODS;

  const handleConfirm = () => {
    onConfirm(selectedPayment);
    setShowCongratulations(true);
  };

  const handleNextTask = () => {
    setShowCongratulations(false);
    onClose();
    if (onNextTask) {
      onNextTask();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCall = () => {
    navigate('/outgoing-call');
  };

  const handleMessage = () => {
    navigate('/chat');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with map background blur effect */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        {/* Map background simulation */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 opacity-30">
          {/* Streets overlay */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-1/4 left-0 w-full h-2 bg-gray-400"></div>
            <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-400"></div>
            <div className="absolute top-3/4 left-0 w-full h-2 bg-gray-400"></div>
            <div className="absolute top-0 left-1/4 w-2 h-full bg-gray-400"></div>
            <div className="absolute top-0 left-1/2 w-2 h-full bg-gray-400"></div>
            <div className="absolute top-0 right-1/4 w-2 h-full bg-gray-400"></div>
          </div>

          {/* Location markers */}
          <div className="absolute top-20 left-1/3">
            <div className="w-6 h-6 bg-red-500 rounded-full opacity-60"></div>
          </div>
          <div className="absolute bottom-32 right-1/4">
            <div className="w-6 h-6 bg-green-500 rounded-full opacity-60"></div>
          </div>

          {/* Business district label */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
            <div className="bg-white bg-opacity-40 px-2 py-1 rounded text-xs text-gray-600">
              BUSINESS DISTRICT
            </div>
          </div>
        </div>

        {/* Online status indicator */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-gray-500 bg-opacity-60 px-3 py-1 rounded-full">
            <span className="text-white text-sm">Online</span>
          </div>
        </div>
      </div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md mx-4">
        {/* Payment Selection Card */}
        <div className="bg-white rounded-t-2xl p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            How was the ride paid
          </h2>

          {/* Payment Options */}
          <div className="space-y-4">
            {paymentMethods.map((method: PaymentMethod) => (
              <label
                key={method.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-xl mr-3">{method.icon}</span>
                  <span className="font-medium text-gray-900">{method.label}</span>
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedPayment === method.id}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="w-5 h-5 text-red-600 border-2 border-gray-300 focus:ring-red-500"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Bottom Action Button */}
        <div className="bg-red-600 text-white rounded-b-2xl">
          <button
            onClick={handleConfirm}
            className="w-full flex items-center justify-center py-4 font-bold text-lg hover:bg-red-700 transition-colors"
          >
            <span className="mr-2">»</span>
            Swipe to make another round
            <span className="ml-2">»</span>
          </button>
        </div>

        {/* Customer Info Bar */}
        <div className="bg-white mt-2 rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mr-3">
                Arrived
              </div>
              <span className="text-sm text-gray-600">You have arrived at your destination</span>
            </div>
          </div>
          
          <div className="mt-3 flex items-center">
            <div className="w-3 h-3 bg-green-600 rounded-full mr-3"></div>
            <div>
              <span className="font-bold text-gray-900">{customerName}</span>
              <p className="text-xs text-gray-500">Total Time: {totalTime}</p>
            </div>
            <div className="ml-auto flex space-x-2">
              <button 
                onClick={handleCall}
                className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
              <button 
                onClick={handleMessage}
                className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Congratulations Screen */}
      <CongratulationsScreen
        isOpen={showCongratulations}
        onNextTask={handleNextTask}
        driverName={driverName}
      />
    </div>
  );
};

export default PaymentMethodModal;
