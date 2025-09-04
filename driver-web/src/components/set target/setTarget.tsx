import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import icons from '../../assets/icon';

const SetTarget: React.FC = () => {
  const navigate = useNavigate();
  const [goalType, setGoalType] = useState<'Deliveries' | 'Earnings'>('Earnings');
  const [timeFrame, setTimeFrame] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [target, setTarget] = useState<string>('');

  // Normalize numeric value
  const targetNumber = useMemo(() => {
    const num = parseInt(target.replace(/[^0-9]/g, ''), 10);
    return Number.isFinite(num) ? num : 0;
  }, [target]);

  // Calculate equivalents assuming an average 4 weeks per month and 30 days per month
  const calculatedTargets = useMemo(() => {
    if (goalType !== 'Deliveries') {
      return { Daily: 0, Weekly: 0, Monthly: 0 };
    }

    let daily = 0, weekly = 0, monthly = 0;
    switch (timeFrame) {
      case 'Daily':
        daily = targetNumber;
        weekly = Math.round(targetNumber * 7);
        monthly = Math.round(targetNumber * 30);
        break;
      case 'Weekly':
        daily = Math.round(targetNumber / 7);
        weekly = targetNumber;
        monthly = Math.round(targetNumber * 4);
        break;
      case 'Monthly':
        daily = Math.round(targetNumber / 30);
        weekly = Math.round(targetNumber / 4);
        monthly = targetNumber;
        break;
      default:
        break;
    }
    return { Daily: daily, Weekly: weekly, Monthly: monthly };
  }, [goalType, timeFrame, targetNumber]);

  // Earnings equivalents
  const calculatedEarnings = useMemo(() => {
    if (goalType !== 'Earnings') {
      return { Daily: 0, Weekly: 0, Monthly: 0 };
    }

    let daily = 0, weekly = 0, monthly = 0;
    switch (timeFrame) {
      case 'Daily':
        daily = targetNumber;
        weekly = Math.round(targetNumber * 7);
        monthly = Math.round(targetNumber * 30);
        break;
      case 'Weekly':
        daily = Math.round(targetNumber / 7);
        weekly = targetNumber;
        monthly = Math.round(targetNumber * 4);
        break;
      case 'Monthly':
        daily = Math.round(targetNumber / 30);
        weekly = Math.round(targetNumber / 4);
        monthly = targetNumber;
        break;
      default:
        break;
    }
    return { Daily: daily, Weekly: weekly, Monthly: monthly };
  }, [goalType, timeFrame, targetNumber]);

  const isSaveDisabled = targetNumber <= 0;

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md lg:max-w-2xl bg-white rounded-2xl shadow-none lg:shadow-lg p-0 lg:p-10">
        {/* Header */}
        <div className="w-full flex items-center mb-4 lg:mb-6">
          <button
            className="p-0 bg-transparent border-none mr-4 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <img src={icons.arrowBack} alt="Back" className="w-6 h-6" />
          </button>
          <div className="mt-2 flex-1">
            <div className="flex flex-col items-start">
              <span className="font-bold text-xl lg:text-2xl text-gray-900">Set Target</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full lg:max-w-2xl lg:mx-auto">
          {/* Goal Type */}
          <div className="mb-6">
            <div className="font-bold text-lg text-gray-900 mb-3">Goal Type</div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setGoalType('Deliveries')}
                className={`${goalType === 'Deliveries' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} px-5 py-2 rounded-full font-medium transition-colors`}
              >
                Deliveries
              </button>
              <button
                onClick={() => setGoalType('Earnings')}
                className={`${goalType === 'Earnings' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} px-5 py-2 rounded-full font-medium transition-colors`}
              >
                Earnings
              </button>
            </div>
          </div>

          {/* Deliveries UI */}
          {goalType === 'Deliveries' && (
            <>
              {/* Target */}
              <div className="mb-6">
                <div className="font-bold text-lg text-gray-900 mb-2">Target</div>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter target"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className={`w-full p-4 rounded-xl border ${targetNumber > 0 ? 'border-gray-300 bg-white' : 'border-red-200 bg-red-50'} text-base outline-none transition-colors focus:border-blue-500`}
                />
              </div>

              {/* Time Frame */}
              <div className="mb-6">
                <div className="font-bold text-lg text-gray-900 mb-3">Time Frame</div>
                <div className="flex items-center gap-3">
                  {(['Daily', 'Weekly', 'Monthly'] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeFrame(tf)}
                      className={`${timeFrame === tf ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'} px-5 py-2 rounded-full font-medium transition-colors`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Targets */}
              <div className="mb-8">
                <div className="font-bold text-lg text-gray-900 mb-4">Calculated Targets</div>
                <div className="space-y-6">
                  {([
                    { label: 'Daily', value: calculatedTargets.Daily },
                    { label: 'Weekly', value: calculatedTargets.Weekly },
                    { label: 'Monthly', value: calculatedTargets.Monthly }
                  ] as const).map(({ label, value }) => (
                    <div key={label} className="flex items-start">
                      <div className="w-20 pt-1">
                        <span className="text-red-600 font-medium text-sm">{label}</span>
                      </div>
                      <div className="flex-1">
                        <div className="h-px bg-gray-200 mb-2" />
                        <p className="text-sm text-gray-700">
                          {value} deliveries
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Earnings UI */}
          {goalType === 'Earnings' && (
            <>
              {/* Target */}
              <div className="mb-6">
                <div className="font-bold text-lg text-gray-900 mb-2">Target</div>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter target"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className={`w-full p-4 rounded-xl border ${targetNumber > 0 ? 'border-gray-300 bg-white' : 'border-red-200 bg-red-50'} text-base outline-none transition-colors focus:border-blue-500`}
                />
              </div>

              {/* Time Frame */}
              <div className="mb-6">
                <div className="font-bold text-lg text-gray-900 mb-3">Time Frame</div>
                <div className="flex items-center gap-3">
                  {(['Daily', 'Weekly', 'Monthly'] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeFrame(tf)}
                      className={`${timeFrame === tf ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'} px-5 py-2 rounded-full font-medium transition-colors`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Targets */}
              <div className="mb-8">
                <div className="font-bold text-lg text-gray-900 mb-4">Calculated Targets</div>
                <div className="space-y-6">
                  {([
                    { label: 'Daily', value: calculatedEarnings.Daily },
                    { label: 'Weekly', value: calculatedEarnings.Weekly },
                    { label: 'Monthly', value: calculatedEarnings.Monthly }
                  ] as const).map(({ label, value }) => (
                    <div key={label} className="flex items-start">
                      <div className="w-20 pt-1">
                        <span className="text-red-600 font-medium text-sm">{label}</span>
                      </div>
                      <div className="flex-1">
                        <div className="h-px bg-gray-200 mb-2" />
                        <p className="text-sm text-gray-700">
                          #{value.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Save button */}
          <div className="mt-8">
            <button
              disabled={isSaveDisabled}
              className={`w-full rounded-xl font-bold text-lg py-4 transition-colors ${isSaveDisabled ? 'bg-red-300 text-white cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'}`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetTarget;
