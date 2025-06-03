import type { Staff } from '@repo/domain/db';
import type { UseFormReturn } from 'react-hook-form';

export type StaffType = Omit<Staff, 'id' | 'createdAt' | 'updatedAt'> & {
  id: string;
  createdAt: string;
  updatedAt: string;
  workingDays: string[];
  assignedTreatment: string[];
  account: {
    user: {
      email: string;
      name: string;
    };
  };
};

// biome-ignore lint:/complexity/noBannedTypes
type Empty = any;
export type CreateStaffFormType = UseFormReturn<Empty, unknown, Empty>;
