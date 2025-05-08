import type { Staff } from '@repo/domain/db';

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
