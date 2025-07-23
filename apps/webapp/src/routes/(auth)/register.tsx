import RegistrationForm from '@/features/auth/RegistrationForm';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/register')({
  component: RegistrationForm,
});
