import React from 'react';

const IconCheck = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 13l4 4L19 7" />
  </svg>
);
import StatusScreen from '../StatusScreen';

interface SuccessScreenProps {
  onStartDelivery?: () => void;
  onNavigateToDashboard?: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ onStartDelivery, onNavigateToDashboard }) => {
  const handleStartDelivery = () => {
    if (onNavigateToDashboard) {
      onNavigateToDashboard();
    } else if (onStartDelivery) {
      onStartDelivery();
    }
  };

  const icon = (
    <div className="w-32 h-32 lg:w-48 lg:h-48 bg-[#22c55e] rounded-full flex items-center justify-center mb-12 lg:mb-20 shadow-lg">
      <IconCheck className="w-16 h-16 lg:w-24 lg:h-24 text-white" />
    </div>
  );

  return (
    <StatusScreen
      title="All set Eric!!"
      messageLine1="You have successfully been registered"
      buttonText="Start Delivery"
      onButtonClick={handleStartDelivery}
      icon={icon}
    />
  );
};

export default SuccessScreen;
