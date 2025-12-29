import Accounts from '@/features/accounts/Accounts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/(finance)/accounts')({
  component: Accounts,
});
