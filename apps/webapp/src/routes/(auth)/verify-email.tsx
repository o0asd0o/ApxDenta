import {
  VeifyEmailPending,
  VerifyEmailError,
  VerifyEmailPage,
} from '@/features/auth/VerifyEmail';
import { verifyEmail } from '@/lib/auth-client';
import { createFileRoute } from '@tanstack/react-router';
import { toast } from 'sonner';
import z from 'zod';

export const Route = createFileRoute('/(auth)/verify-email')({
  validateSearch: z.object({ token: z.string() }),
  loaderDeps: ({ search: { token } }) => ({ token }),
  loader: async ({ deps }) => {
    const response = await verifyEmail({ query: { token: deps.token } });

    if (response.error) {
      throw new Error(response.error.message);
    }

    toast.success('Email verified successfully!');

    return true;
  },

  onError: (error) => {
    toast.error('Error verifying email:', error.message || 'Unknown');
  },
  pendingComponent: VeifyEmailPending,
  errorComponent: VerifyEmailError,
  component: VerifyEmailPage,
});
