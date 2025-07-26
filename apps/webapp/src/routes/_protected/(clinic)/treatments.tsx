import UnderDevelopment from '@/components/UnderDevelopment';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/(clinic)/treatments')({
  component: UnderDevelopment,
});
