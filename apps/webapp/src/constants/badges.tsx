import {
  FullTimeBadge,
  PartTimeBadge,
} from '@/components/badges/EmploymentType';
import {
  MultipleVisitBadge,
  SingleVisitBadge,
  TreatmentFinalizedBadge,
  TreatmentInactiveBadge,
  TreatmentSampleBadge,
} from '@/components/badges/VisityType';
import type {
  EmploymentType,
  TreatmentStatus,
  TreatmentVisitType,
} from '@repo/domain/db';
import type React from 'react';

export const EMPLOYMENT_TYPE_BADGES: Record<EmploymentType, React.ReactNode> = {
  FULL_TIME: <FullTimeBadge />,
  PART_TIME: <PartTimeBadge />,
};

export const TREATMENT_TYPE_BADGES: Record<
  TreatmentVisitType,
  React.ReactNode
> = {
  SINGLE_VISIT: <SingleVisitBadge />,
  MULTIPLE_VISIT: <MultipleVisitBadge />,
};

export const TREATMENT_STATUS_BADGES: Record<TreatmentStatus, React.ReactNode> =
  {
    FINALIZED: <TreatmentFinalizedBadge />,
    INACTIVE: <TreatmentInactiveBadge />,
    SAMPLE: <TreatmentSampleBadge />,
  };
