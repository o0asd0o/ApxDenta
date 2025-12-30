import { Badge } from '@repo/ui/components';
import React from 'react';

export const StaffActiveBadge: React.FC = () => {
  return (
    <Badge
      variant="default"
      className="bg-green-100 text-green-600 uppercase rounded-full text-[10px]"
    >
      Active
    </Badge>
  );
};

export const StaffInactiveBadge: React.FC = () => {
  return (
    <Badge variant="outline" className="uppercase rounded-full text-[10px]">
      Inactive
    </Badge>
  );
};

export const StaffExpiredBadge: React.FC = () => {
  return (
    <Badge
      variant="default"
      className="bg-yellow-100 text-yellow-600 uppercase rounded-full text-[10px]"
    >
      Expired
    </Badge>
  );
};

export const StaffTerminatedBadge: React.FC = () => {
  return (
    <Badge
      variant="default"
      className="bg-red-100 text-red-600 uppercase rounded-full text-[10px]"
    >
      Terminated
    </Badge>
  );
};

export const StaffResignedBadge: React.FC = () => {
  return (
    <Badge
      variant="default"
      className="bg-orange-100 text-orange-600 uppercase rounded-full text-[10px]"
    >
      Resigned
    </Badge>
  );
};

export const StaffSuspendedBadge: React.FC = () => {
  return (
    <Badge
      variant="default"
      className="bg-purple-100 text-purple-600 uppercase rounded-full text-[10px]"
    >
      Suspended
    </Badge>
  );
};
