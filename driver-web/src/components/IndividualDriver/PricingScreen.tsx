import React, { useState } from 'react';
import icons from '../../assets/icon';
import { RIDE_PRICE_RANGES, type PriceRange } from '../../constants';

interface PricingScreenProps {
  onBack: () => void;
  onNext: () => void;
  onNavigateToSuccess?: () => void;
}

// Using pricing constants from central configuration

const PricingScreen: React.FC<PricingScreenProps> = ({ onBack, onNext, onNavigateToSuccess }) => {
  const [prices, setPrices] = useState<Record<string, number>>(
    RIDE_PRICE_RANGES.reduce((acc: Record<string, number>, range: PriceRange) => {
      acc[range.id] = range.basePrice;
      return acc;
    }, {} as Record<string, number>)
  );

  const handlePriceChange = (rangeId: string, price: number) => {
    setPrices(prev => ({
      ...prev,
      [rangeId]: price,
    }));
  };

  const renderProgressBar = () => {
    return (
      <div className="flex items-center justify-center mt-4 space-x-2">
        <div className="h-1 w-12 lg:w-16 rounded-sm bg-red-600" />
        <div className="h-1 w-12 lg:w-16 rounded-sm bg-red-600" />
        <div className="h-1 w-12 lg:w-16 rounded-sm bg-red-600" />
        <div className="h-1 w-12 lg:w-16 rounded-sm bg-red-600" />
        <div className="h-1 w-12 lg:w-16 rounded-sm bg-red-600" />
      </div>
    );
  };

  const generatePriceOptions = (basePrice: number) => {
    const options = [];
    for (let i = basePrice - 500; i <= basePrice + 1500; i += 250) {
      if (i > 0) {
        options.push(i);
      }
    }
    return options;
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md lg:max-w-4xl bg-white rounded-2xl shadow-none lg:shadow-lg p-0 lg:p-10 flex flex-col items-center">
        {/* Header section */}
        <div className="w-full flex items-center mb-4 lg:mb-6">
          <button 
            className="p-0 bg-transparent border-none mr-4 cursor-pointer" 
            onClick={onBack}
          >
            <img src={icons.arrowBack} alt="Back" className="w-6 h-6 text-red-600" />
          </button>
          <div className="mt-2 flex-1">
            <div className="flex flex-col items-start">
              <span className="font-bold text-xl lg:text-2xl text-gray-900">Now, Let's set your price!</span>
              <span className="font-normal text-lg lg:text-xl text-gray-700 mt-1">Set Prices based on distance</span>
            </div>
            {renderProgressBar()}
          </div>
        </div>

        {/* Main content */}
        <div className="w-full mt-6 lg:max-w-lg lg:mx-auto">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (onNavigateToSuccess) {
                onNavigateToSuccess();
              } else {
                onNext();
              }
            }}
            className="space-y-6"
          >
            {RIDE_PRICE_RANGES.map((range: PriceRange) => (
              <div key={range.id} className="space-y-2">
                <div className="space-y-1">
                  <h3 className="font-medium text-base lg:text-lg text-gray-900">
                    {range.label} {range.description}
                  </h3>
                </div>
                <div className="relative">
                  <select
                    value={prices[range.id]}
                    onChange={(e) => handlePriceChange(range.id, parseInt(e.target.value))}
                    className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500 text-gray-600 bg-gray-50 appearance-none"
                  >
                    {generatePriceOptions(range.basePrice).map((price) => (
                      <option key={price} value={price}>
                        ₦ {price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <img src={icons.dropDown} alt="Dropdown" className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <div className="pt-8">
              <button 
                type="submit" 
                className="w-full bg-red-600 text-white rounded-xl p-4 font-bold text-lg border-none cursor-pointer transition-colors hover:bg-red-700"
              >
                Done
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PricingScreen;
