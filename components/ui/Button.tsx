
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, isLoading = false, ...props }) => {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className="w-full font-cinzel tracking-wider bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
    >
      {isLoading ? 'Calculando...' : children}
    </button>
  );
};
