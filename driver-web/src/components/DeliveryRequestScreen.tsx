import React from 'react';
import { AppLayout, MapBackground } from './common';
import { useOnlineStatus, useNavigation } from '../hooks';
import { createDriverMarker, createPickupMarker, createDropoffMarker } from '../utils/mapUtils';
import { containerStyles, buttonStyles } from '../utils/styleUtils';

interface DeliveryRequestScreenProps {
  onBack?: () => void;
  onStartDelivery?: () => void;
  onCancelRide?: () => void;
}

const DeliveryRequestScreen: React.FC<DeliveryRequestScreenProps> = ({ 
  onBack: _onBack, 
  onStartDelivery, 
  onCancelRide 
}) => {
  const { isOnline, toggleOnlineStatus } = useOnlineStatus({ initialStatus: true });
  const { navigationItems } = useNavigation({ activeIndex: 0 });

  const handleStartDelivery = () => {
    if (onStartDelivery) {
      onStartDelivery();
    }
  };

  const handleCancelRide = () => {
    if (onCancelRide) {
      onCancelRide();
    }
  };

  // Create map markers for delivery request
  const mapMarkers = [
    createDriverMarker(50, 50, 'driver-location'),
    createPickupMarker(30, 40, 'pickup-location'),
    createDropoffMarker(70, 60, 'dropoff-location'),
  ];

  return (
    <AppLayout
      title="SHARPELY"
      subtitle="Delivery Request"
      isOnline={isOnline}
      onToggleStatus={toggleOnlineStatus}
      showStatusToggle={true}
      navigationItems={navigationItems}
    >
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Map Section */}
        <div className="flex-1 p-4 lg:p-6">
          <div className={`${containerStyles.cardShadow} h-64 lg:h-full`}>
            {/* Map Header */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Delivery Route</h3>
              <p className="text-sm text-gray-600">Review the pickup and delivery locations</p>
            </div>
            
            {/* Map Area */}
            <div className="relative h-full rounded-b-xl overflow-hidden">
              <MapBackground 
                markers={mapMarkers}
                className="h-full"
              >
                {/* Route Line (simplified) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                  <path
                    d="M30,40 Q50,30 70,60"
                    stroke="#ef4444"
                    strokeWidth="0.5"
                    strokeDasharray="2,2"
                    fill="none"
                  />
                </svg>
              </MapBackground>
            </div>
          </div>
        </div>

        {/* Right Content - Delivery Details */}
        <div className="w-full lg:w-96 p-4 lg:p-6">
          <div className={`${containerStyles.cardShadow} p-6`}>
            <h3 className="font-bold text-xl text-gray-900 mb-6">Delivery Request</h3>
            
            {/* Delivery Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Pickup</p>
                  <p className="text-sm text-gray-600">123 Main Street, Downtown</p>
                  <p className="text-xs text-gray-500">Contact: John Doe (+1 234-567-8900)</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Delivery</p>
                  <p className="text-sm text-gray-600">456 Oak Avenue, Uptown</p>
                  <p className="text-xs text-gray-500">Contact: Jane Smith (+1 234-567-8901)</p>
                </div>
              </div>
            </div>

            {/* Package Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Package Details</h4>
              <p className="text-sm text-gray-600">Medium package (2.5 kg)</p>
              <p className="text-sm text-gray-600">Estimated delivery time: 25 mins</p>
              <p className="text-sm font-medium text-green-600 mt-2">Earnings: $12.50</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleStartDelivery}
                className={`w-full ${buttonStyles.primaryAction} py-4 text-lg`}
              >
                Accept & Start Delivery
              </button>
              
              <button
                onClick={handleCancelRide}
                className={`w-full ${buttonStyles.secondaryAction} py-4 text-lg`}
              >
                Decline Request
              </button>
            </div>

            {/* Timer */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">Auto-decline in <span className="font-medium text-red-600">00:45</span></p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DeliveryRequestScreen;
