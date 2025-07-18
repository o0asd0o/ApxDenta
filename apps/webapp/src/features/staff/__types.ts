import type { Staff, StaffStatus, WorkingDay } from '@repo/domain/db';
import type {
  AssignedServicesFormType,
  DayOffsFormType,
  StaffInfoFormType,
  WorkingHoursFormType,
} from '@repo/schemas';
import type { UseFormReturn } from 'react-hook-form';

export type StaffColumnType = Omit<
  Staff,
  'id' | 'createdAt' | 'updatedAt' | 'status'
> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status?: StaffStatus | null;
  workSchedules: { day: WorkingDay }[];
  assignedServices: { name: string; id: string }[];
  account?: {
    user: {
      email: string;
      name: string;
    };
  };
};

// biome-ignore lint:/complexity/noBannedTypes
type Empty = any | any[];
export type CreateStaffFormType = UseFormReturn<Empty, unknown, Empty>;

export type AllFormsType = Partial<{
  assignedServices: AssignedServicesFormType;
  dayOffs: DayOffsFormType;
  workingHours: WorkingHoursFormType;
  staffInfo: StaffInfoFormType;
}>;

export type AdditionalDayOffType = Pick<{ name: string }, 'name'>[];

export type StaffFilterType = {
  search?: string;
  status?: StaffStatus[];
  assignedServices?: string[];
  specialists?: string[];
  schedules?: WorkingDay[];
};
