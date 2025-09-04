import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WalletPinSheet from './WalletPinSheet';

const formatNameFromSlug = (slug?: string) => {
  if (!slug) return 'Recipient';
  return slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
};

const WalletTransferThread: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const name = formatNameFromSlug(slug);

  const [composerOpen, setComposerOpen] = useState(false);
  const [amountCents, setAmountCents] = useState<number>(0);
  const [narration, setNarration] = useState('');

  const formattedAmount = useMemo(() => {
    return `₦${(amountCents / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }, [amountCents]);

  const pressDigit = (d: number) => setAmountCents(v => Math.min(99999999999, v * 10 + d));
  const backspace = () => setAmountCents(v => Math.floor(v / 10));

  const [showPin, setShowPin] = useState(false);
  const handleSend = () => {
    if (amountCents <= 0) return;
    setComposerOpen(false);
    setShowPin(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500" aria-label="Back">
          <span className="block w-5 h-5 border-l-2 border-b-2 border-gray-900 rotate-45 ml-1" />
        </button>
        <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">K.</div>
        <h1 className="text-lg sm:text-xl font-extrabold text-gray-900">{name}</h1>
      </div>

      {/* Thread */}
      <div className="flex-1 px-6 py-6">
        <div className="text-xs text-gray-500 text-center mb-8">January 15, 2025</div>

        <div className="flex justify-end mb-10">
          <div className="bg-red-600 text-white rounded-xl px-4 py-3 shadow-md">
            <div className="font-bold">₦900.00</div>
            <div className="text-xs opacity-90">To myself</div>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center mb-4">12:34 pm</div>

        <div className="flex justify-end">
          <div className="bg-red-600 text-white rounded-xl px-4 py-3 shadow-md">
            <div className="font-bold">₦900.00</div>
            <div className="text-xs opacity-90">To myself</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-6">
        <button onClick={() => setComposerOpen(true)} className="w-full py-4 rounded-2xl bg-red-600 text-white font-extrabold text-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
          Send money
        </button>
      </div>

      {/* Composer bottom area */}
      {composerOpen && (
        <div className="fixed inset-x-0 bottom-0 bg-white border-t border-gray-200 shadow-2xl">
          <div className="px-5 pt-4 pb-6">
            <div className="text-center text-gray-400 text-sm mb-2">NGN Balance:{' '}<span className="text-gray-900 font-semibold">₦1000.00</span></div>

            {/* Amount row */}
            <div className="rounded-xl overflow-hidden border border-red-100">
              <div className="flex items-center justify-between px-4 py-3 bg-red-50">
                <div className="text-lg sm:text-xl font-extrabold text-gray-900">{formattedAmount}</div>
                <div className="text-gray-900 font-bold">NGN</div>
              </div>
              <div className="flex items-center">
                <input
                  value={narration}
                  onChange={(e) => setNarration(e.target.value)}
                  placeholder="Narration"
                  className="flex-1 px-4 py-3 outline-none text-gray-900 placeholder-gray-400"
                />
                <button
                  onClick={handleSend}
                  disabled={amountCents <= 0}
                  className={`px-6 py-3 font-bold ${amountCents > 0 ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                >
                  Send
                </button>
              </div>
            </div>

            {/* Keypad */}
            <div className="mt-6 grid grid-cols-3 gap-y-4 place-items-center select-none">
              {[1,2,3,4,5,6,7,8,9].map(n => (
                <button key={n} onClick={() => pressDigit(n)} className="w-14 h-14 rounded-full bg-gray-100 text-gray-900 text-xl font-bold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500">{n}</button>
              ))}
              <button className="w-14 h-14 rounded-full bg-gray-50 text-gray-400 text-xl font-bold" disabled>.</button>
              <button onClick={() => pressDigit(0)} className="w-14 h-14 rounded-full bg-gray-100 text-gray-900 text-xl font-bold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500">0</button>
              <button onClick={backspace} aria-label="Backspace" className="w-14 h-14 rounded-full bg-gray-100 text-gray-900 text-xl font-bold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500">⌫</button>
            </div>
          </div>
        </div>
      )}

      <WalletPinSheet
        isOpen={showPin}
        onClose={() => setShowPin(false)}
        onComplete={() => { setShowPin(false); navigate('/wallet'); }}
        validatePin={(p) => p === '1234'}
      />
    </div>
  );
};

export default WalletTransferThread;
