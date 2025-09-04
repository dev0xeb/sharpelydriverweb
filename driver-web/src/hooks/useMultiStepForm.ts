import { useState } from 'react';

interface UseMultiStepFormProps {
  totalSteps: number;
  initialStep?: number;
}

export const useMultiStepForm = ({ totalSteps, initialStep = 1 }: UseMultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep,
    isLastStep,
    totalSteps
  };
};