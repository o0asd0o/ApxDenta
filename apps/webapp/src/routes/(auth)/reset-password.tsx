import { ResetPasswordForm } from '@/features/auth/ResetPassword';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

export const Route = createFileRoute('/(auth)/reset-password')({
  validateSearch: z.object({ token: z.string().optional() }),
  component: ResetPasswordForm,
});
