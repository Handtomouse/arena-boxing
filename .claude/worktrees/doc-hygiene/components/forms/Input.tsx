'use client';

import React, { InputHTMLAttributes, useId } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helpText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helpText,
  required,
  className = '',
  ...props
}) => {
  const id = useId();
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block font-[family-name:var(--font-ui)] text-cream-primary uppercase tracking-wide text-sm mb-2"
      >
        {label} {required && <span aria-label="required">*</span>}
      </label>

      <input
        id={id}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={`${helpText ? helpId : ''} ${error ? errorId : ''}`.trim() || undefined}
        className={`
          w-full px-4 py-3
          bg-cream-primary text-charcoal-black
          border-2 border-burgundy-primary
          font-[family-name:var(--font-body)]
          transition-all duration-300
          focus:border-blood-red focus:outline-none focus:ring-0
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-blood-red' : ''}
          ${className}
        `}
        {...props}
      />

      {helpText && !error && (
        <span id={helpId} className="block mt-2 text-sm text-cream-dark">
          {helpText}
        </span>
      )}

      {error && (
        <span id={errorId} role="alert" className="block mt-2 text-sm text-blood-red">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
