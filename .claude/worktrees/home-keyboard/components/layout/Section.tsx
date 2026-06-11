import React, { ElementType } from 'react';

export interface SectionProps {
  children: React.ReactNode;
  variant?: 'default' | 'dark' | 'burgundy';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  as?: ElementType;
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  variant = 'default',
  spacing = 'lg',
  as: Component = 'section',
  className = '',
}) => {
  const variantClasses = {
    default: 'bg-cream-primary text-charcoal-black',
    dark: 'bg-charcoal-black text-cream-primary grunge-texture',
    burgundy: 'bg-burgundy-primary text-cream-primary grunge-texture',
  };

  const spacingClasses = {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-20',
    xl: 'py-20 md:py-32',
  };

  return (
    <Component
      className={`
        ${variantClasses[variant]}
        ${spacingClasses[spacing]}
        ${className}
      `}
    >
      {children}
    </Component>
  );
};

export default Section;
