import type { DayOffType } from '@/components/AddOffDay';
import { slugify } from '@/lib/utils';
import type { StaffStatus, WorkingDay } from '@repo/domain/db';
import type { DayOffsFormType, StaffInfoFormType } from '@repo/schemas';

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

export const getExcludedAdditionalDayOffs = (
  additionalDayOffs: DayOffType[],
  formDayOffs: DayOffsFormType['dayOffs'],
) => {
  const additionalDayOffSlugs = additionalDayOffs.map((dayOff) =>
    slugify(dayOff.name),
  );

  const dayOffs = formDayOffs.filter(
    (item) => !additionalDayOffSlugs.includes(item),
  );

  return dayOffs;
};
