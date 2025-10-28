import LoadingCard from '@/components/LoaderCard';
import Header from '@/components/header/Header';
import { AppSideBar } from '@/components/side-bar/AppSideBar';
import { useSession } from '@/lib/auth-client';
import { SidebarInset, SidebarProvider } from '@repo/ui/components';
import { Outlet } from '@tanstack/react-router';

export const Protected = () => {
  const { data: authData } = useSession();

  if (!authData?.user) {
    return (
      <div className="flex items-center justify-center h-dvh bg-card">
        <LoadingCard />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSideBar />
      <SidebarInset className="flex flex-col">
        <Header />
        <main className="flex flex-col w-full flex-1">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
