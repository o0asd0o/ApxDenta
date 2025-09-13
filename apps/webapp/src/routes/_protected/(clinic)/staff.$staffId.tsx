import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/(clinic)/staff/$staffId')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_protected/(clinic)/staff/$staffId"!</div>;
}
