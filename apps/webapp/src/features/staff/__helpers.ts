import type { StaffStatus, WorkingDay } from '@repo/domain/db';
import type { StaffInfoFormType } from '@repo/schemas';

export const extractSpecialistIdFromValue = (staffInfo?: StaffInfoFormType) => {
  return staffInfo?.specialistId.split('--')[0] as string;
};

export const EMPLOYEE_STATUS: { value: StaffStatus; label: string }[] = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'EXPIRED', label: 'Expired' },
  { value: 'TERMINATED', label: 'Terminated' },
  { value: 'RESIGNED', label: 'Resigned' },
  { value: 'SUSPENDED', label: 'Suspended' },
];

export const EMPLOYEE_WORKDAYS: { label: string; value: WorkingDay }[] = [
  { label: 'Monday', value: 'MONDAY' },
  { label: 'Tuesday', value: 'TUESDAY' },
  { label: 'Wednesday', value: 'WEDNESDAY' },
  { label: 'Thursday', value: 'THURSDAY' },
  { label: 'Friday', value: 'FRIDAY' },
  { label: 'Saturday', value: 'SATURDAY' },
  { label: 'Sunday', value: 'SUNDAY' },
];
