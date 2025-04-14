import { TRPCProvider } from '@/lib/trpc';
import type { AppRouter } from '@repo/domain/server';
import type { QueryClient } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type React from 'react';
import { useState } from 'react';
import SuperJSON from 'superjson';

type Props = {
  children: React.JSX.Element;
  queryClient: QueryClient;
};
export const TrpcProvider: React.FC<Props> = ({ queryClient, children }) => {
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          transformer: SuperJSON,
          url: 'http://localhost:3000',
        }),
      ],
    }),
  );

  return (
    <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
      {children}
    </TRPCProvider>
  );
};
