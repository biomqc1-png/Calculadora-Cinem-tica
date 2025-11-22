import React from 'react';
import { InputProps } from '../types';

const Input: React.FC<InputProps> = ({ label, value, onChange, placeholder, type = 'number', step = 'any' }) => {
  return (
    <div className="mb-4">
      <label htmlFor={label} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        id={label}
        type={type}
        step={step}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
        aria-label={label}
      />
    </div>
  );
};

export default Input;