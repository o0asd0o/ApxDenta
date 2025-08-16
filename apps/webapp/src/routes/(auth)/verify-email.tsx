import { VerifyEmailPage } from '@/features/auth/VerifyEmail';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

export const Route = createFileRoute('/(auth)/verify-email')({
  validateSearch: z.object({ token: z.string() }),
  component: VerifyEmailPage,
});
