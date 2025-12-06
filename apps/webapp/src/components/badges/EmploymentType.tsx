import { Badge } from '@repo/ui/components';
import React from 'react';

export const PartTimeBadge: React.FC = () => {
  return (
    <Badge
      variant="default"
      className="bg-orange-100 text-orange-400 uppercase rounded-full text-[10px]"
    >
      Part-Time
    </Badge>
  );
};

export const FullTimeBadge: React.FC = () => {
  return (
    <Badge
      variant="default"
      className="bg-teal-100 text-teal-600 uppercase rounded-full text-[10px]"
    >
      Full-Time
    </Badge>
  );
};
