import { Badge } from '@repo/ui/components';
import React from 'react';

export const ActiveBadge: React.FC = () => {
  return (
    <Badge
      variant="default"
      className="bg-green-100 text-green-600 uppercase rounded-full text-[10px]"
    >
      Active
    </Badge>
  );
};

export const InactiveBadge: React.FC = () => {
  return (
    <Badge variant="outline" className="uppercase rounded-full text-[10px]">
      Inactive
    </Badge>
  );
};

export const NewBadge: React.FC = () => {
  return (
    <Badge
      variant="default"
      className="bg-blue-100 text-blue-600 uppercase rounded-full text-[10px]"
    >
      New
    </Badge>
  );
};
