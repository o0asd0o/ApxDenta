import type { WorkingDay } from '@repo/domain/db';

export const BASE_SCHEDULES: { [key in WorkingDay]: string } = {
  MONDAY: 'M',
  TUESDAY: 'T',
  WEDNESDAY: 'W',
  THURSDAY: 'Th',
  FRIDAY: 'F',
  SATURDAY: 'S',
  SUNDAY: 'Su',
};
