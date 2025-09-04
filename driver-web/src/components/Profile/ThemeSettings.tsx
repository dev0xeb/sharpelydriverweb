import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'driver.theme';

type ThemeMode = 'light' | 'dark';

const RadioRow: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between px-4 sm:px-6 py-4 text-left bg-rose-50">
    <div className="text-gray-900 font-medium">{label}</div>
    <span className={`w-5 h-5 rounded-full border-2 ${active ? 'border-red-600' : 'border-gray-400'}`}>
      {active && <span className="block w-2.5 h-2.5 bg-red-600 rounded-full m-1" />}
    </span>
  </button>
);

const applyTheme = (mode: ThemeMode) => {
  const root = document.documentElement;
  if (mode === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
};

const ThemeSettings: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMode(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mode));
    applyTheme(mode);
  }, [mode]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 flex items-center">
        <button onClick={() => navigate(-1)} aria-label="Back" className="p-2 rounded-full hover:bg-gray-100">
          <span className="block w-4 h-4 border-l-2 border-b-2 border-gray-900 rotate-45 ml-1" />
        </button>
        <h1 className="flex-1 text-center text-xl font-extrabold text-gray-900 -ml-8">Theme</h1>
      </div>

      <div className="divide-y divide-white">
        <RadioRow label="Light mood" active={mode === 'light'} onClick={() => setMode('light')} />
        <div className="h-2 bg-white" />
        <RadioRow label="Dark mood" active={mode === 'dark'} onClick={() => setMode('dark')} />
      </div>
    </div>
  );
};

export default ThemeSettings;
