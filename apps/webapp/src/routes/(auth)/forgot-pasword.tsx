import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/forgot-pasword')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(auth)/forgot-pasword"!</div>;
}
