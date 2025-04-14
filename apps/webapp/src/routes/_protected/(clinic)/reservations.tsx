import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/(clinic)/reservations')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_protected/reservations"!</div>;
}
