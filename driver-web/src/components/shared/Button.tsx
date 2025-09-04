import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="w-full max-w-md bg-gray-800 text-white rounded-xl p-4 font-bold text-lg mt-8 border-none cursor-pointer transition-colors hover:bg-gray-600 self-center"
    >
      {children}
    </button>
  );
};

export default Button;
