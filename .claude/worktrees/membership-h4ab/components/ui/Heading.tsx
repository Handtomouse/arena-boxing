import React from 'react';

export interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  uppercase?: boolean;
  gothic?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  className = '',
  uppercase = false,
  gothic = true,
}) => {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

  const baseClasses = gothic
    ? 'font-[family-name:var(--font-display)] tracking-wider'
    : 'font-[family-name:var(--font-body)]';

  const sizeClasses = {
    1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
    2: 'text-3xl sm:text-4xl md:text-5xl',
    3: 'text-2xl sm:text-3xl md:text-4xl',
    4: 'text-xl sm:text-2xl md:text-3xl',
    5: 'text-lg sm:text-xl md:text-2xl',
    6: 'text-base sm:text-lg md:text-xl',
  };

  const uppercaseClass = uppercase ? 'uppercase' : '';

  return (
    <Tag
      className={`
        ${baseClasses}
        ${sizeClasses[level]}
        ${uppercaseClass}
        ${className}
      `}
    >
      {children}
    </Tag>
  );
};

export default Heading;
