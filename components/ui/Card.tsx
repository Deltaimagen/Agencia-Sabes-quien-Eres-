
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-900 bg-opacity-50 backdrop-blur-sm border border-yellow-500/30 rounded-b-2xl shadow-2xl p-6 sm:p-8 ${className}`}>
      {children}
    </div>
  );
};
