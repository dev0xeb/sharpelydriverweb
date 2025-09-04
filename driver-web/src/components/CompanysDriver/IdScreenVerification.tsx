import React from 'react';

interface IdScreenVerificationProps {
  onAccept: () => void;
}

const IdScreenVerification: React.FC<IdScreenVerificationProps> = ({ onAccept }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-auto shadow-xl border-2 border-dashed border-gray-300">
        {/* Notification Header */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center justify-center gap-2">
            Notification 
            <span className="text-orange-500">🔔</span>
          </h2>
        </div>

        {/* Notification Message */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-700 leading-relaxed">
            Your ID number has been sent to the admin. Kayago would like to monitor all activities.
          </p>
        </div>

        {/* Accept Button */}
        <div className="text-center">
          <button
            onClick={onAccept}
            className="bg-green-600 text-white font-bold py-3 px-8 rounded-xl border-none cursor-pointer transition-colors hover:bg-green-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdScreenVerification;
