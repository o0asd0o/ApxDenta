import {
  FullTimeBadge,
  PartTimeBadge,
} from '@/components/badges/EmploymentType';
import {
  MultipleVisitBadge,
  SingleVisitBadge,
} from '@/components/badges/VisityType';
import type { EmploymentType, TreatmentVisitType } from '@repo/domain/db';
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
