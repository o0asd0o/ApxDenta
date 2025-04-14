import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => null,
  beforeLoad: ({ context }) => {
    if (!context.auth) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      });
    }

    throw redirect({ to: '/dashboard' });
  },
});
