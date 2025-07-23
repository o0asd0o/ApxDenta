import type { StaffType } from '@repo/domain/db';

export const STAFF_LIST: { value: StaffType; label: string }[] = [
  { label: 'Doctor', value: 'DOCTOR' },
  { label: 'Staff', value: 'STAFF' },
];
