import React, { useMemo, useState } from 'react';

interface WalletBankPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (bank: string) => void;
  banks?: string[];
}

const DEFAULT_BANKS = [
  'Kuda MFB',
  'Access Bank',
  'GTBank',
  'First Bank',
  'Zenith Bank',
  'UBA',
  'FCMB',
  'Union Bank',
  'Sterling Bank',
  'Keystone Bank',
  'Polaris Bank'
];

const WalletBankPicker: React.FC<WalletBankPickerProps> = ({ isOpen, onClose, onSelect, banks = DEFAULT_BANKS }) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return banks;
    return banks.filter(b => b.toLowerCase().includes(q));
  }, [banks, query]);

  if (!isOpen) return null;

  const mostlyUsed = banks.slice(0, Math.min(6, banks.length));

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-gray-100">
        <button onClick={onClose} aria-label="Back" className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500">
          <span className="block w-5 h-5 border-l-2 border-b-2 border-gray-900 rotate-45 ml-1" />
        </button>
        <h1 className="text-lg sm:text-xl font-extrabold text-gray-900">Choose Bank</h1>
      </div>

      {/* Search */}
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-3">
          <span className="w-4 h-4 mr-2 rounded-full border-2 border-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
          />
          {query && (
            <button onClick={() => setQuery('')} aria-label="Clear" className="ml-2 text-gray-500">×</button>
          )}
        </div>
      </div>

      {/* Mostly used */}
      <div className="px-4 sm:px-6">
        <div className="text-sm text-gray-600 mb-2">Mostly used</div>
        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          {mostlyUsed.map((b, i) => (
            <button key={b + i} onClick={() => { onSelect(b); onClose(); }} className="shrink-0 w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">K.</button>
          ))}
        </div>
      </div>

      {/* All */}
      <div className="px-4 sm:px-6 mt-4 mb-4 text-sm text-gray-600">All</div>
      <div className="flex-1 overflow-y-auto px-4 sm:px-6">
        <div className="divide-y divide-gray-100">
          {filtered.map((b) => (
            <button
              key={b}
              onClick={() => { onSelect(b); onClose(); }}
              className="w-full flex items-center gap-4 py-3 hover:bg-gray-50 rounded-lg"
            >
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">K.</div>
              <div className="text-gray-900 font-medium">{b}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletBankPicker;
