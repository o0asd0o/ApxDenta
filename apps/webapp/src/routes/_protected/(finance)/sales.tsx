import UnderDevelopment from '@/components/UnderDevelopment';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/(finance)/sales')({
  component: UnderDevelopment,
});
