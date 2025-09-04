import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from './common';
import { useNavigation } from '../hooks';
import QuickActionCard from './shared/QuickActionCard';

const IconSignal: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20h2" /><path d="M6 20h2" /><path d="M10 20h2" /><path d="M14 20h2" /><path d="M18 20h2" />
  </svg>
);
const IconCalendar: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconUsers: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const EarnMore: React.FC = () => {
  const navigate = useNavigate();
  const { navigationItems, setActiveItem, addNavigationHandler } = useNavigation({ activeIndex: 1 }); // Set Earn as active

  React.useEffect(() => {
    setActiveItem(1); // Ensure Earn tab is active
    // Add navigation handler for Earn to stay on this page
    addNavigationHandler(1, () => navigate('/earn-more'));
  }, [setActiveItem, addNavigationHandler, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleGoOnline = () => {
    navigate('/dashboard');
  };

  const handleScheduleRide = () => {
    // Navigate to scheduled rides screen
    navigate('/scheduled-rides');
  };

  const handleReferFriend = () => {
    // Navigate to refer a friend functionality
    console.log('Refer a friend functionality');
  };

  return (
    <AppLayout
      title="SHARPELY"
      subtitle="Driver Dashboard"
      navigationItems={navigationItems}
    >
      <div className="flex-1 bg-white">
        {/* Mobile Header with back button */}
        <div className="lg:hidden bg-white p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="flex items-center justify-center w-8 h-8"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Earn more</h1>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-white p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Earn more</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 lg:p-8">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4 lg:space-y-6">
              {/* Go online card */}
              <QuickActionCard
                icon={IconSignal}
                title="Go online"
                subtitle="Go online to start accepting request and start earning"
                bgColorClassName="bg-red-50"
                iconColorClassName="text-red-600"
                onClick={handleGoOnline}
              />

              {/* Request for schedule ride card */}
              <QuickActionCard
                icon={IconCalendar}
                title="Request for schedule ride"
                subtitle="Scheduled rides gives you opportunity to earn more"
                bgColorClassName="bg-red-50"
                iconColorClassName="text-red-600"
                onClick={handleScheduleRide}
              />

              {/* Refer a Friend card */}
              <QuickActionCard
                icon={IconUsers}
                title="Refer a Friend"
                subtitle="Get 30% discount off your returns to Sharpely by inviting a friend to ride with you"
                bgColorClassName="bg-red-50"
                iconColorClassName="text-red-600"
                onClick={handleReferFriend}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default EarnMore;
