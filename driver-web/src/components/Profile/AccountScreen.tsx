import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccountScreen: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 flex items-center">
        <button onClick={() => navigate(-1)} aria-label="Back" className="p-2 rounded-full hover:bg-gray-100">
          <span className="block w-4 h-4 border-l-2 border-b-2 border-gray-900 rotate-45 ml-1" />
        </button>
        <h1 className="flex-1 text-center text-xl font-extrabold text-gray-900 -ml-8">Account</h1>
      </div>

      <div className="mt-2 divide-y divide-rose-100 bg-rose-50">
        <button onClick={() => navigate('/profile/account/documents')} className="w-full flex items-center justify-between px-4 sm:px-6 py-4 text-left">
          <div className="text-gray-900 font-medium">Document</div>
          <span className="w-2.5 h-2.5 border-r-2 border-t-2 border-gray-400 rotate-45" />
        </button>
        <button onClick={() => navigate('/profile/account/bank-details')} className="w-full flex items-center justify-between px-4 sm:px-6 py-4 text-left">
          <div className="text-gray-900 font-medium">Account details</div>
          <span className="w-2.5 h-2.5 border-r-2 border-t-2 border-gray-400 rotate-45" />
        </button>
      </div>

      <div className="px-4 sm:px-6 mt-6">
        <div className="rounded-xl bg-rose-50 border border-rose-100 p-4">
          <div className="font-semibold text-gray-900 flex items-center gap-2"><span className="text-red-500">🔔</span> Refer a Friend</div>
          <div className="text-sm text-gray-600 mt-1">Get 50% discount off your returns to sharperly by inviting a friend to drive with you</div>
        </div>
      </div>
    </div>
  );
};

export default AccountScreen;
