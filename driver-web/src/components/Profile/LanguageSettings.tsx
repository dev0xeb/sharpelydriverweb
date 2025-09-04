import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'driver.language';

type Language = 'English (USA)' | 'Hausa' | 'Sound';

const RadioRow: React.FC<{ label: Language; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between px-4 sm:px-6 py-4 text-left">
    <div className="text-gray-900 font-medium">{label}</div>
    <span className={`w-5 h-5 rounded-full border-2 ${active ? 'border-red-600' : 'border-gray-400'}`}>
      {active && <span className="block w-2.5 h-2.5 bg-red-600 rounded-full m-1" />}
    </span>
  </button>
);

const LanguageSettings: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<Language>('English (USA)');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLang(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lang));
  }, [lang]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 flex items-center">
        <button onClick={() => navigate(-1)} aria-label="Back" className="p-2 rounded-full hover:bg-gray-100">
          <span className="block w-4 h-4 border-l-2 border-b-2 border-gray-900 rotate-45 ml-1" />
        </button>
        <h1 className="flex-1 text-center text-xl font-extrabold text-gray-900 -ml-8">Language</h1>
      </div>

      <div className="divide-y divide-rose-100 bg-rose-50">
        <RadioRow label="English (USA)" active={lang === 'English (USA)'} onClick={() => setLang('English (USA)')} />
        <RadioRow label="Hausa" active={lang === 'Hausa'} onClick={() => setLang('Hausa')} />
        <RadioRow label="Sound" active={lang === 'Sound'} onClick={() => setLang('Sound')} />
      </div>
    </div>
  );
};

export default LanguageSettings;
