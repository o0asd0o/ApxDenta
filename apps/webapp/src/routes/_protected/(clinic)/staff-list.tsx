import { StaffList } from '@/features/staff-list/StaffList';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/(clinic)/staff-list')({
  component: StaffList,
});
