import { RouterProvider, createRouter } from '@tanstack/react-router';
import type React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

// Import the generated route tree
import { routeTree } from './routeTree.gen.ts';

import { Loader2 } from 'lucide-react';
import { scan } from 'react-scan';
import { useSession } from './lib/auth-client';
import { RootProvider, getContext } from './providers/Root';
import reportWebVitals from './reportWebVitals.ts';

scan({
  _debug: 'verbose',
  enabled: true,
});

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { ...getContext(), auth: null },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App: React.FC = () => {
  const { data: authData, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <RouterProvider
      router={router}
      context={{ ...getContext(), auth: authData }}
    />
  );
};

// Render the app
const rootElement = document.getElementById('app');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RootProvider>
        <App />
      </RootProvider>
    </StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
