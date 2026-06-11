import React from 'react';

export interface TaglineProps {
  children: React.ReactNode;
  className?: string;
}

const Tagline: React.FC<TaglineProps> = ({
  children,
  className = '',
}) => {
  return (
    <p
      className={`
        font-[family-name:var(--font-tagline)]
        text-xl sm:text-2xl md:text-3xl
        italic
        tracking-wide
        ${className}
      `}
    >
      {children}
    </p>
  );
};

export default Tagline;
