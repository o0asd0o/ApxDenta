import { TRPCProvider } from '@/lib/trpc';
import { createTrpcClient } from '@repo/domain/client';
import type { QueryClient } from '@tanstack/react-query';
import type React from 'react';
import { useState } from 'react';

type Props = {
  children: React.JSX.Element;
  queryClient: QueryClient;
};
export const TrpcProvider: React.FC<Props> = ({ queryClient, children }) => {
  const [trpcClient] = useState(() =>
    createTrpcClient({ serverUrl: import.meta.env.VITE_PUBLIC_SERVER_URL }),
  );

  return (
    <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
      {children}
    </TRPCProvider>
  );
};
