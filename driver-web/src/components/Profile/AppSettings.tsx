import React from 'react';
import { useNavigate } from 'react-router-dom';

const Row: React.FC<{ title: string; onClick?: () => void }> = ({ title, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between px-4 sm:px-6 py-4 text-left">
    <div className="text-gray-900 font-medium">{title}</div>
    <span className="w-2.5 h-2.5 border-r-2 border-t-2 border-gray-400 rotate-45" />
  </button>
);

const AppSettings: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 flex items-center">
        <button onClick={() => navigate(-1)} aria-label="Back" className="p-2 rounded-full hover:bg-gray-100">
          <span className="block w-4 h-4 border-l-2 border-b-2 border-gray-900 rotate-45 ml-1" />
        </button>
        <h1 className="flex-1 text-center text-xl font-extrabold text-gray-900 -ml-8">App Setting</h1>
      </div>

      <div className="mt-2 divide-y divide-rose-100 bg-rose-50">
        <Row title="Voice Over" onClick={() => navigate('/profile/settings/voice-over')} />
        <Row title="Sounds setting" />
        <Row title="Theme" onClick={() => navigate('/profile/settings/theme')} />
        <Row title="Language" onClick={() => navigate('/profile/settings/language')} />
      </div>
    </div>
  );
};

export default AppSettings;
