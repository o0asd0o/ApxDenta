import { Badge } from '@repo/ui/components';
import React from 'react';

export const PartTimeBadge: React.FC = () => {
  return (
    <Badge
      variant="default"
      className="bg-[#FCE6C0] text-orange-400 uppercase rounded-full text-[10px]"
    >
      Part-Time
    </Badge>
  );
};

export const FullTimeBadge: React.FC = () => {
  return (
    <Badge
      variant="default"
      className="bg-[#ECF8F3] text-green-600 uppercase rounded-full text-[10px]"
    >
      Full-Time
    </Badge>
  );
};
