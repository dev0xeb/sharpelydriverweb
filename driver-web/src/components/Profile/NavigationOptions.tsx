import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'driver.navigation';

type NavProvider = 'Google Maps' | 'Apple Maps' | 'Waze' | 'In-app';

interface NavSettings {
  provider: NavProvider;
  autostart: boolean;
}

const DEFAULT_SETTINGS: NavSettings = {
  provider: 'Google Maps',
  autostart: false,
};


const NavigationOptions: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<NavSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const providerLabel = useMemo(() => settings.provider, [settings.provider]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 flex items-center">
        <button onClick={() => navigate(-1)} aria-label="Back" className="p-2 rounded-full hover:bg-gray-100">
          <span className="block w-4 h-4 border-l-2 border-b-2 border-gray-900 rotate-45 ml-1" />
        </button>
        <h1 className="flex-1 text-center text-xl font-extrabold text-gray-900 -ml-8">Navigation options</h1>
      </div>

      {/* Options list */}
      <div className="mt-2 divide-y divide-rose-100 bg-rose-50">
        <button
          onClick={() => navigate('/profile/navigation/default')}
          className="w-full flex items-center justify-between px-4 sm:px-6 py-4 text-left"
        >
          <div>
            <div className="text-gray-900 font-medium">Select default navigation</div>
            <div className="text-sm text-gray-500 mt-0.5">{providerLabel}</div>
          </div>
          <span className="w-2.5 h-2.5 border-r-2 border-t-2 border-gray-400 rotate-45" />
        </button>

        <div className="w-full flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="text-gray-900 font-medium">Auto-start navigation</div>
          <button
            aria-label="Toggle auto-start navigation"
            onClick={() => setSettings((s) => ({ ...s, autostart: !s.autostart }))}
            className={`w-6 h-6 rounded-full border-2 ${settings.autostart ? 'border-red-600' : 'border-gray-400'}`}
          >
            {settings.autostart && <span className="block w-3 h-3 bg-red-600 rounded-full m-[3px]" />}
          </button>
        </div>
      </div>


      <div className="h-12" />
    </div>
  );
};

export default NavigationOptions;
