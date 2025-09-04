import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icons from '../assets/icon';

interface OnTransitScreenProps {
  onBack?: () => void;
  onEndRide?: () => void;
  onEmergencyCall?: () => void;
}

const OnTransitScreen: React.FC<OnTransitScreenProps> = ({
  onBack: _onBack,
  onEndRide,
  onEmergencyCall: _onEmergencyCall
}) => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  const sidebarItems = [
{ icon: icons.Home, label: 'Home', active: true, onClick: undefined },
  { icon: icons.Earn, label: 'Earn', active: false, onClick: undefined },
  { icon: icons.History2, label: 'History', active: false, onClick: undefined },
  { icon: icons.profile, label: 'Profile', active: false, onClick: undefined },
  ];

  const handleEndRide = () => {
    if (onEndRide) {
      onEndRide();
    }
  };



  const handleCall = () => {
    navigate('/outgoing-call');
  };

  const handleMessage = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-red-600">SHARPELY</h1>
            <p className="text-xs text-gray-600">On Transit</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {isOnline ? 'Online' : 'Offline'}
          </div>
        </div>
      </div>

      {/* Left Sidebar - Hidden on mobile */}
      <div className="hidden lg:flex w-64 bg-white shadow-lg flex-col">
        {/* Logo/Brand */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-red-600">SHARPELY</h1>
          <p className="text-sm text-gray-600 mt-1">On Transit</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={
                item.label === 'Home' ? () => navigate('/dashboard') :
                item.label === 'History' ? () => navigate('/history') :
                undefined
                }
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                  item.active
                    ? 'bg-red-50 text-red-600 border-l-4 border-red-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <img className="text-xl mr-3" src={item.icon} alt={item.label} />
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
              {isOnline ? 'Click to stop accepting deliveries' : 'Click to start accepting deliveries'}
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
              <h2 className="text-2xl font-bold text-gray-900">Delivery in Transit</h2>
              <p className="text-gray-600 mt-1">You are currently delivering to your destination</p>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Map Section */}
          <div className="flex-1 relative">
            {/* Map Area */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 overflow-hidden">
              {/* Map placeholder with realistic elements */}
              <div className="absolute inset-0">
                {/* Streets and roads simulation */}
                <div className="absolute top-0 left-0 w-full h-full">
                  {/* Horizontal roads */}
                  <div className="absolute top-1/4 left-0 w-full h-2 bg-gray-300 opacity-60"></div>
                  <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-300 opacity-60"></div>
                  <div className="absolute top-3/4 left-0 w-full h-2 bg-gray-300 opacity-60"></div>
                  
                  {/* Vertical roads */}
                  <div className="absolute top-0 left-1/4 w-2 h-full bg-gray-300 opacity-60"></div>
                  <div className="absolute top-0 left-1/2 w-2 h-full bg-gray-300 opacity-60"></div>
                  <div className="absolute top-0 right-1/4 w-2 h-full bg-gray-300 opacity-60"></div>
                </div>

                {/* Building blocks */}
                <div className="absolute top-8 left-8 w-16 h-12 bg-gray-200 opacity-70 rounded"></div>
                <div className="absolute top-20 right-12 w-20 h-16 bg-gray-200 opacity-70 rounded"></div>
                <div className="absolute bottom-20 left-12 w-14 h-18 bg-gray-200 opacity-70 rounded"></div>
                <div className="absolute bottom-8 right-8 w-18 h-14 bg-gray-200 opacity-70 rounded"></div>

                {/* Business District Label */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white bg-opacity-80 px-3 py-1 rounded text-sm text-gray-700 font-medium">
                    BUSINESS DISTRICT
                  </div>
                </div>

                {/* Location markers */}
                <div className="absolute top-32 left-1/3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full shadow-lg"></div>
                </div>

                {/* Pickup location (completed - green) */}
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="w-8 h-8 bg-green-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-2 h-2 bg-green-600 rotate-45"></div>
                    </div>
                  </div>
                </div>

                {/* Destination marker (active - pulsing green) */}
                <div className="absolute bottom-1/3 right-1/3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-green-600 rounded-full border-2 border-white shadow-lg animate-pulse flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-2 h-2 bg-green-600 rotate-45"></div>
                    </div>
                  </div>
                </div>

                {/* NPC Limited Towers marker */}
                <div className="absolute top-1/4 left-1/6">
                  <div className="bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-600">
                    NPC Limited Towers, Abuja
                  </div>
                </div>

                {/* Ceddi Plaza marker */}
                <div className="absolute top-1/3 right-1/6">
                  <div className="bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-600 flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-1"></div>
                    Ceddi Plaza
                  </div>
                </div>

                {/* Sahad Stores marker */}
                <div className="absolute bottom-1/2 left-1/3">
                  <div className="bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-600 flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-1"></div>
                    Sahad Stores Head Quarters
                  </div>
                </div>

                {/* Liz Continental marker */}
                <div className="absolute bottom-1/3 left-1/8">
                  <div className="bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-600 flex items-center">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mr-1"></div>
                    Liz Continental
                  </div>
                </div>

                {/* Abuja conference marker (from image) */}
                <div className="absolute bottom-16 right-4">
                  <div className="bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-600 flex items-center">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-1"></div>
                    Abuja conf
                  </div>
                </div>

                {/* Your location indicator (moving towards destination) */}
                <div className="absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
                  <div className="relative">
                    <div className="w-5 h-5 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse">
                      <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                    </div>
                  </div>
                </div>

                {/* Delivery route line */}
                <div className="absolute top-1/3 left-1/2 bottom-1/3 right-1/3">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path 
                      d="M 10 10 Q 50 50 90 90" 
                      stroke="#3B82F6" 
                      strokeWidth="2" 
                      fill="none" 
                      strokeDasharray="5,5"
                      className="animate-pulse opacity-70"
                    />
                  </svg>
                </div>

                {/* Green area (park/open space) */}
                <div className="absolute bottom-4 left-1/4 w-24 h-16 bg-green-200 opacity-60 rounded-lg"></div>
              </div>
              
              {/* Status overlay */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-white px-4 py-2 rounded-full shadow-lg">
                  <span className="text-gray-800 font-medium">Online</span>
                </div>
              </div>
            </div>

            {/* End Ride Button */}
            <div className="absolute bottom-0 left-0 right-0">
              <div className="bg-red-600 text-white p-4">
                <button
                  onClick={handleEndRide}
                  className="w-full flex items-center justify-center py-3 font-bold text-lg hover:bg-red-700 transition-colors"
                >
                  <span className="mr-2">»</span>
                  End Ride
                  <span className="ml-2">»</span>
                </button>
                <p className="text-center text-red-100 text-sm mt-1">
                  Swipe to end delivery
                </p>
              </div>
            </div>
          </div>

          {/* Transit Status and Details Card */}
          <div className="bg-white border-t border-gray-200 p-4">
            {/* On Transit Status */}
            <div className="mb-4 flex items-center">
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                On Transit
              </div>
              <span className="text-gray-700 font-medium">You are on your way to</span>
            </div>

            {/* Destination */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 bg-green-600 rounded-full mr-3 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="font-bold text-gray-900 text-lg">Lauren Ingram</span>
              </div>
              <div className="ml-7">
                <p className="text-sm text-gray-600"><strong>Distance:</strong> 7.5km</p>
                <p className="text-sm text-gray-600"><strong>Time:</strong> 15min ride - arrive at 12:30pm</p>
              </div>
            </div>

            {/* Emergency Contact Buttons */}
            <div className="flex space-x-4 mt-6">
              <button 
                onClick={handleCall}
                className="flex-1 flex items-center justify-center py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <div className="w-6 h-6 bg-white rounded-full mr-2 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </button>
              <button 
                onClick={handleMessage}
                className="flex-1 flex items-center justify-center py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <div className="w-6 h-6 bg-white rounded-full mr-2 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-around">
          {sidebarItems.map((item, index) => (
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
          {/* Go online center button - active state */}
          <button
            onClick={toggleOnlineStatus}
            className="flex flex-col items-center p-2 rounded-lg bg-red-600 text-white"
          >
            <div className="w-6 h-6 bg-white rounded-full mb-1 flex items-center justify-center">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            </div>
            <span className="text-xs font-medium">Go online</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnTransitScreen;
