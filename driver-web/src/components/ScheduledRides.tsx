import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from './common';
import { useNavigation } from '../hooks';
import RideCard from './shared/RideCard';

// Mock data for scheduled rides
const initialScheduledRides = [
  {
    id: '1',
    date: '2 February, 2025',
    price: '₦3,600',
    pickupLocation: 'Near abc terminal, Marian Road.',
    destination: 'Lauren Ingram',
    distance: '7.6km',
    time: '2:30 pm',
    isAccepted: false
  },
  {
    id: '2',
    date: '14 February, 2025',
    price: '₦3,600',
    pickupLocation: 'Near abc terminal, Marian Road.',
    destination: 'Lauren Ingram',
    distance: '7.6km',
    time: '2:30 pm',
    isAccepted: false
  }
];

const ScheduledRides: React.FC = () => {
  const navigate = useNavigate();
  const { navigationItems, setActiveItem, addNavigationHandler } = useNavigation({ activeIndex: 1 }); // Set Earn as active
  const [scheduledRides, setScheduledRides] = React.useState(initialScheduledRides);

  React.useEffect(() => {
    setActiveItem(1); // Ensure Earn tab is active
    // Add navigation handler for Earn to go back to earn-more page
    addNavigationHandler(1, () => navigate('/earn-more'));
  }, [setActiveItem, addNavigationHandler, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAcceptRide = (rideId: string) => {
    setScheduledRides(prevRides =>
      prevRides.map(ride =>
        ride.id === rideId
          ? { ...ride, isAccepted: true }
          : ride
      )
    );
    console.log('Accepting ride:', rideId);
  };

  return (
    <AppLayout
      title="SHARPELY"
      subtitle="Driver Dashboard"
      navigationItems={navigationItems}
    >
      <div className="flex-1 bg-gray-50">
        {/* Mobile Header with back button */}
        <div className="lg:hidden bg-white p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="flex items-center justify-center w-8 h-8 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Go back"
              type="button"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Scheduled rides</h1>
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
            <h1 className="text-2xl font-bold text-gray-900">Scheduled rides</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {scheduledRides.length > 0 ? (
              <div className="space-y-4 lg:space-y-6">
                {scheduledRides.map((ride) => (
                  <RideCard
                    key={ride.id}
                    date={ride.date}
                    price={ride.price}
                    pickupLocation={ride.pickupLocation}
                    destination={ride.destination}
                    distance={ride.distance}
                    time={ride.time}
                    isAccepted={ride.isAccepted}
                    onAccept={() => handleAcceptRide(ride.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 lg:py-16">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 lg:w-20 lg:h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg lg:text-xl font-medium text-gray-900 mb-2">No scheduled rides</h3>
                <p className="text-gray-600 text-sm lg:text-base">Check back later for new scheduled ride opportunities.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ScheduledRides;
