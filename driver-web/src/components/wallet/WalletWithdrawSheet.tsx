import React, { useEffect, useState } from 'react';
import WalletBankPicker from './WalletBankPicker';

interface WalletWithdrawSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: (selection: 'saved' | 'others') => void;
  savedAccount: {
    name: string;
    bank: string;
    accountNumber: string;
  };
}

const WalletWithdrawSheet: React.FC<WalletWithdrawSheetProps> = ({ isOpen, onClose, onProceed, savedAccount }) => {
  const [selection, setSelection] = useState<'saved' | 'others'>('saved');
  const [step, setStep] = useState<'select' | 'form'>('select');
  const [bank, setBank] = useState('');
  const [account, setAccount] = useState('');
  const [showBankPicker, setShowBankPicker] = useState(false);
  const [validation, setValidation] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [resolvedName, setResolvedName] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (selection === 'others') setStep('form');
  }, [selection]);

  useEffect(() => {
    // Reset validation when bank changes or account changes length
    setValidation('idle');
    setResolvedName(null);
  }, [bank]);

  useEffect(() => {
    if (bank && account.length === 10) {
      setValidation('checking');
      const t = setTimeout(() => {
        // Simple deterministic check: even checksum valid
        const sum = account.split('').reduce((s, d) => s + Number(d), 0);
        const ok = sum % 2 === 0;
        if (ok) {
          setValidation('valid');
          setResolvedName('Jerry Buffer');
        } else {
          setValidation('invalid');
          setResolvedName(null);
        }
      }, 250);
      return () => clearTimeout(t);
    }
  }, [bank, account]);

  if (!isOpen) return null;

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setAccount(text.replace(/\D/g, '').slice(0, 10));
    } catch {}
  };

  const handleProceed = () => {
    if (step === 'select') {
      onProceed(selection);
    } else {
      if (!bank || account.length < 10 || validation !== 'valid') return;
      onProceed('others');
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      <div className="absolute bottom-0 inset-x-0 flex justify-center p-3 sm:p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="wallet-withdraw-title"
          className={`w-full max-w-xl ${step === 'select' ? 'bg-red-600 text-white' : 'bg-white text-gray-900'} rounded-t-[32px] sm:rounded-t-[40px] shadow-2xl overflow-hidden`}
        >
          {step === 'select' ? (
            <div className="px-6 sm:px-8 pt-6 pb-4">
              <h3 id="wallet-withdraw-title" className="text-2xl font-bold text-center">Account details</h3>

              {/* Saved account option */}
              <label className="mt-8 block cursor-pointer select-none">
                <div className="flex items-start gap-4">
                  <input
                    type="radio"
                    name="withdraw-account"
                    className="mt-1 h-5 w-5 accent-white"
                    checked={selection === 'saved'}
                    onChange={() => { setSelection('saved'); setStep('select'); }}
                  />
                  <div className="flex-1">
                    <div className="text-lg font-semibold">{savedAccount.name}</div>
                    <div className="text-white/90 text-base mt-1">
                      {savedAccount.bank} | {savedAccount.accountNumber}
                    </div>
                  </div>
                </div>
              </label>

              <div className="mt-5 border-t border-white/40" />

              {/* Others option */}
              <label className="mt-6 block cursor-pointer select-none">
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="withdraw-account"
                    className="h-5 w-5 accent-white"
                    checked={selection === 'others'}
                    onChange={() => { setSelection('others'); setStep('form'); }}
                  />
                  <div className="text-lg font-semibold">Others</div>
                </div>
              </label>

              <div className="mt-8 bg-white rounded-2xl p-4">
                <button
                  onClick={handleProceed}
                  className="w-full py-4 rounded-xl bg-white text-gray-900 font-extrabold text-lg tracking-wide border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white/60"
                >
                  Proceed
                </button>
              </div>
            </div>
          ) : (
            <div className="px-5 sm:px-6 pt-5 pb-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <button onClick={() => setStep('select')} aria-label="Back" className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500">
                  <span className="block w-4 h-4 border-l-2 border-b-2 border-gray-900 rotate-45 ml-1" />
                </button>
                <h3 className="text-lg sm:text-xl font-extrabold">Enter Details</h3>
              </div>

              {/* Bank select */}
              <div className="space-y-5">
                <button
                  onClick={() => setShowBankPicker(true)}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 bg-white text-left text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {bank || 'Select bank'}
                </button>

                {/* Account number */}
                <div className="relative">
                  <input
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    value={account}
                    onChange={(e) => setAccount(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter your account number"
                    className={`w-full rounded-2xl border px-4 py-3 pr-16 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 ${validation === 'invalid' ? 'border-red-500 text-red-600' : 'border-gray-300 text-gray-900'}`}
                  />
                  <button onClick={pasteFromClipboard} type="button" className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500">Paste</button>
                </div>

                {/* Status text */}
                {validation === 'invalid' && (
                  <div className="text-sm text-red-600 mt-2">Incorrect account number or wrong bank</div>
                )}
                {validation === 'valid' && resolvedName && (
                  <div className="text-sm text-green-600 mt-2">{resolvedName}</div>
                )}
              </div>

              <div className="mt-8">
                <button
                  onClick={handleProceed}
                  disabled={!bank || account.length < 10 || validation !== 'valid'}
                  className={`w-full py-4 rounded-xl font-extrabold text-lg ${!bank || account.length < 10 || validation !== 'valid' ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'} focus:outline-none focus:ring-2 focus:ring-red-500`}
                >
                  Proceed
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <WalletBankPicker
        isOpen={showBankPicker}
        onClose={() => setShowBankPicker(false)}
        onSelect={(b) => { setBank(b); setShowBankPicker(false); }}
      />
    </div>
  );
};

export default WalletWithdrawSheet;
