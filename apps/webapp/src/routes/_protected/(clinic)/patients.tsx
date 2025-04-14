import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/(clinic)/patients')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_protected/patients"!</div>;
}
