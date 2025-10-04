import { Badge } from '@repo/ui/components';
import React from 'react';

export const MultipleVisitBadge: React.FC = () => {
  return (
    <Badge
      variant="default"
      className="bg-purple-100 text-purple-700 uppercase rounded-full text-[10px]"
    >
      Multiple Visit
    </Badge>
  );
};

export const SingleVisitBadge: React.FC = () => {
  return (
    <Badge
      variant="default"
      className="bg-cyan-100 text-cyan-700 uppercase rounded-full text-[10px]"
    >
      Single Visit
    </Badge>
  );
};
