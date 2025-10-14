import Header from '@/components/header/Header';
import { AppSideBar } from '@/components/side-bar/AppSideBar';
import { SidebarInset, SidebarProvider } from '@repo/ui/components';
import { Outlet } from '@tanstack/react-router';

export const Protected = () => {
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
