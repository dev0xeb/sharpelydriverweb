import React from 'react';
import icons from '../../assets/icon';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  showDropdownIcon?: boolean;
}

const Select: React.FC<SelectProps> = ({ 
  label, 
  options, 
  placeholder = 'Select an option',
  showDropdownIcon = false,
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full max-w-md mb-4 relative">
      {label && (
        <div className="font-medium text-sm text-gray-900 mb-3">{label}</div>
      )}
      <select
        {...props}
        className={`w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500 text-gray-600 ${className}`}
        defaultValue=""
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {showDropdownIcon && (
        <img
          src={icons.dropDown}
          alt="Dropdown"
          className="absolute right-5 top-12 transform -translate-y-1/2 w-6 h-6 pointer-events-none"
        />
      )}
    </div>
  );
};

export default Select;