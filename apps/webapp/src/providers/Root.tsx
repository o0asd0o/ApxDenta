import { TrpcProvider } from '@/providers/TrpcProvider';
import { AuthQueryProvider } from '@daveyplate/better-auth-tanstack';
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
      <TrpcProvider queryClient={queryClient}>
        <AuthQueryProvider>{children}</AuthQueryProvider>
      </TrpcProvider>
      <Toaster
        position="top-right"
        theme="light"
        richColors
        closeButton
        toastOptions={{
          style: {
            borderRadius: '0.75rem',
            fontSize: '1rem',
            boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
          },
          className: 'bg-white text-gray-900',
        }}
        duration={3500}
        visibleToasts={4}
        expand
        gap={16}
      />
    </QueryClientProvider>
  );
}
