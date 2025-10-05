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

export const TreatmentSampleBadge: React.FC = () => {
  return (
    <Badge
      variant="default"
      className="bg-gray-100 text-gray-700 uppercase rounded-full text-[10px]"
    >
      Sample
    </Badge>
  );
};

export const TreatmentFinalizedBadge: React.FC = () => {
  return (
    <Badge
      variant="default"
      className="bg-conic-100 text-conic-700 uppercase rounded-full text-[10px]"
    >
      Finalized
    </Badge>
  );
};

export const TreatmentInactiveBadge: React.FC = () => {
  return (
    <Badge
      variant="default"
      className="bg-red-100 text-red-700 uppercase rounded-full text-[10px]"
    >
      Inactive
    </Badge>
  );
};
