import React from 'react';
import type { LayoutProps } from '../__types';

const PatientsCardLayout: React.FC<LayoutProps> = ({
  isActive,
  filters,
  pagination,
}) => {
  console.log({ isActive, filters, pagination });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="text-muted-foreground text-center py-8">
        Card layout coming soon...
      </div>
    </div>
  );
};

export default PatientsCardLayout;
