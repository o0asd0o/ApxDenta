import { signOut } from '@/lib/auth-client';
import { Button } from '@repo/ui/components';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/reservations')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  return (
    <div>
      Hello "/_protected/reservations"!{' '}
      <Button
        onClick={async () => {
          await signOut({
            fetchOptions: {
              onResponse: (ctx) => {
                console.log('GOT HERE', Route.fullPath);
                setTimeout(() => {
                  navigate({ to: '/', search: { redirect: Route.fullPath } });
                }, 100);
              },
            },
          });
        }}
      >
        Sign out
      </Button>
    </div>
  );
}
