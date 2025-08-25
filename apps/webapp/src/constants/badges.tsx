import {
  FullTimeBadge,
  PartTimeBadge,
} from '@/components/badges/EmploymentType';
import type { EmploymentType } from '@repo/domain/db';
import type React from 'react';

export const EMPLOYMENT_TYPE_BADGES: Record<EmploymentType, React.ReactNode> = {
  FULL_TIME: <FullTimeBadge />,
  PART_TIME: <PartTimeBadge />,
};
