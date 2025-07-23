import { TrpcProvider } from '@/providers/TrpcProvider';
import { Toaster } from '@repo/ui/components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export function getContext() {
  return { queryClient };
}

export function RootProvider({ children }: { children: React.JSX.Element }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TrpcProvider queryClient={queryClient}>{children}</TrpcProvider>
      <Toaster />
    </QueryClientProvider>
  );
}
