/**
 * Arena Boxing Button Component
 * Gothic/Grunge aesthetic with medieval banner shape
 * "Those Who Dare" design system
 */

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = `
    relative
    font-[family-name:var(--font-ui)]
    uppercase
    tracking-wide
    transition-all
    duration-300
    border-2
    overflow-hidden
    disabled:opacity-50
    disabled:cursor-not-allowed
    focus-visible:outline
    focus-visible:outline-3
    focus-visible:outline-[var(--blood-red)]
    focus-visible:outline-offset-2
  `;

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-12 py-6 text-lg',
  };

  const variantStyles = {
    primary: `
      bg-[var(--burgundy-primary)]
      text-[var(--cream-primary)]
      border-[var(--cream-primary)]
      hover:bg-[var(--blood-red)]
      hover:shadow-[var(--shadow-grunge)]
      hover:-translate-y-1
      active:translate-y-0
    `,
    secondary: `
      bg-[var(--cream-primary)]
      text-[var(--burgundy-primary)]
      border-[var(--burgundy-primary)]
      hover:bg-[var(--cream-light)]
      hover:shadow-[var(--shadow-grunge)]
    `,
    outline: `
      bg-transparent
      text-[var(--cream-primary)]
      border-[var(--cream-primary)]
      hover:bg-[var(--burgundy-primary)]
      hover:border-[var(--blood-red)]
      hover:text-[var(--cream-primary)]
    `,
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {/* Grunge texture overlay */}
      <span
        className="absolute inset-0 opacity-10 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: 'url(/textures/grunge-light.webp)',
          backgroundSize: 'cover'
        }}
        aria-hidden="true"
      />

      {/* Button content */}
      <span className="relative z-10">
        {children}
      </span>
    </button>
  );
}
