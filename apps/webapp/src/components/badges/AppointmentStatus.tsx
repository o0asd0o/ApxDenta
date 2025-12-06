import { Badge } from '@repo/ui/components';
import React from 'react';

export const CompletedBadge: React.FC = () => {
  return (
    <Badge
      variant="default"
      className="bg-green-100 text-green-600 uppercase rounded-full text-[10px]"
    >
      Completed
    </Badge>
  );
};

export const ScheduledBadge: React.FC = () => {
  return (
    <Badge
      variant="outline"
      className=" bg-blue-100 text-blue-600 uppercase rounded-full text-[10px]"
    >
      Scheduled
    </Badge>
  );
};

export const CancelledBadge: React.FC = () => {
  return (
    <Badge
      variant="default"
      className="bg-red-100 text-red-600 uppercase rounded-full text-[10px]"
    >
      Cancelled
    </Badge>
  );
};

export const InProgressBadge: React.FC = () => {
  return (
    <Badge
      variant="default"
      className="bg-yellow-100 text-yellow-800 uppercase rounded-full text-[10px]"
    >
      In Progress
    </Badge>
  );
};

export const NoShowBadge: React.FC = () => {
  return (
    <Badge
      variant="default"
      className="bg-gray-100 text-gray-600 uppercase rounded-full text-[10px]"
    >
      No Show
    </Badge>
  );
};
