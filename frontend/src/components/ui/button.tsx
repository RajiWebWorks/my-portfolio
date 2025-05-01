'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  children,
  className,
  ...props
}) => {
  // Basic styling - you can enhance this with Tailwind variants later
  const baseStyle = "px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    ghost: "text-blue-500 hover:bg-blue-100 focus:ring-blue-500",
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 