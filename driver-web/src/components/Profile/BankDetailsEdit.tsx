import React, { useState } from 'react';

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className={`w-full rounded-2xl border border-gray-300 px-4 py-4 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 ${props.className || ''}`}
  />
);

const SelectLike: React.FC<{ value: string; onClick: () => void; placeholder?: string }> = ({ value, onClick, placeholder }) => (
  <button onClick={onClick} className="w-full rounded-2xl border border-gray-300 px-4 py-4 bg-white text-left text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500">
    <div className="flex items-center justify-between">
      <span className={value ? '' : 'text-gray-400'}>{value || placeholder}</span>
      <span className="w-2.5 h-2.5 border-r-2 border-t-2 border-gray-400 rotate-45" />
    </div>
  </button>
);

const BankDetailsEdit: React.FC = () => {
  const [bank] = useState('');
  const [bvn, setBvn] = useState('');
  const [account, setAccount] = useState('');
  const [nin, setNin] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 sm:px-6 py-6 max-w-md mx-auto">
      <h1 className="text-xl font-extrabold text-gray-900 mb-6">Edit Bank Details</h1>

      {/* Bank Verification */}
      <div className="mb-6">
        <h2 className="text-lg font-extrabold text-gray-900">Bank Verification</h2>
        <p className="text-sm text-gray-600 mt-1">Please enter your right bank details and cross check properly before moving on to the next.</p>

        <div className="mt-4 space-y-4">
          <SelectLike value={bank} onClick={() => {}} placeholder="Bank name" />
          <Input value={bvn} onChange={(e) => setBvn(e.target.value)} placeholder="Bank verification number" />
          <Input value={account} onChange={(e) => setAccount(e.target.value)} placeholder="Bank account number" />
          <Input value={nin} onChange={(e) => setNin(e.target.value)} placeholder="National Identification Number(NIN)" />
        </div>
      </div>

      {/* Security */}
      <div className="mb-6">
        <h2 className="text-lg font-extrabold text-gray-900">Security</h2>
        <p className="text-sm text-gray-600 mt-1">Enter security password and pin to be able to gain access to your wallet (DO NOT FORGET THIS INFORMATION)</p>
        <div className="mt-4 space-y-4">
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <Input inputMode="numeric" maxLength={4} value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0,4))} placeholder="4-digit pin" />
        </div>
      </div>

      <button className="w-full py-4 rounded-2xl bg-gray-800 text-white font-extrabold text-lg">Done</button>
    </div>
  );
};

export default BankDetailsEdit;
