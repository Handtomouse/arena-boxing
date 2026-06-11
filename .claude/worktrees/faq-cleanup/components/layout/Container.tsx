import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = '2xl',
  padding = true,
  className = '',
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  const paddingClasses = padding ? 'px-4 sm:px-6 md:px-8' : '';

  return (
    <div
      className={`
        ${maxWidthClasses[maxWidth]}
        ${paddingClasses}
        mx-auto
        w-full
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;
