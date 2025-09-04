import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="w-full max-w-md mb-4">
      <div className="font-medium text-sm text-gray-900 mb-3">{label}</div>
      <input
        {...props}
        className="w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500"
      />
    </div>
  );
};

export default Input;
