import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IconX = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const IconLock = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

interface WalletPasscodeProps {
  length?: number;
  onComplete?: (code: string) => void;
  onClose?: () => void;
  onForgot?: () => void;
}

const WalletPasscode: React.FC<WalletPasscodeProps> = ({ length = 4, onComplete, onClose, onForgot }) => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string>('');

  const handleClose = () => {
    if (onClose) return onClose();
    navigate(-1);
  };

  const pressDigit = useCallback((d: number) => {
    setCode(prev => {
      if (prev.length >= length) return prev;
      const next = prev + String(d);
      return next;
    });
  }, [length]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') handleClose();
    if (/^\d$/.test(e.key)) pressDigit(Number(e.key));
    if (e.key === 'Backspace') setCode(prev => prev.slice(0, -1));
  }, [pressDigit]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (code.length === length) {
      if (onComplete) {
        onComplete(code);
      } else {
        navigate('/wallet');
      }
      const t = setTimeout(() => setCode(''), 200);
      return () => clearTimeout(t);
    }
  }, [code, length, onComplete, navigate]);

  const filled = useMemo(() => code.length, [code.length]);

  const digits = [1,2,3,4,5,6,7,8,9];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <button aria-label="Close" onClick={handleClose} className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500">
            <IconX className="w-5 h-5 text-black" />
          </button>
          <div />
        </div>

        {/* Lock icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
            <IconLock className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900">Enter your Wallet Passcode</h1>
        <p className="text-center text-sm text-gray-600 mt-2">Use your pin to continue the process</p>

        {/* Dots */}
        <div className="flex items-center justify-center gap-3 mt-4">
          {Array.from({ length }).map((_, i) => (
            <span key={i} className={`w-2.5 h-2.5 rounded-full ${i < filled ? 'bg-red-600' : 'bg-gray-300'}`} />
          ))}
        </div>

        {/* Keypad */}
        <div className="mt-10 grid grid-cols-3 gap-y-6 place-items-center">
          {digits.map((d) => (
            <button
              key={d}
              onClick={() => pressDigit(d)}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 flex items-center justify-center text-red-600 text-2xl font-bold shadow-[inset_0_1px_0_rgba(0,0,0,0.05)] hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label={`Digit ${d}`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Forgot */}
        <div className="mt-12 text-center">
          <button onClick={onForgot} className="text-black font-extrabold underline underline-offset-4 decoration-black/20">Forgot Passcode??</button>
        </div>
      </div>
    </div>
  );
};

export default WalletPasscode;
