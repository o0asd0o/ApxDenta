import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  component: () => null,
  beforeLoad: ({ context, location, search }) => {
    if (!context.auth) {
      if (location.pathname !== '/') {
        throw redirect({
          to: '/login',
          search: {
            redirect: location.href,
          },
        });
      }
    }

    throw redirect({ to: search.redirect || '/dashboard' });
  },
});
