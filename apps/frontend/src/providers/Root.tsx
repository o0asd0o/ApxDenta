import { TrpcProvider } from '@/providers/TrpcProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';

export const queryClient = new QueryClient();

export function getContext() {
  return { queryClient };
}

export function RootProvider({ children }: { children: React.JSX.Element }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TrpcProvider queryClient={queryClient}>{children}</TrpcProvider>
    </QueryClientProvider>
  );
}
