import React from 'react';
import { useNavigate } from 'react-router-dom';
import icons from '../assets/icon';

// Category type and style map to enforce consistent colors per category
type DispatchCategory = 'Food' | 'Document' | 'Fragile' | 'Others';

const CATEGORY_STYLES: Record<DispatchCategory, { chipBg: string; chipText: string }> = {
  Food: { chipBg: 'bg-red-500', chipText: 'text-white' },
  Document: { chipBg: 'bg-blue-600', chipText: 'text-white' },
  Fragile: { chipBg: 'bg-amber-400', chipText: 'text-amber-900' },
  Others: { chipBg: 'bg-emerald-400', chipText: 'text-emerald-900' },
};

interface HistoryItem {
  id: string;
  timePickup: string;
  pickup: string;
  timeDropoff: string;
  dropoff: string;
  distanceKm: number;
  rating: number;
  category: DispatchCategory;
}

const RECENT_DISPATCHES: HistoryItem[] = [
  { id: '1', timePickup: '12:45 pm', pickup: 'University of Calabar', timeDropoff: '12:45 pm', dropoff: 'Marian Market', distanceKm: 8.6, rating: 4.7, category: 'Food' },
  { id: '2', timePickup: '12:45 pm', pickup: 'University of Calabar', timeDropoff: '12:45 pm', dropoff: 'Marian Market', distanceKm: 8.6, rating: 4.7, category: 'Document' },
  { id: '3', timePickup: '12:45 pm', pickup: 'University of Calabar', timeDropoff: '12:45 pm', dropoff: 'Marian Market', distanceKm: 8.6, rating: 4.7, category: 'Fragile' },
  { id: '4', timePickup: '12:45 pm', pickup: 'University of Calabar', timeDropoff: '12:45 pm', dropoff: 'Marian Market', distanceKm: 8.6, rating: 4.7, category: 'Others' },
  { id: '5', timePickup: '12:45 pm', pickup: 'University of Calabar', timeDropoff: '12:45 pm', dropoff: 'Marian Market', distanceKm: 8.6, rating: 4.7, category: 'Fragile' },
  { id: '6', timePickup: '12:45 pm', pickup: 'University of Calabar', timeDropoff: '12:45 pm', dropoff: 'Marian Market', distanceKm: 8.6, rating: 4.7, category: 'Food' },
];

const HistoryScreen: React.FC = () => {
  const navigate = useNavigate();

  const renderHeader = () => (
    <div className="w-full flex items-center mb-4 lg:mb-6">
      <button
        className="p-0 bg-transparent border-none mr-4 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <img src={icons.arrowBack} alt="Back" className="w-6 h-6" />
      </button>
      <div className="mt-2 flex-1">
        <div className="flex flex-col items-start">
          <span className="font-bold text-xl lg:text-2xl text-gray-900">History</span>
          <span className="font-normal text-sm lg:text-base text-gray-700 mt-1">Recent Dispatches</span>
        </div>
      </div>
    </div>
  );

  const renderCard = (item: HistoryItem) => {
    const style = CATEGORY_STYLES[item.category];

    return (
      <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-stretch justify-between">
        {/* Left: timeline-like content */}
        <div className="flex-1">
          <div className="flex items-center text-gray-800">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
            <span className="text-xs font-semibold mr-2">{item.timePickup}</span>
            <span className="text-sm font-medium">{item.pickup}</span>
          </div>
          <div className="ml-4 pl-2 border-l border-dotted border-gray-300 my-2" />
          <div className="flex items-center text-gray-700">
            <span className="w-2 h-2 bg-gray-300 rounded-full mr-2" />
            <span className="text-xs font-semibold mr-2">{item.timeDropoff}</span>
            <span className="text-sm">{item.dropoff}</span>
          </div>
        </div>

        {/* Right: rating, distance, category chip */}
        <div className="w-28 flex flex-col items-end justify-between">
          <div className="flex items-center mb-3">
            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10 13.347l-2.985 2.134c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.38 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-semibold text-gray-800">{item.rating.toFixed(1)}</span>
          </div>
          <div className="text-xs text-gray-600 mb-3">{item.distanceKm} km</div>
          <div className={`px-3 py-2 rounded-lg ${style.chipBg} ${style.chipText} text-xs font-semibold rotate-90 origin-right`}>
            {item.category}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md lg:max-w-2xl bg-white rounded-2xl shadow-none lg:shadow-lg p-0 lg:p-10">
        {renderHeader()}

        <div className="w-full lg:max-w-2xl lg:mx-auto space-y-4">
          {RECENT_DISPATCHES.map(renderCard)}
        </div>
      </div>
    </div>
  );
};

export default HistoryScreen; 