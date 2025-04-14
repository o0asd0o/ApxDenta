import { Protected } from '@/features/protected/Protected';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ context }) => {
    if (!context.auth) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      });
    }
  },
  component: Protected,
});
