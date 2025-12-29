import Reservations from '@/features/reservations/Reservations';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/(clinic)/reservations')({
  component: Reservations,
});
