import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './IndividualDriver/Dashboard';
import RideRequestScreen from './RideRequestScreen';
import DeliveryRequestScreen from './DeliveryRequestScreen';
import DeliveryTrackingScreen from './DeliveryTrackingScreen';
import OnTransitScreen from './OnTransitScreen';
import DeliveryCompletionScreen from './DeliveryCompletionScreen';
import CongratulationsScreen from './CongratulationsScreen';
import DeliveryDashboard from './DeliveryDashboard';
import { useDriverType } from '../context/DriverTypeContext';

const DeliveryFlow: React.FC = () => {
  const navigate = useNavigate();
  const { driverType } = useDriverType();

  return (
    <Routes>
      <Route
        path="/"
        element={
          driverType === 'company' ? (
            <DeliveryDashboard />
          ) : (
            <Dashboard />
          )
        }
      />
      <Route path="ride-request" element={<RideRequestScreen onAccept={() => navigate('/dashboard/delivery-request')} onDecline={() => navigate('/')} onBack={() => navigate(-1)} />} />
      <Route path="delivery-request" element={<DeliveryRequestScreen onStartDelivery={() => navigate('/dashboard/delivery-tracking')} onCancelRide={() => navigate('/')} onBack={() => navigate(-1)} />} />
      <Route path="delivery-tracking" element={<DeliveryTrackingScreen onStartDelivery={() => navigate('/dashboard/on-transit')} onCancelRide={() => navigate('/')} onBack={() => navigate(-1)} />} />
      <Route path="on-transit" element={<OnTransitScreen onEndRide={() => navigate('/dashboard/delivery-completion')} onEmergencyCall={() => { console.log('Emergency call initiated'); }} onBack={() => navigate(-1)} />} />
      <Route path="delivery-completion" element={<DeliveryCompletionScreen onMakeAnotherRound={() => navigate('/dashboard/congratulations')} onNextTask={() => navigate('/')} onEmergencyCall={() => { console.log('Emergency call initiated'); }} onBack={() => navigate(-1)} />} />
      <Route path="congratulations" element={<CongratulationsScreen isOpen={true} onNextTask={() => navigate('/dashboard/ride-request')} />} />
    </Routes>
  );
};

export default DeliveryFlow;
