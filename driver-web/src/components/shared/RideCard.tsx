import React from 'react';

const IconMapPin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 21s-6-5.33-6-10a6 6 0 1112 0c0 4.67-6 10-6 10zm0-8a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
);
const IconClock = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

interface RideCardProps {
  date: string;
  price: string;
  pickupLocation: string;
  destination: string;
  distance: string;
  time: string;
  isAccepted?: boolean;
  onAccept: () => void;
}

const RideCard: React.FC<RideCardProps> = ({
  date,
  price,
  pickupLocation,
  destination,
  distance,
  time,
  isAccepted = false,
  onAccept
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 lg:p-6 mb-4">
      {/* Date */}
      <div className="text-gray-600 text-sm lg:text-base mb-3 lg:mb-4">
        {date}
      </div>

      {/* Price */}
      <div className="text-black font-bold text-xl lg:text-2xl mb-4 lg:mb-6">
        {price}
      </div>

      {/* Location Details */}
      <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
        {/* Pickup Location */}
        <div className="flex items-start space-x-3">
          <div className="w-4 h-4 lg:w-5 lg:h-5 mt-1 flex-shrink-0">
            <IconMapPin className="w-full h-full text-red-500" />
          </div>
          <span className="text-gray-900 text-sm lg:text-base font-medium">
            {pickupLocation}
          </span>
        </div>

        {/* Destination */}
        <div className="flex items-start space-x-3">
          <div className="w-4 h-4 lg:w-5 lg:h-5 mt-1 flex-shrink-0">
            <IconMapPin className="w-full h-full text-green-500" />
          </div>
          <div className="flex-1">
            <div className="text-gray-900 text-sm lg:text-base font-medium mb-1">
              {destination}
            </div>
            <div className="flex items-center space-x-4 text-xs lg:text-sm text-gray-600">
              <span>Pick-up: {distance}</span>
              <div className="flex items-center space-x-1">
                <IconClock className="w-3 h-3 lg:w-4 lg:h-4" />
                <span>Time: {time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accept/Accepted Button and Notification */}
      <div className="space-y-3">
        {/* Notification Message for Accepted Rides */}
        {isAccepted && (
          <div className="text-red-600 text-sm lg:text-base flex items-center">
            <span className="mr-1">⚠️</span>
            We will notify you on that day
          </div>
        )}

        {/* Button */}
        <div className="flex justify-end">
          <button
            onClick={isAccepted ? undefined : onAccept}
            disabled={isAccepted}
            className={`font-medium px-6 lg:px-8 py-2 lg:py-3 rounded-lg transition-colors text-sm lg:text-base ${
              isAccepted
                ? 'bg-green-600 text-white cursor-default'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {isAccepted ? 'Accepted' : 'Accept'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideCard;
