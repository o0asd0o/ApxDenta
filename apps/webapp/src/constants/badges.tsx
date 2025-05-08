import {
  FullTimeBadge,
  PartTimeBadge,
} from '@/components/badges/employement-type';
import type { EmploymentType } from '@repo/domain/db';

export const EMPLOYMENT_TYPE_BADGES: Record<EmploymentType, React.ReactNode> = {
  FULL_TIME: <FullTimeBadge />,
  PART_TIME: <PartTimeBadge />,
};
