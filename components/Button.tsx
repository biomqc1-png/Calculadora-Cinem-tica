import React from 'react';
import { ButtonProps } from '../types';

const Button: React.FC<ButtonProps> = ({ onClick, label, className, disabled = false }) => {
  const baseClasses = 'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out';
  const defaultClasses = disabled
    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
    : 'bg-blue-500 hover:bg-blue-700 text-white';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className || defaultClasses}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;