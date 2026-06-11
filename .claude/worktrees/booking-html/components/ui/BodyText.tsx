import React from 'react';

export interface BodyTextProps {
  children: React.ReactNode;
  size?: 'sm' | 'base' | 'lg';
  color?: 'primary' | 'secondary' | 'muted';
  className?: string;
}

const BodyText: React.FC<BodyTextProps> = ({
  children,
  size = 'base',
  color = 'primary',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-sm md:text-base',
    base: 'text-base md:text-lg',
    lg: 'text-lg md:text-xl',
  };

  const colorClasses = {
    primary: 'text-charcoal-black',
    secondary: 'text-cream-primary',
    muted: 'text-cream-dark',
  };

  return (
    <p
      className={`
        font-[family-name:var(--font-body)]
        leading-relaxed
        ${sizeClasses[size]}
        ${colorClasses[color]}
        ${className}
      `}
    >
      {children}
    </p>
  );
};

export default BodyText;
