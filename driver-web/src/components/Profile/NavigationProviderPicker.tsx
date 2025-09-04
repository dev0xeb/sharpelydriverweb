import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'driver.navigation';

type NavProvider = 'Google Maps' | 'Apple Maps' | 'Waze' | 'In-app' | 'Sharperly Real-time tracking';

interface NavSettings {
  provider: NavProvider;
  autostart: boolean;
}

const NavigationProviderPicker: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<NavSettings>({ provider: 'Google Maps', autostart: false });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings(JSON.parse(raw));
    } catch {}
  }, []);

  const select = (provider: NavProvider) => {
    const next = { ...settings, provider };
    setSettings(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 flex items-center">
        <button onClick={() => navigate(-1)} aria-label="Back" className="p-2 rounded-full hover:bg-gray-100">
          <span className="block w-4 h-4 border-l-2 border-b-2 border-gray-900 rotate-45 ml-1" />
        </button>
        <h1 className="flex-1 text-center text-xl font-extrabold text-gray-900 -ml-8">Navigation options</h1>
      </div>

      {/* Banner */}
      <div className="bg-rose-50 text-center text-gray-700 text-sm px-6 py-6">
        <div className="max-w-md mx-auto">Set your preferred navigation option for easy location tracking</div>
      </div>

      <div className="px-4 sm:px-6 pt-6 space-y-6">
        {/* Sharperly option */}
        <button onClick={() => select('Sharperly Real-time tracking')} className="w-full flex items-start justify-between">
          <div>
            <div className="text-gray-900 font-semibold">Sharperly Real-time tracking</div>
            <p className="mt-1 text-xs text-gray-500 max-w-md">Makes finding location pretty easy by giving you access to the direct location</p>
          </div>
          <span className={`mt-1 w-5 h-5 rounded-full border-2 ${settings.provider === 'Sharperly Real-time tracking' ? 'border-red-600' : 'border-gray-300'}`}></span>
        </button>

        {/* Google maps */}
        <button onClick={() => select('Google Maps')} className="w-full flex items-start justify-between">
          <div>
            <div className="text-gray-900 font-semibold">Google map</div>
            <p className="mt-1 text-xs text-gray-500">Powered by google</p>
          </div>
          <span className={`mt-1 w-5 h-5 rounded-full border-2 ${settings.provider === 'Google Maps' ? 'border-red-600' : 'border-gray-300'}`}>
            {settings.provider === 'Google Maps' && <span className="block w-2.5 h-2.5 bg-red-600 rounded-full m-1" />}
          </span>
        </button>
      </div>
    </div>
  );
};

export default NavigationProviderPicker;
