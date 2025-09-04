import React from 'react';
import StatusScreen from './StatusScreen';

interface CongratulationsScreenProps {
  isOpen: boolean;
  onClose?: () => void;
  onNextTask: () => void;
  driverName?: string;
}

const CongratulationsScreen: React.FC<CongratulationsScreenProps> = ({
  isOpen,
  onNextTask,
  driverName = 'Eric',
}) => {
  if (!isOpen) return null;

  const icon = (
    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
      <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );

  return (
    <StatusScreen
      title={`Congratulations ${driverName}!!`}
      messageLine1="You have completed a delivery successfully."
      messageLine2="You are our hero for saving the day."
      buttonText="Next Task"
      onButtonClick={onNextTask}
      icon={icon}
      showNavigationDots
    />
  );
};

export default CongratulationsScreen;