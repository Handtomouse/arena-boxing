'use client';

import React, { TextareaHTMLAttributes, useId, useState } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  required,
  maxLength,
  className = '',
  rows = 4,
  ...props
}) => {
  const id = useId();
  const errorId = `${id}-error`;
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const showCharCount = maxLength && charCount >= maxLength * 0.8;

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block font-[family-name:var(--font-ui)] text-cream-primary uppercase tracking-wide text-sm mb-2"
      >
        {label} {required && <span aria-label="required">*</span>}
      </label>

      <textarea
        id={id}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        maxLength={maxLength}
        rows={rows}
        className={`
          w-full px-4 py-3
          bg-cream-primary text-charcoal-black
          border-2 border-burgundy-primary
          font-[family-name:var(--font-body)]
          transition-all duration-300
          resize-y min-h-[100px] max-h-[500px]
          focus:border-blood-red focus:outline-none focus:ring-0
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-blood-red' : ''}
          ${className}
        `}
        {...props}
        onChange={handleChange}
      />

      <div className="flex justify-between items-center mt-2">
        {error && (
          <span id={errorId} role="alert" className="text-sm text-blood-red">
            {error}
          </span>
        )}
        {!error && <span />}

        {showCharCount && (
          <span className="text-sm text-cream-dark">
            {charCount} / {maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default Textarea;
