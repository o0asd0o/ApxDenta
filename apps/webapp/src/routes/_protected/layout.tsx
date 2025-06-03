import { Protected } from '@/features/protected/Protected';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth) {
      console.log({ loc: location.pathname });
      throw redirect({
        to: '/login',
        search: { redirect: location.pathname },
      });
    }
  },
  component: Protected,
});
