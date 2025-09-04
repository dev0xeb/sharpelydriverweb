import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout, MapBackground } from './common';
import { useOnlineStatus, useNavigation } from '../hooks';
import { createDriverMarker, createCustomMarker } from '../utils/mapUtils';
import { containerStyles } from '../utils/styleUtils';
import { RIDE_MAP_MARKERS, type MapMarker } from '../constants';

const DispatchCancelled: React.FC = () => {
  const { isOnline, toggleOnlineStatus } = useOnlineStatus({ initialStatus: true });
  const { navigationItems, addNavigationHandler } = useNavigation({ activeIndex: 0 });
  const navigate = useNavigate();

  // Add navigation handler for Earn button
  React.useEffect(() => {
    addNavigationHandler(1, () => navigate('/earn-more'));
  }, [addNavigationHandler, navigate]);

  const handleToggleStatus = () => {
    if (!isOnline) {
      navigate('/dashboard/ride-request');
    } else {
      toggleOnlineStatus();
    }
  };

  const handleDismissNotification = () => {
    navigate('/dashboard');
  };

  // Create map markers for ride locations
  const mapMarkers = [
    createDriverMarker(50, 50, 'driver-location'),
    ...RIDE_MAP_MARKERS.filter((marker: MapMarker) => marker.type !== 'current').map((marker: MapMarker) =>
      createCustomMarker(marker.lat, marker.lng, '🚖', marker.color || '#ef4444', marker.id)
    )
  ];

  return (
    <AppLayout
      title="SHARPELY"
      subtitle="Driver Dashboard"
      isOnline={isOnline}
      onToggleStatus={handleToggleStatus}
      showStatusToggle={true}
      navigationItems={navigationItems}
    >
      {/* Main Dashboard Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Map Section */}
        <div className="flex-1 p-4 lg:p-6">
          <div className={`${containerStyles.cardShadow} h-64 lg:h-full`}>
            {/* Map Header */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Live Map</h3>
              <p className="text-sm text-gray-600">Track your location and nearby ride requests</p>
            </div>

            {/* Map Area */}
            <div className="relative h-full rounded-b-xl overflow-hidden">
              <MapBackground
                markers={mapMarkers}
                className="h-full"
              >
                {/* Status overlay */}
                <div className="absolute top-2 lg:top-4 left-2 lg:left-4">
                  <div className={`px-3 py-1 lg:px-4 lg:py-2 rounded-full shadow-lg text-xs lg:text-sm ${
                    isOnline ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                  }`}>
                    <span className="font-medium">
                      {isOnline ? '🟢 Online' : '⭕ Offline'}
                    </span>
                  </div>
                </div>

                {/* Cancellation Notification Overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-sm px-4">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 lg:p-6">
                    {/* Cancelled Icon */}
                    <div className="flex justify-center mb-3">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-red-100 rounded-full flex items-center justify-center relative">
                        <svg className="w-8 h-8 lg:w-10 lg:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {/* Cancelled banner */}
                        <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full transform rotate-12">
                          CANCELLED
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="text-center">
                      <p className="text-gray-900 font-medium text-sm lg:text-base mb-4">
                        Order was cancelled by<br />the customer
                      </p>

                      {/* Dismiss Button */}
                      <button
                        onClick={handleDismissNotification}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg transition-colors text-sm lg:text-base"
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile Go Online Button (hidden when notification is shown) */}
                <div className="absolute bottom-4 right-4 lg:hidden">
                  <button
                    onClick={handleToggleStatus}
                    className={`px-4 py-2 rounded-full font-medium text-sm shadow-lg transition-colors ${
                      isOnline
                        ? 'bg-gray-600 text-white hover:bg-gray-700'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {isOnline ? 'Go Offline' : 'Go Online'}
                  </button>
                </div>
              </MapBackground>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DispatchCancelled;
