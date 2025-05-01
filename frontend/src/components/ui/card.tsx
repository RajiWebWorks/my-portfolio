import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className || ''}`}>
      {children}
    </div>
  );
};

export default Card;

// You can add sub-components like CardHeader, CardContent, CardFooter if needed
/*
export const CardHeader: React.FC<CardProps> = ({ children, className }) => (
  <div className={`p-4 border-b ${className || ''}`}>{children}</div>
);

export const CardContent: React.FC<CardProps> = ({ children, className }) => (
  <div className={`p-4 ${className || ''}`}>{children}</div>
);

export const CardFooter: React.FC<CardProps> = ({ children, className }) => (
  <div className={`p-4 border-t bg-gray-50 ${className || ''}`}>{children}</div>
);
*/ 