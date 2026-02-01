'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'font-heading font-semibold rounded-kid touch-target inline-flex items-center justify-center transition-all duration-200';

  const variants = {
    primary: 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-kid hover:shadow-kid-hover hover:scale-105',
    secondary: 'bg-gradient-to-r from-mint to-sky text-foreground shadow-kid hover:shadow-kid-hover hover:scale-105',
    outline: 'border-2 border-primary-400 text-primary-500 hover:bg-primary-50 hover:scale-105',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed hover:scale-100'
    : 'cursor-pointer';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
    >
      {children}
    </motion.button>
  );
}
