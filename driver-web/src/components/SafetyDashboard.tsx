import React, { useState } from 'react';
import { SAFETY_FEATURES, SAFETY_MENU_ITEMS, SAFETY_SIDEBAR_ITEMS, type SafetyFeature } from '../constants';

interface SafetyDashboardProps {
  onBack?: () => void;
}

const SafetyDashboard: React.FC<SafetyDashboardProps> = ({ onBack: _onBack }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [showSafetyModal, setShowSafetyModal] = useState(true);

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  const closeSafetyModal = () => {
    setShowSafetyModal(false);
  };

  const safetyFeatures = SAFETY_FEATURES.map((feature: SafetyFeature) => ({
    title: feature.title,
    subtitle: feature.description,
    icon: typeof feature.icon === 'string' ? feature.icon : '🔒'
  }));

  const menuItems = SAFETY_MENU_ITEMS.map((item: any) => ({
    icon: typeof item.icon === 'string' ? item.icon : '📊',
    title: item.title,
    subtitle: item.description,
    arrow: true,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  }));

  const sidebarItems = SAFETY_SIDEBAR_ITEMS.map((item: any) => ({
    icon: typeof item.icon === 'string' ? item.icon : '🔒',
    label: item.label,
    active: item.active || false
  }));

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row relative">
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-red-600">SHARPELY</h1>
            <p className="text-xs text-gray-600">Safety Dashboard</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {isOnline ? 'Online' : 'Off-line'}
          </div>
        </div>
      </div>

      {/* Left Sidebar - Hidden on mobile */}
      <div className="hidden lg:flex w-64 bg-white shadow-lg flex-col">
        {/* Logo/Brand */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-red-600">SHARPELY</h1>
          <p className="text-sm text-gray-600 mt-1">Safety Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item: any, index: number) => (
              <button
                key={index}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                  item.active
                    ? 'bg-red-50 text-red-600 border-l-4 border-red-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Online Status Toggle */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-900">Status</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
            <button
              onClick={toggleOnlineStatus}
              className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                isOnline
                  ? 'bg-gray-600 text-white hover:bg-gray-700'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isOnline ? 'Go Offline' : 'Go Online'}
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {isOnline ? 'Click to stop accepting rides' : 'Click to start accepting rides'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header - Desktop only */}
        <header className="hidden lg:block bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Safety Dashboard</h2>
              <p className="text-gray-600 mt-1">Your safety is our priority - stay protected while driving</p>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Map Section */}
          <div className="flex-1 p-4 lg:p-6">
            <div className="bg-white rounded-xl shadow-sm h-64 lg:h-full">
              {/* Map Header */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Live Map</h3>
                <p className="text-sm text-gray-600">Track your location and nearby ride requests</p>
              </div>
              
              {/* Map Area */}
              <div className="relative h-full bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 rounded-b-xl overflow-hidden">
                {/* Map placeholder */}
                <div className="absolute inset-0 opacity-70">
                  {/* Simulated map elements */}
                  <div className="absolute top-8 lg:top-20 left-4 lg:left-10">
                    <div className="w-3 h-3 lg:w-4 lg:h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                  </div>
                  <div className="absolute top-12 lg:top-32 right-8 lg:right-20">
                    <div className="w-4 h-4 lg:w-5 lg:h-5 bg-blue-600 rounded shadow-lg"></div>
                  </div>
                  <div className="absolute bottom-12 lg:bottom-32 left-1/3">
                    <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full shadow-lg"></div>
                  </div>
                  
                  {/* Your location indicator */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="w-5 h-5 lg:w-6 lg:h-6 bg-red-600 rounded-full border-3 lg:border-4 border-white shadow-lg"></div>
                      <div className="absolute -top-6 lg:-top-8 left-1/2 transform -translate-x-1/2">
                        <div className="bg-white px-2 py-1 lg:px-3 lg:py-1 rounded-full shadow-lg border">
                          <span className="text-xs font-medium text-gray-800">You</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
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
                    onClick={toggleOnlineStatus}
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
                      {isOnline ? 'Swipe to go offline and decline rides' : 'Swipe to go online and accept rides'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Menu Items */}
          <div className="w-full lg:w-96 p-4 lg:p-6">
            <div className="space-y-3 lg:space-y-4">
              {menuItems.map((item: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className="p-3 lg:p-4 flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 ${item.bgColor} rounded-lg mr-3 lg:mr-4 group-hover:scale-110 transition-transform`}>
                      <span className={`text-lg lg:text-xl ${item.iconColor}`}>{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1 text-sm lg:text-base">{item.title}</h4>
                      <p className="text-xs lg:text-sm text-gray-600 leading-snug">{item.subtitle}</p>
                    </div>
                    {item.arrow && (
                      <div className="ml-2 lg:ml-3 text-gray-400 group-hover:text-gray-600 transition-colors">
                        <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-around">
          {sidebarItems.slice(0, 4).map((item: any, index: number) => (
            <button
              key={index}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                item.active
                  ? 'text-red-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className="text-lg mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
          {/* Go online center button for mobile */}
          <button
            onClick={toggleOnlineStatus}
            className="flex flex-col items-center p-2 rounded-lg text-gray-600 bg-gray-100"
          >
            <span className="text-2xl mb-1">🔘</span>
            <span className="text-sm font-medium">Go online</span>
          </button>
        </div>
      </div>

      {/* Safety Modal Overlay */}
      {showSafetyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[80vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">For Your Safety</h2>
                <button
                  onClick={closeSafetyModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                This feature is to keep you safe and secured when driving
              </p>
            </div>

            {/* Safety Features */}
            <div className="px-6 pb-6">
              <div className="space-y-4">
                {safetyFeatures.map((feature: any, index: number) => (
                  <div key={index} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-12 h-12 bg-red-50 rounded-lg mr-4 flex-shrink-0">
                        <span className="text-xl text-red-600">{feature.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{feature.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={closeSafetyModal}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                >
                  Got it, Keep me Safe
                </button>
                <button
                  onClick={closeSafetyModal}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafetyDashboard;
