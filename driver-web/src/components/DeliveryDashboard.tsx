import React from 'react';
import { AppLayout, MapBackground } from './common';
import { useOnlineStatus, useNavigation } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { createDriverMarker, createCustomMarker } from '../utils/mapUtils';
import { containerStyles } from '../utils/styleUtils';
import { DELIVERY_DASHBOARD_MENU_ITEMS, DELIVERY_MAP_MARKERS, type MenuItemConfig, type MapMarker } from '../constants';
import QuickActionCard from './shared/QuickActionCard';

interface DeliveryDashboardProps {
  onBack?: () => void;
}

const DeliveryDashboard: React.FC<DeliveryDashboardProps> = ({ onBack: _onBack }) => {
  const { isOnline, toggleOnlineStatus } = useOnlineStatus();
  const { navigationItems } = useNavigation({ activeIndex: 0 });
  const navigate = useNavigate();

  const handleToggleStatus = () => {
    if (!isOnline) {
      navigate('/dashboard/ride-request');
    } else {
      toggleOnlineStatus();
    }
  };

  const menuItems = DELIVERY_DASHBOARD_MENU_ITEMS.map((item: MenuItemConfig) => ({
    icon: item.icon,
    title: item.title,
    subtitle: item.subtitle,
    href: item.href,
    arrow: true,
  }));

  // Create map markers for delivery locations
  const mapMarkers = [
    createDriverMarker(50, 50, 'driver-location'),
    ...DELIVERY_MAP_MARKERS.map((marker: MapMarker) =>
      createCustomMarker(marker.lat, marker.lng, '📦', marker.color || '#ef4444', marker.id)
    )
  ];

  return (
    <AppLayout
      title="SHARPELY"
      subtitle="Delivery Dashboard"
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
              <p className="text-sm text-gray-600">Track your location and nearby delivery requests</p>
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
                      {isOnline ? '🟢 Online' : '⭕ Off-line'}
                    </span>
                  </div>
                </div>

                {/* Mobile Go Online Button */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 lg:hidden">
                  <button
                    onClick={handleToggleStatus}
                    className={`px-6 py-2 rounded-full font-medium text-sm shadow-lg transition-colors ${
                      isOnline
                        ? 'bg-gray-600 text-white hover:bg-gray-700'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {isOnline ? 'Go offline' : 'Go online'}
                  </button>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <span className="text-xs text-white bg-black bg-opacity-70 px-2 py-1 rounded">
                      {isOnline ? 'Swipe to go offline and decline deliveries' : 'Swipe to go online and accept deliveries'}
                    </span>
                  </div>
                </div>
              </MapBackground>
            </div>
          </div>
        </div>

        {/* Right Content - Menu Items */}
        <div className="w-full lg:w-96 p-4 lg:p-6">
          <div className="space-y-3 lg:space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg mb-4">Quick Actions</h3>

            {menuItems.map((item: any, index: number) => (
              <QuickActionCard
                key={index}
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                bgColorClassName={item.bgColor}
                iconColorClassName={item.iconColor}
                showArrow={item.arrow}
                onClick={() => { if (item.href) navigate(item.href); }}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DeliveryDashboard;
