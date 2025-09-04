import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InviteFriends: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const code = 'JOHN43HIKS';

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 flex items-center">
        <button onClick={() => navigate(-1)} aria-label="Back" className="p-2 rounded-full hover:bg-gray-100">
          <span className="block w-4 h-4 border-l-2 border-b-2 border-gray-900 rotate-45 ml-1" />
        </button>
        <h1 className="flex-1 text-center text-xl font-extrabold text-gray-900 -ml-8">Invite Friends</h1>
      </div>

      {/* Body */}
      <div className="flex-1 px-6 pt-2 pb-8 max-w-md mx-auto w-full">
        <div className="flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-4xl">👤</div>
        </div>
        <h2 className="text-center text-2xl font-extrabold text-gray-900 mt-6 leading-tight">
          Invite your friends to drive
          <br /> with you!
        </h2>
        <p className="text-center text-gray-600 mt-3">And get 50% discounts off your returns to sharperly</p>

        {/* Filters row (mock) */}
        <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2"><span className="text-gray-400">🏷️</span> All categories</div>
          <div className="flex items-center gap-2"><span className="text-gray-400">📍</span> Within Nigeria</div>
        </div>

        {/* Invite CTA */}
        <button className="w-full mt-6 py-4 rounded-2xl bg-red-600 text-white font-extrabold text-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
          Invite Friends
        </button>

        {/* Referral code */}
        <div className="mt-6 bg-rose-50 rounded-xl p-4">
          <div className="text-center text-gray-700 mb-3">Copy referral code</div>
          <button onClick={copyCode} className="block mx-auto bg-white text-gray-900 font-extrabold rounded-xl px-6 py-3 shadow border border-gray-100">
            {code}
          </button>
          {copied && (
            <div className="text-center text-green-600 text-sm mt-2">Copied!</div>
          )}
        </div>

        {/* Benefit banners */}
        <div className="mt-6 space-y-3">
          <div className="rounded-xl bg-rose-50 border border-rose-100 p-4">
            <div className="font-semibold text-gray-900 flex items-center gap-2"><span className="text-red-500">🔔</span> 50% discount off your returns to sharperly for first 10 rides after referral</div>
            <div className="text-sm text-gray-600 mt-1">For every new driver you invite.</div>
          </div>
          <div className="rounded-xl bg-rose-50 border border-rose-100 p-4">
            <div className="text-sm text-gray-700">The driver you invite will also be getting 50% off their returns to sharperly on the first 5 rides</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteFriends;
