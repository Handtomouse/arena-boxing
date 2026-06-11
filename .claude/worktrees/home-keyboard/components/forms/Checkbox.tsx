'use client';

import React, { InputHTMLAttributes, useId } from 'react';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  required,
  className = '',
  ...props
}) => {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="w-full">
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          required={required}
          aria-required={required}
          aria-describedby={error ? errorId : undefined}
          className={`
            w-5 h-5 mt-0.5
            border-2 border-burgundy-primary
            bg-cream-primary
            text-blood-red
            focus:ring-2 focus:ring-blood-red focus:ring-offset-0
            cursor-pointer
            transition-all duration-300
            ${className}
          `}
          {...props}
        />

        <label
          htmlFor={id}
          className="font-[family-name:var(--font-body)] text-cream-primary text-base cursor-pointer flex-1"
        >
          {label} {required && <span aria-label="required">*</span>}
        </label>
      </div>

      {error && (
        <span id={errorId} role="alert" className="block mt-2 ml-8 text-sm text-blood-red">
          {error}
        </span>
      )}
    </div>
  );
};

export default Checkbox;
