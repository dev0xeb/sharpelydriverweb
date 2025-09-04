import React, { useState } from 'react';
import PricingScreen from './IndividualDriver/PricingScreen';
import SuccessScreen from './CompanysDriver/SuccessScreen';
import Dashboard from './IndividualDriver/Dashboard';

type FlowStep = 'pricing' | 'success' | 'dashboard';

const RegistrationFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('pricing');

  const handleBackFromPricing = () => {
    // Navigate to previous step (e.g., license screen)
    console.log('Navigate back from pricing');
  };

  const handleNextFromPricing = () => {
    // Default next action (if onNavigateToSuccess is not used)
    console.log('Default next from pricing');
  };

  const handleNavigateToSuccess = () => {
    setCurrentStep('success');
  };

  const handleStartDelivery = () => {
    // Default action for start delivery
    console.log('Default start delivery action');
  };

  const handleNavigateToDashboard = () => {
    setCurrentStep('dashboard');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'pricing':
        return (
          <PricingScreen
            onBack={handleBackFromPricing}
            onNext={handleNextFromPricing}
            onNavigateToSuccess={handleNavigateToSuccess}
          />
        );
      case 'success':
        return (
          <SuccessScreen
            onStartDelivery={handleStartDelivery}
            onNavigateToDashboard={handleNavigateToDashboard}
          />
        );
      case 'dashboard':
        return (
          <Dashboard />
        );
      default:
        return null;
    }
  };

  return (
    <div className="registration-flow">
      {/* Debug info - remove in production */}
      <div className="fixed top-4 right-4 z-50 bg-black bg-opacity-75 text-white p-2 rounded text-xs">
        Current Step: {currentStep}
      </div>
      
      {renderCurrentStep()}
    </div>
  );
};

export default RegistrationFlow;
