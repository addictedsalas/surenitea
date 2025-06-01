import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'font-sofia font-bold transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2';
  
  const sizeStyles = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  const variantStyles = {
    primary: 'text-white rounded-full',
    secondary: 'text-white rounded-full',
    outline: 'bg-transparent border-2 rounded-full',
  };

  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`;

  const getBackgroundColor = () => {
    if (variant === 'primary') return 'var(--color-coral)';
    if (variant === 'secondary') return 'var(--color-surenitea-700)';
    return 'transparent';
  };

  const getBorderColor = () => {
    if (variant === 'outline') return 'var(--color-coral)';
    return 'transparent';
  };

  const getTextColor = () => {
    if (variant === 'outline') return 'var(--color-coral)';
    return 'white';
  };

  const buttonStyles = {
    backgroundColor: getBackgroundColor(),
    borderColor: getBorderColor(),
    color: getTextColor(),
  };

  if (href && !disabled) {
    return (
      <Link href={href} className={combinedClassName} style={buttonStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
      style={buttonStyles}
    >
      {children}
    </button>
  );
}
