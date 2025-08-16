import EmailVerificationSent from '@/features/auth/EmailVerificationSent';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

export const Route = createFileRoute('/(auth)/verification-sent')({
  validateSearch: z.object({
    email: z.string().email(),
  }),
  component: EmailVerificationSent,
});
