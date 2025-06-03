import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => null,
  beforeLoad: ({ context, location }) => {
    if (!context.auth) {
      if (location.pathname !== '/') {
        throw redirect({
          to: '/login',
          search: {
            redirect: location.pathname,
          },
        });
      }
    }

    throw redirect({ to: '/dashboard' });
  },
});
