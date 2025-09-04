import React, { useState } from 'react';
// Inline icons
const IconArrowDownToLine = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 21h18" /><path d="M12 3v12" /><path d="M7 10l5 5 5-5" />
  </svg>
);
const IconArrowUpFromLine = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 21h18" /><path d="M12 21V9" /><path d="M17 14l-5-5-5 5" />
  </svg>
);
import { useNavigate } from 'react-router-dom';
import WalletWithdrawSheet from './WalletWithdrawSheet';

type TxType = 'credit' | 'debit';

interface TxItem {
  id: string;
  name: string;
  date: string;
  amount: number;
  type: TxType;
}

const txs: TxItem[] = [
  { id: 't1', name: 'Sharperly', date: 'March 15, 2023', amount: 900, type: 'credit' },
  { id: 't2', name: 'Jerry Buffer', date: 'March 15, 2023', amount: 850, type: 'debit' },
  { id: 't3', name: 'Deposit', date: 'March 15, 2023', amount: 1000, type: 'credit' },
];

const formatCurrency = (n: number) => `₦${n.toFixed(2)}`;

const WalletDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showWithdraw, setShowWithdraw] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between border-b border-gray-100">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Wallet</h1>
        <button className="px-4 py-2 text-sm font-semibold rounded-lg border border-red-500 text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500">
          Buy Airtime
        </button>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-8 max-w-5xl mx-auto">
        {/* Balance Card */}
        <div className="relative rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-6 sm:p-8 overflow-hidden shadow-sm">
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-red-100/70" />
          <div className="absolute -right-24 top-8 w-56 h-56 rounded-full bg-red-50" />
          <div className="relative">
            <div className="text-sm text-gray-900 font-semibold">Zaza wallet</div>
            <div className="mt-1 text-3xl sm:text-4xl font-extrabold text-gray-900">{formatCurrency(1000)}</div>
          </div>
          <div className="mt-6 flex items-center justify-end">
            <button onClick={() => setShowWithdraw(true)} className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500">
              Withdraw
            </button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Recent Transactions</h2>
            <button className="text-sm font-semibold text-gray-700 hover:text-gray-900">See all</button>
          </div>

          <div className="bg-red-50/50 rounded-2xl border border-red-100">
            {txs.map((tx, idx) => (
              <div
                key={tx.id}
                className={`flex items-center justify-between px-4 sm:px-6 py-5 ${idx !== txs.length - 1 ? 'border-b border-red-100' : ''}`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-rose-100 text-rose-600'}`}>
                    {tx.type === 'credit' ? (
                      <IconArrowDownToLine className="w-5 h-5" />
                    ) : (
                      <IconArrowUpFromLine className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{tx.name}</div>
                    <div className="text-xs text-gray-500">{tx.date}</div>
                  </div>
                </div>
                <div className="font-bold text-gray-900">{formatCurrency(tx.amount)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav spacer for mobile if needed */}
      <div className="h-16 lg:h-0" />

      <WalletWithdrawSheet
        isOpen={showWithdraw}
        onClose={() => setShowWithdraw(false)}
        onProceed={() => {
          setShowWithdraw(false);
          const slug = 'Jerry Buffer'.toLowerCase().replace(/\s+/g, '-');
          navigate(`/wallet/transfer/${slug}`);
        }}
        savedAccount={{ name: 'Jerry Buffer', bank: 'Kuda MFB', accountNumber: '37882633972' }}
      />
    </div>
  );
};

export default WalletDashboard;
