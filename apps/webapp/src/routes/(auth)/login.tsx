import { LoginForm } from '@/features/auth/LoginForm';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';

const FALLBACK = '/dashboard';

export const Route = createFileRoute('/(auth)/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth) {
      console.log('SEARCH REDIRECT', search.redirect);
      throw redirect({ to: search.redirect || FALLBACK });
    }
  },
  component: LoginForm,
});
