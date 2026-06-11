import React from 'react';

export interface GridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 4 | 6 | 8 | 10 | 12;
  className?: string;
}

const Grid: React.FC<GridProps> = ({
  children,
  columns,
  gap = 8,
  className = '',
}) => {
  const columnClasses = columns
    ? {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      }[columns]
    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  const gapClasses = {
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10',
    12: 'gap-12',
  };

  return (
    <div
      className={`
        grid
        ${columnClasses}
        ${gapClasses[gap]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Grid;
