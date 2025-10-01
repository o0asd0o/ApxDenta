import TreatmentList from '@/features/treatments/TreatmentList';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/(clinic)/treatments')({
  component: TreatmentList,
});
