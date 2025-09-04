import React, { useEffect, useMemo, useState } from 'react';

interface WalletPinSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (pin: string) => void;
  length?: number;
  validatePin?: (pin: string) => boolean | Promise<boolean>;
}

const WalletPinSheet: React.FC<WalletPinSheetProps> = ({ isOpen, onClose, onComplete, length = 4, validatePin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (/^\d$/.test(e.key)) setPin(prev => (prev.length < length ? prev + e.key : prev));
      if (e.key === 'Backspace') setPin(prev => prev.slice(0, -1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, length, onClose]);

  useEffect(() => {
    const check = async () => {
      if (pin.length === length) {
        let ok = true;
        if (validatePin) {
          ok = await Promise.resolve(validatePin(pin));
        }
        if (ok) {
          onComplete(pin);
        } else {
          setError(true);
          setPin('');
          setTimeout(() => setError(false), 1500);
        }
      }
    };
    check();
  }, [pin, length, onComplete, validatePin]);

  const filled = useMemo(() => pin.length, [pin.length]);

  if (!isOpen) return null;

  const press = (n: number) => setPin(prev => (prev.length < length ? prev + String(n) : prev));

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} aria-hidden="true" />

      {/* Error toast */}
      {error && (
        <div className="absolute inset-0 flex items-start justify-center pt-24 pointer-events-none">
          <div className="bg-white rounded-2xl shadow-2xl px-6 py-4 text-center max-w-xs w-full">
            <div className="text-xl font-extrabold text-gray-900">Incorrect pin!</div>
            <div className="text-gray-500 text-sm mt-1">Please enter the correct pin</div>
          </div>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 flex justify-center p-3 sm:p-4">
        <div role="dialog" aria-modal="true" className="w-full max-w-xl bg-white rounded-t-3xl shadow-2xl border-t border-gray-100">
          <div className="px-6 pt-4 pb-2 flex items-center justify-between">
            <div className="text-center w-full">
              <div className="text-sm text-gray-500">Transaction Pin</div>
            </div>
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500">×</button>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-3 mt-1 mb-4">
            {Array.from({ length }).map((_, i) => (
              <span key={i} className={`w-3 h-3 rounded-full ${i < filled ? 'bg-green-500' : 'bg-gray-300'}`} />
            ))}
          </div>

          {/* Keypad */}
          <div className="px-6 pb-6">
            <div className="grid grid-cols-3 gap-y-4 place-items-center select-none">
              {[1,2,3,4,5,6,7,8,9].map(n => (
                <button key={n} onClick={() => press(n)} className="w-14 h-14 rounded-full bg-gray-100 text-gray-900 text-xl font-bold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500">{n}</button>
              ))}
              <button className="w-14 h-14 rounded-full bg-gray-50 text-gray-400 text-xl font-bold" disabled>.</button>
              <button onClick={() => press(0)} className="w-14 h-14 rounded-full bg-gray-100 text-gray-900 text-xl font-bold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500">0</button>
              <button onClick={() => setPin(p => p.slice(0, -1))} aria-label="Backspace" className="w-14 h-14 rounded-full bg-gray-100 text-gray-900 text-xl font-bold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500">⌫</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPinSheet;
